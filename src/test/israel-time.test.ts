import { describe, expect, it } from "vitest";
import { israelNow } from "@/lib/israel-time";
import { validate } from "@/lib/journey";

// 2026-10-16 22:30 UTC = 2026-10-17 01:30 in Israel (IDT, UTC+3). Run with TZ=America/New_York (still 16 Oct, 18:30).
const at = new Date("2026-10-16T22:30:00Z");

describe("Israel-time validation", () => {
  it("uses Asia/Jerusalem date regardless of browser TZ", () => {
    expect(israelNow(at)).toEqual({ date: "2026-10-17", minutes: 90 });
  });
  it("rejects a date that is today in the browser TZ but past in Israel", () => {
    expect(validate("2026-10-16", "", "2", "2", at).date).toMatch(/past in Israel/);
  });
  it("accepts later Israel time today and rejects earlier, unconverted", () => {
    expect(validate("2026-10-17", "02:00", "2", "2", at).time).toBeUndefined();
    expect(validate("2026-10-17", "01:00", "2", "2", at).time).toMatch(/passed/);
  });
});
