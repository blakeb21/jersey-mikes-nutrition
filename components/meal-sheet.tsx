"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fmt, addNutrition, zeroNutrition } from "@/lib/utils/nutrition"
import type { MealItem } from "@/lib/types"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

const BREAD_LABELS: Record<string, string> = {
  "rosemary-parmesan": "Rosemary Parm",
  "wheat-sub": "Wheat",
  "white-sub": "White",
  "wheat-wrap": "Wheat Wrap",
  "white-wrap": "White Wrap",
  tub: "No Bread",
}

const SIZE_LABELS: Record<string, string> = {
  mini: "Mini",
  regular: "Regular",
  giant: "Giant",
  kids: "Kids",
}

interface MealSheetProps {
  open: boolean
  items: MealItem[]
  onClose: () => void
  onRemove: (key: string) => void
  onClear: () => void
}

export function MealSheet({ open, items, onClose, onRemove, onClear }: MealSheetProps) {
  const total = items.reduce(
    (acc, item) => addNutrition(acc, item.nutrition),
    zeroNutrition()
  )

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[90dvh] rounded-t-2xl p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-5 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">My Meal</SheetTitle>
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear all
                </Button>
              )}
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <p>No items added yet</p>
              <p className="text-xs">Tap any menu item to start building your meal</p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="divide-y px-5">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-start gap-3 py-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {item.menuItem.number && (
                            <span className="rounded bg-muted px-1 text-[10px] font-bold text-muted-foreground">
                              {item.menuItem.number}
                            </span>
                          )}
                          <p className="truncate text-sm font-medium">
                            {item.menuItem.name}
                          </p>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {SIZE_LABELS[item.size]} · {BREAD_LABELS[item.breadType]}
                        </p>
                        <div className="mt-1.5 flex gap-3 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground tabular-nums">
                            {fmt(item.nutrition.calories, 0)} cal
                          </span>
                          <span>P {fmt(item.nutrition.protein, 0)}g</span>
                          <span>C {fmt(item.nutrition.carbs, 0)}g</span>
                          <span>F {fmt(item.nutrition.fat, 0)}g</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(item.key)}
                        className="mt-0.5 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Total */}
              <div className="border-t px-5 py-4">
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <div className="flex items-baseline gap-3 text-right">
                    <span className="text-xs text-muted-foreground">
                      P {fmt(total.protein, 0)}g · C {fmt(total.carbs, 0)}g · F {fmt(total.fat, 0)}g
                    </span>
                    <span className="text-xl font-bold tabular-nums">
                      {fmt(total.calories, 0)}
                      <span className="ml-0.5 text-sm font-normal text-muted-foreground">cal</span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
