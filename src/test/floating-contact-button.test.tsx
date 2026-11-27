import "@/test/consent-fixture";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FloatingContactButton } from "@/components/FloatingContactButton";

let pathname = "/travel-blog/test-guide/";

vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (state: { location: { pathname: string } }) => string }) =>
    select({ location: { pathname } }),
}));

function mountSection(id: string, withForm = true) {
  const main = document.createElement("main");
  main.id = "main";
  const section = document.createElement("section");
  section.id = id;
  if (withForm) section.appendChild(document.createElement("form"));
  const formTop = { value: 1400 };
  vi.spyOn(section, "getBoundingClientRect").mockImplementation(
    () => ({ top: formTop.value }) as DOMRect,
  );
  main.appendChild(section);
  document.body.appendChild(main);
  return { main, section, formTop };
}

describe("floating Contact me shortcut", () => {
  beforeEach(() => {
    pathname = "/travel-blog/test-guide/";
    Object.defineProperty(window, "scrollY", { configurable: true, value: 400 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 900 });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(performance.now()), 0),
    );
    vi.stubGlobal("cancelAnimationFrame", (handle: number) => window.clearTimeout(handle));
  });

  afterEach(() => {
    document.getElementById("main")?.remove();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each(["contact", "contact-moshe", "request-quote"])(
    "shows the same blue button for a real inquiry form in #%s",
    (id) => {
      mountSection(id);
      render(<FloatingContactButton />);
      const button = screen.getByRole("button", { name: /contact me.*inquiry form/i });
      expect(button).toHaveTextContent("Contact me");
      expect(button).toHaveAttribute("aria-controls", id);
      expect(button.className).toContain("bg-[#1766c2]");
    },
  );

  it("scrolls smoothly to the form, moves keyboard focus, and emits an optional analytics event", () => {
    const { section } = mountSection("contact");
    const scroll = vi.spyOn(section, "scrollIntoView");
    const analytics = vi.fn();
    vi.stubGlobal("gtag", analytics);
    render(<FloatingContactButton />);

    fireEvent.click(screen.getByRole("button", { name: /contact me/i }));

    expect(scroll).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(section).toHaveFocus();
    expect(section).toHaveAttribute("tabindex", "-1");
    expect(analytics).toHaveBeenCalledWith("event", "floating_contact_click", {
      page_path: pathname,
      contact_target: "contact",
    });
    expect(screen.queryByRole("button", { name: /contact me/i })).not.toBeInTheDocument();
  });

  it("respects the reduced-motion preference", () => {
    const { section } = mountSection("request-quote");
    const scroll = vi.spyOn(section, "scrollIntoView");
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<FloatingContactButton />);
    fireEvent.click(screen.getByRole("button", { name: /contact me/i }));
    expect(scroll).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });

  it("does not appear on pages without an actual inquiry form or before scrolling", () => {
    const { main } = mountSection("contact", false);
    const view = render(<FloatingContactButton />);
    expect(screen.queryByTestId("floating-contact-button")).not.toBeInTheDocument();

    main.querySelector("section")?.appendChild(document.createElement("form"));
    // A page at the top should still have no floating CTA.
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    fireEvent.scroll(window);
    view.rerender(<FloatingContactButton />);
    expect(screen.queryByTestId("floating-contact-button")).not.toBeInTheDocument();
  });

  it("hides when the form is in view or has already been passed", async () => {
    const { formTop } = mountSection("contact");
    render(<FloatingContactButton />);
    expect(screen.getByTestId("floating-contact-button")).toBeInTheDocument();

    formTop.value = 550;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(screen.queryByTestId("floating-contact-button")).not.toBeInTheDocument(),
    );

    formTop.value = -100;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(screen.queryByTestId("floating-contact-button")).not.toBeInTheDocument(),
    );
  });

  it("detects an inquiry form added later by a route or lazy component", async () => {
    const { section } = mountSection("contact", false);
    render(<FloatingContactButton />);
    expect(screen.queryByTestId("floating-contact-button")).not.toBeInTheDocument();

    section.appendChild(document.createElement("form"));
    await waitFor(() => expect(screen.getByTestId("floating-contact-button")).toBeInTheDocument());
  });
});
