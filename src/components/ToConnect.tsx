"use client";
import { useEffect, useState } from "react";
import {
    useConnect,
    useConnectors,
} from "wagmi";


export default function ToConnect() {
    const connectors = useConnectors();
    //如果没有找到metamask插件，按钮是不可点击状态
    const metaMaskConnector = connectors.find(
        (connector) => connector.id === "metaMask" || connector.name.toLowerCase().includes("metamask")
    );
    const [hydrated, setHydrated] = useState(false);
    const canConnectMetaMask = hydrated && Boolean(metaMaskConnector);

    const { mutate: connect } = useConnect();

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <main>
            <div className="py-16 px-4">
                {/* <div className="py mx-20 my-6 flex min-h-[10vh] border flex-col items-center justify-center"> */}
                <div className="flex min-h-[80vh] flex-col items-center justify-center">
                    <div className="rounded-lg border  max-w-md">
                        <div className="flex flex-col space-y-1.5 p-6 text-center text-[var(--foreground)]">
                            <h3 className="font-semibold tracking-tight text-2xl text-[var(--foreground)]">
                                Welcome to LeapETF
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                A decentralized platform for trading blockchain-based ETFs
                            </p>
                        </div>
                        <div className="p-6 pt-0 flex flex-col items-center">
                            <p className="mb-6 text-center text-muted-foreground">Connect your wallet to start trading</p>

                            <button
                                onClick={() => metaMaskConnector && connect({ connector: metaMaskConnector })}
                                disabled={!canConnectMetaMask}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-500 text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full relative mb-2"
                            >
                                Connect with MetaMask
                            </button>
                            {/* <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-500 text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full relative mb-2">
                                <span className="opacity-100">Connect with Browser Wallet</span>
                            </button> */}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
