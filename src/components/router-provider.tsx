"use client";

import { useRouter } from "next/navigation";
import { RouterProvider as Primitive } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return <Primitive navigate={router.push}>{children}</Primitive>;
}
