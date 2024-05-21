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
import { useArgsWithAtoms } from "@totto/storybook-jotai";
```

## Example

### JotaiButton.ts

```tsx
import { atom, useAtom } from 'jotai';

export const stateAtom = atom(false)

export const JotaiButton = () => {
  const [state,setState] = useAtom(stateAtom)

  return (
    <button
      type="button"
      onClick={()=>setState(v=>!v)}
    >
      {state?"true":"false"}
    </button>
  );
};
```

### JotaiButton.stories.ts

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { JotaiButton, stateAtom } from "./JotaiButton";
import { useArgsWithAtoms } from "@totto/storybook-jotai";

const meta = {
  title: "JotaiButton",
  component: JotaiButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: { control: "boolean" },
  },
} satisfies Meta<typeof JotaiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { state: true },
  decorators: (Story) => {
    useArgsWithAtoms([[stateAtom, "state"]]);
    return <Story />;
  },
};
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
