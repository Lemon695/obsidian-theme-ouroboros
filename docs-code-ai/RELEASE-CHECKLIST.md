# Release Checklist — Ouroboros Obsidian Theme

> Purpose: a repeatable release gate for publishing Ouroboros as an Obsidian theme.
> Current repo version: `1.0.2`
> Last updated: 2026-05-21
> Owner: release owner / maintainer

This checklist does not publish by itself. It defines the evidence that must exist before a tag, GitHub Release, community-theme update, or public announcement.

---

## 0. Release candidate header

| Field | Value |
|-------|-------|
| Release version |  |
| Release branch |  |
| Release commit |  |
| Previous tag |  |
| Obsidian app version used for QA |  |
| Test vault path |  |
| Release owner |  |
| Result | Pass / Conditional / Fail |

Release notes draft:

```text
Summary:

Highlights:
- _TBD_

Fixes:
- _TBD_

Known limitations:
- Copy/adapt `docs-code-ai/KNOWN-LIMITATIONS.md` section 1.
```

---

## 1. Release-blocking policy

Do not tag or publish if any item is true:

- [ ] `npm run check` fails.
- [ ] `theme.css` is out of sync with `src/*.css`.
- [ ] `manifest.json`, `package.json`, `versions.json`, `src/00-header.css`, or `theme.css` disagree on the release version.
- [ ] `screenshot.png` is missing, wrong aspect ratio, or no longer represents the README screenshot.
- [ ] `README.md` / `README_CN.md` describe features not covered by preview fixtures or conservative compatibility notes.
- [ ] `preview/CHECKLIST.md` has not been run for the release candidate.
- [ ] M5-4 plugin compatibility audit still contradicts the README support list.
- [ ] `docs-code-ai/KNOWN-LIMITATIONS.md` is missing, not linked from README/README_CN, or not copied into release notes.
- [ ] The release workflow fails and no manual upload fallback is completed.

---

## 2. Official / external release reference snapshot

Verified on 2026-05-21:

- Obsidian's public releases repo is the directory source for community plugins and themes, and links to the theme submission guide.
- The official sample theme states that a theme repo should contain root `theme.css`, `manifest.json`, `versions.json`, and a screenshot thumbnail.
- The sample theme recommends a 16:9 screenshot, size 512×288.
- For GitHub Releases, the sample theme release flow uploads `manifest.json` and `theme.css`, and `versions.json` maps theme versions to compatible Obsidian min versions.

Sources:

- https://github.com/obsidianmd/obsidian-releases
- https://github.com/obsidianmd/obsidian-sample-theme

---

## 3. Scope freeze and repo hygiene

- [ ] `git status --short` is clean before release prep starts.
- [ ] All intended code/docs changes are already committed.
- [ ] No unreviewed generated files are present.
- [ ] No local vault paths, personal paths, or machine-specific absolute links remain in README/docs.
- [ ] `README.md`, `README_CN.md`, `preview/README.md`, and `docs-code-ai/CONTEXT-HANDOFF.md` point to the next correct milestone.
- [ ] Any release-risk follow-up is captured in `docs-code-ai/Tasks.md` or `docs-code-ai/BUG-TRACKER.md`.

Evidence:

```bash
git status --short
rg -n "/Users/|/Volumes/|C:\\\\|TODO release|FIXME release" README.md README_CN.md preview src docs-code-ai --glob '!RELEASE-CHECKLIST.md' || true
```

---

## 4. Version bump gate

Only run this section when creating a new release version. Do not bump versions during ordinary milestone work.

1. Update `package.json` version intentionally.
2. Run the project version helper:

```bash
npm run version
```

3. Confirm these are synchronized:

- [ ] `package.json` `version`
- [ ] `manifest.json` `version`
- [ ] `versions.json` includes the new version key with `manifest.json.minAppVersion` as value
- [ ] `src/00-header.css` banner version
- [ ] `theme.css` banner version

Evidence:

```bash
node - <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const versions = JSON.parse(fs.readFileSync('versions.json', 'utf8'));
console.log({ package: pkg.version, manifest: manifest.version, minAppVersion: manifest.minAppVersion, versionsEntry: versions[manifest.version] });
NODE
```

