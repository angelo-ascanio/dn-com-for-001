from pathlib import Path

def build_code_txt_for_extension(folder: Path, extension: str) -> None:
    output_file = folder / f"{extension} Code.txt"

    matching_files = sorted(
        [f for f in folder.iterdir() if f.is_file() and f.suffix.lower() == f".{extension.lower()}"],
        key=lambda x: x.name.lower()
    )

    parts = []

    for file_path in matching_files:
        filename = file_path.name

        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = file_path.read_text(encoding="utf-8", errors="replace")

        parts.append(f"**** {filename} ****")
        parts.append(content)
        parts.append(f"**** /{filename} ****")
        parts.append("")

    final_content = "\n".join(parts)
    output_file.write_text(final_content, encoding="utf-8")
    print(f"Saved: {output_file}")

def main():
    current_folder = Path(__file__).resolve().parent

    extensions = ["css", "js", "html"]

    for ext in extensions:
        build_code_txt_for_extension(current_folder, ext)

if __name__ == "__main__":
    main()