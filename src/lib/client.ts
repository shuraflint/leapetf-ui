import { createPublicClient, http } from "viem";

//这里统一管理RPC连接，其他页面需要连接区块链时，直接从这里导入sepoliaClient即可
export const sepoliaClient = createPublicClient({
    transport: http(
        "https://eth-sepolia.g.alchemy.com/v2/-W6iSwWSEsBNs7kKeTIBo"
    )
});