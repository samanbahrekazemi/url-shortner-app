"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({ className, ...props }: MenuPrimitive.Popup.Props & { side?: "top" | "bottom"; align?: "start" | "end" }) {
  const { side = "bottom", align = "end", ...popupProps } = props;
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} align={align} className="z-50">
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[ending-style]:fade-out data-[starting-style]:fade-out data-[entering-style]:fade-in data-[exiting-style]:fade-in",
            "data-[ending-style]:zoom-out data-[starting-style]:zoom-out data-[entering-style]:zoom-in data-[exiting-style]:zoom-in",
            "data-[ending-style]:duration-150 data-[starting-style]:duration-150 data-[entering-style]:duration-150 data-[exiting-style]:duration-150",
            className
          )}
          {...popupProps}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
