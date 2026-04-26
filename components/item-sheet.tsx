"use client"

import { useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NutritionDisplay } from "@/components/nutrition-display"
import { extras, menuItems, MIKES_WAY_COMPONENTS } from "@/lib/data/nutrition"
import { computeItemNutrition } from "@/lib/utils/nutrition"
import type { BreadType, MealItem, MenuItem, MikesWayKey, Size } from "@/lib/types"
import { cn } from "@/lib/utils"
import { capture } from "@/lib/analytics"

const ALL_MIKES_WAY_ON: Record<MikesWayKey, boolean> = {
  oil: true, vinegar: true, lettuce: true, tomato: true, onions: true,
}

const MIKES_WAY_LABELS: Record<MikesWayKey, string> = {
  oil: "Oil",
  vinegar: "Vinegar",
  lettuce: "Lettuce",
  tomato: "Tomato",
  onions: "Onions",
}

const BREAD_LABELS: Record<BreadType, string> = {
  "rosemary-parmesan": "Rosemary Parm",
  "wheat-sub": "Wheat",
  "white-sub": "White",
  "wheat-wrap": "Wheat Wrap",
  "white-wrap": "White Wrap",
  tub: "No Bread",
  none: "—",
}

const SIZE_LABELS: Record<Size, string> = {
  mini: "Mini",
  regular: "Regular",
  giant: "Giant",
  kids: "Kids",
}

interface ItemSheetProps {
  open: boolean
  itemId: string | null
  onClose: () => void
  onAddToMeal: (item: MealItem) => void
}

