"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

function Select<Value, Multiple extends boolean | undefined = false>({ ...props }: SelectPrimitive.Root.Props<Value, Multiple>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" className={cn("text-sm", className)} {...props} />;
}

function SelectPopup({ className, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner>
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[ending-style]:fade-out data-[starting-style]:fade-out data-[entering-style]:fade-in data-[exiting-style]:fade-in",
            "data-[ending-style]:zoom-out data-[starting-style]:zoom-out data-[entering-style]:zoom-in data-[exiting-style]:zoom-in",
            "data-[ending-style]:duration-150 data-[starting-style]:duration-150 data-[entering-style]:duration-150 data-[exiting-style]:duration-150",
            className
          )}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Select, SelectTrigger, SelectValue, SelectPopup, SelectItem };
