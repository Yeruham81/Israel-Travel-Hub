import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import * as analytics from "@/lib/analytics";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const request = {
  kind: "contact",
  fields: {
    name: "Visitor",
    email: "visitor@example.com",
    subject: "Day trip",
    message: "Please send details.",
    consent: true,
  },
} as const;

it("reports a lead once only after explicit matching delivery acceptance", async () => {
  const lead = vi.spyOn(analytics, "trackAcceptedEnquiry");
  const fetcher = vi.fn(async (_url, options: RequestInit) => {
    const body = JSON.parse(String(options.body));
    return new Response(JSON.stringify({ accepted: true, requestId: body.requestId }), {
      status: 200,
    });
  });
  vi.stubGlobal("fetch", fetcher);
  const { result } = renderHook(() => useQuoteSubmission());
  await act(async () => {
    await result.current.submit(request);
  });
  await act(async () => {
    await result.current.submit(request);
  });
  expect(result.current.isSent).toBe(true);
  expect(fetcher).toHaveBeenCalledOnce();
  expect(lead).toHaveBeenCalledExactlyOnceWith("contact", result.current.result.requestId);
});

it("reports no lead for rejected or ambiguous delivery responses", async () => {
  const lead = vi.spyOn(analytics, "trackAcceptedEnquiry");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response(JSON.stringify({ accepted: false }), { status: 502 })),
  );
  const { result } = renderHook(() => useQuoteSubmission());
  await act(async () => {
    await result.current.submit(request);
  });
  expect(result.current.isSent).toBe(false);
  expect(lead).not.toHaveBeenCalled();
});
