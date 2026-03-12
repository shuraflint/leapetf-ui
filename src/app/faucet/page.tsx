"use client";
import ToConnect from "@/components/ToConnect";
import { useAccountAddress } from "@/context/AccountAddress";
import { useSharedData } from "@/context/SharedDataContext";
import { useMyCount } from "@/context/MyCountContext";
export default function FaucetPage() {
    const { value, setValue } = useSharedData();
    const { count, setCount } = useMyCount();
    const { address } = useAccountAddress();

    if (!address) {
        return <ToConnect />;
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Faucet 页面内容</h1>
            <p>共享数据值：{value}</p>
            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => setValue(value - 1)}
            >
                减少
            </button>
            <p>我的数据：{count}</p>
            <button
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
                onClick={() => setCount(count - 1)}
            >
                减少我的数据
            </button>
        </div>
    );
}
