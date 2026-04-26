import type { Category, Extra, MenuItem, MikesWayKey, NutritionValues } from '@/lib/types'

// compact helper — order: calories, fat, satFat, transFat, carbs, fibre, sugars, protein, cholesterol, sodium
const n = (
  calories: number, fat: number, satFat: number, transFat: number,
  carbs: number, fibre: number, sugars: number, protein: number,
  cholesterol: number, sodium: number
): NutritionValues => ({ calories, fat, satFat, transFat, carbs, fibre, sugars, protein, cholesterol, sodium })

// ---------------------------------------------------------------------------
// Mike's Way components (per-size values from live US API)
// API data for cold subs INCLUDES Mike's Way in the default (D) ingredients.
// These values are SUBTRACTED when a toggle is unchecked.
// ---------------------------------------------------------------------------
export const MIKES_WAY_COMPONENTS: Record<MikesWayKey, Record<'mini' | 'regular' | 'giant', NutritionValues>> = {
  oil: {
    mini:    n(165, 18.5, 2,   0, 0, 0, 0, 0, 0, 0),
    regular: n(250, 28,   3.5, 0, 0, 0, 0, 0, 0, 0),
    giant:   n(500, 56,   6.5, 0, 0, 0, 0, 0, 0, 0),
  },
  vinegar: {
    mini:    n(2,  0, 0, 0, 0, 0, 0, 0, 0, 0),
    regular: n(3,  0, 0, 0, 1, 0, 0, 0, 0, 0),
    giant:   n(6,  0, 0, 0, 1, 0, 0, 0, 0, 0),
  },
  lettuce: {
    mini:    n(8,  0, 0, 0, 2, 1, 1, 1, 0, 10),
    regular: n(12, 0, 0, 0, 3, 1, 2, 1, 0, 10),
    giant:   n(20, 0, 0, 0, 4, 2, 3, 1, 0, 10),
  },
  tomato: {
    mini:    n(7,  0, 0, 0, 2, 0, 1, 0, 0, 0),
    regular: n(10, 0, 0, 0, 2, 1, 2, 1, 0, 0),
    giant:   n(17, 0, 0, 0, 4, 1, 3, 1, 0, 0),
  },
  onions: {
    mini:    n(2,  0, 0, 0, 1, 0, 0, 0, 0, 0),
    regular: n(3,  0, 0, 0, 1, 0, 0, 0, 0, 0),
    giant:   n(6,  0, 0, 0, 1, 0, 1, 0, 0, 0),
  },
}

