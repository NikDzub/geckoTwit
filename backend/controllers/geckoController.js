const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

const getCoins = asyncHandler(async (req, res) => {
  const trendingURI =
    "https://www.coingecko.com/en/coins/trending?time=h24&top=300";
  const headers = { headers: { "Content-Type": "json" } };

  try {
    let trendHtml = await (await axios.get(trendingURI, { headers })).data;
    trendHtml = trendHtml
      .slice(
        trendHtml.indexOf(`<div class="tw-flex">`),
        trendHtml.lastIndexOf(`<div class="tw-flex">`)
      )
      .split(`<div class="tw-flex">`);
    trendHtml.shift();
    let coins = [];

    trendHtml.forEach((c) => {
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
      coins.push({ name, precentageLastDay });
    });
    res.status(200).json(coins);
  } catch (error) {
    console.log(error);
    res.status(666).json({ err: error.message });
  }
});

const getCoin = asyncHandler(async (req, res) => {
  const coinHtml = await (
    await axios.get(
      `https://www.coingecko.com/en/coins/${req.params.id}/historical_data#panel`
    )
  ).data;
  res.status(200).json({ data: coinHtml });
});

module.exports = {
  getCoins,
  getCoin,
};
