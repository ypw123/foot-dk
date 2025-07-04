import { RecognitionResult } from '../types';

// Mock AI recognition service - in real app, this would call Tongyi Qianwen API
export const recognizeFood = async (imageFile: File): Promise<RecognitionResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock recognition results based on common foods
  const mockResults: RecognitionResult[] = [
    {
      food: '苹果',
      confidence: 0.92,
      calories: 52,
      estimatedServing: 150,
      totalCalories: 78,
      healthTip: '苹果是低热量水果，富含纤维，推荐作为健康零食'
    },
    {
      food: '香蕉',
      confidence: 0.88,
      calories: 89,
      estimatedServing: 120,
      totalCalories: 107,
      healthTip: '香蕉富含钾质和能量，适合运动前后食用'
    },
    {
      food: '鸡胸肉',
      confidence: 0.85,
      calories: 165,
      estimatedServing: 150,
      totalCalories: 248,
      healthTip: '鸡胸肉是优质蛋白质来源，低脂肪，适合减脂期食用'
    },
    {
      food: '白米饭',
      confidence: 0.90,
      calories: 130,
      estimatedServing: 150,
      totalCalories: 195,
      healthTip: '白米饭是主要碳水化合物来源，建议控制分量'
    },
    {
      food: '西兰花',
      confidence: 0.87,
      calories: 34,
      estimatedServing: 150,
      totalCalories: 51,
      healthTip: '西兰花富含维生素C和纤维，是优秀的绿色蔬菜'
    }
  ];
  
  // Return random result for demo
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};