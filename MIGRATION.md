# Migration to Static Export

**Date:** November 2, 2025

## Summary

Migrated from Next.js with `@opennextjs/cloudflare` (SSR on Workers) to pure static export for zero-cost hosting.

## Why We Made This Change

### The Problem
- Every page request was executing the Worker (SSR)
- Consuming ~17-32ms CPU time per request
- Even though the blog content is 100% static and never changes
- This would incur costs after exceeding the free tier (100,000 requests/day)

### Metrics Before Migration
```
GET /resume - CPU Time: 31ms
GET / - CPU Time: 17ms (with React Server Components)
```

These requests were triggering Worker execution unnecessarily.

## What We Removed

### Dependencies & Config
- `@opennextjs/cloudflare` adapter and all related code
- Worker main script (`.open-next/worker.js`)
- `nodejs_compat` compatibility flags
- `.dev.vars` file (OpenNext environment variables)
- `cloudflare-env.d.ts` (OpenNext TypeScript definitions)

### Assets
- Vercel favicon (`app/favicon.ico`)
- Next.js template SVGs (`vercel.svg`, `next.svg`, `file.svg`, `globe.svg`, `window.svg`)

### Scripts
- `opennextjs-cloudflare build`
- `opennextjs-cloudflare deploy`
- `cf-typegen` script

## Features We Lost (Cons)

Since we switched to static export, the following Next.js features are **no longer available**:

1. **Server-Side Rendering (SSR)**
   - Cannot render pages on-demand per request
   - All pages are pre-built at build time

2. **React Server Components**
   - No server components support
   - All components are client components

3. **API Routes**
   - Cannot have `/api/*` endpoints
   - Would need separate Worker for APIs if needed

4. **Dynamic Routes with `getServerSideProps`**
   - Cannot fetch data at request time
   - Must use static generation or client-side fetching

5. **Incremental Static Regeneration (ISR)**
   - Cannot revalidate pages on-demand
   - Must rebuild entire site for updates

6. **Advanced Image Optimization**
   - `next/image` works but without on-demand optimization
   - Images are served as-is from static files

7. **Middleware**
   - No Next.js middleware support
   - Cannot intercept/modify requests

8. **Dynamic Imports with SSR**
   - Some dynamic import patterns may not work

## Benefits We Gained (Pros)

### 💰 Cost Savings
- **Zero Worker execution** = Zero CPU costs
- Completely **free hosting** on Cloudflare
- No risk of unexpected bills from traffic spikes

### ⚡ Performance
- **Faster response times** - No server rendering overhead
- Files served directly from Cloudflare's cache
- **Better caching** across Cloudflare's global network
- Lower latency (no compute needed)

### 🎯 Simplicity
- Simpler deployment (just static files)
- No Worker runtime concerns
- No compatibility flags needed
- Easier to debug (just HTML/CSS/JS)
- Can use any static hosting provider

### 📊 Better Observability
- No Worker logs to monitor
- Simple static file serving
- Clear cache hit/miss metrics

## New Architecture

### Before (SSR with Workers)
```
Request → Worker Execution (SSR) → HTML Response
- CPU Time: ~30ms per request
- Cost: After free tier
```

### After (Pure Static)
```
Request → Cloudflare Cache → Static HTML Response
- CPU Time: 0ms
- Cost: Free
```

## Configuration Changes

### `next.config.ts`
```diff
+ output: 'export',  // Generate static HTML
- OpenNext initialization removed
```

### `wrangler.jsonc`
```diff
- "main": ".open-next/worker.js",
- "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
+ "assets": { "directory": "./out" }
- "binding": "ASSETS" (removed for assets-only Workers)
```

### `package.json`
```diff
- "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
+ "deploy": "next build && wrangler deploy"
```

## Build Output

- **Before:** `.open-next/` directory with Worker code and assets
- **After:** `out/` directory with pure static HTML/CSS/JS

## Deployment Process

### Old Process
1. `opennextjs-cloudflare build` - Bundle Worker + assets
2. `opennextjs-cloudflare deploy` - Deploy to Cloudflare

### New Process
1. `next build` - Generate static site to `out/`
2. `wrangler deploy` - Upload static files to Cloudflare

## Is This Right for Us?

**Yes**, because:
- ✅ Our blog has no dynamic content
- ✅ Content updates are infrequent (just rebuild and deploy)
- ✅ No need for server-side features
- ✅ Want zero costs
- ✅ Want maximum performance

**This would NOT be right if:**
- ❌ Need real-time data from databases
- ❌ Need user-specific content per request
- ❌ Need API endpoints
- ❌ Need server-side authentication
- ❌ Need ISR or on-demand revalidation

## Future Considerations

If we ever need dynamic features:
1. Keep static site as-is
2. Add separate Worker for API routes if needed
3. Use client-side data fetching
4. Or switch back to SSR (reverse this migration)

## Testing

### Local Development
```bash
npm run dev          # Next.js dev server (still has SSR for DX)
npm run build        # Build static site
npm run preview      # Test with Wrangler locally
```

### Production
- Static files deployed to Cloudflare Workers Static Assets
- No Worker execution
- Served from cache globally

## Rollback Plan

If needed, we can revert by:
1. Restore `@opennextjs/cloudflare` dependency
2. Revert `next.config.ts` (remove `output: 'export'`)
3. Restore previous `wrangler.jsonc`
4. Restore deployment scripts

Old configuration is preserved in git history.

## References

- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Blog: Full-Stack Apps on Workers](https://blog.cloudflare.com/2025-04-08-full-stack-apps-on-workers)
