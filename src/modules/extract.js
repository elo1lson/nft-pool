/**
 * Fetches data from the TensorTrade GraphQL API and extracts relevant information.
 *
 * @module goToData
 * @param {string} url - The URL for the GraphQL API.
 * @returns {Promise<Object[]>} - A Promise that resolves to an array of objects containing relevant data extracted from the API response.
 */

const optionsQuery = require("../../http/optionsQuery.js");

/**
 * Logs an error message to the console.
 * @param {Error} e - The error object.
 * @param {string} msg - The message to log.
 */
const hasError = (e, msg) => {
  console.log(e + "\non:\n\n" + msg);
};

/**
 * Extracts relevant data from an object representing user Hswap or Tswap orders.
 * @param {Object} res - The object representing user Hswap or Tswap orders.
 * @param {function} cb - The callback function used to extract the relevant data from the user Hswap or Tswap order.
 * @returns {Object[]} - An array of objects containing relevant data extracted from the user Hswap or Tswap order.
 */
function extractUserHswapOrders(res, cb) {
  const { data } = res;
  const newData = [];
  const { userHswapOrders, userTswapOrders } = data;

  if (userHswapOrders) {
    for (let i in userHswapOrders) {
      newData.push(cb(userHswapOrders[i]));
    }
  }

  if (userTswapOrders) {
    for (let i in userTswapOrders) {
      newData.push(cb(userTswapOrders[i]));
    }
  }
  return newData;
}

/**
 * Extracts relevant data from an object representing a pool on the TensorTrade platform.
 * @param {Object} res - The object representing a pool on the TensorTrade platform.
 * @returns {Object} - An object containing relevant data extracted from the pool object.
 */
function extractData(res) {
  const returnData = [];
  const x = 1000000000;

  const { pool, slug, floorPrice } = res;
  const { address } = pool;

  return {
    slug,
    address,
    type: pool.pairType || pool.poolType,
    crv: pool.curveType,
    sol: parseInt(pool.fundsSolOrTokenBalance) || pool.solBalance / x,
    fees: parseInt(pool.feeBalance) || pool.mmFeeBalance / x,
    floorPrice: parseFloat(floorPrice),
    nfts: pool.nftsHeld || 0,
    createdAt: new Date(pool.createdAt || pool.createdUnix),
    extractedAt: new Date(),
  };
}

/**
 * Fetches data from the TensorTrade GraphQL API and extracts relevant information.
 * @param {string} url - The URL for the GraphQL API.
 * @returns {Promise<Object[]>} - A Promise that resolves to an array of objects containing relevant data extracted from the API response.
 */
async function goToData(url) {
  try {
    let req = await fetch(
      "https://graphql.tensor.trade/graphql",
      optionsQuery
    ).then((r) => r.json());

    req.shift();
    return req.flatMap((data) => extractUserHswapOrders(data, extractData)); //.flat();
  } catch (e) {
    hasError(e, "function name: goToData");
  }
}

module.exports = goToData;
