name: Build Static Assets (Images)

on:
  workflow_dispatch: {}
  push:
    paths:
      - "docs/index.html"
      - "scripts/build_images_from_wikimedia.cjs"

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 180

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install deps for image processing
        run: |
          npm init -y
          npm install sharp@0.32

      - name: Build images + manifest from Wikimedia
        run: |
          node scripts/build_images_from_wikimedia.cjs

      - name: Commit & push if changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config user.name "github-actions[bot]"
            git config user.email "github-actions[bot]@users.noreply.github.com"
            git add docs/assets docs/images_map.json
            git commit -m "chore(assets): fetch Wikimedia images + update manifest"
            git push
          else
            echo "No changes to commit."
          fi
