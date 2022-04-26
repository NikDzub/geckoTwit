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
  let coinHtml = await (
    await axios.get(
      `https://www.coingecko.com/en/coins/${req.params.id}/historical_data#panel`
    )
  ).data;

  let curPrice = coinHtml.substr(
    coinHtml.indexOf(`data-target="price.price">`),
    coinHtml.lastIndexOf(`live-percent-change`)
  );
  curPrice = curPrice.split(`price.price">`)[1].split(`live-percent-change`)[0];
  curPrice = curPrice.replace(`</span></span>`, "");
  curPrice = curPrice.replace(`<span class="`, "");
  curPrice = curPrice.trim();

  coinHtml = coinHtml.slice(
    coinHtml.indexOf("<tr>"),
    coinHtml.lastIndexOf("</tr>")
  );
  coinHtml = coinHtml.split("<tr>");
  coinHtml.shift();
  coinHtml.shift();
  coinHtml = coinHtml.map((tr) => {
    let date = tr
      .slice(tr.indexOf(`text-center">`), tr.indexOf("</th>"))
      .replace(`text-center">`, "");

    let mCap = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
    tr = tr.replace(`class="text-center">`, "");
    tr = tr.replace(`</td>`, "");
    while (mCap.includes(`\n`)) {
      mCap = mCap.replace(`\n`, "");
    }

    let vol = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
    tr = tr.replace(`class="text-center">`, "");
    tr = tr.replace(`</td>`, "");
    while (vol.includes(`\n`)) {
      vol = vol.replace(`\n`, "");
    }

    let open = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
    tr = tr.replace(`class="text-center">`, "");
    tr = tr.replace(`</td>`, "");
    while (open.includes(`\n`)) {
      open = open.replace(`\n`, "");
    }

    let close = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
    tr = tr.replace(`class="text-center">`, "");
    tr = tr.replace(`</td>`, "");
    while (close.includes(`\n`)) {
      close = close.replace(`\n`, "");
    }

    return { id: req.params.id, curPrice, date, mCap, vol, open, close };
  });
  res.status(200).json({ data: coinHtml });
});

module.exports = {
  getCoins,
  getCoin,
};
