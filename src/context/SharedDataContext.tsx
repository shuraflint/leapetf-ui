'use client';
import React, { createContext, useContext, useState } from "react";

// 定义数据类型
interface SharedData {
    value: number;
    setValue: (v: number) => void;
}



const SharedDataContext = createContext<SharedData | undefined>(undefined);

export function SharedDataProvider({ children }: { children: React.ReactNode }) {
    const [value, setValue] = useState(0);
    const [count, setCount] = useState(0);
    return (
        <SharedDataContext.Provider value={{ value, setValue }}>
            {children}
        </SharedDataContext.Provider>
    );
}

export function useSharedData() {
    const context = useContext(SharedDataContext);
    if (!context) throw new Error("useSharedData must be used within SharedDataProvider");
    return context;
}