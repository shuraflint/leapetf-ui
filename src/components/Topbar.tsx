"use client";

import {
    useDisconnect,
} from "wagmi";
import ThemeToggle from "@/components/ThemeToggle"
import { useAccountAddress } from "@/context/AccountAddress";

export default function Topbar() {
    const { address, setAddress } = useAccountAddress();
    const { mutate: disconnect } = useDisconnect();

    const DisConnect = () => {
        disconnect();
        setAddress("");
    }

    return (
        <header className="bg-[var(--background)] flex justify-end border-b border-white/10 px-6 py-4">
            <div className="flex items-center">
                <svg className={"text-[var(--accent)] mr-2 w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
                <span className="ml-2 text-sm text-[var(--foreground)] mr-10">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "未连接"}</span>
            </div>

            <button className="flex items-center" onClick={() => DisConnect()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" className=" h-4 w-4">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
                <span className="ml-2 text-sm text-red-500 mr-10" >Login Out</span>
            </button>

            <ThemeToggle />
        </header>
    )
}