// ---------------------------------------------------------------------------
// Menu items
// Cold-sub variants include Mike's Way toppings in the base values (per API).
// The UI subtracts unchecked Mike's Way components from the displayed total.
// ---------------------------------------------------------------------------
export const menuItems: MenuItem[] = [
  // ── COLD SUBS ────────────────────────────────────────────────────────────
  {
    id: '1', number: '#1', name: 'BLT', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(481, 27,   6,   0.25, 42, 3, 4,  19, 35,  1060),
      'mini-wheat-sub':           n(480, 27,   6,   0.25, 43, 4, 4,  19, 35,  1040),
      'mini-rosemary-parmesan':   n(469, 28,   7,   0.25, 37, 3, 4,  19, 40,  1030),
      'regular-white-sub':        n(788, 48,   10.5,0.25, 64, 4, 6,  29, 60,  1630),
      'regular-wheat-sub':        n(787, 48,   10.5,0.25, 65, 6, 7,  29, 60,  1620),
      'regular-rosemary-parmesan':n(770, 49,   11.5,0.25, 57, 4, 5,  29, 65,  1600),
      'regular-white-wrap':       n(776, 53,   14,  0.25, 55, 4, 6,  25, 60,  1510),
      'regular-wheat-wrap':       n(796, 54,   14,  0.25, 56, 8, 9,  24, 60,  1400),
      'regular-tub':              n(478, 45,   10,  0.25,  5, 2, 4,  17, 60,   940),
      'giant-white-sub':          n(1569,95.5, 20.5,0.5, 127, 8,10,  57,115,  3260),
      'giant-wheat-sub':          n(1566,95.5, 21,  0.5, 128,12,13,  57,115,  3230),
      'giant-rosemary-parmesan':  n(1532,98,   23,  0.75,112, 8,10,  57,130,  3200),
    },
  },
  {
    id: '2', number: '#2', name: "Jersey Shore's Favorite", category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(480, 24,   6,   0.25, 45, 3, 5,  22, 35,  1130),
      'mini-wheat-sub':           n(480, 24,   6,   0.25, 45, 4, 6,  23, 35,  1110),
      'mini-rosemary-parmesan':   n(468, 25,   7,   0.25, 40, 3, 5,  23, 40,  1110),
      'regular-white-sub':        n(824, 44.5, 10.5,0.25, 69, 4, 8,  39, 65,  2010),
      'regular-wheat-sub':        n(822, 44.5, 10.5,0.25, 69, 7, 9,  39, 65,  1990),
      'regular-rosemary-parmesan':n(805, 45.5, 11.5,0.5,  61, 5, 8,  39, 70,  1980),
      'regular-white-wrap':       n(805, 49.5, 14.5,0.25, 58, 4, 7,  36, 65,  1880),
      'regular-wheat-wrap':       n(825, 50.5, 14.5,0.25, 59, 8,10,  35, 65,  1770),
      'regular-tub':              n(515, 41.5, 10.5,0.25, 10, 2, 6,  28, 65,  1310),
      'giant-white-sub':          n(1554,84,   19,  0.5, 134, 8,14,  68,110,  3550),
      'giant-wheat-sub':          n(1552,84.5, 19,  0.5, 135,13,16,  69,110,  3510),
      'giant-rosemary-parmesan':  n(1518,86.5, 21,  0.75,119, 8,13,  69,120,  3480),
    },
  },
  {
    id: '3', number: '#3', name: 'American Classic', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(483, 24,   6.5, 0.25, 44, 3, 5,  23, 35,  1150),
      'mini-wheat-sub':           n(482, 24.5, 6.5, 0.25, 45, 4, 5,  23, 35,  1140),
      'mini-rosemary-parmesan':   n(471, 25,   7,   0.25, 39, 3, 4,  23, 40,  1130),
      'regular-white-sub':        n(817, 44.5, 10.5,0.25, 68, 4, 7,  38, 65,  1960),
      'regular-wheat-sub':        n(816, 44.5, 11,  0.25, 68, 7, 8,  38, 65,  1940),
      'regular-rosemary-parmesan':n(799, 45.5, 12,  0.5,  60, 5, 7,  38, 70,  1930),
      'regular-white-wrap':       n(798, 49.5, 14.5,0.25, 57, 4, 7,  35, 65,  1840),
      'regular-wheat-wrap':       n(818, 50.5, 14.5,0.25, 58, 8,10,  34, 65,  1730),
      'regular-tub':              n(508, 41.5, 10.5,0.25,  9, 2, 6,  27, 65,  1270),
      'giant-white-sub':          n(1550,84.5, 19,  0.5, 133, 8,13,  68,105,  3530),
      'giant-wheat-sub':          n(1547,84.5, 19.5,0.5, 134,13,15,  68,105,  3490),
      'giant-rosemary-parmesan':  n(1513,87,   21,  0.75,118, 8,12,  68,115,  3460),
    },
  },
  {
    id: '4', number: '#4', name: 'The Number Four', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(505, 24.5, 6.5, 0.25, 46, 3, 6,  26, 45,  1340),
      'mini-wheat-sub':           n(504, 24.5, 6.5, 0.25, 46, 4, 6,  27, 45,  1320),
      'mini-rosemary-parmesan':   n(493, 25.5, 7,   0.25, 41, 3, 6,  26, 45,  1310),
      'regular-white-sub':        n(837, 44,   10.5,0.25, 70, 4, 9,  42, 70,  2120),
      'regular-wheat-sub':        n(836, 44.5, 10.5,0.25, 70, 7,10,  42, 70,  2100),
      'regular-rosemary-parmesan':n(819, 45.5, 11.5,0.5,  62, 5, 9,  42, 75,  2090),
      'regular-white-wrap':       n(819, 49,   14,  0.25, 59, 4, 8,  38, 70,  2000),
      'regular-wheat-wrap':       n(839, 50,   14,  0.25, 60, 8,11,  37, 70,  1890),
      'regular-tub':              n(529, 41,   10,  0.25, 11, 2, 7,  30, 70,  1430),
      'giant-white-sub':          n(1585,84,   18.5,0.5, 137, 8,16,  74,115,  3800),
      'giant-wheat-sub':          n(1583,84,   18.5,0.5, 137,13,18,  74,115,  3760),
      'giant-rosemary-parmesan':  n(1549,86.5, 20.5,0.75,121, 8,15,  74,125,  3740),
    },
  },
  {
    // #5 Super Sub — base values from US PDF + full Mike's Way added for consistency
    id: '5', number: '#5', name: 'Super Sub', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(609, 28.5, 7,   0,    63, 3, 7,  28, 50,  1310),
      'mini-wheat-sub':           n(639, 31.5, 7.5, 0,    61, 5, 9,  28, 50,  1270),
      'regular-white-sub':        n(858, 47,   12,  0,    75, 6,13,  42, 85,  1810),
      'regular-wheat-sub':        n(858, 47,   11.5,0,    74, 7,15,  42, 85,  1810),
      'regular-tub':              n(568, 42,   10.5,0,    20, 4, 9,  31, 85,  1160),
      'giant-white-sub':          n(1729,83,   19.5,0.5, 170,10,23,  76,140,  3680),
      'giant-wheat-sub':          n(1619,89,   20.5,0.5, 143,14,27,  72,140,  3290),
    },
  },
  {
    id: '6', number: '#6', name: 'Roast Beef & Provolone', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(563, 26,   7,   0.25, 43, 3, 4,  38, 75,   880),
      'mini-wheat-sub':           n(562, 26,   7,   0.25, 44, 4, 4,  38, 75,   860),
      'mini-rosemary-parmesan':   n(551, 27,   7.5, 0.25, 38, 3, 3,  38, 80,   850),
      'regular-white-sub':        n(913, 46,   11,  0.5,  66, 4, 5,  57,115,  1320),
      'regular-wheat-sub':        n(912, 46.5, 11.5,0.5,  66, 7, 6,  57,115,  1310),
      'regular-rosemary-parmesan':n(895, 47.5, 12.5,0.5,  58, 5, 5,  57,120,  1290),
      'regular-white-wrap':       n(895, 51.5, 15,  0.5,  55, 4, 5,  53,115,  1200),
      'regular-wheat-wrap':       n(915, 52.5, 15,  0.5,  56, 8, 8,  52,115,  1090),
      'regular-tub':              n(605, 43.5, 11,  0.5,   7, 2, 4,  45,115,   630),
      'giant-white-sub':          n(1776,89.5, 20.5,0.75,130, 8, 9, 110,225,  2550),
      'giant-wheat-sub':          n(1774,89.5, 21,  0.75,130,13,12, 111,225,  2520),
      'giant-rosemary-parmesan':  n(1740,92,   23,  0.75,114, 8, 9, 111,235,  2490),
    },
  },
  {
    id: '7', number: '#7', name: 'Turkey Breast & Provolone', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(482, 22.5, 5.5, 0.25, 44, 3, 4,  26, 40,  1150),
      'mini-wheat-sub':           n(481, 23,   5.5, 0.25, 44, 4, 5,  26, 40,  1140),
      'mini-rosemary-parmesan':   n(470, 23.5, 6.5, 0.25, 39, 3, 4,  26, 45,  1130),
      'regular-white-sub':        n(817, 41.5, 9,   0.25, 66, 4, 6,  45, 75,  1980),
      'regular-wheat-sub':        n(816, 41.5, 9.5, 0.25, 67, 7, 7,  46, 75,  1960),
      'regular-rosemary-parmesan':n(799, 42.5, 10.5,0.5,  59, 5, 6,  46, 80,  1940),
      'regular-white-wrap':       n(780, 46.5, 13,  0.25, 56, 4, 5,  38, 65,  1700),
      'regular-wheat-wrap':       n(800, 47.5, 13,  0.25, 57, 8, 8,  37, 65,  1590),
      'regular-tub':              n(490, 38.5, 9,   0.25,  8, 2, 4,  30, 65,  1130),
      'giant-white-sub':          n(1550,79.5, 16.5,0.5, 131, 8,11,  80,125,  3550),
      'giant-wheat-sub':          n(1548,79.5, 16.5,0.5, 131,13,13,  80,125,  3510),
      'giant-rosemary-parmesan':  n(1514,82,   18.5,0.75,115, 8,10,  80,135,  3490),
    },
  },
  {
    id: '8', number: '#8', name: 'Club Sub', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(665, 41,   9,   0.5,  45, 3, 5,  31, 60,  1530),
      'mini-wheat-sub':           n(664, 41,   9.5, 0.5,  45, 4, 6,  31, 60,  1520),
      'mini-rosemary-parmesan':   n(653, 42,   10,  0.5,  40, 3, 5,  31, 65,  1510),
      'regular-white-sub':        n(1163,78,   16.5,0.75, 68, 4, 8,  50,105,  2560),
      'regular-wheat-sub':        n(1162,78,   16.5,0.75, 69, 7, 9,  50,105,  2550),
      'regular-rosemary-parmesan':n(1145,79,   17.5,0.75, 61, 5, 8,  50,110,  2530),
      'regular-white-wrap':       n(1126,82,   20,  0.5,  57, 4, 7,  44,100,  2280),
      'regular-wheat-wrap':       n(1146,83,   20,  0.5,  58, 8,10,  43,100,  2170),
      'regular-tub':              n(836, 74,   16,  0.5,   9, 2, 6,  36,100,  1710),
      'giant-white-sub':          n(2221,151,  30.5,1.25,134, 8,14,  87,180,  4550),
      'giant-wheat-sub':          n(2218,151,  30.5,1.25,134,13,16,  88,180,  4510),
      'giant-rosemary-parmesan':  n(2185,153.5,32.5,1.25,118, 8,13,  88,190,  4490),
    },
  },
  {
    id: '9', number: '#9', name: 'Club Supreme', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(685, 40.5, 9,   0.25, 44, 3, 4,  36, 80,  1170),
      'mini-wheat-sub':           n(684, 41,   9,   0.25, 44, 4, 5,  36, 80,  1160),
      'mini-rosemary-parmesan':   n(673, 41.5, 9.5, 0.25, 39, 3, 4,  36, 80,  1150),
      'regular-white-sub':        n(1191,76.5, 15.5,0.5,  67, 4, 6,  59,130,  2050),
      'regular-wheat-sub':        n(1190,77,   15.5,0.5,  67, 7, 8,  60,130,  2030),
      'regular-rosemary-parmesan':n(1173,78,   16.5,0.5,  59, 5, 6,  60,140,  2020),
      'regular-white-wrap':       n(1172,82,   19.5,0.5,  56, 4, 6,  56,130,  1930),
      'regular-wheat-wrap':       n(1192,83,   19.5,0.5,  57, 8, 9,  55,130,  1820),
      'regular-tub':              n(882, 74,   15.5,0.5,   8, 2, 5,  48,130,  1360),
      'giant-white-sub':          n(2267,149.5,29.5,0.75,131, 8,11, 101,225,  3690),
      'giant-wheat-sub':          n(2264,149.5,29.5,0.75,132,13,14, 102,225,  3650),
      'giant-rosemary-parmesan':  n(2231,152,  31.5,1,   116, 8,11, 102,235,  3630),
    },
  },
  {
    id: '10', number: '#10', name: 'Tuna Fish', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(628, 42,   6,   0.25, 44, 3, 4,  20, 35,   850),
      'mini-wheat-sub':           n(627, 42,   6,   0.25, 44, 5, 5,  21, 35,   840),
      'mini-rosemary-parmesan':   n(616, 42.5, 6.5, 0.25, 39, 3, 4,  21, 35,   830),
      'regular-white-sub':        n(1062,74.5, 10.5,0.5,  67, 5, 6,  33, 55,  1350),
      'regular-wheat-sub':        n(1061,75,   10.5,0.5,  67, 7, 8,  33, 55,  1330),
      'regular-rosemary-parmesan':n(1044,76,   11.5,0.5,  59, 5, 6,  33, 60,  1320),
      'regular-white-wrap':       n(1043,80,   14,  0.5,  56, 4, 6,  29, 55,  1220),
      'regular-wheat-wrap':       n(1063,81,   14,  0.5,  57, 8, 9,  28, 55,  1110),
      'regular-tub':              n(753, 72,   10,  0.5,   8, 2, 5,  21, 55,   650),
      'giant-white-sub':          n(2029,141.5,19.5,0.75,132, 9,11,  62,100,  2580),
      'giant-wheat-sub':          n(2027,141.5,20,  0.75,132,14,14,  63,100,  2550),
      'giant-rosemary-parmesan':  n(1993,144,  22,  0.75,116, 9,11,  62,115,  2520),
    },
  },
  {
    // #11 Roast Beef — base values from US PDF + full Mike's Way added for consistency
    id: '11', number: '#11', name: 'Roast Beef', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(584, 29.5, 7.5, 0,    61, 3, 7,  22, 30,  1150),
      'mini-wheat-sub':           n(619, 32.5, 7.5, 0,    59, 5, 9,  22, 30,  1110),
      'regular-white-sub':        n(908, 53,   14,  0,    74, 6,12,  40, 70,  2090),
      'regular-wheat-sub':        n(908, 53,   13.5,0,    73, 7,15,  40, 70,  2090),
      'regular-tub':              n(618, 49,   12.5,0,    18, 4, 9,  29, 70,  1430),
      'giant-white-sub':          n(1799,94,   23.5,0.5, 170,10,22,  72,115,  4110),
      'giant-wheat-sub':          n(1699,99,   24.5,0.5, 140,14,26,  68,115,  3710),
    },
  },
  {
    // #12 Cancro Special — base values from US PDF + full Mike's Way added for consistency
    id: '12', number: '#12', name: 'Cancro Special', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(719, 34.5, 9.5, 0.5,  60, 3, 7,  42, 80,   860),
      'mini-wheat-sub':           n(749, 38.5, 9.5, 0,    58, 5, 9,  43, 80,   830),
      'regular-white-sub':        n(1038,55,   15,  1,    72, 6,12,  67,135,   980),
      'regular-wheat-sub':        n(1028,56,   14.5,1,    73, 7,15,  67,135,   980),
      'regular-tub':              n(738, 51,   13.5,1,    16, 4, 9,  56,135,   330),
      'giant-white-sub':          n(2029,100,  25.5,1.5, 167,10,22, 115,225,  2390),
      'giant-wheat-sub':          n(1919,106,  27.5,1.5, 137,14,26, 111,225,  2000),
    },
  },
  {
    id: '13', number: '#13', name: 'The Original Italian', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(574, 30.5, 8.5, 0.25, 46, 3, 6,  29, 55,  1600),
      'mini-wheat-sub':           n(573, 30.5, 8.5, 0.25, 47, 4, 7,  29, 55,  1590),
      'mini-rosemary-parmesan':   n(562, 31.5, 9,   0.25, 41, 3, 6,  29, 60,  1580),
      'regular-white-sub':        n(956, 54.5, 14,  0.25, 71, 4,10,  47, 90,  2570),
      'regular-wheat-sub':        n(955, 54.5, 14.5,0.25, 71, 7,11,  47, 90,  2550),
      'regular-rosemary-parmesan':n(938, 56,   15.5,0.5,  63, 5,10,  47,100,  2540),
      'regular-white-wrap':       n(937, 59.5, 18,  0.25, 60, 4, 9,  43, 90,  2450),
      'regular-wheat-wrap':       n(957, 60.5, 18,  0.25, 61, 8,12,  42, 90,  2340),
      'regular-tub':              n(647, 51.5, 14,  0.25, 12, 2, 8,  35, 90,  1880),
      'giant-white-sub':          n(1816,104,  26,  0.5, 139, 8,18,  84,160,  4680),
      'giant-wheat-sub':          n(1813,104.5,26,  0.5, 139,13,20,  84,160,  4640),
      'giant-rosemary-parmesan':  n(1779,107,  28,  0.75,123, 9,17,  84,175,  4620),
    },
  },
  {
    id: '14', number: '#14', name: 'The Veggie', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(568, 32.5, 12,  0.5,  45, 3, 4,  24, 50,   830),
      'mini-wheat-sub':           n(567, 32.5, 12,  0.5,  45, 5, 5,  25, 50,   820),
      'mini-rosemary-parmesan':   n(556, 33.5, 12.5,0.5,  40, 3, 4,  25, 55,   810),
      'regular-white-sub':        n(954, 58.5, 20,  0.75, 69, 5, 6,  39, 80,  1310),
      'regular-wheat-sub':        n(952, 58.5, 20.5,0.75, 69, 7, 7,  40, 80,  1290),
      'regular-rosemary-parmesan':n(935, 60,   21.5,0.75, 61, 5, 6,  40, 85,  1280),
      'regular-white-wrap':       n(935, 63.5, 24,  0.75, 58, 5, 5,  36, 80,  1190),
      'regular-wheat-wrap':       n(955, 64.5, 24,  0.75, 59, 9, 8,  35, 80,  1080),
      'regular-tub':              n(645, 55.5, 20,  0.75, 10, 3, 4,  28, 80,   620),
      'giant-white-sub':          n(1896,117,  40.5,1.5, 135, 9,11,  78,165,  2620),
      'giant-wheat-sub':          n(1894,117.5,40.5,1.5, 136,14,13,  79,165,  2580),
      'giant-rosemary-parmesan':  n(1860,120,  42.5,1.5, 120, 9,10,  79,175,  2550),
    },
  },
  {
    id: 'chicken-salad', number: '', name: 'Chicken Salad', category: 'cold-subs' as Category,
    variants: {
      'mini-white-sub':           n(692, 48.5, 7,   0.25, 45, 3, 4,  21, 50,   720),
      'mini-wheat-sub':           n(691, 48.5, 7.5, 0.25, 45, 5, 5,  21, 50,   710),
      'mini-rosemary-parmesan':   n(680, 49.5, 8,   0.25, 40, 3, 4,  21, 55,   700),
      'regular-white-sub':        n(1170,86,   12.5,0.5,  68, 5, 7,  34, 90,  1130),
      'regular-wheat-sub':        n(1169,86,   13,  0.5,  68, 7, 8,  34, 90,  1110),
      'regular-rosemary-parmesan':n(1152,87.5, 14,  0.5,  60, 5, 6,  34, 95,  1100),
      'regular-white-wrap':       n(1152,91,   16.5,0.5,  57, 4, 6,  30, 90,  1000),
      'regular-wheat-wrap':       n(1172,92,   16.5,0.5,  58, 8, 9,  29, 90,   890),
      'regular-tub':              n(862, 83,   12.5,0.5,   9, 2, 5,  22, 90,   430),
      'giant-white-sub':          n(2226,162,  24,  1,   133, 9,12,  64,160,  2190),
      'giant-wheat-sub':          n(2224,162.5,24,  1,   134,14,14,  64,160,  2150),
      'giant-rosemary-parmesan':  n(2190,165,  26,  1,   118, 9,11,  64,175,  2120),
    },
  },

  // ── HOT SUBS ─────────────────────────────────────────────────────────────
  {
    id: '15', number: '#15', name: 'Meatball & Cheese', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(825, 39,   16,  0.5,  79, 4,11,  38, 85,  2010),
      'regular-wheat-sub':        n(824, 39,   16.5,0.5,  80, 7,12,  39, 85,  1990),
      'regular-rosemary-parmesan':n(807, 40,   17,  0.5,  72, 4,11,  39, 90,  1980),
      'giant-white-sub':          n(1601,74,   30,  0.5, 158, 8,22,  73,155,  3910),
      'giant-wheat-sub':          n(1599,74.5, 30.5,0.5, 159,13,25,  74,155,  3870),
      'giant-rosemary-parmesan':  n(1565,76.5, 32.5,0.75,143, 9,22,  73,165,  3840),
    },
  },
  {
    id: '17-steak', number: '#17', name: 'Steak Philly', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(748, 30.5, 14.5,0.75, 74, 3,10,  46,120,  2160),
      'regular-wheat-sub':        n(747, 30.5, 14.5,0.75, 74, 6,11,  46,120,  2150),
      'regular-rosemary-parmesan':n(730, 31.5, 15.5,0.75, 66, 3, 9,  46,125,  2130),
      'giant-white-sub':          n(1497,60.5, 29,  1.5, 148, 6,19,  92,240,  4330),
      'giant-wheat-sub':          n(1494,61,   29,  1.5, 149,11,22,  92,240,  4290),
      'giant-rosemary-parmesan':  n(1460,63.5, 31,  1.75,133, 7,19,  92,250,  4270),
    },
  },
  {
    id: '17-chicken', number: '#17', name: 'Chicken Philly', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(684, 21.5, 10,  0.25, 73, 3,11,  48,135,  2190),
      'regular-wheat-sub':        n(683, 22,   10,  0.25, 73, 6,12,  49,135,  2170),
      'regular-rosemary-parmesan':n(666, 23,   11,  0.25, 65, 3,10,  49,140,  2160),
      'giant-white-sub':          n(1368,43.5, 20,  0.5, 146, 6,21,  97,270,  4380),
      'giant-wheat-sub':          n(1365,43.5, 20,  0.5, 147,11,24,  97,270,  4340),
      'giant-rosemary-parmesan':  n(1331,46,   22,  0.5, 131, 7,21,  97,280,  4310),
    },
  },
  {
    id: '18-grilled-chicken', number: '#18', name: 'Grilled Chicken', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(760, 37,   6,   0.25, 64, 4, 6,  44, 90,  1310),
      'regular-wheat-sub':        n(759, 37.5, 6,   0.25, 65, 6, 7,  45, 90,  1290),
      'regular-rosemary-parmesan':n(742, 38.5, 7,   0.25, 57, 4, 6,  45, 95,  1280),
      'giant-white-sub':          n(1513,74.5, 11.5,0.5, 127, 7,11,  88,185,  2610),
      'giant-wheat-sub':          n(1511,74.5, 11.5,0.5, 128,12,13,  89,185,  2580),
      'giant-rosemary-parmesan':  n(1477,77,   13.5,0.75,112, 7,11,  89,195,  2550),
    },
  },
  {
    id: '18-chicken-parm', number: '#18', name: 'Chicken Parmesan', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(725, 21.5, 8,   0.25, 83, 5,10,  48, 80,  1930),
      'regular-wheat-sub':        n(723, 21.5, 8,   0.25, 84, 8,11,  49, 80,  1910),
      'regular-rosemary-parmesan':n(706, 23,   9,   0.5,  76, 5,10,  49, 85,  1890),
      'giant-white-sub':          n(1409,40,   13.5,0.5, 166,10,20,  94,155,  3760),
      'giant-wheat-sub':          n(1406,40.5, 14,  0.5, 167,15,22,  94,155,  3720),
      'giant-rosemary-parmesan':  n(1373,43,   16,  0.75,151,11,19,  94,165,  3700),
    },
  },
  {
    id: '19', number: '#19', name: 'BBQ Beef', category: 'hot-subs' as Category,
    variants: {
      'regular-wheat-sub': n(710, 16, 5,   0,   83, 4,23,  59,110,  1520),
      'regular-white-sub': n(720, 16, 5.5, 0.5, 84, 3,20,  59,110,  1520),
      'giant-wheat-sub':   n(1280,29, 10,  1.5,155,  8,37,101,185,  2680),
      'giant-white-sub':   n(1390,23, 9,   1,  186,  4,33,105,185,  2070),
    },
  },
  {
    id: '20-pastrami', number: '#20', name: 'Pastrami & Swiss', category: 'hot-subs' as Category,
    variants: {
      'regular-wheat-sub': n(580, 18, 8,   0.5, 60, 3, 8,  45, 95,  2660),
      'regular-white-sub': n(590, 17, 8.5, 0.5, 61, 2, 6,  45, 95,  2660),
      'giant-wheat-sub':   n(1220,42, 21,  1.5,121,  6,16, 88,195,  4760),
      'giant-white-sub':   n(1330,36, 20,  1.5,151,  3,11, 92,195,  5150),
    },
  },
  {
    id: '20-reuben', number: '#20', name: 'Reuben', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(721, 30,   8,   0,    74, 5, 9,  42,100,  1910),
      'regular-wheat-sub':        n(720, 30,   8.5, 0,    75, 8,10,  42,100,  1900),
      'regular-rosemary-parmesan':n(703, 31,   9.5, 0.25, 67, 6, 9,  42,105,  1880),
      'giant-white-sub':          n(1381,53.5, 15.5,0.25,147,11,16,  83,195,  3730),
      'giant-wheat-sub':          n(1379,53.5, 15.5,0.25,147,16,19,  84,195,  3690),
      'giant-rosemary-parmesan':  n(1345,56,   17.5,0.25,131,11,16,  84,205,  3660),
    },
  },
  {
    id: '43-chipotle-steak', number: '#43', name: 'Chipotle Steak', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(1038,62,   19.5,1,    76, 3,11,  46,145,  2520),
      'regular-wheat-sub':        n(1036,62,   19.5,1,    76, 6,12,  47,145,  2510),
      'regular-rosemary-parmesan':n(1020,63.5, 20.5,1,    68, 3,11,  47,150,  2490),
      'giant-white-sub':          n(2076,124,  38.5,2,   151, 7,22,  93,290,  5050),
      'giant-wheat-sub':          n(2073,124.5,39,  2,   152,11,24,  93,290,  5010),
      'giant-rosemary-parmesan':  n(2039,127,  41,  2,   136, 7,21,  93,300,  4990),
    },
  },
  {
    id: '43-chipotle-chicken', number: '#43', name: 'Chipotle Chicken', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(973, 53.5, 15,  0.5,  75, 3,12,  49,160,  2550),
      'regular-wheat-sub':        n(972, 53.5, 15,  0.5,  75, 6,13,  49,160,  2530),
      'regular-rosemary-parmesan':n(955, 55,   16,  0.5,  67, 3,12,  49,165,  2520),
      'giant-white-sub':          n(1947,107,  29.5,1,   149, 7,24,  98,315,  5090),
      'giant-wheat-sub':          n(1944,107,  30,  1,   150,11,26,  98,315,  5060),
      'giant-rosemary-parmesan':  n(1910,109.5,32,  1,   134, 7,23,  98,330,  5030),
    },
  },
  {
    id: '56-big-kahuna', number: '#56', name: 'Big Kahuna Beef', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(803, 34.5, 17,  0.75, 76, 4,11,  49,135,  2720),
      'regular-wheat-sub':        n(802, 35,   17,  0.75, 76, 6,12,  49,135,  2700),
      'regular-rosemary-parmesan':n(785, 36,   18,  1,    68, 4,10,  49,140,  2690),
      'giant-white-sub':          n(1609,69.5, 34,  1.75,152, 7,21,  97,265,  5440),
      'giant-wheat-sub':          n(1606,70,   34.5,1.75,152,12,24,  98,265,  5400),
      'giant-rosemary-parmesan':  n(1572,72,   36.5,1.75,137, 8,21,  98,280,  5370),
    },
  },
  {
    id: '56-big-kahuna-chicken', number: '#56', name: 'Big Kahuna Chicken', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(741, 26,   12.5,0.25, 75, 4,12,  51,150,  2740),
      'regular-wheat-sub':        n(740, 26,   12.5,0.25, 76, 6,13,  51,150,  2720),
      'regular-rosemary-parmesan':n(723, 27.5, 13.5,0.5,  68, 4,12,  51,155,  2710),
      'giant-white-sub':          n(1483,52,   25.5,0.75,150, 7,24, 102,295,  5480),
      'giant-wheat-sub':          n(1480,52.5, 25.5,0.75,151,12,26, 103,295,  5450),
      'giant-rosemary-parmesan':  n(1446,55,   27.5,0.75,135, 8,23, 103,305,  5420),
    },
  },
  {
    id: 'chipotle-turkey', number: '', name: 'Chipotle Turkey', category: 'hot-subs' as Category,
    variants: {
      'regular-wheat-sub': n(865, 50, 14,  0.5, 67, 6,10,  44, 95,  2140),
      'regular-white-sub': n(870, 50, 14.5,0.5, 67, 4, 8,  44, 95,  2140),
      'giant-wheat-sub':   n(1630,94, 25,  1.5,132, 11,19, 78,160,  4030),
      'giant-white-sub':   n(1730,88, 24,  1,  163,  7,15, 82,160,  4400),
    },
  },
  {
    id: 'sausage', number: '', name: 'Sausage', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(384, 3,    0.5, 0,    75, 4,14,  13,  0,  1300),
      'regular-wheat-sub':        n(382, 3.5,  0.5, 0,    75, 7,15,  13,  0,  1280),
      'regular-rosemary-parmesan':n(365, 4.5,  1.5, 0,    67, 4,14,  13,  5,  1270),
      'giant-white-sub':          n(767, 6.5,  0.5, 0,   150, 8,28,  26,  0,  2600),
      'giant-wheat-sub':          n(765, 6.5,  1,   0,   151,13,30,  27,  0,  2560),
      'giant-rosemary-parmesan':  n(731, 9,    3,   0.25,135, 9,27,  26, 10,  2540),
    },
  },
  {
    id: 'teriyaki-chicken-steak', number: '', name: 'Teriyaki Chicken Cheese Steak', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(684, 21.5, 10,  0.25, 73, 3,11,  48,135,  2190),
      'regular-wheat-sub':        n(683, 22,   10,  0.25, 73, 6,12,  49,135,  2170),
      'regular-rosemary-parmesan':n(666, 23,   11,  0.25, 65, 3,10,  49,140,  2160),
      'giant-white-sub':          n(1368,43.5, 20,  0.5, 146, 6,21,  97,270,  4380),
      'giant-wheat-sub':          n(1365,43.5, 20,  0.5, 147,11,24,  97,270,  4340),
      'giant-rosemary-parmesan':  n(1331,46,   22,  0.5, 131, 7,21,  97,280,  4310),
    },
  },
  {
    id: 'buffalo-chicken-steak', number: '', name: 'Buffalo Chicken Cheese Steak', category: 'hot-subs' as Category,
    variants: {
      'regular-white-sub':        n(1044,59,   17,  0.25, 77, 5,11,  51,170,  4280),
      'regular-wheat-sub':        n(1043,59.5, 17,  0.25, 77, 7,13,  52,170,  4270),
      'regular-rosemary-parmesan':n(1026,60.5, 18,  0.25, 69, 5,11,  52,175,  4250),
      'giant-white-sub':          n(1944,103.5,31.5,0.5, 151,10,21, 102,325,  8200),
      'giant-wheat-sub':          n(1942,104,  31.5,0.5, 151,14,24, 102,325,  8160),
      'giant-rosemary-parmesan':  n(1908,106.5,33.5,0.75,135,10,21, 102,335,  8140),
    },
  },
  {
    id: 'california-steak', number: '', name: 'California Cheese Steak', category: 'hot-subs' as Category,
    variants: {
      'regular-wheat-sub': n(870, 51, 15,  0.5, 65, 5,12,  42,140,  1920),
      'regular-white-sub': n(880, 51, 15.5,1,   66, 4,10,  42,140,  1920),
      'giant-wheat-sub':   n(1740,103,32,  2,  130, 10,23, 82,280,  3800),
      'giant-white-sub':   n(1850,97, 31,  1.5,160,  6,19, 86,280,  4200),
    },
  },
  {
    id: 'california-chicken-steak', number: '', name: 'California Chicken Cheese Steak', category: 'hot-subs' as Category,
    variants: {
      'regular-wheat-sub': n(890, 53, 18,  0,   67, 5,14,  40,190,  1940),
      'regular-white-sub': n(890, 52, 17.5,0.5, 67, 4,12,  38,190,  1940),
      'giant-wheat-sub':   n(1770,105,36,  1.5,132, 10,26, 80,380,  3870),
      'giant-white-sub':   n(1870,100,35,  1,  163,  6,22, 77,380,  4250),
    },
  },

  // ── KIDS ─────────────────────────────────────────────────────────────────
  {
    id: 'kids-3', number: '#3', name: 'American Classic', category: 'kids' as Category,
    variants: {
      'kids-white-sub': n(240, 4.5, 2.5, 1, 37, 2, 2, 13, 25, 785),
      'kids-wheat-sub': n(220, 6.5, 8.5, 1, 30, 3, 3, 10, 25, 690),
    },
  },
  {
    id: 'kids-7', number: '#7', name: 'Turkey Breast & Provolone', category: 'kids' as Category,
    variants: {
      'kids-white-sub': n(250, 4.5, 2, 1, 36, 2, 2, 16, 20, 760),
      'kids-wheat-sub': n(225, 6,   2, 1, 29, 3, 3, 14, 20, 665),
    },
  },
  {
    id: 'kids-11', number: '#11', name: 'Roast Beef', category: 'kids' as Category,
    variants: {
      'kids-white-sub': n(260, 6.5, 3, 1, 38, 2, 2, 13, 25, 850),
      'kids-wheat-sub': n(235, 8,   3, 1, 29, 3, 3, 12, 25, 755),
    },
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────
  {
    id: 'chocolate-brownie', number: '', name: 'Chocolate Brownie', category: 'desserts' as Category,
    variants: {
      'regular-none': n(170, 7, 1.5, 0, 23, 0, 17, 2, 0, 80),
    },
  },
  {
    id: 'chocolate-chip-cookie', number: '', name: 'Chocolate Chip Cookie', category: 'desserts' as Category,
    variants: {
      'regular-none': n(200, 11, 4, 2, 24, 0, 16, 2, 15, 150),
    },
  },
  {
    id: 'oatmeal-raisin-cookie', number: '', name: 'Oatmeal Raisin Cookie', category: 'desserts' as Category,
    variants: {
      'regular-none': n(180, 7, 1.5, 2, 26, 1, 16, 2, 10, 115),
    },
  },
  {
    id: 'peanut-butter-cookie', number: '', name: 'Peanut Butter Cookie', category: 'desserts' as Category,
    variants: {
      'regular-none': n(200, 12, 2.5, 1.5, 21, 0, 14, 4, 15, 210),
    },
  },
  {
    id: 'sugar-cookie', number: '', name: 'Sugar Cookie', category: 'desserts' as Category,
    variants: {
      'regular-none': n(180, 8, 3, 1.5, 26, 0, 13, 2, 20, 240),
    },
  },
]

// ---------------------------------------------------------------------------
// Extras (add-ons)
// ---------------------------------------------------------------------------
export const extras: Extra[] = []

// ---------------------------------------------------------------------------
// Mike's Way component keys (for ordering the toggles in the UI)
// ---------------------------------------------------------------------------
export const MIKES_WAY_COMPONENTS_KEYS: MikesWayKey[] = [
  'oil', 'vinegar', 'lettuce', 'tomato', 'onions',
]
