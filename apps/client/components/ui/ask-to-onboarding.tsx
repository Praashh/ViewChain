"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ExternalLink, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AskToOnboardingDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleComplete = () => {
    router.push("/onboarding");
    setOpen(false);
  };

  const handleRemindLater = () => {
    setOpen(false);
    setTimeout(() => {
      setOpen(true);
    }, 3600000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Complete Your Onboarding
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Please complete your onboarding process to get the most out of our platform.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
          <Button variant="outline" onClick={handleRemindLater}>
            Remind me later
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            Complete Now
            <ExternalLink className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}