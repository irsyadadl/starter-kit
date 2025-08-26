"use client"

import { composeRenderProps } from "react-aria-components"
import { type ClassNameValue, twMerge } from "tailwind-merge"

type Render<T> = string | ((v: T) => string) | undefined

type CxArgs<T> =
  | [...ClassNameValue[], Render<T>]
  | [[...ClassNameValue[], Render<T>]]

export function cx<T = unknown>(...args: CxArgs<T>): string | ((v: T) => string) {
  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0] as [...ClassNameValue[], Render<T>];
  }

  const className = args.pop() as Render<T>;
  const tailwinds = args as ClassNameValue[];

  const fixed = twMerge(...tailwinds);

  return composeRenderProps(className, (cn) => twMerge(fixed, cn));
}
