## Quick orientation for AI coding agents

This repository implements hCaptcha Vue components for both Vue 2 and Vue 3. The goal of these instructions is to provide fast, actionable context so an AI coding agent can make safe, correct edits, run builds/tests, and follow repository conventions.

High-level summary

Key files and why they matter

Build / test / debug workflows (practical commands)

  yarn install --frozen-lockfile --prefer-offline


  yarn test


  yarn build


  cd packages/vue2 && npm run test:unit


  cd packages/vue2 && npm run build

## Quick guide for AI coding agents (vue-hcaptcha)

This repo provides hCaptcha Vue components for Vue 2 and Vue 3 in a Lerna/Yarn monorepo.

What matters (at-a-glance)

Common commands

  yarn install --frozen-lockfile --prefer-offline


  yarn test


  yarn build


  cd packages/vue2 && npm run build
  cd packages/vue2 && npm run test:unit

Important project patterns

Testing notes

Integration notes

If something is unclear

Keep edits minimal and reference the exact file paths above when changing behavior.

If you want, I can shorten this further, add CI-specific Node/Yarn versions, or include a small unit-test example that mocks `window.hcaptcha`.
