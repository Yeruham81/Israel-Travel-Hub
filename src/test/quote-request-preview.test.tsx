import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteRequestPreview } from "@/components/QuoteRequestPreview";
import { emptyTransferQuote } from "@/lib/transfer-quote";

const request = { kind: "transfer" as const, fields: { ...emptyTransferQuote, name: "Jamie", email: "j@example.com", consent: true } };
const draft = { subject: "A quote", body: "Private journey details", url: "mailto:reservations@israel-taxi.com?subject=A%20quote" };
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("reviewed request delivery", () => {
  it("keeps manual email and copy when direct delivery is disabled, and never sends enquiry fields while checking readiness", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ available: false })); vi.stubGlobal("fetch", fetch);
    render(<QuoteRequestPreview draft={draft} request={request} previewLabel="Prepared request" onBusy={vi.fn()} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    expect(fetch.mock.calls[0]).toEqual(["/api/quote-request/", expect.objectContaining({ method: "GET", credentials: "same-origin" })]);
    expect(JSON.stringify(fetch.mock.calls)).not.toMatch(/Jamie|Private journey|j@example/);
    expect(screen.queryByRole("button", { name: "Send request to Moshe" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open email to Moshe" })).toHaveAttribute("href", draft.url);
    expect(screen.getByRole("status")).toHaveTextContent("Your request has not been sent yet");
  });

  it("submits the snapshot only on explicit send, prevents double clicks and waits for SMTP acceptance", async () => {
    let complete!: (response: Response) => void;
    const fetch = vi.fn().mockImplementation((_url, options) => options.method === "GET" ? Promise.resolve(Response.json({ available: true })) : new Promise<Response>((resolve) => { complete = resolve; }));
    vi.stubGlobal("fetch", fetch);
    vi.spyOn(crypto, "randomUUID").mockReturnValue("123e4567-e89b-42d3-a456-426614174000");
    const busy = vi.fn();
    render(<QuoteRequestPreview draft={draft} request={request} previewLabel="Prepared request" onBusy={busy} />);
    const button = await screen.findByRole("button", { name: "Send request to Moshe" });
    expect(fetch).toHaveBeenCalledOnce();
    fireEvent.click(button); fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(screen.queryByText("Your request has been sent to Moshe")).not.toBeInTheDocument();
    const posts = fetch.mock.calls.filter(([, options]) => options.method === "POST");
    expect(posts).toHaveLength(1);
    expect(JSON.parse(posts[0]![1].body)).toEqual({ requestId: "123e4567-e89b-42d3-a456-426614174000", sourcePath: "/", website: "", request });
    expect(busy).toHaveBeenLastCalledWith(true);
    complete(Response.json({ accepted: true, requestId: "123e4567-e89b-42d3-a456-426614174000" }));
    expect(await screen.findByText("Your request has been sent to Moshe")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("accepted for email delivery");
    expect(screen.getByRole("status")).not.toHaveTextContent("has not been sent");
    expect(busy).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("link", { name: "Open email to Moshe" })).not.toBeInTheDocument();
  });

  it("retains the reviewed fields and manual alternative when delivery fails, without falsely saying it was not delivered", async () => {
    const fetch = vi.fn().mockImplementation((_url, options) => Promise.resolve(options.method === "GET" ? Response.json({ available: true }) : Response.json({ error: "Unavailable" }, { status: 502 })));
    vi.stubGlobal("fetch", fetch);
    vi.spyOn(crypto, "randomUUID").mockReturnValue("123e4567-e89b-42d3-a456-426614174000");
    render(<QuoteRequestPreview draft={draft} request={request} previewLabel="Prepared request" onBusy={vi.fn()} />);
    fireEvent.click(await screen.findByRole("button", { name: "Send request to Moshe" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not confirm email delivery");
    expect(screen.getByLabelText("Prepared request")).toHaveValue("A quote\n\nPrivate journey details");
    expect(screen.getByRole("link", { name: "Open email to Moshe" })).toHaveAttribute("href", draft.url);
    expect(screen.getByRole("status")).not.toHaveTextContent("has not been sent yet");
    expect(screen.queryByRole("button", { name: "Send request to Moshe" })).not.toBeInTheDocument();
    expect(fetch.mock.calls.filter(([, options]) => options.method === "POST")).toHaveLength(1);
  });
});
