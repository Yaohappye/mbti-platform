#!/usr/bin/env python3
"""从PDF和DOCX文件中提取图片"""
import os
import fitz  # PyMuPDF
from docx import Document
import zipfile
import shutil

assets_dir = "/workspace/projects/assets"
output_dir = "/workspace/projects/public/mbti-characters"
os.makedirs(output_dir, exist_ok=True)

def extract_from_pdf(pdf_path, type_name):
    """从PDF中提取图片"""
    images = []
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc[page_num]
            image_list = page.get_images()
            for img_index, img in enumerate(image_list, start=1):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                # 保存图片
                img_filename = f"{type_name}_{page_num}_{img_index}.{image_ext}"
                img_path = os.path.join(output_dir, img_filename)
                with open(img_path, "wb") as f:
                    f.write(image_bytes)
                images.append(img_path)
        doc.close()
    except Exception as e:
        print(f"  PDF提取错误: {e}")
    return images

def extract_from_docx(docx_path, type_name):
    """从DOCX中提取图片"""
    images = []
    try:
        # 方法1: 直接解压docx获取媒体文件
        temp_dir = f"/tmp/{type_name}_docx"
        os.makedirs(temp_dir, exist_ok=True)
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        media_dir = os.path.join(temp_dir, "word", "media")
        if os.path.exists(media_dir):
            for idx, img_file in enumerate(sorted(os.listdir(media_dir))):
                src_path = os.path.join(media_dir, img_file)
                ext = os.path.splitext(img_file)[1]
                dst_filename = f"{type_name}_0_{idx}{ext}"
                dst_path = os.path.join(output_dir, dst_filename)
                shutil.copy2(src_path, dst_path)
                images.append(dst_path)
        
        # 清理临时目录
        shutil.rmtree(temp_dir, ignore_errors=True)
    except Exception as e:
        print(f"  DOCX提取错误: {e}")
    return images

# 处理所有文件
files = [
    ("ENFJ", "ENFJ_高级指南_中文翻译_20260704205940795.pdf", "pdf"),
    ("ENFP", "ENFP_高级指南_中文翻译_20260704205938275.docx", "docx"),
    ("ENTJ", "ENTJ_高级指南_中文翻译_20260704205941389.pdf", "pdf"),
    ("ENTP", "ENTP_辩论家_高级指南_20260704205937599.pdf", "pdf"),
    ("ESFJ", "ESFJ_高级指南_中文翻译_20260704205939139.pdf", "pdf"),
    ("ESFP", "ESFP_表演者_高级指南_20260704205939094.pdf", "pdf"),
    ("ESTJ", "ESTJ_高级指南_中文翻译_20260704205939672.docx", "docx"),
    ("ESTP", "ESTP_高级指南_中文翻译_20260704205940810.docx", "docx"),
    ("INFJ", "INFJ_高级指南_中文翻译_20260704205942959.pdf", "pdf"),
    ("INFP", "INFP_调停者_高级指南_20260704205942772.pdf", "pdf"),
    ("INTJ", "INTJ_高级指南_中文翻译.pdf", "pdf"),
    ("INTP", "INTP_高级指南_中文翻译.docx", "docx"),
    ("ISFJ", "ISFJ_高级指南_中文翻译.docx", "docx"),
    ("ISFP", "ISFP_高级指南_中文翻译_20260704205948177.docx", "docx"),
    ("ISTJ", "ISTJ_高级指南_中文翻译.pdf", "pdf"),
    ("ISTP", "ISTP_高级指南_中文翻译.pdf", "pdf"),
]

all_images = []
for type_name, filename, filetype in files:
    filepath = os.path.join(assets_dir, filename)
    if not os.path.exists(filepath):
        print(f"跳过: {filename} (不存在)")
        continue
    
    print(f"处理: {type_name} ({filetype})")
    if filetype == "pdf":
        imgs = extract_from_pdf(filepath, type_name)
    else:
        imgs = extract_from_docx(filepath, type_name)
    
    print(f"  提取了 {len(imgs)} 张图片")
    all_images.extend(imgs)

print(f"\n总共提取了 {len(all_images)} 张图片")
print(f"保存到: {output_dir}")

# 列出所有提取的图片
print("\n提取的图片列表:")
for img in sorted(os.listdir(output_dir)):
    size = os.path.getsize(os.path.join(output_dir, img))
    print(f"  {img} ({size/1024:.1f} KB)")
