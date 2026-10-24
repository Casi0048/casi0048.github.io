#!/usr/bin/env python3
import re
from pathlib import Path

IN  = Path("sitemap.xml")
OUT = Path("sitemap-clean.xml")

if not IN.exists():
    raise SystemExit("sitemap.xml non trovato")

xml = IN.read_text(encoding="utf-8")
n_start = len(re.findall(r'<url>', xml))

xml = re.sub(
    r'<loc>(https://www\.echidisofia\.org)((?:/[^<]*)?/)index\.html</loc>',
    r'<loc>\1\2</loc>',
    xml
)

blocks = re.findall(r'<url>.*?</url>', xml, re.DOTALL)

seen, unique = set(), []
for b in blocks:
    m = re.search(r'<loc>([^<]+)</loc>', b)
    if not m:
        continue
    loc = m.group(1)
    if loc in seen:
        continue
    seen.add(loc)
    b = re.sub(r'\s*<lastmod>[^<]*</lastmod>', '', b)
    b = re.sub(r'\s*<priority>[^<]*</priority>', '', b)
    unique.append(b.strip())

body = "\n".join("  " + b for b in unique)
ns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
if "xhtml:link" in body:
    ns += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"'
header = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset {ns}>\n'
OUT.write_text(header + body + "\n</urlset>\n", encoding="utf-8")

print(f"Entry originali:      {n_start}")
print(f"Entry dopo dedup:     {len(unique)}")
print(f"Rimosse (duplicati):  {n_start - len(unique)}")
print(f"Scritto:              {OUT}")

bad = [u for u in seen if not u.startswith("https://www.echidisofia.org/")]
if bad:
    print(f"\nATTENZIONE: {len(bad)} URL non canonici (primi 10):")
    for u in bad[:10]:
        print("  " + u)
