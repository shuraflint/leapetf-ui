"use client";
import ToConnect from "@/components/ToConnect";
import { useAccountAddress } from "@/context/AccountAddress";
import { useState } from "react";
import ETFImage from "@/img/ETF.svg";
import LETHImage from "@/img/LETH.svg";
import LBTCImage from "@/img/LBTC.svg";
import LINKImage from "@/img/LINK.svg";
import USDCImage from "@/img/USDC.svg";
import Image from "next/image";
import { portfolioContract } from "@/hooks/portfolioContract";
import { tradeContract } from "@/hooks/tradeContract";
import useSWR from "swr";
export default function RewardsPage() {
    const { address } = useAccountAddress();
    const [activeAction, setActiveAction] = useState<"invest" | "redeem">("invest");
    const [tokenOpen, setTokenOpen] = useState(false);
    type TokenName = "LBTC" | "LETH" | "LINK" | "USDC";
    const [token, setToken] = useState<TokenName>("LBTC");
    const [img, setImage] = useState(LBTCImage);
    const [del, setDel] = useState("Wrapped Bitcoin");
    const [amount, setAmount] = useState("");
    const { getEtfName, getSepoliaEthBalance, getLeapETFBalance, getERC20Balance } = portfolioContract();
    const { getQuoteInvestWithToken, getQuoteRedeemToToken } = tradeContract();

    const { data: LBTCBalance, error: LBTCBalanceError } = useSWR(
        address ? ["LBTC-balance", address] : null,
        ([, targetAddress]) => getERC20Balance("LBTC", targetAddress)
    );

    const { data: LETHBalance, error: LETHBalanceError } = useSWR(
        address ? ["LETH-balance", address] : null,
        ([, targetAddress]) => getERC20Balance("LETH", targetAddress)
    );

    const { data: LINKBalance, error: LINKBalanceError } = useSWR(
        address ? ["LINK-balance", address] : null,
        ([, targetAddress]) => getERC20Balance("LINK", targetAddress)
    );

    const { data: USDCBalance, error: USDCBalanceError } = useSWR(
        address ? ["USDC-balance", address] : null,
        ([, targetAddress]) => getERC20Balance("USDC", targetAddress)
    );

    const { data: ETFBalance, error: ETFBalanceError } = useSWR(
        address ? ["ETF-balance", address] : null,
        ([, targetAddress]) => getLeapETFBalance(targetAddress)
    );

    const [selBalance, setSelBalance] = useState(LBTCBalance);

    const [investBalance, setInvestBalance] = useState("0.000000");
    const [redeemTokenOpen, setRedeemTokenOpen] = useState(false);
    const [redeemToken, setRedeemToken] = useState<TokenName>("USDC");
    const [redeemImg, setRedeemImage] = useState(USDCImage);
    const [redeemDel, setRedeemDel] = useState("USD Coin");
    const [redeemAmount, setRedeemAmount] = useState("");
    const [redeemReceive, setRedeemReceive] = useState("0.000000");

    async function handleQuote(recAmount: string) {
        try {
            const result = await getQuoteInvestWithToken(token, Number(recAmount) * 10 ** 18);
            setInvestBalance(result.amount);
        } catch (err) {
            console.error(err);
            setInvestBalance("0.000000");
        }
    }

    async function handleRedeemQuote(burnAmount: string) {
        try {
            const result = await getQuoteRedeemToToken(redeemToken, Number(burnAmount) * 10 ** 18);
            setRedeemReceive(result.amount);
        } catch (err) {
            console.error(err);
            setRedeemReceive("0.000000");
        }
    }

    if (!address) {
        return <ToConnect />;
    }
    return (
        <div className="flex flex-col items-stretch justify-center h-[calc(100vh-4rem)]">
            <div className="flex-1  p-10 flex">
                <div className="flex-1 ">
                    <div className="flex h-15">
                        <button
                            className={
                                "flex-1 text-lg rounded-xl " +
                                (activeAction === "invest"
                                    ? "bg-blue-300/10 text-blue-500"
                                    : "bg-transparent")
                            }
                            onClick={() => setActiveAction("invest")}
                        >
                            Invest
                        </button>
                        <button
                            className={
                                "flex-1 text-lg rounded-lg " +
                                (activeAction === "redeem"
                                    ? "bg-blue-300/10 text-blue-500"
                                    : "bg-transparent")
                            }
                            onClick={() => setActiveAction("redeem")}
                        >
                            Redeem
                        </button>
                    </div>
                    {activeAction === "invest" ? (
                        <div>
                            <div className="mt-4 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart3 h-6 w-6  text-blue-500">
                                    <path d="M3 3v18h18"></path>
                                    <path d="M18 17V9"></path>
                                    <path d="M13 17V5"></path>
                                    <path d="M8 17v-3"></path>
                                </svg>
                                <p className="pl-3">Select Token</p>
                                <div className="ml-auto text-right mr-5">Balance:   {selBalance ? Number(selBalance).toFixed(2) : "0.00"}</div>
                            </div>
                            <div className="mt-4 relative">
                                <div
                                    className="flex w-full rounded-lg border border-gray/10 px-4 py-3 text-left text-blue-600"
                                    onClick={() => setTokenOpen((prev) => !prev)}>
                                    <Image src={img} alt="LETH" width={20} height={20} priority className="mr-3" />
                                    <div>{token}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-auto text-right mt-1" >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </div>
                                {tokenOpen ? (
                                    <div className="shadow bg-[var(--background)] absolute left-0 right-0 mt-4 rounded-lg border border-gray/10  shadow">
                                        {([
                                            { name: "LBTC", img: LBTCImage, del: "Wrapped Bitcoin", sel: LBTCBalance },
                                            { name: "LETH", img: LETHImage, del: "Wrapped Ether", sel: LETHBalance },
                                            { name: "LINK", img: LINKImage, del: "Chainlink", sel: LINKBalance },
                                            { name: "USDC", img: USDCImage, del: "USD Coin", sel: USDCBalance },
                                        ] as const).map((item) => (
                                            <div key={item.name} className="flex pl-5">
                                                <Image src={item.img} alt="LETH" width={20} height={20} priority />

                                                <button
                                                    type="button"
                                                    className={
                                                        "w-full px-4 py-2 text-left " +
                                                        (token === item.name ? "text-blue-600" : "text-slate-700")
                                                    }
                                                    onClick={() => {
                                                        setToken(item.name);
                                                        setImage(item.img);
                                                        setDel(item.del);
                                                        setSelBalance(item.sel)
                                                        setAmount("");
                                                        setInvestBalance("");
                                                        setTokenOpen(false);

                                                    }}
                                                >
                                                    {item.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            <div className="mt-4 rounded-lg border border-gray/10 h-40">

                                <div className="flex m-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-4 w-4 text-blue-500">
                                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                                        <path d="M5 3v4"></path><path d="M19 17v4"></path>
                                        <path d="M3 5h4"></path>
                                        <path d="M17 19h4"></path>
                                    </svg>
                                    <div className="flex-1 ml-2 -mt-1">ETF Received</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="ml-4" src={ETFImage} alt="ETF" width={40} height={40} priority />
                                    <div className="text-medium ml-4 ">ETF</div>
                                    <div className="ml-auto text-right mr-6 text-xl ">Enter the number of ETF you want to mint</div>
                                </div>
                                <div className="mt-4 px-4">
                                    <input
                                        type="text"
                                        placeholder="0.0"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            console.log("e.target.value: ", e.target.value);
                                            if (e.target.value == "") {
                                                setInvestBalance("");
                                            }
                                            handleQuote(e.target.value);
                                            console.log(investBalance)
                                        }}
                                        className="bg-blue-300/10 border border-gray/10 rounded-lg h-9 w-full text-right text-2xl placeholder:text-slate-400 focus:outline-none pr-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 rounded-lg border border-gray/10 h-40 flex flex-col">
                                <div className="m-4">Amount to Invest</div>
                                <div className="flex">
                                    <Image className="ml-4" src={img} alt="LETH" width={40} height={40} priority />
                                    <div className="flex flex-col pl-5">
                                        <div className="font-medium">{token}</div>
                                        <div className="text-sm text-muted-foreground">{del}</div>
                                    </div>
                                    {/* <div
                                        className="ml-auto text-right border border-gray/10 rounded-lg h-9 w-12 mr-5 items-center justify-center flex cursor-pointer"
                                        onClick={() => {
                                            setAmount(selBalance ? String(selBalance) : "0");
                                        }}
                                    >
                                        Max
                                    </div> */}
                                    <div className="ml-auto text-right mr-6 text-xl ">{investBalance ? Number(investBalance).toFixed(6) : "0.00"}</div>
                                </div>
                                <div className="flex justify-center w-full">
                                    <div className="border w-24/25 border-gray/10 mt-4"></div>
                                </div>
                                <div className="flex justify-between m-3">
                                    <div>Exchange Rate:</div>
                                    <div>1 ETF ≈ 100.0419 USDC</div>
                                </div>
                            </div>
                            <button className="mt-4 h-13 w-full bg-blue-500 text-white rounded-lg font-lg">
                                Invest Now
                            </button>
                        </div>

                    ) : (
                        <div>
                            <div className="mt-4 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet-cards h-6 w-6 text-blue-500">
                                    <rect width="18" height="14" x="3" y="5" rx="2"></rect>
                                    <path d="M21 12h-7"></path>
                                    <path d="M7 12h.01"></path>
                                </svg>
                                <p className="pl-3">Select Receive Token</p>
                                <div className="ml-auto text-right mr-5">
                                    ETF Balance: {ETFBalance ? Number(ETFBalance).toFixed(4) : "0.0000"}
                                </div>
                            </div>
                            <div className="mt-4 relative">
                                <div
                                    className="flex w-full rounded-lg border border-gray/10 px-4 py-3 text-left text-blue-600"
                                    onClick={() => setRedeemTokenOpen((prev) => !prev)}>
                                    <Image src={redeemImg} alt="redeem token" width={20} height={20} priority className="mr-3" />
                                    <div>{redeemToken}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50 ml-auto text-right mt-1" >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </div>
                                {redeemTokenOpen ? (
                                    <div className="shadow bg-[var(--background)] absolute left-0 right-0 mt-4 rounded-lg border border-gray/10  shadow">
                                        {([
                                            { name: "LBTC", img: LBTCImage, del: "Wrapped Bitcoin" },
                                            { name: "LETH", img: LETHImage, del: "Wrapped Ether" },
                                            { name: "LINK", img: LINKImage, del: "Chainlink" },
                                            { name: "USDC", img: USDCImage, del: "USD Coin" },
                                        ] as const).map((item) => (
                                            <div key={item.name} className="flex pl-5">
                                                <Image src={item.img} alt={item.name} width={20} height={20} priority />

                                                <button
                                                    type="button"
                                                    className={
                                                        "w-full px-4 py-2 text-left " +
                                                        (redeemToken === item.name ? "text-blue-600" : "text-slate-700")
                                                    }
                                                    onClick={() => {
                                                        setRedeemToken(item.name);
                                                        setRedeemImage(item.img);
                                                        setRedeemDel(item.del);
                                                        setRedeemAmount("");
                                                        setRedeemReceive("");
                                                        setRedeemTokenOpen(false);
                                                    }}
                                                >
                                                    {item.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mt-4 rounded-lg border border-gray/10 h-40">
                                <div className="flex m-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame h-4 w-4 text-blue-500">
                                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-2.5-5.5-2.5-5.5s-2.5 4.12-2.5 5.5Z"></path>
                                        <path d="M12 7c.3-1.31 1.2-2.4 2.5-3.2 1.1 2 1.3 4.3.6 6.5"></path>
                                    </svg>
                                    <div className="flex-1 ml-2 -mt-1">ETF to Burn</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="ml-4" src={ETFImage} alt="ETF" width={40} height={40} priority />
                                    <div className="text-medium ml-4 ">ETF</div>
                                    <div className="ml-auto text-right mr-6 text-xl ">Enter the number of ETF you want to redeem</div>
                                </div>
                                <div className="mt-4 px-4">
                                    <input
                                        type="text"
                                        placeholder="0.0"
                                        value={redeemAmount}
                                        onChange={(e) => {
                                            setRedeemAmount(e.target.value);
                                            if (e.target.value === "") {
                                                setRedeemReceive("");
                                                return;
                                            }
                                            handleRedeemQuote(e.target.value);
                                        }}
                                        className="bg-blue-300/10 border border-gray/10 rounded-lg h-9 w-full text-right text-2xl placeholder:text-slate-400 focus:outline-none pr-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 rounded-lg border border-gray/10 h-40 flex flex-col">
                                <div className="m-4">Amount to Receive</div>
                                <div className="flex">
                                    <Image className="ml-4" src={redeemImg} alt={redeemToken} width={40} height={40} priority />
                                    <div className="flex flex-col pl-5">
                                        <div className="font-medium">{redeemToken}</div>
                                        <div className="text-sm text-muted-foreground">{redeemDel}</div>
                                    </div>
                                    <div className="ml-auto text-right mr-6 text-xl ">
                                        {redeemReceive ? Number(redeemReceive).toFixed(6) : "0.00"}
                                    </div>
                                </div>
                                <div className="flex justify-center w-full">
                                    <div className="border w-24/25 border-gray/10 mt-4"></div>
                                </div>
                                <div className="flex justify-between m-3">
                                    <div>Estimated Output:</div>
                                    <div>Quotes may change based on pool liquidity.</div>
                                </div>
                            </div>
                            <button className="mt-4 h-13 w-full bg-blue-500 text-white rounded-lg font-lg">
                                Redeem Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* <h1 className="text-3xl font-bold mb-4">Trade 页面内容</h1>
            <p>这里�?Trade 的介绍或功能区�?/p> */}
        </div>
    );
}
