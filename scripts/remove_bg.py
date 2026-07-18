#!/usr/bin/env python3
"""使用rembg去除背景"""
import os
import io
from PIL import Image
from rembg import remove

input_dir = "/workspace/projects/public/mbti-characters"
output_dir = "/workspace/projects/public/mbti-characters"

# 16种人格类型
types = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", 
         "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"]

def process_with_rembg(input_path, output_path):
    """使用rembg去除背景"""
    try:
        # 读取原图
        with open(input_path, 'rb') as f:
            img_data = f.read()
        
        # 使用rembg去除背景
        output_data = remove(img_data)
        
        # 转换为PIL Image
        img = Image.open(io.BytesIO(output_data))
        
        # 创建白色背景
        white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
        white_bg.paste(img, (0, 0), img)
        
        # 转换为RGB
        img_rgb = white_bg.convert('RGB')
        
        # 裁剪到400x400
        width, height = img_rgb.size
        min_dim = min(width, height)
        left = (width - min_dim) // 2
        top = (height - min_dim) // 2
        right = left + min_dim
        bottom = top + min_dim
        
        img_cropped = img_rgb.crop((left, top, right, bottom))
        img_resized = img_cropped.resize((400, 400), Image.Resampling.LANCZOS)
        
        # 保存
        img_resized.save(output_path, 'JPEG', quality=95)
        
        return True
    except Exception as e:
        print(f"  rembg处理失败: {e}")
        return False

print("开始AI抠图处理...")
print("首次运行需要下载模型文件（约170MB），请耐心等待...\n")

success_count = 0
for type_name in types:
    input_path = os.path.join(input_dir, f"{type_name}_main.jpg")
    
    if not os.path.exists(input_path):
        print(f"{type_name}: 源文件不存在")
        continue
    
    print(f"处理: {type_name}")
    if process_with_rembg(input_path, input_path):
        success_count += 1
        print(f"  完成")

print(f"\n处理完成: {success_count}/{len(types)} 张图片")
