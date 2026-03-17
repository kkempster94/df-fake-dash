# Project Rules & Conventions

## Purpose
Demo/fake infrastructure identity management portal (SPIFFE/SPIRE-style). Built to showcase a next-gen dashboard for managing infrastructure identity relationships and access patterns.

---

## Stack
- **Vite** — build system (not CRA, not Next.js)
- **React + TypeScript** — strict mode, no `any`
- **Tailwind CSS v3** — utility-class styling only
- **Recharts** — all data visualization
- **@tanstack/react-query v5** — all async data fetching; hooks in `src/lib/queries.ts` hit the Fastify backend via `fetch`
- **Fastify backend** — `backend/server.ts`, runs on port 3001 (`npm run server`); Vite proxies `/api` → `http://localhost:3001` in dev
- **pino-pretty** — required peer dep for Fastify logger transport; must be installed
- **lucide-react** — all icons (do not add other icon libraries)
- **Path alias** — `@/` maps to `src/`

---

## Design Source
- Figma file key: `LV6XW34BWfMfWacvyxMnIe` (Arribada-sandbox)
- Always fetch design context + screenshot before implementing a page or component
- Treat Figma output as a reference — adapt to project conventions, do not paste raw Tailwind output
- Known node IDs: Overview page `10:4177`, Identities page `10:4178`, Header bar `10:4159`

---

## Design Tokens
| Token | Value |
|---|---|
| Text primary | `#101212` |
| Text secondary / muted | `#798585` |
| Action teal | `#3e7c79` |
| Action bg (ghost) | `rgba(62,124,121,0.07)` |
| Focus ring | `rgba(62,124,121,0.3)` |
| Table header bg | `#edf2f7` |
| Table border | `#e9ebed` |
| Sidebar / header bg | Light gradient (268deg purple → 182deg teal) — see Header.tsx / Sidebar.tsx |
| Status good | `#28a868` |
| Status degraded | `#f59e0b` |
| Status bad | `#ef4444` |
| Workload bar | `rgba(2,124,231,0.5)` |
| X.509 bar | `rgba(2,174,231,0.5)` |
| JWT bar | `rgba(29,195,115,0.5)` |

---

## File Structure
```
src/
  data/mockData.ts          # all mock data lives here
  lib/
    cn.ts                   # classname utility
    routes.ts               # ROUTES array, pathToRoute(), idToPath()
    queries.ts              # React Query hooks; all fetch real backend at /api/*
    DomainContext.tsx        # activeDomainId UI state; syncs to ?domain= URL param
  components/
    layout/                 # Sidebar, Header, TabBar
    overview/               # TDHeader, Overview, IdentitiesTab, sub-components
    workflow/               # WorkflowPage and sub-components
    ui/                     # Reusable UI primitives (see below)
      __tests__/            # One test file per UI component
  test/setup.ts             # Vitest global setup
backend/
  server.ts                 # Fastify API server (port 3001); mirrors mockData with jitter
```

---

## UI Component Rules
1. **All reusable UI primitives go in `src/components/ui/`** — if a pattern appears more than once, extract it.
2. **Every UI component in `src/components/ui/` must have a corresponding test file** in `src/components/ui/__tests__/`.
3. **99% test coverage** is the minimum threshold (lines, functions, branches, statements). Currently at 100%.
4. **Composable over monolithic** — prefer small, focused components that compose (e.g., `Table` + `TableRow` + `TableCell`) over large all-in-one components.
5. **Props-driven** — all content and behavior via props; no hardcoded data inside UI primitives.
6. **Accessibility** — use semantic roles (`role="dialog"`, `role="tab"`, `role="tablist"`, `aria-current`, `aria-modal`, `aria-labelledby`, etc.) on all interactive components.

