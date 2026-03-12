"use client";
import ToConnect from "@/components/ToConnect";
import { useAccountAddress } from "@/context/AccountAddress";
export default function StakePage() {
    const { address } = useAccountAddress();

    if (!address) {
        return <ToConnect />;
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Stake 页面内容</h1>
            <p>这里是 Stake 的介绍或功能区。</p>
        </div>
    );
}