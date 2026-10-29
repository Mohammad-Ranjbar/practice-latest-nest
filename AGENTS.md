# AGENTS.md

## Learning goals and communication

- This is a learning project for the latest stable NestJS. The user already knows PHP/Laravel and is learning NestJS and its ecosystem.
- Explain in Persian, using familiar Laravel concepts as a bridge: routing/controllers, the service container and dependency injection, service providers, middleware, Form Requests/validation, policies/authorization, exception handling, and testing.
- State where an analogy is approximate. Nest modules/providers, guards, pipes, and interceptors have their own responsibilities and lifecycle; do not force Laravel's architecture onto NestJS.
- Teach the reason behind a choice, then demonstrate a small practical example in this project's real code when relevant. Explain TypeScript, Node.js, async behavior, and dependency injection prerequisites as needed. Keep steps manageable and help the user understand and practice rather than only supplying finished code.

## Current documentation and dependency versions

- Use the current official NestJS documentation as the primary reference: https://docs.nestjs.com/. Consult the relevant live documentation before technical recommendations, implementation decisions, and version-sensitive explanations; cite the specific pages used.
- Use official documentation and release/migration notes for Node.js, TypeScript, and other dependencies. Verify current releases from official sources or the package registry rather than relying on remembered version numbers.
- Prefer the latest stable releases compatible with one another. Do not select beta, RC, canary, or experimental releases by default. For Node.js, prefer the latest supported LTS compatible with NestJS and the toolchain, and explain material trade-offs if a newer Current release is relevant.
- Check the actual project manifest, lockfile, and runtime before claiming which versions are installed or proposing an upgrade. Distinguish declared version ranges, locked versions, and the latest available versions.
- Keep dependencies current during authorized dependency work; this preference is not a background update schedule or a reason to upgrade unrelated packages in every lesson. Review breaking changes and compatibility, update the npm lockfile with dependency changes, and run the relevant build, lint, and tests. Report any checks that could not run.

## Security and engineering practices

- Consider the latest officially published OWASP Top 10 throughout design, implementation, and review: https://owasp.org/Top10/. Verify the current edition when using it; do not freeze this policy to a remembered year. For API-specific risks, also consult https://owasp.org/API-Security/ and relevant OWASP Cheat Sheets.
- Apply security controls appropriate to the feature: input validation and allowed fields, server-side authentication and authorization, least privilege, safe database queries, secrets management, safe error responses and logs, dependency security, and abuse prevention. Choose CORS, CSRF, headers, and rate limiting based on the actual authentication and deployment model.
- OWASP Top 10 is an awareness baseline, not proof that an application is secure. Explain concrete threats, controls, and remaining limitations without claiming compliance from a checklist alone.
- Follow current documented NestJS practices: cohesive modules, thin controllers, injectable providers for application logic, explicit DTOs and boundary validation, appropriate guards/pipes/interceptors/filters, typed configuration, and meaningful tests for behavior and security boundaries.
- Favor simple, maintainable solutions appropriate to a learning project. Explain relevant trade-offs and avoid adding architectural layers or packages without a demonstrated need. Distinguish documented facts, project conventions, and recommendations.

## Production data: NestJS Observe

This app reports its traces, errors, logs and metrics to [NestJS Observe](https://observe.nestjs.com) through `ObserveModule` in `src/app.module.ts`. Its key pair comes from `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in `.env`, which `npx @nestjs/observe link` writes.

When a task depends on how the app behaves in production - an error users hit, a slow endpoint, a failing job, whether a release made things worse - work from that data, not from the code alone:

- The Observe MCP server answers those questions directly: errors with their traces and logs, slow operations, jobs, and what a release changed (`find_regressions`, `diff_release`). It is included on the Pro plan and above. In Claude Code: `claude mcp add observe --transport http https://observe-api.nestjs.com/mcp`, and the client opens a browser to approve. Other clients: https://www.observe.nestjs.com/documentation/mcp
- Without it, the user can open the request or error in the Observe dashboard and click **Copy agent prompt**, which hands over that page's trace, stack and logs as text.
