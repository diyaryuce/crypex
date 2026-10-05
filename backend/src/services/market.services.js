let cachedPrices = null;
let lastFetchedAt = 0;

const historyCache = new Map();

const CACHE_DURATION = 30_000;
const HISTORY_CACHE_DURATION = 60_000;

async function getMarketPrices() {
  const now = Date.now();

  if (cachedPrices && now - lastFetchedAt < CACHE_DURATION) {
    return cachedPrices;
  }

  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("CoinGecko error:", response.status, errorBody);

    throw new Error("Failed to fetch market prices");
  }

  const data = await response.json();

  cachedPrices = {
    BTC: {
      price: data.bitcoin.usd,
      change24h: data.bitcoin.usd_24h_change,
    },
    ETH: {
      price: data.ethereum.usd,
      change24h: data.ethereum.usd_24h_change,
    },
  };

  lastFetchedAt = now;

  return cachedPrices;
}

const coinIds = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

const rangeDays = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "1Y": 365,
};

async function getMarketHistory(asset, range) {
  const normalizedAsset = String(asset).toUpperCase();
  const normalizedRange = String(range || "1D").toUpperCase();

  const coinId = coinIds[normalizedAsset];
  const days = rangeDays[normalizedRange];

  if (!coinId) {
    throw new Error("Unsupported asset");
  }

  if (!days) {
    throw new Error(`Unsupported range: ${normalizedRange}`);
  }

  const cacheKey = `${normalizedAsset}-${normalizedRange}`;

  const cached = historyCache.get(cacheKey);

  if (cached && Date.now() - cached.fetchedAt < HISTORY_CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("CoinGecko history error:", response.status, errorBody);

    throw new Error(
      `CoinGecko history request failed with status ${response.status}`,
    );
  }

  const data = await response.json();

  const history = data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }));

  historyCache.set(cacheKey, {
    data: history,
    fetchedAt: Date.now(),
  });

  return history;
}

module.exports = {
  getMarketPrices,
  getMarketHistory,
};
