#!/usr/bin/env python3
"""处理MBTI人格图片 - 去除背景、统一尺寸"""
import os
from PIL import Image, ImageOps
import numpy as np
from rembg import remove

input_dir = "/workspace/projects/public/mbti-characters"
output_dir = "/workspace/projects/public/mbti-characters-processed"
os.makedirs(output_dir, exist_ok=True)

# 16种人格类型
types = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", 
         "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"]

def process_image(input_path, output_path):
    """处理单张图片：去背景 + 白底 + 统一尺寸"""
    try:
        # 读取原图
        with open(input_path, 'rb') as f:
            img_data = f.read()
        
        # 使用rembg去除背景
        output_data = remove(img_data)
        
        # 转换为PIL Image
        img = Image.open(io.BytesIO(output_data))
        
        # 转换为RGBA模式
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 获取alpha通道
        alpha = img.split()[3]
        
        # 找到非透明区域的边界
        bbox = alpha.getbbox()
        if bbox:
            # 裁剪到人物主体（留出边距）
            left, top, right, bottom = bbox
            padding = 20
            left = max(0, left - padding)
            top = max(0, top - padding)
            right = min(img.width, right + padding)
            bottom = min(img.height, bottom + padding)
            img = img.crop((left, top, right, bottom))
        
        # 创建白色背景
        white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
        
        # 将人物合成到白底上
        white_bg.paste(img, (0, 0), img)
        
        # 转换为RGB模式
        img_rgb = white_bg.convert('RGB')
        
        # 统一尺寸为400x400，保持比例，居中裁剪
        target_size = (400, 400)
        img_resized = ImageOps.fit(img_rgb, target_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        
        # 保存
        img_resized.save(output_path, 'JPEG', quality=95)
        
        return True
    except Exception as e:
        print(f"  处理失败: {e}")
        return False

import io

print("开始处理图片...\n")

success_count = 0
for type_name in types:
    input_path = os.path.join(input_dir, f"{type_name}_main.jpg")
    output_path = os.path.join(output_dir, f"{type_name}.jpg")
    
    if not os.path.exists(input_path):
        print(f"{type_name}: 源文件不存在")
        continue
    
    print(f"处理: {type_name}")
    if process_image(input_path, output_path):
        success_count += 1
        size = os.path.getsize(output_path)
        print(f"  完成 ({size/1024:.1f} KB)")

print(f"\n处理完成: {success_count}/{len(types)} 张图片")
print(f"输出目录: {output_dir}")
