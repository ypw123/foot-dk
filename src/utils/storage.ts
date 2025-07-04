import { CalorieRecord, UserConfig, Statistics, StorageData } from '../types';

const STORAGE_KEY = 'dietAssistant';

const defaultUserConfig: UserConfig = {
  calorieGoal: 1500,
  unit: 'kcal'
};

const defaultStatistics: Statistics = {
  lastUpdate: new Date().toISOString().split('T')[0],
  avgLast3: 0,
  minLast3: 0,
  maxLast3: 0
};

export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  return {
    userConfig: defaultUserConfig,
    history: [],
    statistics: defaultStatistics
  };
};

export const saveStorageData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addCalorieRecord = (food: string, calories: number, image?: string): void => {
  const data = getStorageData();
  
  const newRecord: CalorieRecord = {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    food,
    calories,
    image,
    timestamp: Date.now()
  };
  
  data.history.unshift(newRecord);
  
  // Keep only last 30 records
  if (data.history.length > 30) {
    data.history = data.history.slice(0, 30);
  }
  
  updateStatistics(data);
  saveStorageData(data);
};

export const deleteCalorieRecord = (id: string): void => {
  const data = getStorageData();
  data.history = data.history.filter(record => record.id !== id);
  updateStatistics(data);
  saveStorageData(data);
};

export const updateStatistics = (data: StorageData): void => {
  const last3Records = data.history.slice(0, 3);
  
  if (last3Records.length > 0) {
    const calories = last3Records.map(record => record.calories);
    data.statistics = {
      lastUpdate: new Date().toISOString().split('T')[0],
      avgLast3: Math.round(calories.reduce((sum, cal) => sum + cal, 0) / calories.length),
      minLast3: Math.min(...calories),
      maxLast3: Math.max(...calories)
    };
  }
};

export const getTodayCalories = (): number => {
  const data = getStorageData();
  const today = new Date().toISOString().split('T')[0];
  
  return data.history
    .filter(record => record.date === today)
    .reduce((sum, record) => sum + record.calories, 0);
};

export const getWeeklyData = (): { date: string; calories: number }[] => {
  const data = getStorageData();
  const result: { date: string; calories: number }[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayCalories = data.history
      .filter(record => record.date === dateStr)
      .reduce((sum, record) => sum + record.calories, 0);
    
    result.push({ date: dateStr, calories: dayCalories });
  }
  
  return result;
};

export const updateUserConfig = (config: Partial<UserConfig>): void => {
  const data = getStorageData();
  data.userConfig = { ...data.userConfig, ...config };
  saveStorageData(data);
};