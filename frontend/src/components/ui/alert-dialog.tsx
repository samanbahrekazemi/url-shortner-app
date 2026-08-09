"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[ending-style]:fade-out data-[starting-style]:fade-out data-[entering-style]:fade-in data-[exiting-style]:fade-in data-[ending-style]:duration-150 data-[starting-style]:duration-150 data-[entering-style]:duration-150 data-[exiting-style]:duration-150",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, ...props }: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-xl",
          "data-[ending-style]:fade-out data-[starting-style]:fade-out data-[entering-style]:fade-in data-[exiting-style]:fade-in",
          "data-[ending-style]:zoom-out data-[starting-style]:zoom-out data-[entering-style]:zoom-in data-[exiting-style]:zoom-in",
          "data-[ending-style]:duration-150 data-[starting-style]:duration-150 data-[entering-style]:duration-150 data-[exiting-style]:duration-150",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2", className)} {...props} />;
}

function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 data-slot="alert-dialog-title" className={cn("text-lg font-semibold", className)} {...props} />;
}

function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="alert-dialog-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button data-slot="alert-dialog-action" className={cn(buttonVariants(), className)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button data-slot="alert-dialog-cancel" className={cn(buttonVariants({ variant: "outline" }), className)} {...props} />;
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
