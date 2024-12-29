// src/components/ui/alert.tsx
export const Alert = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 bg-red-100 border border-red-200 rounded-lg text-red-800">
        {children}
    </div>
);

export const AlertTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold">{children}</h3>
);

export const AlertDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm">{children}</p>
);