"use client";

// 共享数据provider
import { SharedDataProvider } from "../context/SharedDataContext";
import { MyCountProvider } from "../context/MyCountContext";
import { AccountAddressProvider, useAccountAddress } from "../context/AccountAddress";
import React, { useEffect } from "react";

// web3 provider
import { WagmiProvider, createConfig, http, useConnection } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
    chains: [mainnet],
    connectors: [
        // injected({ target: "metaMask" }),
        injected(),
    ],
    transports: {
        [mainnet.id]: http(),
    },
});

const queryClient = new QueryClient();

function WalletAddressSync() {
    const { address } = useConnection();
    const { setAddress } = useAccountAddress();
    // console.log("WalletAddressSync address:", address);

    useEffect(() => {
        setAddress(address ?? "");
    }, [address, setAddress]);

    return null;
}

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <SharedDataProvider>
                    <MyCountProvider>
                        <AccountAddressProvider>
                            {/* 这样做的目的是，不管在children中哪个页面刷新，WalletAddressSync都会执行 */}
                            <WalletAddressSync />
                            {children}
                        </AccountAddressProvider>
                    </MyCountProvider>
                </SharedDataProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
