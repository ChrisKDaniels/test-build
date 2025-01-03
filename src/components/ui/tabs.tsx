"use client";

import React, { useState } from "react";
import clsx from "clsx";

// Define the props for Tabs
type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  defaultValue: string;
};

// Context for Tabs
const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

// Tabs Component
export const Tabs = ({ children, defaultValue, className, ...rest }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={clsx(className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList Component
export const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex space-x-2 border-b border-gray-300">{children}</div>
);

// TabsTrigger Component
export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 ${
        activeTab === value
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
};

// TabsContent Component
export const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { activeTab } = context;

  return activeTab === value ? <div className={clsx(className)}>{children}</div> : null;
};