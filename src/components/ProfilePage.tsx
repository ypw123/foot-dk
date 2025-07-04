import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Trash2, Target, BarChart3 } from 'lucide-react';
import { getStorageData, deleteCalorieRecord, getTodayCalories, getWeeklyData, updateUserConfig } from '../utils/storage';
import { CalorieRecord, Statistics } from '../types';

const ProfilePage: React.FC = () => {
  const [records, setRecords] = useState<CalorieRecord[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    lastUpdate: '',
    avgLast3: 0,
    minLast3: 0,
    maxLast3: 0
  });
  const [todayCalories, setTodayCalories] = useState(0);
  const [weeklyData, setWeeklyData] = useState<{ date: string; calories: number }[]>([]);
  const [calorieGoal, setCalorieGoal] = useState(1500);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getStorageData();
    setRecords(data.history);
    setStatistics(data.statistics);
    setTodayCalories(getTodayCalories());
    setWeeklyData(getWeeklyData());
    setCalorieGoal(data.userConfig.calorieGoal);
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      deleteCalorieRecord(id);
      loadData();
    }
  };

  const handleUpdateGoal = (newGoal: number) => {
    updateUserConfig({ calorieGoal: newGoal });
    setCalorieGoal(newGoal);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage < 70) return 'bg-emerald-500';
    if (percentage < 100) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const maxWeeklyCalories = Math.max(...weeklyData.map(d => d.calories), calorieGoal);
  const todayProgress = (todayCalories / calorieGoal) * 100;

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-2">个人档案</h1>
          <p className="text-purple-100 text-sm">追踪您的热量摄入情况</p>
        </div>

        {/* Today's Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-gray-800">今日摄入</h2>
            </div>
            <button
              onClick={() => {
                const newGoal = prompt('设置新的每日热量目标（大卡）：', calorieGoal.toString());
                if (newGoal && !isNaN(parseInt(newGoal))) {
                  handleUpdateGoal(parseInt(newGoal));
                }
              }}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              设置目标
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">{todayCalories}</span>
              <span className="text-gray-600">/ {calorieGoal} 大卡</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(todayCalories, calorieGoal)}`}
                style={{ width: `${Math.min(todayProgress, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>已完成 {Math.round(todayProgress)}%</span>
              <span>剩余 {Math.max(0, calorieGoal - todayCalories)} 大卡</span>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">7日趋势</h2>
          </div>
          
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-gray-500">
                  {new Date(day.date).getDate()}日
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.calories / maxWeeklyCalories) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-sm font-medium text-gray-700">
                  {day.calories}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">最近统计</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{statistics.avgLast3}</div>
              <div className="text-sm text-gray-500">平均值</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{statistics.minLast3}</div>
              <div className="text-sm text-gray-500">最低值</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{statistics.maxLast3}</div>
              <div className="text-sm text-gray-500">最高值</div>
            </div>
          </div>
        </div>

        {/* History Records */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">历史记录</h2>
          </div>
          
          {records.length === 0 ? (
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">暂无记录</p>
              <p className="text-sm text-gray-400">开始识别食物来添加记录吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  {record.image && (
                    <img
                      src={record.image}
                      alt={record.food}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{record.food}</h3>
                      <span className="font-bold text-purple-600">{record.calories} 大卡</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {formatDate(record.date)}
                      </span>
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;