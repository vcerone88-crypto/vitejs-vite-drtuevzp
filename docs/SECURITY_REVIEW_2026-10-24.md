# Security review — 2026-10-24

Scope: repository source/configuration, direct and transitive dependencies, workflows and deployment configuration. No production records were read or mutated by tests.

## Dependency evidence

Original root lock audit: critical 0, high 7, moderate 1, low 1. Current corrected root lock audit: zero known advisories at all severities. Counts represent the audit tool's dependency-path results, not independent exploitable attacks. Nested locks were audited separately; do not sum duplicate workspace results. An audit result is time-sensitive and does not establish application security.

## Changes

Refresh locked dependency versions without changing application behavior. The original App.tsx/component contracts and missing date-format exports already fail TypeScript compilation; no production release is allowed until those independent source errors are resolved.

Supported execution: patched Node.js 22.23.4 or 24.22.1; Clinical Case Studio requires the 24.x line. Dependabot and scheduled/pull-request dependency audit now cover all maintained lock scopes. GitHub Actions are pinned to verified commit SHAs. No advisory is hidden or ignored.

Conservative Vercel response headers are configured for the SPA. Native build dependency updates use the frozen npm lockfile.

## Verification and release gates

Dependency audit PASS; build blocked by eight existing application TypeScript errors. Security dependency changes alone do not make this project releasable.

Changes are proposed through a security branch and pull request; this file does not assert a production rollout. Validate deployed commit, public health and unauthorized access, response headers and synthetic login/upload flows after release. Roll back the application commit if these regress; no database schema migration is introduced by this patch.

## Remaining operational work

AWS review found individual bucket public-access blocks and encryption already enabled. Account-level public block, HTTPS-only bucket policies and production versioning were proposed, but automatic approval review rejected that mutation; no AWS hardening was applied. Those controls require explicit approval due to possible compatibility and retained-version costs.

Dental database still has a public TCP proxy; verify every consumer can use private connectivity before removal. Branch protection is not enforced on the inspected main branches; review plan/administration capability and require CI before merge. This review does not certify historical-secret absence, absence of compromise, full external penetration testing, or completion of physical/clinical acceptance.

## Primary references

- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
- https://github.com/jshttp/proxy-addr/security/advisories/GHSA-jqcg-44mw-7w3h

The proxy-addr issue requires an affected IPv4-mapped/IPv6 trust-subnet configuration; numeric trust-proxy hop counts alone do not establish exploitability.
