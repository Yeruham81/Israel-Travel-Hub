import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Analytics, AnalyticsPreferencesLink } from "@/components/Analytics";
import { COOKIE_CONSENT_KEY, NECESSARY_ONLY, ALL_CATEGORIES, readStoredConsent, saveCookieConsent } from "@/lib/cookie-consent";
import { routeTree } from "@/routeTree.gen";
vi.mock("@/lib/analytics", async original => ({ ...await original<typeof import("@/lib/analytics")>(), trackPageView: vi.fn(), refreshAnalyticsChoice: vi.fn() }));
beforeEach(() => { saveCookieConsent(NECESSARY_ONLY); localStorage.clear(); window.dispatchEvent(new StorageEvent("storage", { key: COOKIE_CONSENT_KEY })); });
afterEach(() => { cleanup(); localStorage.clear(); window.history.replaceState(null, "", "/"); vi.clearAllMocks(); });
async function showPreferences() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/car-rental/"] }), trailingSlash: "always" });
  await router.load();
  render(<RouterContextProvider router={router}><Analytics /><AnalyticsPreferencesLink /></RouterContextProvider>);
}
it("offers all three choices on preview too and reopens settings after necessary only", async () => {
  await showPreferences();
  expect(screen.getByRole("dialog", { name: "Cookie preferences" })).toBeVisible();
  const all = screen.getByRole("button", { name: "Accept all" });
  const necessary = screen.getByRole("button", { name: "Reject all" });
  expect(all.className).toBe(necessary.className);
  fireEvent.click(necessary);
  expect(readStoredConsent(localStorage)?.categories).toEqual(NECESSARY_ONLY);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Cookie settings" }));
  fireEvent.click(screen.getByRole("button", { name: "Accept all" }));
  expect(readStoredConsent(localStorage)?.categories).toEqual(ALL_CATEGORIES);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
it("saves independent category choices and keeps necessary storage always on", async () => {
  await showPreferences();
  fireEvent.click(screen.getByRole("button", { name: "Customize" }));
  expect(screen.getByText(/Always on/)).toBeVisible();
  const boxes = screen.getAllByRole("checkbox");
  expect(boxes).toHaveLength(4);
  boxes.forEach(box => expect(box).not.toBeChecked());
  fireEvent.click(boxes[1]!);
  fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
  expect(readStoredConsent(localStorage)?.categories).toEqual({ ...NECESSARY_ONLY, external: true });
  fireEvent.click(screen.getByRole("button", { name: "Cookie settings" }));
  expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Reject all" }));
  expect(readStoredConsent(localStorage)?.categories).toEqual(NECESSARY_ONLY);
});
it("can save advertising alone without granting booking or analytics permission", async () => {
  await showPreferences();
  fireEvent.click(screen.getByRole("button", { name: "Customize" }));
  fireEvent.click(screen.getAllByRole("checkbox")[3]!);
  fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
  expect(readStoredConsent(localStorage)?.categories).toEqual({ ...NECESSARY_ONLY, advertising: true });
});
it("respects a saved choice and refreshes after another tab changes it", async () => {
  saveCookieConsent(NECESSARY_ONLY);
  await showPreferences();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  act(() => { localStorage.removeItem(COOKIE_CONSENT_KEY); window.dispatchEvent(new StorageEvent("storage", { key: COOKIE_CONSENT_KEY })); });
  expect(screen.getByRole("dialog")).toBeVisible();
});

it("opens a direct Cookie settings link once and closes after saving", async () => {
  saveCookieConsent(ALL_CATEGORIES);
  window.history.replaceState(null, "", "/#cookie-settings");
  await showPreferences();
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(screen.getAllByRole("checkbox").every(box => (box as HTMLInputElement).checked)).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Reject all" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
