import { RecognitionResult } from '../types';

// 基于图片内容生成一致的识别结果
const generateConsistentResult = (imageFile: File): RecognitionResult => {
  // 使用文件名、大小和修改时间创建一个简单的哈希
  const fileInfo = `${imageFile.name}-${imageFile.size}-${imageFile.lastModified}`;
  let hash = 0;
  for (let i = 0; i < fileInfo.length; i++) {
    const char = fileInfo.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  
  // 确保哈希值为正数
  hash = Math.abs(hash);
  
  // 扩展的食物识别结果数据库
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
    },
    {
      food: '番茄',
      confidence: 0.91,
      calories: 19,
      estimatedServing: 150,
      totalCalories: 29,
      healthTip: '番茄富含番茄红素和维生素C，有助于抗氧化'
    },
    {
      food: '胡萝卜',
      confidence: 0.89,
      calories: 41,
      estimatedServing: 100,
      totalCalories: 41,
      healthTip: '胡萝卜富含胡萝卜素，对眼睛健康有益'
    },
    {
      food: '鸡蛋',
      confidence: 0.93,
      calories: 147,
      estimatedServing: 60,
      totalCalories: 88,
      healthTip: '鸡蛋含有完整蛋白质，是优质的营养来源'
    },
    {
      food: '牛奶',
      confidence: 0.86,
      calories: 54,
      estimatedServing: 250,
      totalCalories: 135,
      healthTip: '牛奶富含钙质和蛋白质，有助于骨骼健康'
    },
    {
      food: '面条',
      confidence: 0.84,
      calories: 137,
      estimatedServing: 100,
      totalCalories: 137,
      healthTip: '面条是碳水化合物来源，建议搭配蔬菜食用'
    },
    {
      food: '橙子',
      confidence: 0.90,
      calories: 43,
      estimatedServing: 180,
      totalCalories: 77,
      healthTip: '橙子富含维生素C，有助于增强免疫力'
    },
    {
      food: '草莓',
      confidence: 0.88,
      calories: 30,
      estimatedServing: 100,
      totalCalories: 30,
      healthTip: '草莓是低热量水果，富含维生素C和抗氧化物'
    },
    {
      food: '菠菜',
      confidence: 0.85,
      calories: 23,
      estimatedServing: 100,
      totalCalories: 23,
      healthTip: '菠菜富含叶酸和铁质，是营养丰富的绿叶蔬菜'
    },
    {
      food: '豆腐',
      confidence: 0.87,
      calories: 81,
      estimatedServing: 100,
      totalCalories: 81,
      healthTip: '豆腐是优质植物蛋白，富含钙质，适合素食者'
    },
    {
      food: '土豆',
      confidence: 0.89,
      calories: 81,
      estimatedServing: 200,
      totalCalories: 162,
      healthTip: '土豆富含维生素C和钾质，是很好的主食选择'
    }
  ];
  
  // 基于哈希值选择结果，确保同一图片总是返回相同结果
  const index = hash % mockResults.length;
  const baseResult = mockResults[index];
  
  // 基于哈希值微调置信度和分量，让结果更真实
  const confidenceVariation = (hash % 10) / 100; // 0-0.09的变化
  const servingVariation = (hash % 20) - 10; // -10到+10g的变化
  
  return {
    ...baseResult,
    confidence: Math.min(0.95, Math.max(0.75, baseResult.confidence + confidenceVariation)),
    estimatedServing: Math.max(50, baseResult.estimatedServing + servingVariation),
    totalCalories: Math.round((baseResult.estimatedServing + servingVariation) * baseResult.calories / 100)
  };
};

// Mock AI recognition service - in real app, this would call Tongyi Qianwen API
export const recognizeFood = async (imageFile: File): Promise<RecognitionResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 返回基于图片内容的一致结果
  return generateConsistentResult(imageFile);
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