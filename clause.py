import csv
import json
import re

# Input CSV and output JSON file
csv_file = "Clause 9001+14001+45001+22000 es.csv"
json_file = "clauses.json"

data = {}

# Regex to capture {clause_...} and replace with {{...}}
pattern = re.compile(r"\{clause_([0-9a-zA-Z\.\-]+)\}")

def parse_explicit(value: str):
    """Return a typed explicit value or None if empty."""
    if value is None:
        return None
    v = value.strip()
    if v == "":
        return None
    # Try to convert to int, then float, then bool-like, otherwise keep string
    if v.isdigit():
        return int(v)
    try:
        f = float(v)
        return f
    except Exception:
        pass
    low = v.lower()
    if low in ("true", "yes", "y", "1"):
        return True
    if low in ("false", "no", "n", "0"):
        return False
    return v

with open(csv_file, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        standard = row.get("Standard", "").strip()
        clause = row.get("Clause", "").strip()
        title = row.get("title", "").strip()
        content = row.get("content", "")

        # Replace placeholders like {clause_4.2.b} → {{4.2.b}}
        content = pattern.sub(r"{{\1}}", content)

        if not standard or not clause:
            # skip malformed rows
            continue

        if standard not in data:
            data[standard] = {}

        entry = {
            "title": title,
            "content": content
        }

        # Add explicit only when present and non-empty
        if "explicit" in row:
            explicit_val = parse_explicit(row.get("explicit"))
            if explicit_val is not None:
                entry["explicit"] = explicit_val

        data[standard][clause] = entry

# Export JSON
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"JSON exported to {json_file}")