### Existing UI Components
| Component | File | Description |
|---|---|---|
| `ActionButton` | `ActionButton.tsx` | Ghost teal link-style button with icon |
| `Badge` | `Badge.tsx` | `StatusDot`, `StatusBadge`, `CertificateBadge`, `AudienceTag` |
| `Breadcrumbs` | `Breadcrumbs.tsx` | Nav breadcrumb trail; ChevronRight separator; `node` slot for custom crumbs; active crumb gets white pill |
| `Button` | `Button.tsx` | Primary / secondary filled button; sm / md sizes |
| `Card` | `Card.tsx` | White rounded container |
| `CodeBlock` | `CodeBlock.tsx` | Dark code display with copy button |
| `CopyButton` | `CopyButton.tsx` | Clipboard copy with 2s "Copied!" feedback |
| `InfoGrid` | `InfoGrid.tsx` | Key-value metadata grid |
| `Modal` | `Modal.tsx` | Portal modal with Escape key, backdrop click, footer slot |
| `MonoText` | `MonoText.tsx` | PT Mono span; optional muted color |
| `NavItem` | `NavItem.tsx` | Light sidebar nav button (text-only, white pill active state, `#101212` text) |
| `NavSection` | `NavSection.tsx` | Grouped nav section with uppercase heading + NavItem list |
| `PageHeader` | `PageHeader.tsx` | Page-level header: `title` (ReactNode), `description` (ReactNode), `action` (ReactNode), `children` (below divider). Used by TDHeader and WorkflowPage. |
| `ProseBlock` | `ProseBlock.tsx` | Bold title + muted body paragraph |
| `SectionHeader` | `SectionHeader.tsx` | Section title + optional action |
| `Table` | `Table.tsx` | `Table`, `TableHeader`, `TableHeadCell`, `TableRow`, `TableCell` |
| `Tabs` | `Tabs.tsx` | `Tabs` + `Tab` with full ARIA tab pattern |
| `TrustDomainSelector` | `TrustDomainSelector.tsx` | Dropdown to switch active trust domain; used in breadcrumb `node` slot |
| `Skeleton` | `Skeleton.tsx` | Animated pulse placeholder; renders as `<span>` (not `<div>`) so it is valid inside `<p>` elements |
| `WizardNav` | `WizardNav.tsx` | Vertical step wizard with sub-steps |
| `QueryError` | `QueryError.tsx` | Error state with icon, message, and optional retry button; `role="alert"` |

---

## Testing Rules
- Framework: **Vitest** with `globals: true` and `jsdom` environment
- Setup file: `src/test/setup.ts` imports `@testing-library/jest-dom`
- Use `@testing-library/react` + `@testing-library/user-event`
- **One test file per UI component**, named `ComponentName.test.tsx`
- Mock `react-dom`'s `createPortal` in tests that render portals:
  ```ts
  vi.mock('react-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-dom')>()
    return { ...actual, createPortal: (node: React.ReactNode) => node }
  })
  ```
- For async timer tests (e.g., `CopyButton`): use `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })` + `act(() => { vi.advanceTimersByTime(ms) })`
- **jsdom quirks to remember**:
  - `transparent` inline background → jsdom returns `""`, not `"transparent"` — assert the value is NOT the active color instead
  - Inline numeric widths → jsdom returns `"600px"` not `600` — always use string form in `toHaveStyle`

---

## Figma-to-Code Workflow
1. Run `get_design_context(fileKey, nodeId)` — primary reference
2. Run `get_screenshot(fileKey, nodeId)` — visual source of truth
3. If response too large, use `get_metadata` first to find child node IDs, then fetch individually
4. Adapt output to project conventions (tokens, existing components, TypeScript types)
5. Validate against screenshot before marking complete

### When `get_metadata` output is too large (saved to a file)
The tool saves the result to a `.txt` file and gives you the path. Use this pattern to explore it without fumbling:

**Search for a node by name:**
```bash
python3 -c "
import json, re
with open('PASTE_PATH_HERE') as f:
    text = json.load(f)[0]['text']
for m in re.finditer(r'.{0,120}(?i:SEARCH_TERM).{0,120}', text):
    print(m.group()); print('---')
"
```

**Dump a subtree by node ID** (paste the id value, e.g. `10:4178`):
```bash
python3 -c "
import json
with open('PASTE_PATH_HERE') as f:
    text = json.load(f)[0]['text']
start = text.find('id=\"NODE_ID\"')
print(text[start:start+6000])
"
```

