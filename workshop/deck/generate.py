import json, os, sys, time, urllib.request, urllib.error
import slides

KEY = os.environ["KIE_KEY"]
CREATE = "https://api.kie.ai/api/v1/jobs/createTask"
POLL   = "https://api.kie.ai/api/v1/jobs/recordInfo?taskId="
OUT    = os.path.join(os.path.dirname(os.path.abspath(__file__)), "png")
os.makedirs(OUT, exist_ok=True)

def req(url, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    r = urllib.request.Request(url, data=data, method="POST" if data else "GET",
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=120) as f:
        return json.loads(f.read().decode())

def create(prompt):
    res = req(CREATE, {"model": "gpt-image-2-text-to-image",
        "input": {"prompt": prompt, "aspect_ratio": "16:9",
                  "resolution": "2K"}})
    if res.get("code") != 200:
        raise RuntimeError("create failed: %s" % res)
    return res["data"]["taskId"]

def wait(task_id, timeout=900):
    t0 = time.time()
    while time.time() - t0 < timeout:
        res = req(POLL + task_id)
        d = res.get("data") or {}
        st = d.get("state")
        if st == "success":
            return json.loads(d["resultJson"])["resultUrls"][0]
        if st == "fail":
            raise RuntimeError("task failed: %s %s" % (d.get("failCode"), d.get("failMsg")))
        time.sleep(6)
    raise TimeoutError("timed out: " + task_id)

def download(url, path):
    with urllib.request.urlopen(url, timeout=300) as f, open(path, "wb") as g:
        g.write(f.read())

def run(nums):
    todo = [s for s in slides.SLIDES if s[0] in nums]
    # phase 1: submit all
    tasks = []
    for s in todo:
        path = os.path.join(OUT, slides.filename_for(s))
        if os.path.exists(path) and os.path.getsize(path) > 10000:
            print("skip (exists) %s" % slides.filename_for(s), flush=True)
            continue
        try:
            tid = create(slides.prompt_for(s))
            tasks.append((s, tid))
            print("submitted %2d %s -> %s" % (s[0], s[1], tid), flush=True)
        except Exception as e:
            print("SUBMIT ERROR %2d %s: %s" % (s[0], s[1], e), flush=True)
        time.sleep(1.5)
    # phase 2: collect
    ok = fail = 0
    for s, tid in tasks:
        try:
            url = wait(tid)
            path = os.path.join(OUT, slides.filename_for(s))
            download(url, path)
            print("DONE %2d %s (%d KB)" % (s[0], s[1], os.path.getsize(path)//1024), flush=True)
            ok += 1
        except Exception as e:
            print("FAIL %2d %s: %s" % (s[0], s[1], e), flush=True)
            fail += 1
    print("\nfinished: %d ok, %d failed" % (ok, fail), flush=True)

if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "all"
    nums = set(range(1, 99)) if arg == "all" else {int(x) for x in arg.split(",")}
    run(nums)
