"use client";

import NextTopLoader from "nextjs-toploader";

export function TopLoader() {
  return (
    <NextTopLoader
      color={"#CC1B42"}
      showSpinner={false}
      shadow={false}
      height={2}
      zIndex={100}
    />
  );
}