**Print only top-level children of a frame** (skips deep repetitive sub-nodes):
```bash
python3 -c "
import json, re
with open('PASTE_PATH_HERE') as f:
    text = json.load(f)[0]['text']
start = text.find('id=\"NODE_ID\"')
chunk = text[start:start+12000]
# Print only lines that are direct tag openers (id= lines), skip rect/vector spam
for line in chunk.split('\n'):
    stripped = line.strip()
    if stripped.startswith('<') and 'id=' in stripped and 'name=' in stripped:
        print(line)
"
```

**Known large-file node IDs** (add to this list as you discover them):
| Frame name | Node ID |
|---|---|
| Overview page | `10:4177` |
| IDENTITIES page | `10:4178` |
| Header bar | `10:4159` |

---

## Mock Data
- All mock data lives in `src/data/mockData.ts`
- No data is ever hardcoded inside components
- Audit log entries use a `parts` array (text + bold flag) to avoid JSX in data file
- Three trust domains: `production.newco.com`, `staging.newco.com`, `dev.newco.com`
- Each domain has: unique chart data (LCG seeded), 1000 audit log entries, workload identities
- `svidStats: SvidStat[]` — array of `{ label, value }` metric cards shown above the timeseries chart
- `svidTimeseries: SvidTimeseriesPoint[]` — 145 points `{ x509, jwt }` at 10-minute intervals covering 24 hours; generated by `generateSvidTimeseries(seed)` using LCG
- **IdentitiesTab chart constants** (`CHART_TOTAL = 144`, `MINS_PER_POINT = 10`) must stay in sync with the array length in `generateSvidTimeseries` (145 points = indices 0–144)

---

## Backend
- `backend/server.ts` — Fastify on port 3001; imports `trustDomains` and `workflowMeta` from `src/data/mockData.ts`
- Every route applies `jitter()` = `sleep(random * 600 + 200)` to simulate realistic latency
- `workflowStatus` is mutable in the server process so `POST /api/workflow/rescan` persists for the session
- Vite dev server proxies `/api` → `http://localhost:3001` (see `vite.config.ts`)
- Run both: `npm run server` (terminal 1) + `npm run dev` (terminal 2)

## State Management
- **Server state**: React Query (`@tanstack/react-query`). All data fetches go through hooks in `src/lib/queries.ts` that call the Fastify backend. Available hooks: `useDomainsQuery`, `useActiveDomainQuery`, `useWorkloadIdentitiesQuery`, `useAuditLogsQuery`, `useSvidsQuery`, `useWorkflowMetaQuery`, `useTriggerRescan`.
- **Error states**: all query call sites destructure `isError` and `refetch`; render `<QueryError onRetry={() => void refetch()} />` when `isError` is true.
- **UI state** (active domain selection): `DomainContext` in `src/lib/DomainContext.tsx`. Reads/writes `?domain=` URL param on change; defaults to the first trust domain when the param is absent or invalid.
- Do **not** use Redux or prop-drilling for shared state.

---

## Navigation / Routing
- No router library — History API (`pushState` / `replaceState`) + `popstate` listener in `App.tsx`
- Route definitions live in `src/lib/routes.ts` (`ROUTES`, `pathToRoute`, `idToPath`)
- Default path: `/mint/trust-domains` (redirects from `/`)
- URL params: `?tab=` persists active tab, `?domain=` persists active trust domain
- New pages: add entry to `ROUTES` in `routes.ts`, add nav item to `Sidebar.tsx`, add render condition in `App.tsx`
- Unimplemented pages render `<ComingSoon label={...} />`

---

## Recharts Gotchas
- **Never add `.recharts-cartesian-axis-tick { display: none }` or `.recharts-cartesian-grid { display: none }` to global CSS** — this hides all chart axis labels and grid lines across the entire app.
- X-axis tick labels: use `buildChartTicks()` (local-time 6-hour boundaries) — do NOT snap to UTC with `Math.floor(now / SIX_H) * SIX_H` as that causes labels to show wrong hours (e.g. 1AM/7AM instead of 12AM/6AM).
