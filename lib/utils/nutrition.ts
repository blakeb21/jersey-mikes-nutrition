import type { Category, MikesWayKey, NutritionValues, Size } from '@/lib/types'
import { MIKES_WAY_COMPONENTS } from '@/lib/data/nutrition'

export function addNutrition(a: NutritionValues, b: NutritionValues): NutritionValues {
  return {
    calories:    a.calories    + b.calories,
    fat:         a.fat         + b.fat,
    satFat:      a.satFat      + b.satFat,
    transFat:    a.transFat    + b.transFat,
    carbs:       a.carbs       + b.carbs,
    fibre:       a.fibre       + b.fibre,
    sugars:      a.sugars      + b.sugars,
    protein:     a.protein     + b.protein,
    cholesterol: a.cholesterol + b.cholesterol,
    sodium:      a.sodium      + b.sodium,
  }
}

export function subtractNutrition(a: NutritionValues, b: Partial<NutritionValues>): NutritionValues {
  return {
    calories:    Math.max(0, a.calories    - (b.calories    ?? 0)),
    fat:         Math.max(0, a.fat         - (b.fat         ?? 0)),
    satFat:      Math.max(0, a.satFat      - (b.satFat      ?? 0)),
    transFat:    Math.max(0, a.transFat    - (b.transFat    ?? 0)),
    carbs:       Math.max(0, a.carbs       - (b.carbs       ?? 0)),
    fibre:       Math.max(0, a.fibre       - (b.fibre       ?? 0)),
    sugars:      Math.max(0, a.sugars      - (b.sugars      ?? 0)),
    protein:     Math.max(0, a.protein     - (b.protein     ?? 0)),
    cholesterol: Math.max(0, a.cholesterol - (b.cholesterol ?? 0)),
    sodium:      Math.max(0, a.sodium      - (b.sodium      ?? 0)),
  }
}

export function zeroNutrition(): NutritionValues {
  return {
    calories: 0, fat: 0, satFat: 0, transFat: 0,
    carbs: 0, fibre: 0, sugars: 0, protein: 0,
    cholesterol: 0, sodium: 0,
  }
}

export function computeItemNutrition(
  baseNutrition: NutritionValues,
  size: Size,
  category: Category,
  mikesWay: Record<MikesWayKey, boolean>,
  extraNutritions: NutritionValues[]
): NutritionValues {
  let result = { ...baseNutrition }

  // API data includes Mike's Way toppings in the base. For cold subs, SUBTRACT unchecked components.
  if (category === 'cold-subs') {
    const mwSize = (size === 'mini' || size === 'regular' || size === 'giant') ? size : null
    if (mwSize) {
      for (const [key, enabled] of Object.entries(mikesWay) as [MikesWayKey, boolean][]) {
        if (!enabled) {
          const delta = MIKES_WAY_COMPONENTS[key][mwSize]
          result = subtractNutrition(result, delta)
        }
      }
    }
  }

  for (const extra of extraNutritions) {
    result = addNutrition(result, extra)
  }

  return result
}

export function fmt(val: number, decimals = 1): string {
  return Number.isInteger(val) ? String(val) : val.toFixed(decimals)
}
