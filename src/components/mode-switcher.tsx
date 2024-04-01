"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// todo
export function ModeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = React.useState(theme === "dark");

  return (
    <div className="flex items-center">
      <Sun className="mr-2 hidden h-[1.2rem] w-[1.2rem] text-foreground/80 transition-colors dark:text-foreground/40 md:inline" />
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
        <div className="peer relative box-content h-6 w-11 rounded-full bg-primary after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-focus:outline-none dark:after:translate-x-full"></div>
      </label>
      <Moon className="ml-2 hidden h-[1.2rem] w-[1.2rem] text-foreground/40 transition-colors dark:text-foreground/80 md:inline" />
    </div>
  );
}
