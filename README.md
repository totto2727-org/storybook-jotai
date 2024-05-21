# storybook-jotai

Bridging Jotai and Storybook.

Synchronize Args and Atom.

## Usage

```bash
npx jsr add @totto/storybook-jotai
yarn dlx jsr add @totto/storybook-jotai
pnpx jsr add @totto/storybook-jotai
bux jsr add @totto/storybook-jotai
```

```ts
import { useArgsWithAtoms } from "@totto/storybook-jotai";
```

## For Developpers

We use Deno.

The version is [.mise.toml](./.mise.toml).

### Check

```bash
deno link
deno fmt
deno check
```

### Deploy

```bash
deno deploy
```
