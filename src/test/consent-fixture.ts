import { beforeEach } from "vitest";
import { ALL_CATEGORIES, saveCookieConsent } from "@/lib/cookie-consent";
/** These existing layout/click tests exercise optional components after explicit permission.
 * Default, necessary-only and withdrawal behaviour is covered in cookie-consent.test.tsx.
 */
beforeEach(() => saveCookieConsent(ALL_CATEGORIES));
