"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />;
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({ className, ...props }: TooltipPrimitive.Popup.Props) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
            "data-[ending-style]:fade-out data-[starting-style]:fade-out data-[entering-style]:fade-in data-[exiting-style]:fade-in",
            "data-[ending-style]:slide-out data-[starting-style]:slide-out data-[entering-style]:slide-in data-[exiting-style]:slide-in",
            "data-[ending-style]:duration-150 data-[starting-style]:duration-150 data-[entering-style]:duration-150 data-[exiting-style]:duration-150",
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
