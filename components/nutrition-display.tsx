"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { fmt } from "@/lib/utils/nutrition"
import type { NutritionValues } from "@/lib/types"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"

interface NutritionDisplayProps {
  nutrition: NutritionValues
}

export function NutritionDisplay({ nutrition }: NutritionDisplayProps) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="space-y-3">
      {/* Calorie headline */}
      <div className="text-center">
        <span className="text-4xl font-bold tabular-nums">{nutrition.calories}</span>
        <span className="ml-1.5 text-sm text-muted-foreground">cal</span>
      </div>

      {/* Primary macros */}
      <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
        <MacroCell label="Protein" value={fmt(nutrition.protein)} unit="g" />
        <MacroCell label="Carbs" value={fmt(nutrition.carbs)} unit="g" />
        <MacroCell label="Fat" value={fmt(nutrition.fat)} unit="g" />
      </div>

      {/* Show more toggle */}
      <button
        onClick={() => setShowMore((v) => !v)}
        className="flex w-full items-center justify-between text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>Full nutrition details</span>
        {showMore ? (
          <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
        ) : (
          <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
        )}
      </button>

      {showMore && (
        <>
          <Separator />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <DetailRow label="Saturated Fat" value={fmt(nutrition.satFat)} unit="g" />
            <DetailRow label="Trans Fat" value={fmt(nutrition.transFat)} unit="g" />
            <DetailRow label="Sodium" value={fmt(nutrition.sodium, 0)} unit="mg" />
            <DetailRow label="Cholesterol" value={fmt(nutrition.cholesterol, 0)} unit="mg" />
            <DetailRow label="Fibre" value={fmt(nutrition.fibre)} unit="g" />
            <DetailRow label="Sugars" value={fmt(nutrition.sugars)} unit="g" />
          </div>
        </>
      )}
    </div>
  )
}

function MacroCell({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit: string
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-semibold tabular-nums">
        {value}
        <span className="text-xs font-normal text-muted-foreground">{unit}</span>
      </span>
    </div>
  )
}

function DetailRow({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit: string
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium tabular-nums">
        {value}
        <span className="text-muted-foreground">{unit}</span>
      </span>
    </div>
  )
}
