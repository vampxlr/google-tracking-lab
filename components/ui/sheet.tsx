"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "left" | "right" | "top" | "bottom"
  }
>(({ className, side = "right", children, ...props }, ref) => {
  const sideClasses = {
    left: "left-0 top-0 bottom-0 w-72 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    right: "right-0 top-0 bottom-0 w-72 h-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    top: "top-0 left-0 right-0 h-64 w-full data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "bottom-0 left-0 right-0 h-64 w-full data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-gray-900 border border-gray-700 shadow-xl p-0",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <span className="text-sm font-semibold text-gray-200">Menu</span>
          <SheetClose className="rounded-md hover:bg-gray-800 p-1 transition-colors">
            <X className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = DialogPrimitive.Content.displayName

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
}
