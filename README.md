# storybook-jotai

Bridging Jotai and Storybook.

Synchronize Args and Atom.

## Installation

```bash
npx jsr add @totto/storybook-jotai
yarn dlx jsr add @totto/storybook-jotai
pnpx jsr add @totto/storybook-jotai
bux jsr add @totto/storybook-jotai
```

```ts
import { jotaiDecorator } from "@totto/storybook-jotai";
```

Add the following components to your project.

[jotaiDecorator.tsx](./jotaiDecorator.tsx)

## Example

### Story Units

```tsx
export const Primary: Story = {
  args: { state: true },
  parameters: {
    jotai: { state: stateAtom },
  },
  decorators: jotaiDecorator,
};
```

### Meta Units

```tsx
const meta = {
  title: "Example/JotaiButton",
  component: JotaiButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: { control: "boolean" },
  },
  decorators: jotaiDecorator,
} satisfies Meta<typeof JotaiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { state: true },
  parameters: {
    jotai: { state: stateAtom },
  },
};
```

### Global

```tsx
import React from "react";

import { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [jotaiDecorator],
};

export default preview;
```

## For Developpers

We use Deno.

The version is [.mise.toml](./.mise.toml).

### Check

```bash
deno lint
deno fmt
deno check **/*.ts
```
