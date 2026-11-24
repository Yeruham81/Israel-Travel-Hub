# Guide directory and route metadata

The editorial content in travelGuides.ts, attractionGuides.ts and their existing dependencies remains authoritative.
Run bun run generate:guide-directory to refresh the generated compact directory after editing content.
Normal dev, build, test and test:watch commands regenerate it automatically before starting.
The generated TypeScript file is checked in for IDE/direct type-check support; do not edit it manually.
If editorial data changes during an open dev/watch session, rerun the generator or restart the command.
Route-specific metadata lives in src/route-heads and is loaded through each route's asynchronous head callback.
When changing page metadata, edit the matching head module; content components remain in their original routes.
Keep the existing original editorial data and registry; no separate hand-maintained card catalog is needed.
