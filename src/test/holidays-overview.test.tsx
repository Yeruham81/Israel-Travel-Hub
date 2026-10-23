import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { IsraelHolidayOverview, overviewHolidays } from "@/components/IsraelHolidayOverview";

afterEach(cleanup);

describe("compact holidays reference", () => {
  it("shows a short quarter by default, with visible dates and practical impact, not closed month accordions", () => {
    const { container } = render(<IsraelHolidayOverview />);
    expect(screen.getByRole("heading", {name: "Holiday dates at a glance"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Jan–Mar"})).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector("#year-calendar details")).toBeNull();
    expect(screen.getByRole("heading", {name: "March 2027"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Purim/})).toBeInTheDocument();
    const purim = screen.getByRole("heading", {name:"Purim"}).closest("li")!;
    expect(purim).toHaveTextContent("22 Mar");
    expect(purim).toHaveTextContent("Changes and crowds");
    expect(purim).toHaveTextContent("Parties and processions");
    expect(screen.queryByRole("heading", {name: /Passover — first festival day/})).toBeNull();
  });

  it("switches quarters instantly without expanding any month rows", () => {
    render(<IsraelHolidayOverview />);
    fireEvent.click(screen.getByRole("button", {name:"Apr–Jun"}));
    expect(screen.getByRole("button", {name:"Apr–Jun"})).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", {name:"Passover — first festival day"})).toBeInTheDocument();
    expect(screen.getByText(/Regular public transport generally stops on the festival day/)).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name:"Purim"})).toBeNull();
  });

  it("filters by tradition and can show the full year on demand", () => {
    render(<IsraelHolidayOverview />);
    fireEvent.click(screen.getByRole("button", {name:"Christian"}));
    expect(screen.getByRole("heading", {name:"Western Holy Week and Easter"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name:"Purim"})).toBeNull();
    fireEvent.click(screen.getByRole("button", {name:"All traditions"}));
    fireEvent.click(screen.getByRole("button", {name:"Full year"}));
    expect(screen.getByRole("heading", {name:"Passover — first festival day"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name:"Yom Kippur"})).toBeInTheDocument();
  });

  it("switches to late 2026 and returns to early 2027 without an irrelevant 2026 quarter", () => {
    const { container } = render(<IsraelHolidayOverview />);
    const yearControls = screen.getByRole("group", {name:"Holiday calendar year"});
    fireEvent.click(within(yearControls).getByRole("button", {name:"2026"}));
    expect(screen.getByRole("button", {name:"Oct–Dec"})).toHaveAttribute("aria-pressed","true");
    expect(screen.getByRole("button", {name:"Jan–Mar"})).toBeDisabled();
    expect(screen.getByRole("heading", {name:"Hanukkah"})).toBeInTheDocument();
    expect(container.querySelector("#year-calendar details")).toBeNull();
    fireEvent.click(within(yearControls).getByRole("button", {name:"2027"}));
    expect(screen.getByRole("button", {name:"Jan–Mar"})).toHaveAttribute("aria-pressed","true");
    expect(screen.getByRole("heading", {name:"Purim"})).toBeInTheDocument();
  });

  it("uses the original holiday dataset rather than omitting observances from the annual view", () => {
    expect(overviewHolidays(2027,"all","All").length).toBeGreaterThan(20);
    expect(overviewHolidays(2026,3,"All").some(h=>h.id==="hanukkah26")).toBe(true);
    expect(overviewHolidays(2027,3,"All").some(h=>h.id==="yomkippur")).toBe(true);
    expect(overviewHolidays(2027,0,"Muslim").every(h=>h.community==="Muslim")).toBe(true);
  });
});
