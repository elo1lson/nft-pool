import { Data } from "./email.js";

const baseUrl = "https://app.hadeswap.com/";
const query = "account/orders?wallet=";
const wallet = "BRXcrsHXNoUJQyRJoeFHexFLNziMh9PqjS2iqPv977Zv";
const fullUrl = baseUrl + query + wallet;

async function goToWebsite(url) {
  try {
    await fetch("https://graphql.tensor.trade/graphql", {
      headers: {
        accept: "*/*",
        "accept-language": "pt-BR,pt;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not_A Brand";v="99", "Brave";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
      },
      referrer: "https://app.hadeswap.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '[{"operationName":"UserSwapOrders","variables":{"owner":"BRXcrsHXNoUJQyRJoeFHexFLNziMh9PqjS2iqPv977Zv"},"query":"query UserSwapOrders($owner: String!) {\\n  userTswapOrders(owner: $owner) {\\n    pool {\\n      ...ReducedTSwapPool\\n      __typename\\n    }\\n    slug\\n    collName\\n    floorPrice\\n    numMints\\n    __typename\\n  }\\n  userHswapOrders(owner: $owner) {\\n    pool {\\n      ...ReducedHSwapPool\\n      __typename\\n    }\\n    slug\\n    collName\\n    floorPrice\\n    numMints\\n    __typename\\n  }\\n}\\n\\nfragment ReducedTSwapPool on TSwapPool {\\n  address\\n  ownerAddress\\n  whitelistAddress\\n  poolType\\n  curveType\\n  startingPrice\\n  delta\\n  honorRoyalties\\n  mmFeeBps\\n  takerSellCount\\n  takerBuyCount\\n  nftsHeld\\n  solBalance\\n  createdUnix\\n  statsTakerSellCount\\n  statsTakerBuyCount\\n  statsAccumulatedMmProfit\\n  margin\\n  lastTransactedAt\\n  maxTakerSellCount\\n  nftsForSale {\\n    ...ReducedMint\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ReducedMint on TLinkedTxMintTV2 {\\n  onchainId\\n  name\\n  imageUri\\n  metadataUri\\n  metadataFetchedAt\\n  sellRoyaltyFeeBPS\\n  attributes\\n  rarityRankTT\\n  rarityRankTTStat\\n  rarityRankHR\\n  rarityRankTeam\\n  rarityRankStat\\n  rarityRankTN\\n  lastSale {\\n    price\\n    priceUnit\\n    txAt\\n    __typename\\n  }\\n  accState\\n  __typename\\n}\\n\\nfragment ReducedHSwapPool on HSwapPool {\\n  address\\n  pairType\\n  delta\\n  curveType\\n  baseSpotPrice\\n  feeBps\\n  mathCounter\\n  assetReceiver\\n  boxes {\\n    address\\n    vaultTokenAccount\\n    mint {\\n      ...ReducedMint\\n      __typename\\n    }\\n    __typename\\n  }\\n  feeBalance\\n  buyOrdersQuantity\\n  fundsSolOrTokenBalance\\n  createdAt\\n  lastTransactedAt\\n  __typename\\n}"}]',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }).then((r) =>
      r.json().then((res) => {
        extractUserHswapOrders(res);
      })
    );
  } catch (e) {
    console.log(e, "erro");
  }
}

async function extractUserHswapOrders(res) {
  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    const { data } = element;
    const { userHswapOrders } = data;
    extractData(userHswapOrders);
  }
}

async function extractData(res) {
  let element;
  let returnData = [];
  let x = 1000000000;
  let some = {};

  for (let i = 0; i < res.length; i++) {
    element = res[i];

    let { pool, slug, floorPrice } = element;
    some[slug] = [];

    pool.boxes.forEach((e) => {
      let number = Number(e.mint.lastSale.price);
      some[slug].push(number);
    });

    returnData.push({
      slug,
      type: pool.pairType,
      crv: pool.curveType,
      sol: (parseInt(pool.fundsSolOrTokenBalance) / x).toFixed(2),
      fees: (parseInt(pool.feeBalance) / x).toFixed(2),
      floorPrice: parseFloat(floorPrice).toFixed(2),
      nfts: pool.boxes.length,
      createdAt: pool.createdAt,
      extractedAt: new Date().toISOString(),
    });
  }
  new Data(returnData).saveAsCSV();
}

async function run() {
  goToWebsite(fullUrl);
}
export default run;
