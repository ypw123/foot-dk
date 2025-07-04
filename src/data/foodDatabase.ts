import { FoodItem, FoodCategory } from '../types';

export const foodDatabase: FoodCategory[] = [
  {
    id: 'grains',
    name: '五谷类、豆类',
    icon: '🌾',
    items: [
      { name: '白米饭', category: 'grains', calories: 130, unit: '100g', commonServing: { amount: 150, calories: 195 }, tags: ['碳水化合物', '主食'] },
      { name: '糙米饭', category: 'grains', calories: 111, unit: '100g', commonServing: { amount: 150, calories: 167 }, tags: ['碳水化合物', '高纤维'] },
      { name: '燕麦', category: 'grains', calories: 389, unit: '100g', commonServing: { amount: 40, calories: 156 }, tags: ['高纤维', '饱腹感'] },
      { name: '全麦面包', category: 'grains', calories: 247, unit: '100g', commonServing: { amount: 30, calories: 74 }, tags: ['高纤维', '饱腹感'] },
      { name: '小麦面条', category: 'grains', calories: 137, unit: '100g', commonServing: { amount: 100, calories: 137 }, tags: ['碳水化合物'] },
      { name: '红豆', category: 'grains', calories: 309, unit: '100g', commonServing: { amount: 50, calories: 155 }, tags: ['高蛋白', '高纤维'] },
      { name: '绿豆', category: 'grains', calories: 316, unit: '100g', commonServing: { amount: 50, calories: 158 }, tags: ['高蛋白', '清热'] },
      { name: '黄豆', category: 'grains', calories: 359, unit: '100g', commonServing: { amount: 50, calories: 180 }, tags: ['高蛋白', '优质蛋白'] },
      { name: '黑豆', category: 'grains', calories: 341, unit: '100g', commonServing: { amount: 50, calories: 171 }, tags: ['高蛋白', '抗氧化'] },
      { name: '薏米', category: 'grains', calories: 357, unit: '100g', commonServing: { amount: 50, calories: 179 }, tags: ['高纤维', '健脾'] },
      { name: '小米', category: 'grains', calories: 358, unit: '100g', commonServing: { amount: 50, calories: 179 }, tags: ['养胃', '易消化'] },
      { name: '玉米', category: 'grains', calories: 106, unit: '100g', commonServing: { amount: 200, calories: 212 }, tags: ['高纤维', '维生素'] },
      { name: '红薯', category: 'grains', calories: 99, unit: '100g', commonServing: { amount: 200, calories: 198 }, tags: ['高纤维', '维生素A'] },
      { name: '紫薯', category: 'grains', calories: 106, unit: '100g', commonServing: { amount: 150, calories: 159 }, tags: ['抗氧化', '高纤维'] },
      { name: '土豆', category: 'grains', calories: 81, unit: '100g', commonServing: { amount: 200, calories: 162 }, tags: ['维生素C', '饱腹感'] },
    ]
  },
  {
    id: 'vegetables',
    name: '蔬菜类',
    icon: '🥬',
    items: [
      { name: '西兰花', category: 'vegetables', calories: 34, unit: '100g', commonServing: { amount: 150, calories: 51 }, tags: ['高纤维', '维生素C'] },
      { name: '菠菜', category: 'vegetables', calories: 23, unit: '100g', commonServing: { amount: 100, calories: 23 }, tags: ['叶酸', '铁质'] },
      { name: '白菜', category: 'vegetables', calories: 13, unit: '100g', commonServing: { amount: 200, calories: 26 }, tags: ['低热量', '维生素C'] },
      { name: '胡萝卜', category: 'vegetables', calories: 41, unit: '100g', commonServing: { amount: 100, calories: 41 }, tags: ['维生素A', '胡萝卜素'] },
      { name: '芹菜', category: 'vegetables', calories: 16, unit: '100g', commonServing: { amount: 100, calories: 16 }, tags: ['低热量', '高纤维'] },
      { name: '黄瓜', category: 'vegetables', calories: 15, unit: '100g', commonServing: { amount: 200, calories: 30 }, tags: ['低热量', '补水'] },
      { name: '番茄', category: 'vegetables', calories: 19, unit: '100g', commonServing: { amount: 150, calories: 29 }, tags: ['维生素C', '番茄红素'] },
      { name: '茄子', category: 'vegetables', calories: 25, unit: '100g', commonServing: { amount: 200, calories: 50 }, tags: ['低热量', '纤维'] },
      { name: '青椒', category: 'vegetables', calories: 22, unit: '100g', commonServing: { amount: 100, calories: 22 }, tags: ['维生素C', '低热量'] },
      { name: '洋葱', category: 'vegetables', calories: 39, unit: '100g', commonServing: { amount: 100, calories: 39 }, tags: ['抗氧化', '调味'] },
      { name: '白萝卜', category: 'vegetables', calories: 21, unit: '100g', commonServing: { amount: 150, calories: 32 }, tags: ['维生素C', '助消化'] },
      { name: '冬瓜', category: 'vegetables', calories: 11, unit: '100g', commonServing: { amount: 200, calories: 22 }, tags: ['低热量', '利水'] },
      { name: '丝瓜', category: 'vegetables', calories: 20, unit: '100g', commonServing: { amount: 150, calories: 30 }, tags: ['低热量', '清热'] },
      { name: '苦瓜', category: 'vegetables', calories: 19, unit: '100g', commonServing: { amount: 100, calories: 19 }, tags: ['低热量', '清热'] },
      { name: '韭菜', category: 'vegetables', calories: 25, unit: '100g', commonServing: { amount: 100, calories: 25 }, tags: ['维生素', '温补'] },
      { name: '大葱', category: 'vegetables', calories: 30, unit: '100g', commonServing: { amount: 50, calories: 15 }, tags: ['调味', '抗菌'] },
      { name: '蒜苗', category: 'vegetables', calories: 35, unit: '100g', commonServing: { amount: 100, calories: 35 }, tags: ['抗菌', '维生素'] },
      { name: '豆芽', category: 'vegetables', calories: 18, unit: '100g', commonServing: { amount: 150, calories: 27 }, tags: ['低热量', '维生素'] },
      { name: '莴笋', category: 'vegetables', calories: 15, unit: '100g', commonServing: { amount: 150, calories: 23 }, tags: ['低热量', '清脆'] },
      { name: '包菜', category: 'vegetables', calories: 20, unit: '100g', commonServing: { amount: 200, calories: 40 }, tags: ['维生素C', '低热量'] },
    ]
  },
  {
    id: 'fruits',
    name: '水果类',
    icon: '🍎',
    items: [
      { name: '苹果', category: 'fruits', calories: 52, unit: '100g', commonServing: { amount: 150, calories: 78 }, tags: ['低热量', '纤维'] },
      { name: '香蕉', category: 'fruits', calories: 89, unit: '100g', commonServing: { amount: 120, calories: 107 }, tags: ['钾质', '能量'] },
      { name: '橙子', category: 'fruits', calories: 43, unit: '100g', commonServing: { amount: 180, calories: 77 }, tags: ['维生素C', '低热量'] },
      { name: '葡萄', category: 'fruits', calories: 69, unit: '100g', commonServing: { amount: 100, calories: 69 }, tags: ['抗氧化', '糖分'] },
      { name: '草莓', category: 'fruits', calories: 30, unit: '100g', commonServing: { amount: 100, calories: 30 }, tags: ['低热量', '维生素C'] },
      { name: '蓝莓', category: 'fruits', calories: 57, unit: '100g', commonServing: { amount: 80, calories: 46 }, tags: ['抗氧化', '低热量'] },
      { name: '猕猴桃', category: 'fruits', calories: 56, unit: '100g', commonServing: { amount: 100, calories: 56 }, tags: ['维生素C', '纤维'] },
      { name: '梨', category: 'fruits', calories: 44, unit: '100g', commonServing: { amount: 200, calories: 88 }, tags: ['低热量', '润燥'] },
      { name: '桃子', category: 'fruits', calories: 51, unit: '100g', commonServing: { amount: 150, calories: 77 }, tags: ['维生素A', '低热量'] },
      { name: '樱桃', category: 'fruits', calories: 46, unit: '100g', commonServing: { amount: 100, calories: 46 }, tags: ['抗氧化', '铁质'] },
      { name: '西瓜', category: 'fruits', calories: 25, unit: '100g', commonServing: { amount: 300, calories: 75 }, tags: ['低热量', '补水'] },
      { name: '哈密瓜', category: 'fruits', calories: 36, unit: '100g', commonServing: { amount: 200, calories: 72 }, tags: ['维生素A', '低热量'] },
      { name: '芒果', category: 'fruits', calories: 48, unit: '100g', commonServing: { amount: 150, calories: 72 }, tags: ['维生素A', '纤维'] },
      { name: '菠萝', category: 'fruits', calories: 48, unit: '100g', commonServing: { amount: 150, calories: 72 }, tags: ['维生素C', '酵素'] },
      { name: '柚子', category: 'fruits', calories: 33, unit: '100g', commonServing: { amount: 200, calories: 66 }, tags: ['维生素C', '低热量'] },
      { name: '柠檬', category: 'fruits', calories: 22, unit: '100g', commonServing: { amount: 50, calories: 11 }, tags: ['维生素C', '低热量'] },
      { name: '石榴', category: 'fruits', calories: 68, unit: '100g', commonServing: { amount: 100, calories: 68 }, tags: ['抗氧化', '维生素'] },
      { name: '龙眼', category: 'fruits', calories: 71, unit: '100g', commonServing: { amount: 80, calories: 57 }, tags: ['糖分', '补血'] },
      { name: '荔枝', category: 'fruits', calories: 70, unit: '100g', commonServing: { amount: 100, calories: 70 }, tags: ['维生素C', '糖分'] },
      { name: '椰子', category: 'fruits', calories: 241, unit: '100g', commonServing: { amount: 50, calories: 121 }, tags: ['高热量', '脂肪'] },
    ]
  },
  {
    id: 'meats',
    name: '肉类',
    icon: '🥩',
    items: [
      { name: '鸡胸肉', category: 'meats', calories: 165, unit: '100g', commonServing: { amount: 150, calories: 248 }, tags: ['高蛋白', '低脂'] },
      { name: '鸡腿肉', category: 'meats', calories: 181, unit: '100g', commonServing: { amount: 120, calories: 217 }, tags: ['高蛋白', '适中脂肪'] },
      { name: '鸡翅', category: 'meats', calories: 203, unit: '100g', commonServing: { amount: 100, calories: 203 }, tags: ['高蛋白', '脂肪'] },
      { name: '猪瘦肉', category: 'meats', calories: 143, unit: '100g', commonServing: { amount: 100, calories: 143 }, tags: ['高蛋白', '铁质'] },
      { name: '猪排骨', category: 'meats', calories: 278, unit: '100g', commonServing: { amount: 150, calories: 417 }, tags: ['高蛋白', '高脂肪'] },
      { name: '牛肉', category: 'meats', calories: 250, unit: '100g', commonServing: { amount: 100, calories: 250 }, tags: ['高蛋白', '铁质'] },
      { name: '牛排', category: 'meats', calories: 271, unit: '100g', commonServing: { amount: 150, calories: 407 }, tags: ['高蛋白', '高脂肪'] },
      { name: '羊肉', category: 'meats', calories: 203, unit: '100g', commonServing: { amount: 100, calories: 203 }, tags: ['高蛋白', '温补'] },
      { name: '鱼肉', category: 'meats', calories: 206, unit: '100g', commonServing: { amount: 150, calories: 309 }, tags: ['高蛋白', '不饱和脂肪'] },
      { name: '三文鱼', category: 'meats', calories: 208, unit: '100g', commonServing: { amount: 100, calories: 208 }, tags: ['高蛋白', 'Omega-3'] },
      { name: '鲈鱼', category: 'meats', calories: 105, unit: '100g', commonServing: { amount: 150, calories: 158 }, tags: ['高蛋白', '低脂'] },
      { name: '虾', category: 'meats', calories: 106, unit: '100g', commonServing: { amount: 100, calories: 106 }, tags: ['高蛋白', '低脂'] },
      { name: '螃蟹', category: 'meats', calories: 103, unit: '100g', commonServing: { amount: 200, calories: 206 }, tags: ['高蛋白', '低脂'] },
      { name: '鸡蛋', category: 'meats', calories: 147, unit: '100g', commonServing: { amount: 60, calories: 88 }, tags: ['完整蛋白', '营养'] },
      { name: '鸭蛋', category: 'meats', calories: 180, unit: '100g', commonServing: { amount: 70, calories: 126 }, tags: ['高蛋白', '脂肪'] },
      { name: '牛奶', category: 'meats', calories: 54, unit: '100g', commonServing: { amount: 250, calories: 135 }, tags: ['钙质', '蛋白质'] },
      { name: '酸奶', category: 'meats', calories: 72, unit: '100g', commonServing: { amount: 150, calories: 108 }, tags: ['益生菌', '钙质'] },
      { name: '豆腐', category: 'meats', calories: 81, unit: '100g', commonServing: { amount: 100, calories: 81 }, tags: ['植物蛋白', '钙质'] },
      { name: '腊肉', category: 'meats', calories: 181, unit: '100g', commonServing: { amount: 50, calories: 91 }, tags: ['高脂肪', '高盐'] },
      { name: '香肠', category: 'meats', calories: 508, unit: '100g', commonServing: { amount: 50, calories: 254 }, tags: ['高热量', '高脂肪'] },
    ]
  }
];

export const searchFoods = (query: string): FoodItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];
  
  const allFoods = foodDatabase.flatMap(category => category.items);
  return allFoods.filter(food => 
    food.name.toLowerCase().includes(normalizedQuery) ||
    food.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
};

export const sortFoodsByCalories = (foods: FoodItem[], ascending: boolean = true): FoodItem[] => {
  return [...foods].sort((a, b) => 
    ascending ? a.calories - b.calories : b.calories - a.calories
  );
};