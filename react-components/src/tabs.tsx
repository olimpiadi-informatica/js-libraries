import type { ReactNode } from "react";

export function Tabs({ children }: { children: ReactNode }) {
  return (
    <nav role="tablist" className="tabs-boxed tabs mx-auto flex w-fit flex-wrap justify-center">
      {children}
    </nav>
  );
}
