const fetch = require('node-fetch');
const ethers = require('ethers');

async function main(addresses) {
    const rpcUrls = [
        // "https://eth1.lava.build/lava-referer-6c8e4ccd-97ff-4fea-b0c0-14825f388555/",//zhu
        "https://eth1.lava.build/lava-referer-ecf1f207-a34c-40fe-91aa-f6530db62b0e/",//1
        // "https://eth1.lava.build/lava-referer-c0507567-20f8-43c7-a467-dceb636eb7d1/",//2
        "https://eth1.lava.build/lava-referer-c20a5a67-28da-48de-84dc-54b5a8df9a36/",//3
        // "https://eth1.lava.build/lava-referer-caefd263-07c1-4cdd-9736-1ab03cd0adfc/",//4
        "https://eth1.lava.build/lava-referer-4d58a7f0-f2d1-4ac4-889c-d10d6bc5c5af/",//5
        // "https://eth1.lava.build/lava-referer-55ef5d3f-73cd-4416-8d47-dcbdced31b5d/",//6
        "https://eth1.lava.build/lava-referer-6cc5deeb-594b-4b3c-88d4-c8a15ddbf690/",//7
        // "https://eth1.lava.build/lava-referer-284f8937-cacb-4aa0-a223-069320f58a49/",//8
        "https://eth1.lava.build/lava-referer-b115e35c-3be2-441d-8e9e-a39974e8db45/",//9
        // "https://eth1.lava.build/lava-referer-5c35687f-0674-495c-ac4c-9b325f94bd77/"//10


    ]

    const shuffledAddresses = addresses
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    for (let i = 0; i < shuffledAddresses.length - 1; i++) {
        const address = shuffledAddresses[i].split(',')[0].trim();
        if (!address) continue;

        const rpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];
        try {
            const result = await checkBalanceAndAppend(address, rpcUrl);
            console.log(i, result, '\n');
        } catch (error) {
            console.error(`RPC调用错误，获取钱包余额失败 - ${address}: ${error.message}\n`);
        }
    }
}

async function fetchRPC(url, body) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
    });

    if (!response.ok) {
        throw new Error(`HTTP 错误! 状态: ${response.status}, 信息: ${await response.text()}`);
    }
    return response.json();
}

async function checkBalanceAndAppend(address, rpcUrl) {
    console.log(`使用的RPC: ${rpcUrl}`);
    const jsonRpcPayload = {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1,
    };

    const response = await fetchRPC(rpcUrl, jsonRpcPayload);
    if (response.error) {
        throw new Error(`RPC error: ${response.error.message}`);
    }

    const balance = ethers.utils.formatUnits(response.result, 'ether');
    return `查询成功, 地址: ${address} - 余额: ${balance} ETH`;
}

