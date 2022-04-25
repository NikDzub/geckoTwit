const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

const getCoins = asyncHandler(async (req, res) => {
  let coins = [];
  let history = [];
  let trendingCoins = await axios.get(
    "https://www.coingecko.com/en/coins/trending?time=h24&top=300",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const firstDivIndex = trendingCoins.data.indexOf(`<div class="tw-flex">`);
  const lastDivIndex = trendingCoins.data.lastIndexOf(`<div class="tw-flex">`);

  trendingCoins = trendingCoins.data.slice(firstDivIndex, lastDivIndex);
  trendingCoins = trendingCoins.split(`<div class="tw-flex">`);
  trendingCoins.shift();

  trendingCoins.forEach(async (c) => {
    let precentageLastDay = c.substring(
      c.indexOf(`data-show-solid-arrow="false">`) +
        `data-show-solid-arrow="false">`.length +
        0,
      c.lastIndexOf("%") + 1
    );

    c = c.slice(c.indexOf("href"), c.lastIndexOf(`span`));
    c = c.slice(c.indexOf("coins/"), c.indexOf(`">`));
    c = c.replace("coins/", "");

    let name = c;

    while (name.includes(" ")) {
      name = name.replace(" ", "-");
    }

    /* let historyData = await axios.get(
      `https://www.coingecko.com/en/coins/${name}/historical_data#panel`
    );
    history.push(historyData); */

    let now = new Date();
    now = now.getTime();
    now = now.toString().slice(0, -3);

    let weekAgo = new Date(new Date());
    weekAgo.setDate(weekAgo.getDate() - 6);
    weekAgo = weekAgo.getTime();
    weekAgo = weekAgo.toString().slice(0, -3);

    if (coins.length < 4) {
      coins.push({
        name,
        precentageLastDay,
        now,
        weekAgo,
      });
    }
  });

  //🟨

  res.status(200).json({ data: coins, history: history });
});

module.exports = {
  getCoins,
};
