"use client";

import { formatUnits, type Abi, type Address, type Hex } from "viem";
import { sepoliaClient } from "@/lib/client";

import ETFQuoterArtifact from "@/abi/ETFQuoter/ETFQuoter.json";
import ETFQuoterDeploy from "@/abi/ETFQuoter/run-latest.json";

import ETFTradingDeploy from "@/abi/ETFTrading/run-latest.json";
import ERC20Deploy from "@/abi/ERC20/run-latest.json";

const etfQuoterAddress = ETFQuoterDeploy.transactions[0]?.contractAddress as Address | undefined;
const etfQuoterAbi = ETFQuoterArtifact.abi as Abi;

const etfTradingAddress = ETFTradingDeploy.transactions[0]?.contractAddress as Address | undefined;

const LBTCAddress = ERC20Deploy.transactions[0]?.contractAddress as Address | undefined;
const LETHAddress = ERC20Deploy.transactions[1]?.contractAddress as Address | undefined;
const LINKAddress = ERC20Deploy.transactions[2]?.contractAddress as Address | undefined;
const USDCAddress = ERC20Deploy.transactions[3]?.contractAddress as Address | undefined;

export function tradeContract() {
    const tokenConfig = {
        LBTC: { address: LBTCAddress, decimals: 8 },
        LETH: { address: LETHAddress, decimals: 18 },
        LINK: { address: LINKAddress, decimals: 18 },
        USDC: { address: USDCAddress, decimals: 6 },
    } as const;

    async function getQuoteInvestWithToken(tokenName: keyof typeof tokenConfig, amount: number) {
        if (!etfQuoterAddress || !etfTradingAddress) {
            throw new Error("Missing contract address");
        }

        const config = tokenConfig[tokenName];
        if (!config?.address) {
            throw new Error("Unknown token name");
        }

        const [balance, swapPaths] = await sepoliaClient.readContract({
            address: etfQuoterAddress,
            abi: etfQuoterAbi,
            functionName: "quoteInvestWithToken",
            args: [etfTradingAddress, config.address, amount]
        }) as [bigint, Hex[]];

        return {
            amount: formatUnits(balance, config.decimals),
            swapPaths
        };
    }

    async function getQuoteRedeemToToken(tokenName: keyof typeof tokenConfig, amount: number) {
        if (!etfQuoterAddress || !etfTradingAddress) {
            throw new Error("Missing contract address");
        }

        const config = tokenConfig[tokenName];
        if (!config?.address) {
            throw new Error("Unknown token name");
        }

        const [balance, swapPaths] = await sepoliaClient.readContract({
            address: etfQuoterAddress,
            abi: etfQuoterAbi,
            functionName: "quoteRedeemToToken",
            args: [etfTradingAddress, config.address, amount]
        }) as [bigint, Hex[]];

        return {
            amount: formatUnits(balance, config.decimals),
            swapPaths
        };
    }

    // async function getQuoteInvestWithToken(tokenName: string, amount: number) {
    //     if (!etfQuoterAddress) {
    //         throw new Error("Unknown token name");
    //     }
    //     switch (tokenName) {
    //         case "LBTC":
    //             if (!LBTCAddress) {
    //                 throw new Error("Unknown token name");
    //             }
    //             return quoteWithToken(LBTCAddress, amount);
    //         case "LETH":
    //             if (!LETHAddress) {
    //                 throw new Error("Unknown token name");
    //             }
    //             return quoteWithToken(LETHAddress, amount);
    //         case "LINK":
    //             if (!LINKAddress) {
    //                 throw new Error("Unknown token name");
    //             }
    //             return quoteWithToken(LINKAddress, amount);
    //         case "USDC":
    //             if (!USDCAddress) {
    //                 throw new Error("Unknown token name");
    //             }
    //             return quoteWithToken(USDCAddress, amount);
    //         default:
    //             throw new Error("Unknown token name");
    //     }
    // }

    return {
        getQuoteInvestWithToken,
        getQuoteRedeemToToken,
    }
}
