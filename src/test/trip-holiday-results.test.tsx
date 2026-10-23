import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { TripHolidayResults } from "@/components/TripHolidayResults";

afterEach(cleanup);

async function renderResults(start: string | null, end: string | null) {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/travel-blog/israel-holidays/"] }),
    trailingSlash: "always",
  });
  await router.load();
  return render(<RouterContextProvider router={router}><TripHolidayResults start={start} end={end}/></RouterContextProvider>);
}

describe("holiday results for selected travel dates", () => {
  it("uses a short prompt while waiting for the second date", async () => {
    await renderResults("2027-04-21", null);
    expect(screen.getByRole("heading", { name: "How could your trip be affected?" })).toBeInTheDocument();
    expect(screen.getByText("Select your arrival and departure dates on the calendar above.")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).toBeNull();
  });

  it("shows matching observances as readable rows without dropdowns, long alert cards or repetitive disclaimers", async () => {
    await renderResults("2027-04-21", "2027-04-22");
    const list = screen.getByRole("list", { name: "Holidays and Shabbat during your visit" });
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent("Passover — first festival day");
    expect(rows[0]).toHaveTextContent("21 Apr – 22 Apr");
    expect(rows[0]).toHaveTextContent("Regular public transport generally stops");
    expect(screen.queryByText("How do you expect to get around?")).toBeNull();
    expect(screen.queryByText(/These are planning flags/)).toBeNull();
    expect(screen.queryByText(/Arrival date alert|Departure date alert/)).toBeNull();
    expect(screen.queryByRole("combobox")).toBeNull();
  });

  it("gives an unobtrusive empty result when no listed holidays or Shabbat overlap", async () => {
    await renderResults("2027-07-05", "2027-07-06");
    expect(screen.getByText("No listed holidays fall within these dates.")).toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "Holidays and Shabbat during your visit" })).toBeNull();
  });

  it("mentions weekly Shabbat only once and links to its transport guide", async () => {
    await renderResults("2027-07-09", "2027-07-10");
    const list = screen.getByRole("list", { name: "Holidays and Shabbat during your visit" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    expect(within(list).getByRole("heading", { name: "Shabbat" })).toBeInTheDocument();
    expect(within(list).getByRole("link", { name: "Shabbat transport guide" })).toHaveAttribute("href", "/travel-blog/from-ben-gurion-airport-on-shabbat/");
    expect(screen.queryByText(/Friday\/Saturday dates to consider/)).toBeNull();
  });

  it("keeps validation for unsupported date ranges", async () => {
    await renderResults("2101-01-01", "2101-01-05");
    expect(screen.getByRole("alert")).toHaveTextContent(/available through/);
  });
  it("includes the end of Hanukkah after New Year without claiming broader 2028 coverage", async () => {
    await renderResults("2027-12-31", "2028-01-01");
    expect(screen.getByRole("heading", {name: "Hanukkah"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Shabbat"})).toBeInTheDocument();
  });

});
