#!/usr/bin/env python3
"""处理MBTI人格图片 - 裁剪去文字、统一尺寸"""
import os
from PIL import Image, ImageOps

input_dir = "/workspace/projects/public/mbti-characters"
output_dir = "/workspace/projects/public/mbti-characters"

# 16种人格类型
types = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", 
         "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"]

def crop_to_content(img, top_crop=0.15, bottom_crop=0.05):
    """智能裁剪，去除顶部和底部的文字区域"""
    width, height = img.size
    
    # 计算裁剪区域（去掉顶部15%和底部5%的文字区域）
    top = int(height * top_crop)
    bottom = int(height * (1 - bottom_crop))
    left = 0
    right = width
    
    return img.crop((left, top, right, bottom))

def process_image(input_path, output_path):
    """处理单张图片"""
    try:
        # 读取原图
        img = Image.open(input_path)
        
        # 转换为RGB模式
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # 智能裁剪去除文字
        img_cropped = crop_to_content(img, top_crop=0.18, bottom_crop=0.02)
        
        # 统一尺寸为400x400，保持比例，居中裁剪
        target_size = (400, 400)
        img_resized = ImageOps.fit(img_cropped, target_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        
        # 保存，覆盖原文件
        img_resized.save(output_path, 'JPEG', quality=95)
        
        return True
    except Exception as e:
        print(f"  处理失败: {e}")
        return False

print("开始处理图片...\n")

success_count = 0
for type_name in types:
    input_path = os.path.join(input_dir, f"{type_name}_main.jpg")
    
    if not os.path.exists(input_path):
        print(f"{type_name}: 源文件不存在")
        continue
    
    print(f"处理: {type_name}")
    if process_image(input_path, input_path):  # 直接覆盖原文件
        success_count += 1
        img = Image.open(input_path)
        print(f"  完成 -> {img.size}")

print(f"\n处理完成: {success_count}/{len(types)} 张图片")
