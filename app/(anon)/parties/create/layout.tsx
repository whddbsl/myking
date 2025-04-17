"use client";

const PartyCreateLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default PartyCreateLayout;
