import { z } from "zod";
import { emptyTransferQuote } from "@/lib/transfer-quote";
import { emptyDriverQuote } from "@/lib/private-driver-quote";
import { emptyShoreQuote } from "@/lib/shore-quote";

// Network input needs runtime types before the existing journey validators run.
function fieldSchema<T extends Record<string, string | boolean>>(defaults: T) {
  return z.object(Object.fromEntries(Object.entries(defaults).map(([key, value]) =>
    [key, typeof value === "boolean" ? z.boolean() : z.string().max(1500)],
  )) as { [K in keyof T]: T[K] extends boolean ? z.ZodBoolean : z.ZodString }).strict();
}

export const quoteRequestSchema = z.object({
  requestId: z.string().uuid(),
  sourcePath: z.string().max(300).regex(/^\/[a-zA-Z0-9/_-]*$/),
  sourceTitle: z.string().trim().min(1).max(300).regex(/^[^\u0000-\u001f\u007f]*$/).optional(),
  website: z.string().max(200),
  request: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("transfer"), fields: fieldSchema(emptyTransferQuote) }).strict(),
    z.object({ kind: z.literal("driver"), fields: fieldSchema(emptyDriverQuote) }).strict(),
    z.object({ kind: z.literal("contact"), fields: z.object({
      name: z.string().max(120), email: z.string().max(254), subject: z.string().max(160), message: z.string().max(4000), consent: z.boolean(),
    }).strict() }).strict(),
    z.object({ kind: z.literal("shore"), portId: z.enum(["haifa", "ashdod"]), fields: fieldSchema(emptyShoreQuote) }).strict(),
  ]),
}).strict();

