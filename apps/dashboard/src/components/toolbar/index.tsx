import { Button } from "@bugpilot/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@bugpilot/ui/components/sheet";
import { Wand } from "lucide-react";

export function Toolbar() {
  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-4 right-4 z-50">
        <Button className="rounded-full relative overflow-hidden group" variant="outline" size="icon">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x" />
          <Wand className="relative z-10" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
