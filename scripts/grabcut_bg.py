#!/usr/bin/env python3
"""使用OpenCV grabCut去除背景"""
import os
import cv2
import numpy as np
from PIL import Image

input_dir = "/workspace/projects/public/mbti-characters"
output_dir = "/workspace/projects/public/mbti-characters"

# 16种人格类型
types = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", 
         "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"]

def remove_background_grabcut(input_path, output_path):
    """使用grabCut算法去除背景"""
    try:
        # 读取图片
        img = cv2.imread(input_path)
        if img is None:
            return False
        
        h, w = img.shape[:2]
        
        # 创建mask
        mask = np.zeros(img.shape[:2], np.uint8)
        
        # 背景和前景模型
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)
        
        # 定义矩形区域（中间区域作为前景）
        margin = 20
        rect = (margin, margin, w - 2*margin, h - 2*margin)
        
        # 运行grabCut
        cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
        
        # 创建掩码：0和2为背景，1和3为前景
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        
        # 应用掩码
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # 创建白色背景
        white_bg = np.ones_like(img_rgb) * 255
        
        # 将前景复制到白色背景
        for i in range(3):
            white_bg[:, :, i] = white_bg[:, :, i] * (1 - mask2) + img_rgb[:, :, i] * mask2
        
        # 转换为PIL Image并保存
        result = Image.fromarray(white_bg)
        result.save(output_path, 'JPEG', quality=95)
        
        return True
    except Exception as e:
        print(f"  grabCut失败: {e}")
        return False

def simple_crop(input_path, output_path):
    """简单裁剪作为后备方案"""
    try:
        img = Image.open(input_path)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        width, height = img.size
        # 裁剪顶部18%和底部2%
        top = int(height * 0.18)
        bottom = int(height * 0.98)
        img_cropped = img.crop((0, top, width, bottom))
        
        # 居中裁剪正方形
        from PIL import ImageOps
        img_resized = ImageOps.fit(img_cropped, (400, 400), method=Image.Resampling.LANCZOS)
        
        img_resized.save(output_path, 'JPEG', quality=95)
        return True
    except Exception as e:
        print(f"  裁剪失败: {e}")
        return False

print("开始处理图片...\n")

# 先尝试grabCut，失败则使用简单裁剪
for type_name in types:
    input_path = os.path.join(input_dir, f"{type_name}_main.jpg")
    
    if not os.path.exists(input_path):
        print(f"{type_name}: 源文件不存在")
        continue
    
    print(f"处理: {type_name}")
    
    # 先尝试grabCut
    if remove_background_grabcut(input_path, input_path):
        print(f"  grabCut完成")
    else:
        # 失败则使用简单裁剪
        if simple_crop(input_path, input_path):
            print(f"  裁剪完成")
        else:
            print(f"  处理失败")

print("\n处理完成!")
