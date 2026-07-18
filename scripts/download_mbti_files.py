#!/usr/bin/env python3
"""下载MBTI人格指南文件"""
import os
import urllib.request
import ssl

# 创建assets目录
assets_dir = "/workspace/projects/assets"
os.makedirs(assets_dir, exist_ok=True)

# 文件列表
files = [
    ("ENFJ_高级指南_中文翻译_20260704205940795.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FENFJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205940795.pdf&nonce=b00ef2a4-e80b-4154-828d-415de9a6f16f&project_id=7637876188157231156&sign=ea077bc13ec764fc8d96cb00e9b229f2d5f604e39b4e38b966daea866e460734"),
    ("ENFP_高级指南_中文翻译_20260704205938275.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FENFP_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205938275.docx&nonce=8383cac7-f3e6-4c97-aa1e-2bad65acbfdb&project_id=7637876188157231156&sign=1db67414cfe0742bbd6fff76c05d27270d5333b7647a21c9a44ac14fb719adfb"),
    ("ENTJ_高级指南_中文翻译_20260704205941389.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FENTJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205941389.pdf&nonce=809ca55d-0573-4d1d-9790-0f6b84558deb&project_id=7637876188157231156&sign=b0b84ed2af313f622b577dd85f92427cc4fe4c908ba71f40b5588ecba01c4273"),
    ("ENTP_辩论家_高级指南_20260704205937599.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FENTP_%E8%BE%A9%E8%AE%BA%E5%AE%B6_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_20260704205937599.pdf&nonce=bae21d00-49a4-4e6a-8563-a21ca49f85ae&project_id=7637876188157231156&sign=af5f495945f3bf0a3c987728cc4465f4673a29c0cbfef52fb1e87cfcfa1fec3e"),
    ("ESFJ_高级指南_中文翻译_20260704205939139.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FESFJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205939139.pdf&nonce=f3f14523-399c-412b-8922-6a1e312ff084&project_id=7637876188157231156&sign=b5155c9b540fea8f0db108e268a59696036a765cf11850f9a7635fdcdf61bed3"),
    ("ESFP_表演者_高级指南_20260704205939094.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FESFP_%E8%A1%A8%E6%BC%94%E8%80%85_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_20260704205939094.pdf&nonce=698a5d45-8613-49d1-84b0-4ef2cecba222&project_id=7637876188157231156&sign=c12269d7c3e7d3c0b38aeca5ea66d7bfb8818889d1c130a433e1d45d13d8e240"),
    ("ESTJ_高级指南_中文翻译_20260704205939672.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FESTJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205939672.docx&nonce=79fdabd7-bc45-488d-8539-79f1e094bf2e&project_id=7637876188157231156&sign=b8ecb3aca6cb605520fbcbf506f16d9f41b463d170e8194dc24208d9dffa976b"),
    ("ESTP_高级指南_中文翻译_20260704205940810.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FESTP_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205940810.docx&nonce=ef10ce5c-1452-403a-9fda-e5008d6d88c7&project_id=7637876188157231156&sign=3dc20bfb0a3e5f99b79aea84e564c63fb59eb39358368f56a4644f45064bf45d"),
    ("INFJ_高级指南_中文翻译_20260704205942959.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FINFJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205942959.pdf&nonce=2326ff12-dd27-424c-a571-067896b892a7&project_id=7637876188157231156&sign=503d2f7bde0d4a3e9582d3467f73e6624fd6cd82d1815bd03aae7f50156e8812"),
    ("INFP_调停者_高级指南_20260704205942772.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FINFP_%E8%B0%83%E5%81%9C%E8%80%85_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_20260704205942772.pdf&nonce=458be519-913e-49d7-a39b-e0902be10edf&project_id=7637876188157231156&sign=456f1e43fa10c7049d628a1a2e313070ca8887f2b6544754c5a142c32db4d35f"),
    ("INTJ_高级指南_中文翻译.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FINTJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.pdf&nonce=94b941ba-e339-4b5f-b876-26693f30f839&project_id=7637876188157231156&sign=3d1aee9d0a1cc8b4b18aa43580cb9fc3f79add8f2a0a804b5b65623528613ff5"),
    ("INTP_高级指南_中文翻译.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FINTP_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.docx&nonce=eac0c059-6ac1-40b6-b9ac-c9ee3f93de7d&project_id=7637876188157231156&sign=630f6571acee26d47d6d92da1087edeba7e302ba57f3b0636579b2c3f350836b"),
    ("ISFJ_高级指南_中文翻译.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FISFJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.docx&nonce=9c6d4e54-b2af-4034-8244-fe9e7a9d78cc&project_id=7637876188157231156&sign=e861cf5bcdee48575bcc01d56394cd4b229c5da5a9d496d8085163c97d5052e1"),
    ("ISFP_高级指南_中文翻译_20260704205948177.docx", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FISFP_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91_20260704205948177.docx&nonce=882eca87-9181-4673-87c7-4062d466affb&project_id=7637876188157231156&sign=9241a73586b86c4aaba28658c28bccbe364d0f7582a1e143916d9c8671c96634"),
    ("ISTJ_高级指南_中文翻译.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FISTJ_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.pdf&nonce=4a4d39b8-bb81-4011-b7fa-d997bf329e8e&project_id=7637876188157231156&sign=03807ce4e5f68b2fd1810f84bebf85f2a2a8b7c9dde2ef1d4e8563f78a35db2a"),
    ("ISTP_高级指南_中文翻译.pdf", "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2FISTP_%E9%AB%98%E7%BA%A7%E6%8C%87%E5%8D%97_%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.pdf&nonce=e86a3458-468e-41c7-b974-329d27102cfd&project_id=7637876188157231156&sign=8f84d93f1595770787dd6a92333aba226983ffd1ed22f7f9c9c7af7776c8bbce"),
]

# 创建SSL上下文
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# 下载文件
for filename, url in files:
    filepath = os.path.join(assets_dir, filename)
    if os.path.exists(filepath):
        print(f"已存在: {filename}")
        continue
    try:
        print(f"下载: {filename}")
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, context=ssl_context, timeout=60) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print(f"完成: {filename}")
    except Exception as e:
        print(f"错误 {filename}: {e}")

print("\n下载完成!")
