"use client";

import { ThemeProvider } from "next-themes";

const Provider = ({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        defaultTheme={theme}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Provider;
