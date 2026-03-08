import type { ReactNode } from "react";

import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("card overflow-hidden sm:card-side", className)}>{children}</div>;
}
Card.displayName = "Card";

export function CardBody({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      {children}
    </div>
  );
}
CardBody.displayName = "CardBody";

export function CardActions({ children }: { children: ReactNode }) {
  return <div className="card-actions mt-2 grow items-end justify-center">{children}</div>;
}
CardActions.displayName = "CardActions";
