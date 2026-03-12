"use client";

import ToConnect from "@/components/ToConnect";
import { useAccountAddress } from "@/context/AccountAddress";
import { portfolioContract } from "@/hooks/portfolioContract";
import useSWR from "swr";
import Image from "next/image";
import ETFImage from "@/img/ETF.svg";
import LETHImage from "@/img/LETH.svg";
import LBTCImage from "@/img/LBTC.svg";
import LINKImage from "@/img/LINK.svg";
import USDCImage from "@/img/USDC.svg";


export default function PortfolioPage() {

    const { address } = useAccountAddress();
    const { getEtfName, getSepoliaEthBalance, getLeapETFBalance, getERC20Balance } = portfolioContract();

    // const [etfName, setEtfName] = useState("");
    // const [loading, setLoading] = useState(false);

    const { data: etfName, error: etfNameError, isLoading } = useSWR(
        //key：当key为null时，useSWR不会发起请求，这样就实现了根据address是否存在来决定是否发起请求
        address ? "etf-name" : null,
        //fetcher
        getEtfName
    );

    const { data: sepoliaEthBalance, error: sepoliaEthBalanceError } = useSWR(
        //这是key，当address变化时，key也会变化，从而触发useSWR重新请求数据
        address ? ["sepolia-eth-balance", address] : null,
        //通过解构，拿到key的第二个元素，也就是address，传给fetcher函数getSepoliaEthBalance
        ([, targetAddress]) => getSepoliaEthBalance(targetAddress)
    );

    const { data: leapETFBalance, error: leapETFBalanceError } = useSWR(
        address ? ["leap-etf-balance", address] : null,
        ([, targetAddress]) => getLeapETFBalance(targetAddress)
    );

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

    // useEffect(() => {

    //     if (!address) return;

    //     async function fetchName() {
    //         try {
    //             setLoading(true);
    //             const name = await getEtfName();
    //             setEtfName(name);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchName();

    // }, [address]);

    if (!address) {
        return <ToConnect />;
    }

    return (
        // <div className="h-full flex flex-col items-center justify-center bg-red-500">
        //     <h1 className="text-3xl font-bold mb-4">Portfolio 页面内容</h1>

        //     <p className="text-sm opacity-80">
        //         当前连接地址：{address.slice(0, 6)}...{address.slice(-4)}
        //     </p>

        //     <p className="mt-3 text-sm opacity-80">
        //         ETFTrading.name(): {isLoading ? "读取中..." : etfName}
        //     </p>

        //     {error && (
        //         <p className="text-red-500">
        //             读取失败
        //         </p>
        //     )}

        // </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] p-6">
            <div className=" h-1/4 flex gap-5 justify-between">
                {/* 第一个 */}
                <div className="border flex-1 rounded-lg  shadow-sm overflow-hidden border-white/20">
                    <div className="flex items-center pt-8 pl-8">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                            <svg width="16" height="16" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="text-blue-500">
                                <path fill="currentColor" d="M127.9611 0.0369453L125.1661 9.5877V285.168L127.9611 288.007L223.2481 228.257L127.9611 0.0369453Z"></path>
                                <path fill="currentColor" d="M127.962 0.0369453L32.6751 228.257L127.962 288.007V154.509V0.0369453Z"></path>
                                <path fill="currentColor" d="M127.9609 312.1866L126.3859 314.1056V413.2976L127.9609 416.9026L223.2979 252.7956L127.9609 312.1866Z"></path>
                                <path fill="currentColor" d="M127.962 416.9023V312.1863L32.6751 252.7953L127.962 416.9023Z"></path>
                                <path fill="currentColor" d="M127.9639 288.0069L223.2509 228.2569L127.9639 154.5089V288.0069Z"></path>
                                <path fill="currentColor" d="M32.6751 228.2569L127.962 288.0069V154.5089L32.6751 228.2569Z"></path>
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-500">Sepolia Balance</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[var(--foreground)] pl-8 pt-4">
                            {/* sepoliaEthBalance?.eth  等价于 sepoliaEthBalance ? sepoliaEthBalance.eth : undefined */}
                            {/* A ?? B  =>  如果 A 是 null 或 undefined → 返回 B，否则返回 A*/}
                            {sepoliaEthBalance?.eth
                                ? Number(sepoliaEthBalance.eth).toFixed(2)
                                : "0.00"}
                        </p>
                        <p className="text-sm text-muted-foreground pl-8">SepoliaETH</p>
                        {sepoliaEthBalanceError ? (
                            <p className="text-xs text-red-500 pl-8 pt-1">读取余额失败</p>
                        ) : null}
                    </div>
                </div>
                {/* 第二个 */}
                <div className="border flex-1 rounded-lg  shadow-sm overflow-hidden border-white/20">
                    <div className="flex items-center  pt-8 pl-8">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"></path>
                                <path d="M16 14h4"></path><path d="M18 12v4"></path><path d="M2 10h20"></path>
                            </svg></div><p className="text-sm font-medium text-purple-500">LeapETF Balance</p></div>
                    <div>
                        <p className="text-2xl font-bold text-[var(--foreground)] pl-8 pt-4">
                            {leapETFBalance ? Number(leapETFBalance).toFixed(2) : "0.00"}
                        </p>
                        <p className="text-sm text-muted-foreground pl-8">LETF</p>
                        {leapETFBalanceError ? (
                            <p className="text-xs text-red-500 pl-8 pt-1">读取余额失败</p>
                        ) : null}
                    </div>
                </div>
                {/* 第三个 */}
                <div className="border flex-1 rounded-lg  shadow-sm overflow-hidden border-white/20">
                    <div className="flex flex-col space-y-1.5 pt-8 pl-8">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-green-500">ETF Allocation</p>
                        </div>
                    </div>
                    <div className="p-6 pt-4 px-6 pb-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm">LBTC (40%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
                                <span className="text-sm">LETH (30%)</span>
                            </div><div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-sky-500"></div>
                                <span className="text-sm">LINK (20%)</span>
                            </div><div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-emerald-500"></div>
                                <span className="text-sm">USDC (10%)</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex-1  mt-6  ">
                <div className="flex flex-col  h-full border rounded-lg  shadow-sm overflow-hidden border-white/20">
                    <div className="flex flex-1 border-b border-white/20 text-lg items-center pl-8">Your Assets</div>
                    <div className="flex-1 border-b border-white/20 flex items-center pl-8">
                        <Image src={ETFImage} alt="ETF" width={40} height={40} priority />
                        <div className="flex flex-col pl-8">
                            <p className="font-medium">ETF</p>
                            <p className="text-sm text-muted-foreground">LeapETF Token</p>
                        </div>
                        <div className="ml-auto text-right font-medium w-28 pr-8">
                            {leapETFBalance ? Number(leapETFBalance).toFixed(2) : "0.00"}
                        </div>
                    </div>
                    <div className="flex-1 border-b border-white/20 flex items-center pl-8">
                        <Image src={LETHImage} alt="LETH" width={40} height={40} priority />
                        <div className="flex flex-col pl-8">
                            <p className="font-medium">LETH</p>
                            <p className="text-sm text-muted-foreground">Wrapped Ether</p>
                        </div>
                        <div className="ml-auto text-right font-medium w-28 pr-8">
                            {LETHBalance ? Number(LETHBalance).toFixed(2) : "0.00"}
                        </div>

                    </div>
                    <div className="flex-1 border-b border-white/20 flex items-center pl-8">
                        <Image src={LBTCImage} alt="LBTC" width={40} height={40} priority />
                        <div className="flex flex-col pl-8">
                            <p className="font-medium">LBTC</p>
                            <p className="text-sm text-muted-foreground">Wrapped Bitcoin</p>
                        </div>
                        <div className="ml-auto text-right font-medium w-28 pr-8">
                            {LBTCBalance ? Number(LBTCBalance).toFixed(2) : "0.00"}
                        </div>
                    </div>
                    <div className="flex-1 border-b border-white/20 flex items-center pl-8">
                        <Image src={LINKImage} alt="LINK" width={40} height={40} priority />
                        <div className="flex flex-col pl-8">
                            <p className="font-medium">LINK</p>
                            <p className="text-sm text-muted-foreground">Chainlink</p>
                        </div>
                        <div className="ml-auto text-right font-medium w-28 pr-8">
                            {LINKBalance ? Number(LINKBalance).toFixed(2) : "0.00"}
                        </div>
                    </div>
                    <div className="flex-1 border-b border-white/20 flex items-center pl-8">
                        <Image src={USDCImage} alt="USDC" width={40} height={40} priority />
                        <div className="flex flex-col pl-8">
                            <p className="font-medium">USDC</p>
                            <p className="text-sm text-muted-foreground">USD Coin</p>
                        </div>
                        <div className="ml-auto text-right font-medium w-28 pr-8">
                            {USDCBalance ? Number(USDCBalance).toFixed(2) : "0.00"}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
