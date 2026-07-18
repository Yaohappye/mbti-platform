#!/usr/bin/env python3
"""
从对话中的图片URL下载并正确命名MBTI人格图片
"""
import requests
import os
from PIL import Image
from io import BytesIO

# 创建目录
os.makedirs('/workspace/projects/public/mbti-raw', exist_ok=True)
os.makedirs('/workspace/projects/public/mbti-characters', exist_ok=True)

# 图片序号到人格类型的映射（按您发送的顺序）
# 注意：实际使用时需要用真实的图片URL替换
mbti_types = [
    "ENFJ",   # 1. 绿色骑士
    "ENFP",   # 2. 绿色背包
    "ENTP",   # 3. 紫色演讲
    "ESFJ",   # 4. 青色蛋糕
    "ESFP",   # 5. 黄色跳舞
    "ISTJ",   # 6. 青色尺子
    "ESTP",   # 7. 黄色墨镜
    "INFJ",   # 8. 绿色智者
    "INFP",   # 9. 绿色女孩花
    "INTJ",   # 10. 紫色地图
    "INTP",   # 11. 紫色科学家
    "ENTJ",   # 12. 紫色女指挥官
    "ISFJ",   # 13. 青色护士
    "ISFP",   # 14. 黄色画家
    "ESTJ",   # 15. 青色文件笔
    "ISTP",   # 16. 黄色工匠
]

def download_and_save(url, filename):
    """下载图片并保存"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            # 转换为RGB（去除透明度）
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            img.save(filename, 'JPEG', quality=95)
            print(f"✅ 已保存: {filename} ({img.size[0]}x{img.size[1]})")
            return True
        else:
            print(f"❌ 下载失败 {filename}: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 错误 {filename}: {e}")
        return False

def copy_to_final(raw_path, final_path, mbti_type):
    """复制到最终目录"""
    try:
        from shutil import copy2
        final_file = os.path.join(final_path, f"{mbti_type}.jpg")
        copy2(raw_path, final_file)
        print(f"✅ 已复制到: {final_file}")
        return True
    except Exception as e:
        print(f"❌ 复制失败 {mbti_type}: {e}")
        return False

# 主流程
print("="*60)
print("MBTI 人格图片处理工具")
print("="*60)
print("\n请将16张图片上传到:")
print("/workspace/projects/public/mbti-raw/")
print("\n并按以下顺序命名:")
print("1.jpg, 2.jpg, 3.jpg, ..., 16.jpg")
print("\n然后运行此脚本，我会自动重命名并复制到网站目录。")
print("="*60)

# 检查是否有图片文件
raw_dir = '/workspace/projects/public/mbti-raw'
files = sorted([f for f in os.listdir(raw_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.webp'))])

if len(files) >= 16:
    print(f"\n发现 {len(files)} 张图片，开始处理...")
    success_count = 0
    
    for i, filename in enumerate(files[:16], 1):
        if i <= len(mbti_types):
            mbti_type = mbti_types[i-1]
            src_path = os.path.join(raw_dir, filename)
            
            # 重命名为正确的人格类型
            new_name = f"{mbti_type}.jpg"
            temp_path = os.path.join(raw_dir, new_name)
            
            # 如果文件名不对，重命名
            if filename != new_name:
                os.rename(src_path, temp_path)
                print(f"📝 重命名: {filename} -> {new_name}")
            else:
                temp_path = src_path
            
            # 复制到最终目录
            if copy_to_final(temp_path, '/workspace/projects/public/mbti-characters', mbti_type):
                success_count += 1
    
    print(f"\n{'='*60}")
    print(f"处理完成！成功: {success_count}/16")
    print(f"{'='*60}")
    
    if success_count == 16:
        print("\n🎉 所有图片已就绪！网站将自动使用新图片。")
        print("\n四组颜色分布:")
        print("  🟣 紫色组(分析师): INTJ, INTP, ENTJ, ENTP")
        print("  🟢 绿色组(外交官): INFJ, INFP, ENFJ, ENFP")
        print("  🔵 青色组(守护者): ISTJ, ISFJ, ESTJ, ESFJ")
        print("  🟡 黄色组(探险家): ISTP, ISFP, ESTP, ESFP")
else:
    print(f"\n⚠️ 当前目录只有 {len(files)} 张图片，需要16张。")
    print("请上传图片后重新运行此脚本。")
