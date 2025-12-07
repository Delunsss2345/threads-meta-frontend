import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface SheetModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const SheetModal = ({
  open,
  onClose,
  children,
  className,
}: SheetModalProps) => {
  return (
    <Sheet modal={false} open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetTitle>Threads</SheetTitle>
      <SheetContent
        aria-describedby={undefined}
        side="bottom"
        className={`h-[100vh] p-0 overflow-hidden ${className}`}
      >
        <div className="h-full overflow-y-auto border-none !border-0 !shadow-none rounded-none [&_*]:border-none [&_*]:shadow-none">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetModal;
