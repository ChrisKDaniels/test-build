import React from 'react';
import clsx from 'clsx'; // Optional, for combining classNames

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx('border p-4 rounded-lg', className)}>{children}</div>
);

export const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx('mb-2', className)}>{children}</div>
);

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 className={clsx('text-lg font-bold', className)}>{children}</h3>
);

export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx('text-gray-700', className)}>{children}</div>
);