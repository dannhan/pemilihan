import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/" className="font-light">
        <ChevronLeft className="mr-2 h-3 w-3" />
        Kembali
      </Link>
    </Button>
  );
}
