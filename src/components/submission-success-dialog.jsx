import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SubmissionSuccessDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="submission-success-dialog">
        <span className="submission-success-dialog-icon">
          <Check aria-hidden="true" />
        </span>
        <DialogHeader className="submission-success-dialog-header">
          <DialogTitle className="submission-success-dialog-title">
            Message submitted successfully
          </DialogTitle>
          <DialogDescription className="submission-success-dialog-description">
            Our team will contact you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="submission-success-dialog-footer">
          <Button type="button" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
