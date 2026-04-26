export type Size = 'mini' | 'regular' | 'giant' | 'kids'

export type BreadType =
  | 'rosemary-parmesan'
  | 'wheat-sub'
  | 'white-sub'
  | 'wheat-wrap'
  | 'white-wrap'
  | 'tub'
  | 'none'

export type Category = 'cold-subs' | 'hot-subs' | 'kids' | 'desserts'

export type MikesWayKey = 'oil' | 'vinegar' | 'lettuce' | 'tomato' | 'onions'

export interface NutritionValues {
  calories: number
  fat: number
  satFat: number
  transFat: number
  carbs: number
  fibre: number
  sugars: number
  protein: number
  cholesterol: number
  sodium: number
}

export interface MenuItem {
  id: string
  number: string
  name: string
  category: Category
  // variants keyed by `${size}-${breadType}`, e.g. "mini-rosemary-parmesan"
  variants: Record<string, NutritionValues>
}

export interface Extra {
  id: string
  name: string
  applicableSubIds: string[] // empty = all cold subs; for hot-specific extras use sub id
  nutrition: Partial<Record<Size, NutritionValues>>
}

export interface MealItem {
  key: string
  menuItem: MenuItem
  size: Size
  breadType: BreadType
  mikesWay: Record<MikesWayKey, boolean>
  extras: string[]
  nutrition: NutritionValues
}