export function ItemSheet({ open, itemId, onClose, onAddToMeal }: ItemSheetProps) {
  const item = useMemo(
    () => (itemId ? menuItems.find((m) => m.id === itemId) ?? null : null),
    [itemId]
  )

  const availableSizes = useMemo<Size[]>(() => {
    if (!item) return []
    const sizes = new Set<Size>()
    for (const key of Object.keys(item.variants)) {
      sizes.add(key.split("-")[0] as Size)
    }
    const order: Size[] = ["mini", "regular", "giant", "kids"]
    return order.filter((s) => sizes.has(s))
  }, [item])

  const [selectedSize, setSelectedSize] = useState<Size>("regular")
  const [selectedBread, setSelectedBread] = useState<BreadType>("white-sub")
  const [mikesWay, setMikesWay] = useState<Record<MikesWayKey, boolean>>(ALL_MIKES_WAY_ON)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [lastItemId, setLastItemId] = useState<string | null>(null)

  // Reset state when item changes (avoid setState-in-effect by comparing ids)
  if (item && item.id !== lastItemId) {
    setLastItemId(item.id)
    const defaultSize: Size = availableSizes[0] ?? "regular"
    setSelectedSize(defaultSize)
    setSelectedBread(getAvailableBreads(item, defaultSize)[0] ?? "white-sub")
    setMikesWay({ ...ALL_MIKES_WAY_ON })
    setSelectedExtras([])
  }

  const availableBreads = useMemo<BreadType[]>(() => {
    if (!item) return []
    return getAvailableBreads(item, selectedSize)
  }, [item, selectedSize])

  const applicableExtras = useMemo(() => {
    if (!item) return []
    return extras.filter(
      (e) =>
        e.nutrition[selectedSize] !== undefined &&
        (e.applicableSubIds.length === 0 ||
          e.applicableSubIds.includes(item.id))
    )
  }, [item, selectedSize])

  const nutrition = useMemo(() => {
    if (!item) return null
    const variantKey = `${selectedSize}-${selectedBread}`
    const base = item.variants[variantKey]
    if (!base) return null
    const extraNutritions = selectedExtras
      .map((id) => extras.find((e) => e.id === id)?.nutrition[selectedSize])
      .filter((n): n is NonNullable<typeof n> => n !== undefined)
    return computeItemNutrition(base, selectedSize, item.category, mikesWay, extraNutritions)
  }, [item, selectedSize, selectedBread, mikesWay, selectedExtras])

  if (!item) return null

  const isColdSub = item.category === "cold-subs"

  function handleAddToMeal() {
    if (!item || !nutrition) return
    const mealItem: MealItem = {
      key: `${item.id}-${Date.now()}`,
      menuItem: item,
      size: selectedSize,
      breadType: selectedBread,
      mikesWay: { ...mikesWay },
      extras: [...selectedExtras],
      nutrition,
    }
    onAddToMeal(mealItem)
    onClose()
  }

  function toggleExtra(id: string) {
    const extraObj = extras.find((e) => e.id === id)
    capture("extra_toggled", { item_id: item!.id, extra_id: id, extra_name: extraObj?.name ?? id, added: !selectedExtras.includes(id) })
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  function toggleMikesWay(key: MikesWayKey) {
    capture("mikes_way_toggled", { item_id: item!.id, component: key, enabled: !mikesWay[key] })
    setMikesWay((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[85dvh] rounded-t-2xl p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-5 py-4">
            <div className="flex items-start gap-2">
              {item.number && (
                <span className="mt-0.5 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-primary-foreground">
                  {item.number}
                </span>
              )}
              <SheetTitle className="text-left text-base leading-snug">
                {item.name}
              </SheetTitle>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="space-y-5 px-5 py-4">
              {/* Size selector */}
              {availableSizes.length > 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Size
                  </label>
                  <div className="flex gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size)
                          if (item) {
                            const breads = getAvailableBreads(item, size)
                            if (!breads.includes(selectedBread)) {
                              setSelectedBread(breads[0] ?? "white-sub")
                            }
                          }
                          capture("size_changed", { item_id: item.id, size })
                        }}
                        className={cn(
                          "flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-muted"
                        )}
                      >
                        {SIZE_LABELS[size]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bread selector — hidden for items with no bread choice (e.g. desserts) */}
              {!(availableBreads.length === 1 && availableBreads[0] === "none") && (
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Bread
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableBreads.map((bread) => (
                    <button
                      key={bread}
                      onClick={() => {
                        setSelectedBread(bread)
                        capture("bread_changed", { item_id: item.id, bread })
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        selectedBread === bread
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      )}
                    >
                      {BREAD_LABELS[bread]}
                    </button>
                  ))}
                </div>
              </div>
              )}

              <Separator />

              {/* Nutrition display */}
              {nutrition && <NutritionDisplay nutrition={nutrition} />}

              {/* Mike's Way toggles (cold subs only) */}
              {isColdSub && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {"Mike's Way"}
                    </label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
                      {(Object.keys(MIKES_WAY_COMPONENTS) as MikesWayKey[]).map((key) => (
                        <label
                          key={key}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Checkbox
                            checked={mikesWay[key]}
                            onCheckedChange={() => toggleMikesWay(key)}
                          />
                          <span className="text-sm">{MIKES_WAY_LABELS[key]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Extras */}
              {applicableExtras.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Extras
                    </label>
                    <div className="space-y-2.5">
                      {applicableExtras.map((extra) => {
                        const extraNutrition = extra.nutrition[selectedSize]
                        return (
                          <label
                            key={extra.id}
                            className="flex cursor-pointer items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={selectedExtras.includes(extra.id)}
                                onCheckedChange={() => toggleExtra(extra.id)}
                              />
                              <span className="text-sm">{extra.name}</span>
                            </div>
                            {extraNutrition && (
                              <span className="text-xs text-muted-foreground">
                                +{extraNutrition.calories} cal
                              </span>
                            )}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Bottom padding for the sticky button */}
              <div className="h-4" />
            </div>
          </ScrollArea>

          {/* Add to meal button */}
          <div className="border-t bg-background px-5 py-4">
            <Button className="w-full" size="lg" onClick={handleAddToMeal}>
              Add to Meal
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function getAvailableBreads(item: MenuItem, size: Size): BreadType[] {
  const order: BreadType[] = [
    "white-sub",
    "wheat-sub",
    "rosemary-parmesan",
    "wheat-wrap",
    "white-wrap",
    "tub",
    "none",
  ]
  const available = new Set<BreadType>()
  const prefix = `${size}-`
  for (const key of Object.keys(item.variants)) {
    if (key.startsWith(prefix)) {
      available.add(key.slice(prefix.length) as BreadType)
    }
  }
  return order.filter((b) => available.has(b))
}
