import os
import json

def generate_sidebar(dir_path, output_file):
    def traverse_directory(current_path, indent_level):
        sidebar_contents = []
        for item in sorted(os.listdir(current_path)):
            if item.startswith('_') or item.startswith('.'):
                continue
            item_path = os.path.join(current_path, item)
            item_caption = get_name(item)
            print("item:",item)
            print("\titem_path:",item_path)
            print("\titem_caption:",item_caption)
            if os.path.isdir(item_path):
                if has_same_name_in_folder(item_path):
                    relative_path = os.path.relpath(item_path, dir_path).replace("\\", "/")
                    sidebar_contents.append('  ' * indent_level + f"* [{item_caption}](/{relative_path}/{item}.md)\n")
                    # sidebar_contents.append('  ' * indent_level + f"* [{item_caption}]({dir_path.replace("\\", "/")}/{item}.md)\n")
                else:
                    sidebar_contents.append('  ' * indent_level + f"* {item_caption}\n")
                sidebar_contents+=traverse_directory(item_path, indent_level + 1)
            elif item.endswith('.md'):
                if get_name(item) != get_name(current_path):
                    relative_path = os.path.relpath(item_path, dir_path).replace("\\", "/")
                    sidebar_contents.append('  ' * indent_level + f"* [{item_caption}](/{relative_path})\n")
                    # sidebar_contents.append('  ' * indent_level + f"* [{item_caption}]({dir_path.replace("\\", "/")})\n")
        return sidebar_contents

    sidebar_contents = traverse_directory(dir_path, 0)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("<!-- docs/_sidebar.md -->\n\n* [首页](/)\n")
        f.writelines(sidebar_contents)

def has_same_name_in_folder(folder_path):
    for item in os.listdir(folder_path):
        return get_name(item) == get_name(os.path.basename(folder_path))

def get_name(filepath):
    filename = os.path.basename(filepath)
    filedir = os.path.dirname(filepath)
    fullname = os.path.splitext(filename)[0]
    # filedir中是否存在_chn_rename.json文件，如果存在，则取其中的name值作为文件名, ## utf-8编码
    print("path:",filepath,"dir:",filedir)
    if os.path.exists(os.path.join(filedir, '_chn_rename.json')): 
        print("_chn_rename:",os.path.join(filedir, '_chn_rename.json'))
        with open(os.path.join(filedir, '_chn_rename.json'), 'r', encoding='utf-8') as f:
            chn_rename_dict = json.load(f)
        if fullname in chn_rename_dict:
            fullname = chn_rename_dict[fullname]
    ## 如果_前面有数字编号，则取[1:]
    if '_' in fullname:
        first_part = fullname.split('_')[0]
        if first_part.isdigit():  # 检查第一个部分是否为数字
            return '_'.join(fullname.split('_')[1:])  # 取数字编号后的部分
    return fullname  # 如果没有数字编号，则返回原名

generate_sidebar("docs", "docs/_sidebar.md")
