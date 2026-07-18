#!/usr/bin/env python3
"""
检查MBTI题库中的重复和相似题目
"""
import re
from collections import defaultdict

# 读取题库文件
with open('/workspace/projects/src/data/mbti-questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有题目
pattern = r"\{ id: (\d+), content: ['\"](.+?)['\"], dimension: ['\"](\w+)['\"]"
matches = re.findall(pattern, content)

questions = []
for qid, content_text, dimension in matches:
    questions.append({
        'id': int(qid),
        'content': content_text,
        'dimension': dimension
    })

print(f"总共找到 {len(questions)} 道题目")
print("=" * 80)

# 检查完全重复的题目
content_dict = defaultdict(list)
for q in questions:
    content_dict[q['content']].append(q['id'])

exact_duplicates = {k: v for k, v in content_dict.items() if len(v) > 1}

if exact_duplicates:
    print("\n【完全重复的题目】")
    print("-" * 80)
    for content, ids in exact_duplicates.items():
        print(f"题目ID: {ids}")
        print(f"内容: {content}")
        print()
else:
    print("\n✅ 没有发现完全重复的题目")

# 检查相似题目（简单算法：检查是否包含相同的关键词组合）
print("\n" + "=" * 80)
print("【相似题目检查】")
print("-" * 80)

# 定义每个维度的关键词
keywords = {
    'EI': ['社交', '独处', '聚会', '精力', '外向', '内向', '交流', '沟通', '说话', '安静', '朋友', '陌生'],
    'SN': ['细节', '整体', '实际', '想象', '现实', '可能', '具体', '抽象', '事实', '直觉', '当下', '未来'],
    'TF': ['逻辑', '情感', '公平', '和谐', '客观', '主观', '理性', '感性', '原则', '人情', '批评', '决定'],
    'JP': ['计划', '灵活', '安排', '随性', '组织', '即兴', '清单', '步骤', '规则', '开放', '完成', '选择']
}

def get_dimension_keywords(content, dimension):
    """获取题目中包含的该维度关键词"""
    words = keywords.get(dimension, [])
    found = [w for w in words if w in content]
    return set(found)

# 按维度分组检查
for dim in ['EI', 'SN', 'TF', 'JP']:
    dim_questions = [q for q in questions if q['dimension'] == dim]
    print(f"\n{dim} 维度 ({len(dim_questions)} 题):")

    # 检查包含相同关键词的题目
    keyword_groups = defaultdict(list)
    for q in dim_questions:
        kw_set = frozenset(get_dimension_keywords(q['content'], dim))
        if kw_set:  # 只记录有关键词的
            keyword_groups[kw_set].append(q)

    # 找出可能相似的题目
    similar_found = False
    for kw_set, q_list in keyword_groups.items():
        if len(q_list) >= 2 and len(kw_set) >= 2:  # 至少2个相同关键词
            similar_found = True
            print(f"\n  相似关键词: {', '.join(kw_set)}")
            for q in q_list:
                print(f"    ID {q['id']}: {q['content']}")

    if not similar_found:
        print("  ✅ 未发现高度相似的题目")

# 统计各维度题目数量
print("\n" + "=" * 80)
print("【各维度题目统计】")
print("-" * 80)
for dim in ['EI', 'SN', 'TF', 'JP']:
    dim_questions = [q for q in questions if q['dimension'] == dim]
    print(f"{dim}: {len(dim_questions)} 题")

print("\n" + "=" * 80)
print("检查完成！")
