#!/usr/bin/env python3
"""
处理新的MBTI人格图片
1. 下载图片
2. 识别人格类型
3. 裁剪为800x800
4. 去除底部水印
5. 为四组添加不同背景色
"""

from PIL import Image
import requests
from io import BytesIO
import os

# 创建输出目录
output_dir = "/workspace/projects/public/mbti-characters-new"
os.makedirs(output_dir, exist_ok=True)

# 图片URL列表（从用户消息中提取）
# 由于图片是作为附件上传的，我需要通过其他方式获取
# 这里我先处理已有的图片文件

# 先检查是否有下载的图片
input_dir = "/workspace/projects/public/mbti-raw"
if not os.path.exists(input_dir):
    os.makedirs(input_dir, exist_ok=True)
    print(f"请将图片放入 {input_dir} 目录")
    print("图片应按以下格式命名：ENFJ.jpg, ENFP.jpg, ...")
    exit(0)

# 四组人格及其颜色
groups = {
    "analysts": {
        "types": ["INTJ", "INTP", "ENTJ", "ENTP"],
        "bg_color": (245, 240, 255),  # 淡紫色
        "name": "分析师"
    },
    "diplomats": {
        "types": ["INFJ", "INFP", "ENFJ", "ENFP"],
        "bg_color": (240, 255, 245),  # 淡绿色
        "name": "外交官"
    },
    "sentinels": {
        "types": ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
        "bg_color": (240, 248, 255),  # 淡蓝色
        "name": "守护者"
    },
    "explorers": {
        "types": ["ISTP", "ISFP", "ESTP", "ESFP"],
        "bg_color": (255, 250, 240),  # 淡黄色
        "name": "探险家"
    }
}

# 获取人格所属组
def get_group(mbti_type):
    for group_name, group_info in groups.items():
        if mbti_type.upper() in group_info["types"]:
            return group_name, group_info["bg_color"]
    return None, (255, 255, 255)

def process_image(input_path, output_path, bg_color):
    """处理单张图片"""
    try:
        img = Image.open(input_path)
        
        # 转换为RGBA模式
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        width, height = img.size
        print(f"  原尺寸: {width}x{height}")
        
        # 裁剪底部50像素去除水印（豆包AI生成）
        crop_bottom = 50
        if height > 800:
            img_cropped = img.crop((0, 0, width, height - crop_bottom))
            height = height - crop_bottom
        else:
            img_cropped = img
        
        # 创建800x800的新图像，使用组背景色
        new_size = 800
        new_img = Image.new('RGBA', (new_size, new_size), bg_color + (255,))
        
        # 计算缩放比例，保持人物在中心
        scale = min(new_size / width, new_size / height) * 0.85  # 留一些边距
        new_width = int(width * scale)
        new_height = int(height * scale)
        
        # 缩放图像
        img_resized = img_cropped.resize((new_width, new_height), Image.LANCZOS)
        
        # 计算居中位置
        x = (new_size - new_width) // 2
        y = (new_size - new_height) // 2
        
        # 粘贴到背景上
        new_img.paste(img_resized, (x, y), img_resized)
        
        # 转换为RGB并保存
        final_img = Image.new('RGB', (new_size, new_size), bg_color)
        final_img.paste(new_img, mask=new_img.split()[3])
        final_img.save(output_path, 'JPEG', quality=95)
        
        print(f"  ✓ 已保存: {output_path}")
        return True
        
    except Exception as e:
        print(f"  ✗ 处理失败: {e}")
        return False

# 处理所有图片
print("=" * 60)
print("处理MBTI人格图片")
print("=" * 60)

processed = 0
for group_name, group_info in groups.items():
    print(f"\n【{group_info['name']}】{group_name}")
    print(f"  背景色: {group_info['bg_color']}")
    
    for mbti_type in group_info["types"]:
        input_file = os.path.join(input_dir, f"{mbti_type}.jpg")
        if not os.path.exists(input_file):
            input_file_png = os.path.join(input_dir, f"{mbti_type}.png")
            if os.path.exists(input_file_png):
                input_file = input_file_png
        
        if os.path.exists(input_file):
            output_file = os.path.join(output_dir, f"{mbti_type}_main.jpg")
            print(f"\n处理 {mbti_type}...")
            if process_image(input_file, output_file, group_info['bg_color']):
                processed += 1
        else:
            print(f"  ✗ 未找到: {mbti_type}.jpg/.png")

print(f"\n{'=' * 60}")
print(f"处理完成: {processed}/16 张图片")
print(f"输出目录: {output_dir}")
print("=" * 60)
