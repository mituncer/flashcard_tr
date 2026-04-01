Adım 1: files.json ekle
main klasöre git
"Add file" → "Create new file"
Dosya adı: files.json
İçine: []
"Commit changes"

Adım2: Workflow dosyasını ekle
"Add file" → "Create new file"
Dosya adı kutusuna yaz: .github/workflows/update-files.yml
İçine şunu yapıştır:
name: Update file list

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Scan HTML files and generate files.json
        run: |
          echo "[" > files.json
          first=true
          for f in $(find . -maxdepth 1 -name "*.html" ! -name "index.html" | sort -r); do
            name="${f#./}"
            size=$(wc -c < "$f")
            date=$(git log -1 --format="%ci" -- "$f" 2>/dev/null | cut -d' ' -f1)
            if [ "$first" = true ]; then first=false; else echo "," >> files.json; fi
            echo "  {\"name\": \"$name\", \"size\": $size, \"date\": \"$date\"}" >> files.json
          done
          echo "]" >> files.json

      - name: Commit files.json
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add files.json
          git diff --staged --quiet || git commit -m "chore: update files.json [skip ci]"
          git push
