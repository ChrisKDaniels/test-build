"use client";

import React from "react";
import clsx from "clsx"; // For safely combining class names

export const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string; // Allow optional className
}) => (
  <div className={clsx("p-4 bg-red-100 border border-red-200 rounded-lg", className)}>
    {children}
  </div>
);

export const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

export const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm">{children}</p>
);