---

## 5. Automated build and static validation

Run from repo root:

```bash
npm run build
npm run check
node --check check-theme.mjs
node --check build-theme.mjs
node --check sync-theme-to-vault.mjs
git diff --check
```

Additional release sync check:

```bash
python3 - <<'PY'
from pathlib import Path
import struct

def png_size(path):
    data = Path(path).read_bytes()
    if not data.startswith(b'\x89PNG\r\n\x1a\n'):
        raise AssertionError(f'{path} is not a PNG')
    width, height = struct.unpack('>II', data[16:24])
    return width, height

for path in ['README.md', 'README_CN.md']:
    text = Path(path).read_text()
    assert './screenshot.png' in text, f'{path} must reference ./screenshot.png'
    assert '/Users/' not in text, f'{path} contains a local absolute path'
assert png_size('screenshot.png') == (512, 288), f'screenshot.png size mismatch: {png_size("screenshot.png")}'
assert png_size('_resources/img/image-comparison-v1.png')[0] >= 512, 'high-resolution screenshot source is unexpectedly small'
for path in ['README.md', 'README_CN.md']:
    text = Path(path).read_text()
    assert 'docs-code-ai/KNOWN-LIMITATIONS.md' in text, f'{path} must link known limitations'
assert Path('docs-code-ai/KNOWN-LIMITATIONS.md').exists(), 'known limitations doc is missing'
print('release asset and known limitations sync check passed')
PY
```

Pass/fail:

- [ ] Build command passes.
- [ ] Theme check passes.
- [ ] Node syntax checks pass.
- [ ] Whitespace check passes.
- [ ] Release asset and known limitations sync check passes.

---

## 6. Manual preview QA gate

Use `preview/CHECKLIST.md` as the canonical manual visual QA artifact.

```bash
npm run sync:vault -- /path/to/test-vault --preview
```

Required sign-off before release:

- [ ] Light mode pass complete.
- [ ] Dark mode pass complete.
- [ ] Style Settings variants pass complete.
- [ ] Core Obsidian UI pass complete.
- [ ] Knowledge workflow pass complete.
- [ ] Plugin / workbench pass complete.
- [ ] Mobile/accessibility pass complete or explicitly not-tested with reason.
- [ ] README / screenshot sync pass complete.
- [ ] Regression flags reviewed.
- [ ] Visual QA row signed.
- [ ] Release owner row signed.

Evidence file / notes:

```text
preview/CHECKLIST.md run location or copied evidence:

```

---

## 7. Plugin compatibility gate

Use `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` before tagging.

- [ ] README/README_CN support wording matches the audit tiers.
- [ ] `src/08-plugin-compat.css` contains only official ids or documented companion ids.
- [ ] Tier A preview-covered surfaces have preview/checklist evidence.
- [ ] Tier B selector-level integrations do not claim full preview coverage.
- [ ] Legacy DB Folder remains selector-only and is not added to `src/08-plugin-compat.css` until an official id and live DOM are confirmed.
- [ ] Fragile selector registry has no unowned high-risk selector.
- [ ] Any remaining limitation is copied into `docs-code-ai/KNOWN-LIMITATIONS.md` and the release notes known-limitations block.

---

## 8. Release artifact checklist

Before tag/release, confirm these files exist and represent the release candidate:

| Artifact | Required | Purpose | Result |
|----------|----------|---------|--------|
| `theme.css` | Yes | Main theme file uploaded to release |  |
| `manifest.json` | Yes | Theme metadata uploaded to release |  |
| `versions.json` | Yes | Obsidian version compatibility map in repo |  |
| `screenshot.png` | Yes | 512×288 community theme preview |  |
| `README.md` | Yes | Theme detail page / repo docs |  |
| `README_CN.md` | Yes | Chinese user docs |  |
| `LICENSE` | Yes | License metadata |  |
| `_resources/img/image-comparison-v1.png` | Yes | High-resolution screenshot source |  |
| `preview/CHECKLIST.md` | Yes | Manual QA evidence gate |  |
| `docs-code-ai/RELEASE-CHECKLIST.md` | Yes | Release operation gate |  |
| `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` | Yes | Plugin support tier and fragile selector evidence |  |
| `docs-code-ai/KNOWN-LIMITATIONS.md` | Yes | Public known limitations and unsupported plugin claims |  |

