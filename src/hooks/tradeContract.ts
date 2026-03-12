"use client";

import { formatEther, getAddress, isAddress, type Abi, type Address } from "viem";
import { sepoliaClient } from "@/lib/client";

import ETFQuoterArtifact from "@/abi/ETFQuoter/ETFQuoter.json";
import ETFQuoterDeploy from "@/abi/ETFQuoter/run-latest.json";

const etfQuoterAddress = ETFQuoterDeploy.transactions[0]?.contractAddress as Address | undefined;
const etfQuoterAbi = ETFQuoterArtifact.abi as Abi;

export function tradeContract() {
    async function getQuoteInvestWithToken() {

    }
}