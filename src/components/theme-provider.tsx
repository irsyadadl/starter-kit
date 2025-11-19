"use client";

import {
  ThemeProvider as Primitive,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <Primitive
      storageKey="primitive-theme"
      enableSystem
      disableTransitionOnChange
      attribute="class"
      {...props}
    >
      {children}
    </Primitive>
  );
};

export { ThemeProvider, useTheme };
