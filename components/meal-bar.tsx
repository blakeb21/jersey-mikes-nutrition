import { Button } from "@/components/ui/button"
import { fmt } from "@/lib/utils/nutrition"
import type { MealItem } from "@/lib/types"

interface MealBarProps {
  items: MealItem[]
  onOpen: () => void
  onClear: () => void
}

export function MealBar({ items, onOpen, onClear }: MealBarProps) {
  if (items.length === 0) return null

  const total = items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.nutrition.calories,
      protein: acc.protein + item.nutrition.protein,
      carbs: acc.carbs + item.nutrition.carbs,
      fat: acc.fat + item.nutrition.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="border-t bg-background/95 backdrop-blur-sm">
      <button
        onClick={onOpen}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex min-w-0 flex-1 items-baseline gap-2">
          <span className="text-sm font-semibold">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
          <span className="text-lg font-bold tabular-nums">
            {fmt(total.calories, 0)}
            <span className="ml-0.5 text-xs font-normal text-muted-foreground">cal</span>
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            P {fmt(total.protein, 0)}g · C {fmt(total.carbs, 0)}g · F {fmt(total.fat, 0)}g
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            P {fmt(total.protein, 0)}g · C {fmt(total.carbs, 0)}g · F {fmt(total.fat, 0)}g
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Clear
          </Button>
        </div>
      </button>
    </div>
  )
}
