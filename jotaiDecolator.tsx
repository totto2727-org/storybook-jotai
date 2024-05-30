import type { Decorator } from "@storybook/react";
import { type AtomsWithName, useSyncArgsAndAtoms } from "./useArgsWithAtoms.ts";
// @deno-types="@types/react"
import type { PropsWithChildren } from "react";
import { useArgs } from "@storybook/preview-api";
import { Provider as JotaiProvider } from "jotai";

/**
 * Component to synchronize Atom and Args
 */
function SyncArgsAndAtoms<T>(
  props: {
    atoms: AtomsWithName<T>;
    useArgsReturnValues: ReturnType<typeof useArgs>;
  } & PropsWithChildren,
) {
  useSyncArgsAndAtoms(props.atoms, props.useArgsReturnValues);
  return props.children;
}

/**
 * Decorator to synchronize Atom and Args
 *
 * By setting args and parameters.jotai to the same structure, you can synchronize the corresponding args and atoms.
 *
 * @example
 *
 * ```tsx
 * export const Primary: Story = {
 *   args: { state: true },
 *   parameters: {
 *     jotai: { state: stateAtom },
 *   },
 *   decorators: jotaiDecolator,
 * };
 * ```
 *
 * @example
 *
 * ```tsx
 * const meta = {
 *   title: "Example/JotaiButton",
 *   component: JotaiButton,
 *   parameters: {
 *     layout: "centered",
 *   },
 *   argTypes: {
 *     state: { control: "boolean" },
 *   },
 *   decorators: jotaiDecolator,
 * } satisfies Meta<typeof JotaiButton>;
 *
 * export default meta;
 * type Story = StoryObj<typeof meta>;
 *
 * export const Primary: Story = {
 *   args: { state: true },
 *   parameters: {
 *     jotai: { state: stateAtom },
 *   },
 * };
 * ```
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 *
 * import { Preview } from '@storybook/react';
 *
 * const preview: Preview = {
 *   decorators: [
 *     decorators: [ jotaiDecolator ],
 *   ],
 * };
 *
 * export default preview;
 * ```
 */
export const jotaiDecolator: Decorator = function JotaiDecolator(Story, ctx) {
  const atoms = ctx?.parameters?.jotai ?? {};
  const useArgsReturnValues = useArgs();

  return (
    <JotaiProvider>
      <SyncArgsAndAtoms atoms={atoms} useArgsReturnValues={useArgsReturnValues}>
        {Story()}
      </SyncArgsAndAtoms>
    </JotaiProvider>
  );
};
