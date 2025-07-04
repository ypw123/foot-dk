import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { foodDatabase, searchFoods, sortFoodsByCalories } from '../data/foodDatabase';
import { FoodItem } from '../types';

const FoodPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['fruits']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAndSortedFoods = useMemo(() => {
    let foods: FoodItem[] = [];
    
    if (searchQuery.trim()) {
      foods = searchFoods(searchQuery);
    } else {
      if (selectedCategory === 'all') {
        foods = foodDatabase.flatMap(category => category.items);
      } else {
        const category = foodDatabase.find(cat => cat.id === selectedCategory);
        foods = category ? category.items : [];
      }
    }
    
    return sortFoodsByCalories(foods, sortOrder === 'asc');
  }, [searchQuery, selectedCategory, sortOrder]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCalorieColor = (calories: number) => {
    if (calories < 50) return 'text-green-600 bg-green-50';
    if (calories < 150) return 'text-yellow-600 bg-yellow-50';
    if (calories < 250) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getCalorieLabel = (calories: number) => {
    if (calories < 50) return '低热量';
    if (calories < 150) return '中等热量';
    if (calories < 250) return '较高热量';
    return '高热量';
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">食物热量库</h1>
          <p className="text-blue-100 text-sm">查询食物营养信息</p>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索食物或营养标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部
              </button>
              {foodDatabase.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200"
              title={sortOrder === 'asc' ? '当前：低到高热量排序' : '当前：高到低热量排序'}
            >
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Food List */}
        <div className="px-4 pb-4">
          {searchQuery.trim() ? (
            /* Search Results */
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-3">
                找到 {filteredAndSortedFoods.length} 个结果
              </p>
              {filteredAndSortedFoods.map((food, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{food.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCalorieColor(food.calories)}`}>
                      {getCalorieLabel(food.calories)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">标准热量</span>
                      <span className="font-semibold text-gray-800">{food.calories} 大卡/100g</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">常见分量</span>
                      <span className="font-semibold text-blue-600">
                        {food.commonServing.amount}g ≈ {food.commonServing.calories} 大卡
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {food.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Category View */
            <div className="space-y-4">
              {foodDatabase
                .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
                .map(category => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-semibold text-gray-800">{category.name}</span>
                        <span className="text-sm text-gray-500">({category.items.length})</span>
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </button>
                    
                    {expandedCategories.includes(category.id) && (
                      <div className="divide-y divide-gray-100">
                        {sortFoodsByCalories(category.items, sortOrder === 'asc').map((food, index) => (
                          <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-800">{food.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCalorieColor(food.calories)}`}>
                                {getCalorieLabel(food.calories)}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">标准热量</span>
                                <span className="font-semibold text-gray-800">{food.calories} 大卡/100g</span>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">常见分量</span>
                                <span className="font-semibold text-blue-600">
                                  {food.commonServing.amount}g ≈ {food.commonServing.calories} 大卡
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-3">
                              {food.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPage;