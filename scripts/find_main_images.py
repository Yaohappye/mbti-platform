#!/usr/bin/env python3
"""找出每种人格类型的主卡通形象（最大的图片）"""
import os
import shutil

input_dir = "/workspace/projects/public/mbti-characters"
output_dir = "/workspace/projects/public/mbti-characters"

# 16种人格类型
types = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", 
         "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"]

print("查找每种人格的主卡通形象...\n")

for type_name in types:
    # 获取该类型的所有图片
    type_images = []
    for filename in os.listdir(input_dir):
        if filename.startswith(type_name + "_"):
            filepath = os.path.join(input_dir, filename)
            size = os.path.getsize(filepath)
            type_images.append((filename, size, filepath))
    
    if not type_images:
        print(f"{type_name}: 未找到图片")
        continue
    
    # 按大小排序，找出最大的几张
    type_images.sort(key=lambda x: x[1], reverse=True)
    
    # 找出最大的图片（排除特别小的图标）
    main_image = None
    for filename, size, filepath in type_images:
        if size > 10000:  # 大于10KB的才考虑
            main_image = (filename, size, filepath)
            break
    
    if main_image:
        filename, size, filepath = main_image
        # 复制并重命名为主图
        main_name = f"{type_name}_main.jpg"
        main_path = os.path.join(output_dir, main_name)
        shutil.copy2(filepath, main_path)
        print(f"{type_name}: {filename} ({size/1024:.1f} KB) -> {main_name}")
    else:
        print(f"{type_name}: 未找到合适的图片")

print("\n主图提取完成!")
print(f"\n主图列表:")
for t in types:
    main_file = f"{t}_main.jpg"
    main_path = os.path.join(output_dir, main_file)
    if os.path.exists(main_path):
        size = os.path.getsize(main_path)
        print(f"  {main_file} ({size/1024:.1f} KB)")
