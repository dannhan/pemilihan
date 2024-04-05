"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export function TopLoader() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextTopLoader
      color={theme === "dark" ? "#7a99ff" : "#2563eb"}
      showSpinner={false}
      shadow={false}
      height={2}
      zIndex={100}
    />
  );
}
