import { useArgs, useEffect, useMemo } from "@storybook/preview-api";
import { atom, PrimitiveAtom, useStore } from "jotai";

/**
 * @module
 *
 * ```tsx:JotaiButton.tsx
 * import { atom, useAtom } from 'jotai';
 *
 * export const stateAtom = atom(false)
 *
 * export const JotaiButton = () => {
 *   const [state,setState] = useAtom(stateAtom)
 *
 *   return (
 *     <button
 *       type="button"
 *       onClick={()=>setState(v=>!v)}
 *     >
 *       {state?"true":"false"}
 *     </button>
 *   );
 * };
 * ```
 *
 * ```tsx:JotaiButton.stories.tsx
 * import type { Meta, StoryObj } from "@storybook/react";
 * import { JotaiButton, stateAtom } from "./JotaiButton";
 * import { useArgsWithAtoms } from "@totto/storybook-jotai";

 *
 * const meta = {
 *   title: "JotaiButton",
 *   component: JotaiButton,
 *   parameters: {
 *     layout: "centered",
 *   },
 *   argTypes: {
 *     state: { control: "boolean" },
 *   },
 * } satisfies Meta<typeof JotaiButton>;
 *
 * export default meta;
 * type Story = StoryObj<typeof meta>;
 *
 * export const Primary: Story = {
 *   args: { state: true },
 *   decorators: (Story) => {
 *     useArgsWithAtoms([[stateAtom, "state"]]);
 *     return <Story />;
 *   },
 * };
 * ```
 */

/**
 * Array of tuples of Atom and corresponding Args properties
 */
export type AtomWithPropertyKey<T> = [PrimitiveAtom<T>, string | number];

/**
 * Hook to synchronize Jotai's Atom and Storybook Args
 *
 * @param atoms Array of tuples of Atom and corresponding Args properties
 *
 * @example
 *
 * ```tsx
 * export const Primary: Story = {
 *   args: { state: true },
 *   decorators: (Story) => {
 *     useAtomArgs([[stateAtom, "state"]]);
 *     return <Story />;
 *   },
 * };
 * ```
 */
export function useArgsWithAtoms<T>(atoms: AtomWithPropertyKey<T>[]): void {
  const [args, updateArgs] = useArgs();

  const store = useStore();

  // Atomization of Args
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const argAtom = useMemo(() => atom(args), []);

  // Synchronization of argsAtom and args
  useEffect(() => {
    store.set(argAtom, args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args]);

  // Detect changes in Atom and make Args follow
  useEffect(() => {
    atoms.forEach(([atom, name]) => {
      return store.sub(atom, () => {
        const v = store.get(atom);
        const args = store.get(argAtom);
        if (store.get(atom) !== args[name]) {
          updateArgs({ [name]: v });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply Args changes to Atom
  useEffect(() => {
    atoms.forEach(([atom, name]) => {
      if (store.get(atom) !== args[name]) {
        store.set(atom, args[name]);
      }
    });
  });
}
