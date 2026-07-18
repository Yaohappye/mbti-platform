#!/usr/bin/env python3
"""
识别MBTI人格类型并处理图片
"""

from PIL import Image
import os

# 输入输出目录
input_dir = "/workspace/projects/public/mbti-raw"
output_dir = "/workspace/projects/public/mbti-characters-new"

# 四组人格及其背景色
groups = {
    "analysts": {
        "types": ["INTJ", "INTP", "ENTJ", "ENTP"],
        "bg_color": (245, 243, 255),  # 淡紫色 F5F3FF
        "accent": "purple"
    },
    "diplomats": {
        "types": ["INFJ", "INFP", "ENFJ", "ENFP"],
        "bg_color": (240, 253, 244),  # 淡绿色 F0FDF4
        "accent": "emerald"
    },
    "sentinels": {
        "types": ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
        "bg_color": (239, 246, 255),  # 淡蓝色 EFF6FF
        "accent": "blue"
    },
    "explorers": {
        "types": ["ISTP", "ISFP", "ESTP", "ESFP"],
        "bg_color": (255, 251, 235),  # 淡黄色 FFFBE9
        "accent": "amber"
    }
}

# 人格类型识别关键词（基于图片特征）
# 注意：这里需要根据实际图片内容来识别
personality_keywords = {
    # 分析师 - 紫色系
    "INTJ": {"keywords": ["紫色", "地图", "计划"], "group": "analysts"},
    "INTP": {"keywords": ["紫色", "科学家", "实验"], "group": "analysts"},
    "ENTJ": {"keywords": ["紫色", "指挥官", "领导"], "group": "analysts"},
    "ENTP": {"keywords": ["紫色", "演讲", "辩论"], "group": "analysts"},
    
    # 外交官 - 绿色系
    "INFJ": {"keywords": ["绿色", "智者", "老人"], "group": "diplomats"},
    "INFP": {"keywords": ["绿色", "花", "女孩"], "group": "diplomats"},
    "ENFJ": {"keywords": ["绿色", "骑士", "剑"], "group": "diplomats"},
    "ENFP": {"keywords": ["绿色", "背包", "冒险"], "group": "diplomats"},
    
    # 守护者 - 蓝色系
    "ISTJ": {"keywords": ["蓝色", "尺子", "严谨"], "group": "sentinels"},
    "ISFJ": {"keywords": ["蓝色", "护士", "照顾"], "group": "sentinels"},
    "ESTJ": {"keywords": ["蓝色", "管理者", "秩序"], "group": "sentinels"},
    "ESFJ": {"keywords": ["蓝色", "蛋糕", "庆祝"], "group": "sentinels"},
    
    # 探险家 - 黄色系
    "ISTP": {"keywords": ["黄色", "工匠", "工具"], "group": "explorers"},
    "ISFP": {"keywords": ["黄色", "画家", "艺术"], "group": "explorers"},
    "ESTP": {"keywords": ["黄色", "商人", "交易"], "group": "explorers"},
    "ESFP": {"keywords": ["黄色", "跳舞", "表演"], "group": "explorers"}
}

def get_group_info(mbti_type):
    """获取人格类型所属组信息"""
    for group_name, group_data in groups.items():
        if mbti_type.upper() in group_data["types"]:
            return group_name, group_data["bg_color"]
    return None, (255, 255, 255)

def process_image(input_path, output_path, bg_color, target_size=800):
    """处理图片：裁剪、去水印、统一尺寸、加背景色"""
    try:
        img = Image.open(input_path)
        
        # 转换为RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        width, height = img.size
        print(f"    原尺寸: {width}x{height}")
        
        # 去除底部水印区域（假设水印在底部50像素）
        watermark_height = 60
        if height > target_size + watermark_height:
            img = img.crop((0, 0, width, height - watermark_height))
            height = height - watermark_height
        
        # 创建目标尺寸的新图像
        new_img = Image.new('RGBA', (target_size, target_size), (*bg_color, 255))
        
        # 计算缩放比例，保持人物在中心，留10%边距
        margin = 0.15
        available_space = target_size * (1 - margin * 2)
        scale = available_space / max(width, height)
        
        new_width = int(width * scale)
        new_height = int(height * scale)
        
        # 缩放原图
        img_resized = img.resize((new_width, new_height), Image.LANCZOS)
        
        # 计算居中位置
        x = (target_size - new_width) // 2
        y = (target_size - new_height) // 2
        
        # 粘贴到新背景
        new_img.paste(img_resized, (x, y), img_resized)
        
        # 转换为RGB保存
        final_img = Image.new('RGB', (target_size, target_size), bg_color)
        final_img.paste(new_img, mask=new_img.split()[3])
        final_img.save(output_path, 'JPEG', quality=95)
        
        return True
        
    except Exception as e:
        print(f"    处理失败: {e}")
        return False

def main():
    """主函数"""
    print("=" * 70)
    print("MBTI人格图片处理工具")
    print("=" * 70)
    print(f"\n输入目录: {input_dir}")
    print(f"输出目录: {output_dir}")
    
    if not os.path.exists(input_dir):
        print(f"\n错误: 输入目录不存在!")
        print(f"请先将图片放入 {input_dir} 目录")
        print("图片命名格式: ENFJ.jpg, ENFP.jpg, INTJ.jpg 等")
        return
    
    os.makedirs(output_dir, exist_ok=True)
    
    # 处理所有人格类型
    total_processed = 0
    
    for mbti_type in ["INTJ", "INTP", "ENTJ", "ENTP", 
                      "INFJ", "INFP", "ENFJ", "ENFP",
                      "ISTJ", "ISFJ", "ESTJ", "ESFJ",
                      "ISTP", "ISFP", "ESTP", "ESFP"]:
        
        group_name, bg_color = get_group_info(mbti_type)
        
        # 查找输入文件
        input_file = None
        for ext in ['.jpg', '.jpeg', '.png']:
            test_path = os.path.join(input_dir, f"{mbti_type}{ext}")
            if os.path.exists(test_path):
                input_file = test_path
                break
        
        if input_file:
            print(f"\n处理 {mbti_type} ({group_name})...")
            output_file = os.path.join(output_dir, f"{mbti_type}_main.jpg")
            if process_image(input_file, output_file, bg_color):
                total_processed += 1
                print(f"  ✓ 已保存")
        else:
            print(f"\n✗ 未找到: {mbti_type}.jpg/.png")
    
    print(f"\n{'=' * 70}")
    print(f"处理完成: {total_processed}/16 张图片")
    print(f"输出目录: {output_dir}")
    print("=" * 70)

if __name__ == "__main__":
    main()
