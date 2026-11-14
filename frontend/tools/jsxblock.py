# Extract a top-level JSX section element (the one whose props contain id="ID" or label="ID") from a page file.
# Usage: python3 jsxblock.py file.jsx ID [ID...]  -> prints the blocks, separated by blank lines.
import sys,re
def block(s, key):
    i = s.find(f'id="{key}"')
    if i < 0: i = s.find(f'label="{key}"')
    if i < 0: i = s.find(key)
    if i < 0: raise SystemExit('not found: '+key)
    j = i + (len(key) + 1 if key.startswith('<') else 0)
    while True:
        st = s.rfind('\n      <', 0, j) + 1        # element start at 6-space indent
        m = re.match(r'      <([A-Za-z][A-Za-z0-9_]*)', s[st:])
        if m: break
        j = st - 1
    tag = m.group(1)
    # self-closing if '/>' at 6-space indent comes before '</tag>'
    sc = s.find('\n      />', st)
    cl = s.find(f'\n      </{tag}>', st)
    one = s.find('/>', st)
    line_end = s.find('\n', st)
    if one != -1 and one < line_end:  # one-line element
        return s[st:line_end]
    if cl != -1 and (sc == -1 or cl < sc):
        end = cl + len(f'\n      </{tag}>')
    else:
        end = sc + len('\n      />')
    return s[st:end]
if __name__ == '__main__':
    s = open(sys.argv[1]).read()
    print('\n'.join(block(s, k) for k in sys.argv[2:]))