---

## 9. Git tag and GitHub Release gate

The existing workflow `.github/workflows/release-version.yml` creates a GitHub Release on tag push and uploads `manifest.json` plus `theme.css`.

Before pushing a tag:

- [ ] Tag name exactly matches `manifest.json.version` / `package.json.version`.
- [ ] The version has not already been published as a GitHub Release.
- [ ] Release notes are copied from the evidence block in this checklist.
- [ ] `theme.css` and `manifest.json` are the exact files from the release commit.
- [ ] If the GitHub Action fails, manually draft a GitHub Release and upload `manifest.json` and `theme.css`.

Commands:

```bash
VERSION=$(node -p "require('./manifest.json').version")
git tag "$VERSION"
git push origin "$VERSION"
```

Post-action verification:

- [ ] GitHub Release exists for the tag.
- [ ] `manifest.json` is attached.
- [ ] `theme.css` is attached.
- [ ] Release notes mention validation evidence and copy/adapt `docs-code-ai/KNOWN-LIMITATIONS.md` section 1.
- [ ] No unintended extra assets are attached.

---

## 10. Community theme directory gate

For first submission or screenshot/path metadata changes, prepare a PR to `obsidianmd/obsidian-releases` and verify the entry shape against the current upstream file.

Checklist:

- [ ] `community-css-themes.json` entry uses the exact theme name `Ouroboros`.
- [ ] `author` matches `manifest.json`.
- [ ] `repo` points to `Lemon695/obsidian-theme-ouroboros`.
- [ ] `screenshot` points to `screenshot.png` unless intentionally changed.
- [ ] `modes` includes both `dark` and `light`.
- [ ] If claiming Publish support, a separate Publish QA pass exists. Do not mark Publish support from app-theme QA alone.

Evidence:

```json
{
  "name": "Ouroboros",
  "author": "Lemon695",
  "repo": "Lemon695/obsidian-theme-ouroboros",
  "screenshot": "screenshot.png",
  "modes": ["dark", "light"]
}
```

---

## 11. Post-release smoke check

After release creation:

- [ ] Download `theme.css` and `manifest.json` from the GitHub Release.
- [ ] Install them into a disposable vault under `.obsidian/themes/Ouroboros/`.
- [ ] Select Ouroboros in Obsidian.
- [ ] Confirm the theme loads in light and dark mode.
- [ ] Confirm Style Settings still detects the theme settings block.
- [ ] Open at least `preview/core-showcase.md`, `preview/plugin-showcase.md`, and `preview/focus-mode-showcase.md`.
- [ ] Confirm the root screenshot renders in README on GitHub.
- [ ] If community theme directory metadata changed, confirm the theme detail page uses the expected screenshot after merge/refresh.

---

## 12. Rollback / hotfix plan

If a release is broken:

- [ ] Record the failure in `docs-code-ai/BUG-TRACKER.md` with version, Obsidian version, screenshot/evidence, and affected surfaces.
- [ ] Decide whether to publish a hotfix version or remove/replace the broken GitHub Release assets.
- [ ] If the issue is only README/screenshot metadata, fix docs/assets without version bump unless release assets are affected.
- [ ] If `theme.css` or `manifest.json` is affected, create a patch version and run this checklist again.
- [ ] Update `versions.json` only through the version helper or an intentional compatibility fix.

---

## 13. Final sign-off

| Gate | Owner | Result | Evidence |
|------|-------|--------|----------|
| Automated checks |  |  |  |
| Preview QA |  |  |  |
| Version sync |  |  |  |
| Release artifacts |  |  |  |
| GitHub Release |  |  |  |
| Community theme metadata |  |  |  |
| Post-release smoke |  |  |  |

Final decision:

```text
Release version:
Release commit:
Published tag:
Known limitations:
Next follow-up:
```
