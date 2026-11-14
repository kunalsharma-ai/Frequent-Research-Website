# Core rewrite tools (stages 2 and 3)

Used to move the compiled core (`core/core.js`) into readable React source in `src/app/`, without changing what
visitors see. Install once in a scratch folder: `npm i @babel/parser @babel/traverse @babel/generator @babel/types prettier esbuild`
(paths at the top of each script point at this project).

| Script | What it does |
|---|---|
| `rename.cjs map.json` | Renames core top-level names everywhere (core and every shared-scope file), editing only identifier positions |
| `delazy.cjs` | Replaces `ee.lazy(...)` page wrappers by the page component and prints the rename map |
| `extract.cjs src/app/X.jsx Name…` | Moves declarations out of the core into a JSX file (`EARLY=1` for data the core reads while starting) |
| `locals.cjs file '{"Fn":{"t":"name"}}'` | Readable local names, JSX clean-up (`!0` → `true`, comma sequences → statements), prettier |
| `deps.cjs Name…` | What a core name uses and who uses it |
| `cmp.cjs`, `pdiff.py` | Screenshot the same views on the reference build and the working build; pixel difference |

Every step: build, open the affected pages, compare screenshots, then the 995-page sweep (`tools/qa/sweep.js`).
Rename maps applied so far: `map1.json` (router), `map2.json` (pages, header, data), `map-lazy.json` (lazy pages).

## Stage 3 additions
| Script | What it does |
|---|---|
| `fixtypeof.cjs map.json…` | Renames `typeof Old` guards that `rename.cjs` misses (they hid page parts when left behind) |
| `closure.cjs Root` | Names only `Root` uses, directly or through each other: a page and its private sections |
| `stmtdeps.cjs Name` | What the statement declaring `Name` reads while the module starts, and who uses it |
| `evalrefs.cjs REGEX core.js` | Core statements that read matching names while the module starts, before or after the overlay slot (move them with their group) |
| `vrange.cjs`, `vfree.cjs`, `cutrange.cjs` | Find which names of a vendor-library range the rest of the site uses, then delete the range and import the npm package |
| `batch.cjs routes.txt [width] [n]` | Visible text, title, element count and script errors on the reference build (4191) and the working build (`B=`), for many routes |
| `tdiff.cjs route` | The lines of text that differ on one route |
| `pdfcmp.cjs A B outdir` | Makes the same ten PDFs on two QA builds (`FR_QA_HOOK=1 vite build`) and compares them, ignoring date and file ID |

## Stage 3, part 2: ES modules and clean-up
After this part the site is plain ES modules, so most tools above (which worked on `core/core.js` and the shared-scope
file list) are only kept as a record. The tools for the current source:

| Script | What it does |
|---|---|
| `esmify.cjs` | One-time conversion: split the core into modules, wrote the imports, exports and `src/main.jsx` |
| `relink.cjs [--check]` | Rewrites every module's generated imports and its `export { … }` line from what it declares and uses. Run after moving or renaming code |
| `esmcheck.cjs` | Start-up order check: a module that reads another module's value while starting must be evaluated after it |
| `freecheck.cjs` | Names used but declared nowhere (would throw when that code runs) |
| `esmrename.cjs map.json` | Renames top-level names across all modules (then run `relink.cjs`); maps used: `map-esm-posts.json`, `map-esm-names.json` |
| `destruct.cjs file…` | Gives destructured locals their property name back (`{ vertical: t }` → `{ vertical }`) |
| `deadcode.cjs [--force=a,b]` | Removes top-level declarations nothing uses (repeat with `relink.cjs` until it removes 0) |
| `typeofs.cjs` | Replaces the old `typeof X !== "undefined"` guards on imported names by `true` and folds the code around them |
| `mergelinks.cjs` | One link helper per service area in the blog posts instead of one copy per post |
| `shortnames.cjs` | Lists remaining short (minified-looking) top-level names |
| `movestmts.cjs` | Moves statements between modules |
| `popups.cjs URL`, `cc.cjs URL` | Checks that pop-ups (intro, video, product pop-up, country picker) are drawn on top of the page |
| `objsrc.cjs URL` | Finds images whose address became `[object Object]` |

`batch.cjs` now also fails a page when it has more broken images than the reference or a file request fails (404).
