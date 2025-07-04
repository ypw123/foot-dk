export interface FoodItem {
  name: string;
  category: 'grains' | 'vegetables' | 'fruits' | 'meats';
  calories: number;
  unit: string;
  commonServing: {
    amount: number;
    calories: number;
  };
  tags: string[];
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  items: FoodItem[];
}

export interface CalorieRecord {
  id: string;
  date: string;
  food: string;
  calories: number;
  image?: string;
  timestamp: number;
}

export interface UserConfig {
  calorieGoal: number;
  unit: string;
}

export interface Statistics {
  lastUpdate: string;
  avgLast3: number;
  minLast3: number;
  maxLast3: number;
}

export interface StorageData {
  userConfig: UserConfig;
  history: CalorieRecord[];
  statistics: Statistics;
}

export interface RecognitionResult {
  food: string;
  confidence: number;
  calories: number;
  estimatedServing: number;
  totalCalories: number;
  healthTip: string;
}