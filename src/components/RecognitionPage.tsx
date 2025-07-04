import React, { useState } from 'react';
import { Camera, Image, Loader2, Check, X, RotateCcw } from 'lucide-react';
import { useImageCapture } from '../hooks/useImageCapture';
import { recognizeFood, convertImageToBase64 } from '../utils/recognition';
import { addCalorieRecord } from '../utils/storage';
import { RecognitionResult } from '../types';

const RecognitionPage: React.FC = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const {
    selectedImage,
    imagePreview,
    fileInputRef,
    openCamera,
    openGallery,
    clearImage,
    handleFileChange
  } = useImageCapture();

  const handleRecognition = async () => {
    if (!selectedImage) return;
    
    setIsRecognizing(true);
    setError(null);
    
    try {
      const result = await recognizeFood(selectedImage);
      setRecognitionResult(result);
    } catch (err) {
      setError('识别失败，请重试');
      console.error('Recognition error:', err);
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleReRecognition = async () => {
    if (!selectedImage) return;
    
    setIsRecognizing(true);
    setError(null);
    setRecognitionResult(null); // 清除当前结果
    
    try {
      const result = await recognizeFood(selectedImage);
      setRecognitionResult(result);
    } catch (err) {
      setError('识别失败，请重试');
      console.error('Recognition error:', err);
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleSaveRecord = async () => {
    if (!recognitionResult) return;
    
    try {
      let imageBase64 = '';
      if (selectedImage) {
        imageBase64 = await convertImageToBase64(selectedImage);
      }
      
      addCalorieRecord(
        recognitionResult.food,
        recognitionResult.totalCalories,
        imageBase64
      );
      
      // Reset state
      setRecognitionResult(null);
      clearImage();
      
      // Show success message
      alert('记录已保存！');
    } catch (err) {
      console.error('Save error:', err);
      alert('保存失败，请重试');
    }
  };

  const handleRetry = () => {
    setRecognitionResult(null);
    setError(null);
    clearImage();
  };

  // 当选择新图片时，重置识别结果和错误状态
  const handleNewImageSelection = () => {
    setRecognitionResult(null);
    setError(null);
    setIsRecognizing(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">AI 食物识别</h1>
          <p className="text-emerald-100 text-sm">拍照识别食物热量</p>
        </div>

        {/* Image Capture Section */}
        <div className="p-6">
          {!imagePreview ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleNewImageSelection();
                    openCamera();
                  }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  拍照
                </button>
                <button
                  onClick={() => {
                    handleNewImageSelection();
                    openGallery();
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Image size={20} />
                  相册
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm">选择一张食物图片开始识别</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected food"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    clearImage();
                    handleNewImageSelection();
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Recognition Button - 只有在没有识别结果且没有正在识别时才显示 */}
              {!recognitionResult && !isRecognizing && !error && (
                <button
                  onClick={handleRecognition}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200"
                >
                  开始识别
                </button>
              )}

              {/* Loading State */}
              {isRecognizing && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                  <Loader2 size={32} className="mx-auto text-emerald-600 animate-spin mb-4" />
                  <p className="text-emerald-700 font-medium">AI 识别中...</p>
                  <p className="text-emerald-600 text-sm mt-1">请稍候片刻</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <X size={32} className="mx-auto text-red-600 mb-4" />
                  <p className="text-red-700 font-medium">{error}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleReRecognition}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} />
                      重试识别
                    </button>
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                    >
                      重新选择
                    </button>
                  </div>
                </div>
              )}

              {/* Recognition Result */}
              {recognitionResult && !isRecognizing && !error && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Check size={20} className="text-emerald-600" />
                    <h3 className="text-lg font-bold text-emerald-800">识别结果</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">食物名称：</span>
                      <span className="font-semibold text-gray-800">
                        {recognitionResult.food}
                        <span className="text-emerald-600 text-sm ml-2">
                          ({Math.round(recognitionResult.confidence * 100)}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">热量值：</span>
                      <span className="font-semibold text-gray-800">
                        {recognitionResult.calories} 大卡/100g
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">预估分量：</span>
                      <span className="font-semibold text-gray-800">
                        约 {recognitionResult.estimatedServing}g
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">总热量：</span>
                        <span className="font-bold text-emerald-600 text-lg">
                          {recognitionResult.totalCalories} 大卡
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-amber-800 text-sm">
                        💡 {recognitionResult.healthTip}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveRecord}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Check size={20} />
                      保存记录
                    </button>
                    <button
                      onClick={handleReRecognition}
                      className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} />
                      重新识别
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleNewImageSelection();
          handleFileChange(e);
        }}
        className="hidden"
      />
    </div>
  );
};

export default RecognitionPage;