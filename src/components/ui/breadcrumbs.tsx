"use client"

import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { createContext, use } from "react"
import type { BreadcrumbProps, BreadcrumbsProps } from "react-aria-components/Breadcrumbs"
import { Breadcrumb, Breadcrumbs as BreadcrumbsPrimitive } from "react-aria-components/Breadcrumbs"
import type { LinkProps } from "react-aria-components/Link"
import { twJoin, twMerge } from "tailwind-merge"
import { cx } from "@/lib/primitive"
import { Link } from "./link"
import NextLink from "next/link";

type BreadcrumbsContextProps = { separator?: "chevron" | "slash" | boolean }
const BreadcrumbsProvider = createContext<BreadcrumbsContextProps>({
  separator: "chevron",
})

const Breadcrumbs = <T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T> & BreadcrumbsContextProps) => {
  return (
    <BreadcrumbsProvider value={{ separator: props.separator }}>
      <BreadcrumbsPrimitive {...props} className={twMerge("flex items-center gap-2", className)} />
    </BreadcrumbsProvider>
  )
}

interface BreadcrumbsItemProps extends BreadcrumbProps, BreadcrumbsContextProps {
  href?: string
}

const BreadcrumbsItem = ({
  href,
  separator = true,
  className,
  ...props
}: BreadcrumbsItemProps & Partial<Omit<LinkProps, "className">>) => {
  const { separator: contextSeparator } = use(BreadcrumbsProvider)
  separator = contextSeparator ?? separator
  const separatorValue = separator === true ? "chevron" : separator

  return (
    <Breadcrumb
      className={cx("flex items-center gap-2 text-sm", className)}
      data-slot="breadcrumb-item"
      {...props}
    >
      {({ isCurrent }) => (
        <>
          <Link
            className={twJoin(
              "font-normal has-[svg]:inline-flex has-[svg]:items-center has-[svg]:gap-x-2",
              "*:[svg]:size-5 sm:*:[svg]:size-4",
              "*:[svg]:text-muted-fg hover:*:[svg]:text-fg",
            )}
            href={href}
            {...props}
            render={(domProps) =>
              "href" in domProps ? <NextLink {...domProps} /> : <span {...domProps} />
            }
          />
          {!isCurrent && separator !== false && <Separator separator={separatorValue} />}
        </>
      )}
    </Breadcrumb>
  )
}

const Separator = ({
  separator = "chevron",
}: {
  separator?: BreadcrumbsItemProps["separator"]
}) => {
  return (
    <span className="*:shrink-0 *:text-muted-fg *:[svg]:size-3.5">
      {separator === "chevron" && <ChevronRightIcon />}
      {separator === "slash" && <span className="text-muted-fg">/</span>}
    </span>
  )
}

Breadcrumbs.Item = BreadcrumbsItem

export type { BreadcrumbsItemProps, BreadcrumbsProps }
export { Breadcrumbs, BreadcrumbsItem }
