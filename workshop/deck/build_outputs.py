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
    """Turn a note block into large, scannable phone-readable HTML.

    Blockquotes stay as the talk track. Everything else becomes a bullet,
    because prose paragraphs are hard to find your place in on a phone.
    """
    out, quote, bullets = [], [], []

    def flush_quote():
        if quote:
            out.append('<div class="say"><div class="saylabel">SAY</div>'
                       + "".join("<p>%s</p>" % md_inline(q) for q in quote) + "</div>")
            quote.clear()

    def flush_bullets():
        if bullets:
            out.append("<ul>" + "".join("<li>%s</li>" % b for b in bullets) + "</ul>")
            bullets.clear()

    for raw in body.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue                      # a blank line never breaks a group
        if line.startswith(">"):
            flush_bullets()
            q = line.lstrip("> ").strip()
            if q:
                quote.append(q)
            continue
        flush_quote()
        if line.startswith("- "):
            bullets.append(md_inline(line[2:]))
        else:
            bullets.append(md_inline(line))
    flush_quote()
    flush_bullets()
    return "".join(out)

def notes_pdf(path):
    """Slide thumbnail plus big bulleted notes, on a narrow page so that
    fit-to-width on a phone gives genuinely readable text."""
    n = notes_map()
    css = """
    @page { size: 5in 8.5in; margin: 0.26in 0.28in 0.3in; }
    *{box-sizing:border-box}
    body{font-family:"DM Sans","Helvetica Neue",Arial,sans-serif;color:#1F2430;
         font-size:13.5pt;line-height:1.5;margin:0;-webkit-font-smoothing:antialiased}
    .slide{page-break-after:always}
    .slide:last-child{page-break-after:auto}
    .hdr{display:flex;align-items:baseline;gap:7px;margin-bottom:5px}
    .num{font-size:19pt;font-weight:700;color:#C8A24B;font-variant-numeric:tabular-nums;line-height:1}
    .ttl{font-size:16pt;font-weight:700;color:#16243D;line-height:1.15}
    .meta{display:flex;align-items:center;gap:7px;margin:0 0 9px}
    .mode{font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.08em;
          color:#fff;padding:3px 9px;border-radius:99px}
    .m-P{background:#16243D}.m-C{background:#C0603A}.m-T{background:#C8A24B;color:#16243D}
    .time{font-size:14pt;font-weight:700;color:#C0603A;font-variant-numeric:tabular-nums}
    img{width:72%;border:1px solid #D7DEE8;border-radius:4px;display:block;margin:0 0 10px}
    .say{background:#FBF6EA;border-left:5px solid #C8A24B;padding:10px 13px;margin:0 0 12px;border-radius:0 6px 6px 0}
    .saylabel{font-size:8.5pt;font-weight:700;letter-spacing:.14em;color:#B08C34;margin-bottom:5px}
    .say p{margin:0 0 8px;font-size:14.5pt;line-height:1.45;color:#16243D}
    .say p:last-child{margin:0}
    ul{margin:0 0 10px;padding-left:19px}
    li{margin-bottom:9px;line-height:1.45}
    li::marker{color:#C8A24B;font-size:1.1em}
    strong{color:#16243D;font-weight:700}
    em{color:#5A6473;font-style:normal}
    """
    parts = []
    for s in S.SLIDES:
        num, name, mode = s[0], s[1], s[2]
        title, body = n.get(num, (name.replace("-", " "), ""))
        title = re.sub(r"\s*·.*$", "", title).strip() or name.replace("-", " ")
        # pull the time out of the body so it can be shown large in the header
        tm = re.search(r"\*\*(\d{1,2}:\d{2})[^*]*\*\*", body)
        clock = tm.group(1) if tm else ""
        body = re.sub(r"^\*(Presentation|Computer work|Collaboration)\.\*\s*", "", body)
        body = re.sub(r"^\*\*\d{1,2}:\d{2}\.?\s*", "**", body, count=1)
        body = re.sub(r"^\*\*\*\*\s*", "", body)
        jpg = os.path.join(JPG, S.filename_for(s).replace(".png", ".jpg"))
        pill = ('<span class="mode m-%s">%s</span>' % (mode, S.MODE_NAME[mode])) if mode else ""
        clock_html = ('<span class="time">%s</span>' % clock) if clock else ""
        parts.append(
            '<div class="slide">'
            '<div class="hdr"><span class="num">%02d</span><span class="ttl">%s</span></div>'
            '<div class="meta">%s%s</div>'
            '<img src="file://%s">%s</div>'
            % (num, html.escape(title), pill, clock_html, jpg, notes_block(body)))
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
