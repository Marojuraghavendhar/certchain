import re
import os

html_path = r'c:\Users\Maroju Raghavendhar\Desktop\CertiChain 2.0\student_dashboard.html'
jsx_path = r'c:\Users\Maroju Raghavendhar\Desktop\CertiChain 2.0\react-preview\src\components\PremiumDashboard.jsx'

# 1. Update text sizes in student_dashboard.html (+3px to all explicit px text classes)
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

def bump(match):
    num = int(match.group(1))
    return f"text-[{num + 3}px]"

new_content = re.sub(r'text-\[(\d+)px\]', bump, content)

# 2. Update specific sizes like 'text-xs' and 'text-sm' in student_dashboard.html
new_content = new_content.replace('text-xs', 'text-sm').replace('text-sm', 'text-base').replace('text-base', 'text-lg')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

# 3. Update text sizes in PremiumDashboard.jsx
with open(jsx_path, 'r', encoding='utf-8') as f:
    jsx_content = f.read()

jsx_content = jsx_content.replace('text-xs ', 'text-sm ').replace('text-sm ', 'text-base ')

with open(jsx_path, 'w', encoding='utf-8') as f:
    f.write(jsx_content)

print("Font sizes successfully bumped!")
