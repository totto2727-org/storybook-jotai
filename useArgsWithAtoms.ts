import { atom, type PrimitiveAtom, useStore } from "jotai";
// @deno-types="@types/react"
import { useEffect, useMemo } from "react";
import type { useArgs } from "@storybook/preview-api";

/**
 * Record of Atom
 */
export type AtomsWithName<T> = Record<PropertyKey, PrimitiveAtom<T>>;

/**
 * Hook to synchronize Jotai's Atom and Storybook Args
 *
 * @param atoms Record of atom with the same structure as args
 * @param useArgsInstance Return value of useArgs
 *
 * @example
 *
 * ```tsx
 * export const Primary: Story = {
 *   args: { state: true },
 *   decorators: (Story) => {
 *     const useArgsReturnValues = useArgs();
 *     useArgsWithAtoms({ "state": stateAtom }, useArgsReturnValues);
 *     return <Story />;
 *   },
 * };
 * ```
 */
export function useSyncArgsAndAtoms<T>(
  atoms: AtomsWithName<T>,
  [args, updateArgs]: ReturnType<typeof useArgs>,
): void {
  const store = useStore();

  // Atomization of Args
  const argAtom = useMemo(() => atom(args), [args]);

  const argsKey = useMemo(() => Object.keys(args), [args]);

  // Synchronization of argsAtom and args
  useEffect(() => {
    console.log(1);
    store.set(argAtom, args);
  }, [argAtom, args, store]);

  // Detect changes in Atom and make Args follow
  useEffect(() => {
    console.log(2);
    const unmounts = argsKey.map((key) => {
      const atom = atoms[key];

      return store.sub(atom, () => {
        const v = store.get(atom);
        const args = store.get(argAtom);

        if (store.get(atom) !== args[key]) {
          updateArgs({ [key]: v });
        }
      });
    });

    return () => unmounts.forEach((f) => f());
  }, [argAtom, argsKey, atoms, store, updateArgs]);

  // Apply Args changes to Atom
  useEffect(() => {
    console.log(3);
    argsKey.forEach((key) => {
      const atom = atoms[key];

      if (store.get(atom) !== args[key]) {
        store.set(atom, args[key]);
      }
    });
  }, [args, argsKey, atoms, store]);
}
