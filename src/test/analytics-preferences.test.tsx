import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Analytics, AnalyticsPreferencesLink } from "@/components/Analytics";
import { routeTree } from "@/routeTree.gen";

const mocks = vi.hoisted(() => ({ eligible: vi.fn(), choice: vi.fn(), setChoice: vi.fn(), page: vi.fn() }));
vi.mock("@/lib/analytics", async importOriginal => ({
  ...await importOriginal<typeof import("@/lib/analytics")>(),
  analyticsEligible: mocks.eligible, getAnalyticsChoice: mocks.choice,
  setAnalyticsChoice: mocks.setChoice, trackPageView: mocks.page,
}));
beforeEach(() => { mocks.eligible.mockReturnValue(true); mocks.choice.mockReturnValue("unknown"); });
afterEach(() => { cleanup(); vi.clearAllMocks(); });

async function showPreferences() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/car-rental/"] }), trailingSlash: "always" });
  await router.load();
  render(<RouterContextProvider router={router}><Analytics /><AnalyticsPreferencesLink /></RouterContextProvider>);
}

it("offers equal allow/decline choices and reopens from the footer", async () => {
  await showPreferences();
  expect(screen.getByRole("dialog", { name: "Google Analytics preferences" })).toBeVisible();
  const allow = screen.getByRole("button", { name: "Allow analytics" });
  const decline = screen.getByRole("button", { name: "Decline analytics" });
  expect(allow.className).toBe(decline.className);
  fireEvent.click(decline);
  expect(mocks.setChoice).toHaveBeenLastCalledWith("denied");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Analytics preferences" }));
  fireEvent.click(screen.getByRole("button", { name: "Allow analytics" }));
  expect(mocks.setChoice).toHaveBeenLastCalledWith("granted");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("leaves the preview unchanged and respects a saved production choice", async () => {
  mocks.eligible.mockReturnValue(false);
  await showPreferences();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Analytics preferences" })).not.toBeInTheDocument();
  cleanup();
  mocks.eligible.mockReturnValue(true);
  mocks.choice.mockReturnValue("granted");
  await showPreferences();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Analytics preferences" })).toBeVisible();
});
