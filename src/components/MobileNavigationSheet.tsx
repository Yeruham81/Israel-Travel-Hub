import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

/**
 * Load Radix dialog machinery only when someone opens the mobile menu.
 * The navbar trigger and the searchable, SSR-visible desktop/navigation links
 * remain immediately available. This avoids downloading a UI dialog on a
 * cold mobile homepage visit where the user may never open the menu.
 */
export default function MobileNavigationSheet({
  open, onOpenChange, children, onCloseAutoFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  onCloseAutoFocus?: (event: Event) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent {...(onCloseAutoFocus ? { onCloseAutoFocus } : {})} side="left" className="w-[85vw] max-w-sm overflow-y-auto">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="font-serif text-2xl">Explore Israel</SheetTitle>
          <SheetDescription>Transportation, tours, accommodation, attractions and travel guides.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
