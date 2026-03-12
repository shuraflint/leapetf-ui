'use client';
import React, { createContext, useContext, useState } from "react";

// 定义数据类型
interface AccountAddress {
    address: string;
    setAddress: (v: string) => void;
}

const AccountAddressContext = createContext<AccountAddress | undefined>(undefined);

export function AccountAddressProvider({ children }: { children: React.ReactNode }) {
    const [address, setAddress] = useState("");
    return (
        <AccountAddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AccountAddressContext.Provider>
    );
}

export function useAccountAddress() {
    const context = useContext(AccountAddressContext);
    if (!context) throw new Error("useAccountAddress must be used within AccountAddressProvider");
    return context;
}