const addresses = [
    "0x45607f19865aeadb39e0f24c9f5fe58dd64c6c89",
    "0x69d8c4607387a3c7cf010de6b5b565f2086147b7",
    "0xba241245b4f0de7367567d2140689f30c6abd345",
    "0xe7f69faa8a81a13dac014b62fa754cbdd9df0508",
    "0xd522542558e096605e37e9ed4e5afcfb4ae9cd26",
    "0xf77137e1190a8d3f3d255a65f6f38cd98db15365",
    "0xaf1fca73448510f98d3190460ca5d22038be843b",
    "0xe2930011b62655c45005cc6ec52348a77bba02dc",
    "0xcba7d40dad91194081abae001bd3cbe0a6470608",
    "0x6fcc54f99a5c806025325d763d98fb9ffe353187",
    "0xce1c6d8403a357a7e375f6abd99e82f4d4abc641",
    "0x5d39351b4c562896803833bee18bb0cf3e4e9424",
    "0x9a274834077041f31bc89b43150b9687b2db8478",
    "0x49b8110f6a94212c979010f7fdfd6600f40e98f2",
    "0xb41555296b6937677c689fb14eb03587a39ae07a",
    "0xee6209f0aefe0773c3381f70d154cf5526bba4bd",
    "0x08a6b09463f20db5054018d0e6005c121c2a275e",
    "0x85d83dd6a4901c8056dc53b6630a35c0055dfa6f",
    "0xa0f4e0f4f98b5d4de4f339fe766bf2746ac74d08",
    "0xb010950ebe9d41ffbfb21fec2f5d5361446be152",
    "0x8f580598ca3e374c25f6a1b6a59c8ef890d1514d",
    "0x13ecdbd7f0d3b4397f3d5c77e7f53437bd632d83",
    "0xee2ec8b0434883c618b720036f39497d68d839af",
    "0x73658f05014fcbb3247b3b508e88694e15fc30be",
    "0x9848424af0ab543891be8ed0dc5e8b268f0f3b84",
    "0xf2c7b02400820d842d75e69c5f5c7a6f88c10198",
    "0xf55184e6ed341ebb55ea0ed8d299234faded7d5c",
    "0x9f37db3ac6098d26fa9acb01d3843a21c3defe73",
    "0x5574d720d02a7f1e8a7aa7544a92a1a29cbaac52",
    "0xb7eb6546a4f64482dfca133fb912399c5e00d8ae",
    "0x6c137a08640249a85e95880aa5029a491478eced",
    "0x71cfa9eaae558b03adc4ce5d7cc03354f68ae3a2",
    "0x99576bda6ffb75d16cdb12e2d234afffb5a073d0",
    "0x4cd90479c54518c34ada98ef1959833c0e909485",
    "0x9f71bac224e7419c8cf076c0838c05a20db678c6",
    "0x22bec56bfc86a25b37231e325e7c281dfec9a6d8",
    "0x18c692ac5975eaba78b11e9865ff52bd193b383b",
    "0x99d9d38d8ed737103fee93648a71cd4dd4d0cf6f",
    "0xf1f09e58f016e0b988a51225bd67acefb8755ff3",
    "0x307978141c2931e52a6eaa1fe5026fd94c7ccee3",
    "0x3503a769c2fa6995cdd50e4307e691cd70edc41e",
    "0x71c477edefe26dc914a841a8578c6019fce8aa88",
    "0x1e0efbe7040cbfed4c0f12f58fc6929a6954b9c3",
    "0xf451095964121bd77051e27f0889c0e42b42c29a",
    "0x3a335d5bf82d727203eaa964b833523f6565face",
    "0x585e9284f98375004d09ba5dca335477b01cf38e",
    "0x3dc04c0539c44122c8eb8d11f9b46868d55a6255",
    "0x225dcad14aa6721f82fd7ef9980338c84c0e2811",
    "0x1537b11c6c23ba3370e6e86e56d3487e42975930",
    "0xb209a8ac16a835400221dee33ace82c85fcd098d",
    "0x93f9ddb9a4a17d30100db175da6e78cbfbc980d0",
    "0x3955c2c97eac8968b9e559d8a17f974811dda7e6",
    "0xa2f522cdbefa89c076d328f56dbf8babbb80ebf2",
    "0x9af2c5dc714dbdecd04bb0f9f8459be5b2f9cb83",
    "0x72aca703463e288fb2cd514b89a153811dd7e232",
    "0xbb8636bbc40dd3667cdaa771d3a3414ff740cf23",
    "0x8d2ad61f06bb400ba5d530e2d60c9f4458c7d781",
    "0xec08a242ab6817b00c09baf1b1493b5f75d7a654",
    "0xc68f46a400563276186c08637db562902add16f1",
    "0x964da1ea9315e65f9c3e5422f8ede16d68c3d018",
    "0x7c6852da04caf7f3d1bfe3bfdb09fec00103483d",
    "0x73df9f93a89611cb519cf8f463b1f865f80b44cb",
    "0x5cc24ca3a07330622fe3dd46da2e9009fb285aca",
    "0xa800fb7a63e255a57da8de11dea3c0d557b43d40",
    "0x2f8d5d3e4ed72dc5ea2534e6cfb71c98c368f482",
    "0xa9d99073c7be2964bbe3d3f3b0e12b81204697c5",
    "0xbed5657828e0b4ae37dd24f5c2113d262d3d8f4b",
    "0x6df6372034ba20cd2e5d002f586d96ac67ed2dde",
    "0x5259c015749f04431dfe1844c55415389000e003",
    "0xc45ff581f1c3c5560c48c1ff3c68d2d0ab2e4832",
    "0x2f1752ce01d9763c468b003d11cc33103f580a84",
]

main(addresses).catch(console.error);
