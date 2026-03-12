"use client";

import { formatEther, getAddress, isAddress, type Abi, type Address } from "viem";
import { sepoliaClient } from "@/lib/client";

import ETFTradingArtifact from "@/abi/ETFTrading/ETFTrading.json";
import ETFTradingDeploy from "@/abi/ETFTrading/run-latest.json";
import ERC20Artifact from "@/abi/ERC20/ERC20.json";
import ERC20Deploy from "@/abi/ERC20/run-latest.json";


const etfTradingAddress = ETFTradingDeploy.transactions[0]?.contractAddress as Address | undefined;
const etfTradingAbi = ETFTradingArtifact.abi as Abi;

const LBTCAddress = ERC20Deploy.transactions[0]?.contractAddress as Address | undefined;
const LETHAddress = ERC20Deploy.transactions[1]?.contractAddress as Address | undefined;
const LINKAddress = ERC20Deploy.transactions[2]?.contractAddress as Address | undefined;
const USDCAddress = ERC20Deploy.transactions[3]?.contractAddress as Address | undefined;
const ERC20Abi = ERC20Artifact.abi as Abi;

export function portfolioContract() {
    async function getEtfName() {
        if (!etfTradingAddress) {
            throw new Error("未找到 ETFTrading 合约地址");
        }

        const name = await sepoliaClient.readContract({
            address: etfTradingAddress,
            abi: etfTradingAbi,
            functionName: "name",
        });
        return name as string;
    }



    async function getSepoliaEthBalance(targetAddress: string) {
        if (!isAddress(targetAddress)) {
            throw new Error("地址格式不正确");
        }

        const balanceWei = await sepoliaClient.getBalance({
            address: getAddress(targetAddress),
        });

        return {
            wei: balanceWei,
            eth: formatEther(balanceWei),
        };
    }

    async function getLeapETFBalance(targetAddress: string) {
        if (!etfTradingAddress) {
            throw new Error("未找到 ETFTrading 合约地址");
        }

        const balance = await sepoliaClient.readContract({
            address: etfTradingAddress,
            abi: etfTradingAbi,
            functionName: "balanceOf",
            args: [getAddress(targetAddress)], // 替换为实际地址
        }) as bigint;
        return formatEther(balance);
    }

    async function getERC20Balance(tokenName: string, targetAddress: string) {
        let balance;
        switch (tokenName) {
            case "LBTC":
                if (!LBTCAddress) {
                    throw new Error("未找到 LBTC 合约地址");
                }
                balance = await sepoliaClient.readContract({
                    address: LBTCAddress,
                    abi: ERC20Abi,
                    functionName: "balanceOf",
                    args: [getAddress(targetAddress)],
                }) as bigint;
                return formatEther(balance);
            case "LETH":
                if (!LETHAddress) {
                    throw new Error("未找到 LETH 合约地址");
                }
                balance = await sepoliaClient.readContract({
                    address: LETHAddress,
                    abi: ERC20Abi,
                    functionName: "balanceOf",
                    args: [getAddress(targetAddress)],
                }) as bigint;
                return formatEther(balance);

            case "LINK":
                if (!LINKAddress) {
                    throw new Error("未找到 LINK 合约地址");
                }
                balance = await sepoliaClient.readContract({
                    address: LINKAddress,
                    abi: ERC20Abi,
                    functionName: "balanceOf",
                    args: [getAddress(targetAddress)],
                }) as bigint;
                return formatEther(balance);
            case "USDC":
                if (!USDCAddress) {
                    throw new Error("未找到 USDC 合约地址");
                }
                balance = await sepoliaClient.readContract({
                    address: USDCAddress,
                    abi: ERC20Abi,
                    functionName: "balanceOf",
                    args: [getAddress(targetAddress)],
                }) as bigint;
                return formatEther(balance);
            default:
                throw new Error("未知的代币名称");
        }

    }


    return {
        getEtfName,
        getSepoliaEthBalance,
        getLeapETFBalance,
        getERC20Balance,
        etfTradingAddress,
    };
}
