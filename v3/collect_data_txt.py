from pathlib import Path

def build_code_txt_for_extension(folder: Path, extension: str) -> None:
    output_file = folder / f"{extension}_Code.txt"

    # Filter and sort files
    matching_files = sorted(
        [f for f in folder.iterdir() if f.is_file() and f.suffix.lower() == f".{extension.lower()}"],
        key=lambda x: x.name.lower()
    )

    if not matching_files:
        print(f"No files found for extension: .{extension}")
        return

    parts = []

    # 1. Build Table of Contents
    parts.append(f"=== TABLE OF CONTENTS: {extension.upper()} FILES ===")
    for i, file_path in enumerate(matching_files, 1):
        parts.append(f"{i}. {file_path.name}")
    parts.append("=" * 40)
    parts.append("")

    # 2. Append File Contents
    for file_path in matching_files:
        filename = file_path.name
        
        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = file_path.read_text(encoding="utf-8", errors="replace")

        # Clear markers for the AI to parse
        parts.append(f"--- FILE: {filename} ---")
        parts.append(content)
        parts.append("-" * (len(filename) + 12)) # Dynamic footer line
        parts.append("") # Spacer between files

    final_content = "\n".join(parts)
    output_file.write_text(final_content, encoding="utf-8")
    print(f"Saved: {extension} Code.txt")

def main():
    # Using .parent to ensure it runs relative to the script location
    current_folder = Path(__file__).resolve().parent

    extensions = ["css", "js", "html"]

    for ext in extensions:
        build_code_txt_for_extension(current_folder, ext)

if __name__ == "__main__":
    main()