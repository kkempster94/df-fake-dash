export interface Route {
  id: string
  path: string
  section: string
  label: string
}

export const ROUTES: Route[] = [
  { id: 'overview',          path: '/mint/trust-domains',          section: 'Mint',         label: 'Trust domains'        },
  { id: 'cicd-profiles',     path: '/mint/cicd-profiles',          section: 'Mint',         label: 'CI/CD profiles'       },
  { id: 'dashboard',         path: '/ledger/dashboard',            section: 'Ledger',       label: 'Dashboard'            },
  { id: 'scanners',          path: '/ledger/scanners',             section: 'Ledger',       label: 'Scanners'             },
  { id: 'static-credentials',path: '/ledger/static-credentials',  section: 'Ledger',       label: 'Static credentials'   },
  { id: 'applications',      path: '/ledger/applications',        section: 'Ledger',       label: 'Applications'         },
  { id: 'workflows',         path: '/ledger/workflows',           section: 'Ledger',       label: 'Remediation workflows' },
  { id: 'profile',           path: '/organization/profile',       section: 'Organization', label: 'Profile'              },
  { id: 'label',             path: '/organization/label',         section: 'Organization', label: 'Label'                },
  { id: 'audit-logs',        path: '/organization/audit-logs',    section: 'Organization', label: 'Audit logs'           },
  { id: 'settings',          path: '/organization/settings',      section: 'Organization', label: 'Settings'             },
]

export const DEFAULT_PATH = '/mint/trust-domains'
export const DEFAULT_ID = 'overview'

export function pathToRoute(path: string): Route | undefined {
  return ROUTES.find(r => r.path === path)
}

export function idToPath(id: string): string {
  return ROUTES.find(r => r.id === id)?.path ?? DEFAULT_PATH
}

export function routeForId(id: string): Route | undefined {
  return ROUTES.find(r => r.id === id)
}
