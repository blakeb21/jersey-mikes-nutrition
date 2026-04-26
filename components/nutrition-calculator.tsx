"use client"

import { useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ItemList } from "@/components/item-list"
import { ItemSheet } from "@/components/item-sheet"
import { MealBar } from "@/components/meal-bar"
import { MealSheet } from "@/components/meal-sheet"
import { menuItems } from "@/lib/data/nutrition"
import { capture } from "@/lib/analytics"
import type { Category, MealItem } from "@/lib/types"

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "cold-subs", label: "Cold" },
  { value: "hot-subs", label: "Hot" },
  { value: "kids", label: "Kids" },
  { value: "desserts", label: "More" },
]

export function NutritionCalculator() {
  const [activeCategory, setActiveCategory] = useState<Category>("cold-subs")
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [itemSheetOpen, setItemSheetOpen] = useState(false)
  const [mealItems, setMealItems] = useState<MealItem[]>([])
  const [mealSheetOpen, setMealSheetOpen] = useState(false)

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  function handleOpenMealSheet() {
    capture("meal_viewed", { item_count: mealItems.length, total_calories: mealItems.reduce((s, i) => s + i.nutrition.calories, 0) })
    setMealSheetOpen(true)
  }

  function handleSelectItem(id: string) {
    setSelectedItemId(id)
    setItemSheetOpen(true)
    const found = menuItems.find((m) => m.id === id)
    if (found) capture("item_viewed", { item_id: found.id, item_name: found.name, item_number: found.number, category: found.category })
  }

  function handleAddToMeal(item: MealItem) {
    setMealItems((prev) => [...prev, item])
    capture("item_added_to_meal", { item_id: item.menuItem.id, item_name: item.menuItem.name, size: item.size, bread: item.breadType, calories: item.nutrition.calories })
  }

  function handleRemoveMealItem(key: string) {
    const found = mealItems.find((i) => i.key === key)
    if (found) capture("meal_item_removed", { item_id: found.menuItem.id })
    setMealItems((prev) => prev.filter((i) => i.key !== key))
  }

  function handleClearMeal() {
    capture("meal_cleared", { item_count: mealItems.length, total_calories: mealItems.reduce((s, i) => s + i.nutrition.calories, 0) })
    setMealItems([])
    setMealSheetOpen(false)
  }

  return (
    <div className="flex h-dvh flex-col">
      {/* Header */}
      <header className="flex items-center border-b px-5 py-4">
        <div className="flex-1">
          <h1 className="text-base font-bold leading-none">
            Jersey Mike&apos;s
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nutrition Calculator
          </p>
        </div>
        {mealItems.length > 0 && (
          <button
            onClick={handleOpenMealSheet}
            className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
          >
            <span>{mealItems.length} item{mealItems.length !== 1 ? "s" : ""}</span>
            <span>·</span>
            <span>
              {mealItems.reduce((s, i) => s + i.nutrition.calories, 0)} cal
            </span>
          </button>
        )}
      </header>

      {/* Category tabs */}
      <div className="border-b">
        <Tabs
          value={activeCategory}
          onValueChange={(v) => {
            setActiveCategory(v as Category)
            capture("category_viewed", { category: v })
          }}
        >
          <TabsList className="h-auto w-full rounded-none border-0 bg-transparent p-0">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="flex-1 rounded-none border-b-2 border-transparent py-2.5 text-sm data-active:border-primary data-active:bg-transparent data-active:text-foreground data-active:shadow-none"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Item list */}
      <ScrollArea className="flex-1">
        <ItemList items={filteredItems} onSelect={handleSelectItem} />
        <footer className="border-t px-5 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Made by{" "}
            <a
              href="https://blakebarnhill.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Blake Barnhill
            </a>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Blake Barnhill. All rights reserved.
          </p>
        </footer>
      </ScrollArea>

      {/* Meal bar */}
      <MealBar
        items={mealItems}
        onOpen={handleOpenMealSheet}
        onClear={handleClearMeal}
      />

      {/* Sheets */}
      <ItemSheet
        open={itemSheetOpen}
        itemId={selectedItemId}
        onClose={() => setItemSheetOpen(false)}
        onAddToMeal={handleAddToMeal}
      />
      <MealSheet
        open={mealSheetOpen}
        items={mealItems}
        onClose={() => setMealSheetOpen(false)}
        onRemove={handleRemoveMealItem}
        onClear={handleClearMeal}
      />
    </div>
  )
}
