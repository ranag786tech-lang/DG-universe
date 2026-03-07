## 2025-05-14 - [Ace Editor replaceAll vs manual split/join]
**Learning:** For extremely large documents (e.g., 1MB with 80k occurrences), Ace Editor's `editor.replaceAll()` can be significantly slower (~50s) than manual `setValue(content.split().join())` (~20ms). This is likely due to Ace's overhead in managing many individual change events or undo stack operations for each replacement.
**Action:** Prefer manual `setValue` for bulk replacements in large documents if performance is a priority over granular undo history, but always include a dirty check to avoid redundant DOM/editor updates.
