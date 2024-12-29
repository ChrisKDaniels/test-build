export const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="border p-4 rounded-lg">{children}</div>
);
export const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-2">{children}</div>
);
export const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold">{children}</h3>
);
export const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);