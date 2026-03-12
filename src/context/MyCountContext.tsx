'use client';
import React, { createContext, useContext, useState } from "react";

// 定义数据类型
interface MyCount {
    count: number;
    setCount: (v: number) => void;
}

const MyCountContext = createContext<MyCount | undefined>(undefined);

export function MyCountProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    return (
        <MyCountContext.Provider value={{ count, setCount }}>
            {children}
        </MyCountContext.Provider>
    );
}

export function useMyCount() {
    const context = useContext(MyCountContext);
    if (!context) throw new Error("useMyCount must be used within MyCountProvider");
    return context;
}