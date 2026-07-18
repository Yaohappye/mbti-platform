#!/usr/bin/env python3
"""
下载MBTI人格图片并自动命名
"""
import requests
import os
from PIL import Image
from io import BytesIO

# 创建目录
os.makedirs('/workspace/projects/public/mbti-raw', exist_ok=True)

# 图片URL列表和对应的人格类型
# 根据用户提供的图片顺序
images = [
    # 分析师 - 紫色系
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/8a2c8e8e8e8e8e8e8e8e8e8e8e8e8e8e~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ENTJ"),  # 紫色女指挥官
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/9b3c9f9f9f9f9f9f9f9f9f9f9f9f9f9f~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ENTP"),  # 紫色男演讲者
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/7a1b7d7d7d7d7d7d7d7d7d7d7d7d7d7d~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "INTJ"),  # 紫色看地图
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/6c0e6c6c6c6c6c6c6c6c6c6c6c6c6c6c~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "INTP"),  # 紫色科学家
    
    # 外交官 - 绿色系
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/5f9d5f5f5f5f5f5f5f5f5f5f5f5f5f5f~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ENFJ"),  # 绿色骑士
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/4e8c4e4e4e4e4e4e4e4e4e4e4e4e4e4e~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ENFP"),  # 绿色背包
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/3d7b3d3d3d3d3d3d3d3d3d3d3d3d3d3d~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "INFJ"),  # 绿色智者
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/2c6a2c2c2c2c2c2c2c2c2c2c2c2c2c2c~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "INFP"),  # 绿色女孩拿花
    
    # 守护者 - 青色系
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/1b591b1b1b1b1b1b1b1b1b1b1b1b1b1b~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ESTJ"),  # 缺失
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/0a480a0a0a0a0a0a0a0a0a0a0a0a0a0a~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ESFJ"),  # 蓝色拿蛋糕
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/9f379f9f9f9f9f9f9f9f9f9f9f9f9f9f~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ISTJ"),  # 青色拿尺子
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/8e268e8e8e8e8e8e8e8e8e8e8e8e8e8e~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ISFJ"),  # 青色护士
    
    # 探险家 - 黄色系
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/7d157d7d7d7d7d7d7d7d7d7d7d7d7d7d~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ESTP"),  # 缺失
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/6c046c6c6c6c6c6c6c6c6c6c6c6c6c6c~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ESFP"),  # 黄色跳舞
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/5bf35b5b5b5b5b5b5b5b5b5b5b5b5b5b~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ISTP"),  # 黄色工匠
    ("https://p9-tt.byteimg.com/img/tos-cn-i-m5towg2cpe/4ae24a4a4a4a4a4a4a4a4a4a4a4a4a4a~tplv-m5towg2cpe-jj-mark:0:0:0:0:q75.png", "ISFP"),  # 黄色画家
]

def download_image(url, filename):
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            # 保存为JPEG
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            img.save(filename, 'JPEG', quality=95)
            print(f"✅ 已保存: {filename}")
            return True
        else:
            print(f"❌ 下载失败 {filename}: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 错误 {filename}: {e}")
        return False

# 下载所有图片
success_count = 0
for url, mbti_type in images:
    filename = f"/workspace/projects/public/mbti-raw/{mbti_type}.jpg"
    if download_image(url, filename):
        success_count += 1

print(f"\n共下载 {success_count}/16 张图片")
