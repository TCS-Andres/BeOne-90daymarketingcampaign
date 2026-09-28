"""Build every deliverable from the rendered slide PNGs."""
import io, os, re, subprocess, html
from PIL import Image
import slides as S

HERE = os.path.dirname(os.path.abspath(__file__))
PNG, JPG = os.path.join(HERE, "png"), os.path.join(HERE, "jpg")
GUIDE = os.path.abspath(os.path.join(HERE, "..", "facilitator",
                                     "Presenter-Guide_Part2_Slide-Notes.md"))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def compress():
    os.makedirs(JPG, exist_ok=True)
    for s in S.SLIDES:
        src = os.path.join(PNG, S.filename_for(s))
        dst = os.path.join(JPG, S.filename_for(s).replace(".png", ".jpg"))
        if os.path.exists(dst): continue
        Image.open(src).convert("RGB").resize((1920, 1080), Image.LANCZOS)\
             .save(dst, "JPEG", quality=88, optimize=True, progressive=True)

def notes_map():
    txt = io.open(GUIDE, encoding="utf8").read()
    out = {}
    for m in re.finditer(r"## Slide (\d+) · ([^\n]+)\n(.*?)(?=\n## |\n# |\Z)", txt, re.S):
        out[int(m.group(1))] = (m.group(2).strip(), m.group(3).strip())
    return out

def slides_pdf(path):
    imgs = [Image.open(os.path.join(JPG, S.filename_for(s).replace(".png", ".jpg"))).convert("RGB")
            for s in S.SLIDES]
    imgs[0].save(path, "PDF", save_all=True, append_images=imgs[1:], resolution=150.0)
    return os.path.getsize(path)

def md_inline(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", t)
    return t

def notes_block(body):
    out, quote = [], []
    def flush():
        if quote:
            out.append("<blockquote>" + "".join("<p>%s</p>" % md_inline(q) for q in quote) + "</blockquote>")
            quote.clear()
    for raw in body.split("\n"):
        line = raw.rstrip()
        if line.startswith(">"):
            q = line.lstrip("> ").strip()
            if q: quote.append(q)
            continue
        flush()
        if not line.strip(): continue
        if line.startswith("- "):
            out.append("<li>%s</li>" % md_inline(line[2:]))
        else:
            out.append("<p>%s</p>" % md_inline(line))
    flush()
    return "".join(out).replace("<li>", "<ul><li>").replace("</li>", "</li></ul>")\
                       .replace("</ul><ul>", "")

def notes_pdf(path):
    n = notes_map()
    css = """
    @page { size: letter portrait; margin: 0.45in 0.5in 0.55in; }
    *{box-sizing:border-box}
    body{font-family:"DM Sans","Helvetica Neue",Arial,sans-serif;color:#2B2B2B;font-size:9.5pt;line-height:1.5;margin:0}
    .slide{page-break-after:always}
    .slide:last-child{page-break-after:auto}
    .hdr{display:flex;align-items:baseline;gap:9px;margin-bottom:7px}
    .num{font-size:15pt;font-weight:700;color:#C8A24B;font-variant-numeric:tabular-nums}
    .ttl{font-size:13pt;font-weight:700;color:#16243D}
    .mode{margin-left:auto;font-size:7.5pt;font-weight:700;text-transform:uppercase;
          letter-spacing:.09em;color:#fff;padding:3px 9px;border-radius:99px}
    .m-P{background:#16243D}.m-C{background:#C0603A}.m-T{background:#C8A24B;color:#16243D}
    img{width:100%;border:1px solid #D7DEE8;border-radius:5px;display:block}
    .notes{margin-top:11px}
    .notes p{margin:0 0 6px}
    .notes strong{color:#16243D}
    .notes em{color:#5A6473}
    blockquote{margin:7px 0;padding:7px 12px;background:#FBF9F5;border-left:3px solid #C8A24B}
    blockquote p{margin:0 0 5px}blockquote p:last-child{margin:0}
    ul{margin:5px 0;padding-left:17px}li{margin-bottom:4px}
    .foot{position:fixed;bottom:0.18in;left:0;right:0;font-size:7pt;color:#5A6473;
          display:flex;justify-content:space-between}
    """
    parts = []
    for s in S.SLIDES:
        num, name, mode = s[0], s[1], s[2]
        title, body = n.get(num, (name.replace("-", " "), ""))
        title = re.sub(r"\s*·.*$", "", title).strip() or name.replace("-", " ")
        jpg = os.path.join(JPG, S.filename_for(s).replace(".png", ".jpg"))
        pill = ('<span class="mode m-%s">%s</span>' % (mode, S.MODE_NAME[mode])) if mode else ""
        parts.append(
            '<div class="slide"><div class="hdr"><span class="num">%02d</span>'
            '<span class="ttl">%s</span>%s</div>'
            '<img src="file://%s"><div class="notes">%s</div></div>'
            % (num, html.escape(title), pill, jpg, notes_block(body)))
    doc = ("<!DOCTYPE html><html><head><meta charset='utf-8'><title>Slides and Speaker Notes</title>"
           "<style>%s</style></head><body>%s</body></html>" % (css, "".join(parts)))
    tmp = path.replace(".pdf", "_tmp.html")
    io.open(tmp, "w", encoding="utf8").write(doc)
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--print-to-pdf=" + path, "file://" + tmp], capture_output=True)
    os.remove(tmp)
    return os.path.getsize(path)

if __name__ == "__main__":
    missing = [s[0] for s in S.SLIDES if not os.path.exists(os.path.join(PNG, S.filename_for(s)))]
    if missing:
        raise SystemExit("missing slides: %s" % missing)
    compress(); print("compressed")
    print("Slides.pdf                 %6.1f MB" % (slides_pdf(os.path.join(HERE,"Build-Your-90-Day-Plan_Slides.pdf"))/1e6))
    print("Slides-with-Notes.pdf      %6.1f MB" % (notes_pdf(os.path.join(HERE,"Build-Your-90-Day-Plan_Slides-with-Notes.pdf"))/1e6))
