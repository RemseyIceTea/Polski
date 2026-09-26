import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

with open('js/tailwind.min.js', 'r', encoding='utf-8') as f:
    tailwind_js = f.read()

# 1. Replace Tailwind script & fallback
tailwind_pattern = r'<script src="js/tailwind\.min\.js"></script>\s*<script>\s*if \(typeof tailwind === \'undefined\'\) \{[\s\S]*?\}\s*</script>'
match_tw = re.search(tailwind_pattern, html)
if match_tw:
    html = html[:match_tw.start()] + '<script>\n' + tailwind_js + '\n</script>' + html[match_tw.end():]
    print('Tailwind replaced successfully')
else:
    print('ERROR: tailwind pattern not found')

# 2. Replace CSS link
css_link = '<link rel="stylesheet" href="css/style.css">'
if css_link in html:
    html = html.replace(css_link, '<style>\n' + css + '\n</style>')
    print('CSS replaced successfully')
else:
    print('ERROR: css link not found')

# 3. Replace scripts
scripts_pattern = r'<!-- Scripts -->\s*<script src="js/data\.js"></script>\s*<script src="js/app\.js"></script>'
match_scripts = re.search(scripts_pattern, html)
if match_scripts:
    replacement = '<!-- Scripts (100% Offline Single File) -->\n  <script>\n' + data_js + '\n  </script>\n  <script>\n' + app_js + '\n  </script>'
    html = html[:match_scripts.start()] + replacement + html[match_scripts.end():]
    print('Scripts replaced successfully')
else:
    print('ERROR: scripts pattern not found')

with open('MaturaPolski100_Jeden_Plik.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('SUCCESS: MaturaPolski100_Jeden_Plik.html generated! Total chars:', len(html))
