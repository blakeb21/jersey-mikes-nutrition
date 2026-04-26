import { Badge } from "@/components/ui/badge"
import type { MenuItem } from "@/lib/types"

interface ItemListProps {
  items: MenuItem[]
  onSelect: (id: string) => void
}

export function ItemList({ items, onSelect }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-sm text-muted-foreground">
        No items found
      </div>
    )
  }

  return (
    <div className="divide-y">
      {items.map((item) => {
        const calories = getCalorieRange(item)
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 active:bg-muted"
          >
            {item.number ? (
              <Badge variant="secondary" className="shrink-0 font-mono text-xs">
                {item.number}
              </Badge>
            ) : (
              <div className="w-[3.25rem]" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium tabular-nums">{calories}</p>
              <p className="text-[10px] text-muted-foreground">cal</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function getCalorieRange(item: MenuItem): string {
  const values = Object.values(item.variants).map((v) => v.calories)
  if (values.length === 0) return "—"
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (min === max) return String(min)
  return `${min}–${max}`
}
