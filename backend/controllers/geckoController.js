const asyncHandler = require('express-async-handler');
const axios = require('axios').default;

const getCoins = asyncHandler(async (req, res) => {
  const trendingURI =
    'https://www.coingecko.com/en/coins/trending?time=h24&top=300';
  const headers = { headers: { 'Content-Type': 'json' } };

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
      let tag = c.substring(c.indexOf('('), c.indexOf(`src="https://`));
      tag = tag.replace(`"`, '');
      tag = tag.replace('(', '');
      tag = tag.replace(')', '');
      tag = tag.trim();

      let img = c.substring(
        c.indexOf(`https://assets.coingecko.com/coins/images`),
        c.indexOf(`class='tw-hidden`)
      );
      img = img.replace(`<span`, '');
      img = img.replace(`" />`, '');
      img = img.trim();

      let precentageLastDay = c.substring(
        c.indexOf(`data-show-solid-arrow="false">`) +
          `data-show-solid-arrow="false">`.length +
          0,
        c.lastIndexOf('%') + 1
      );

      c = c.slice(c.indexOf('href'), c.lastIndexOf(`span`));
      c = c.slice(c.indexOf('coins/'), c.indexOf(`">`));
      c = c.replace('coins/', '');

      let id = c;

      while (id.includes(' ')) {
        id = id.replace(' ', '-');
      }
      coins.push({ id, tag, precentageLastDay, img });
    });
    res.status(200).json(coins);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'no coins found' });
  }
});

const getCoin = asyncHandler(async (req, res) => {
  try {
    let coinHtml = await (
      await axios.get(
        `https://www.coingecko.com/en/coins/${req.params.id}/historical_data#panel`
      )
    ).data;

    let curPrice = coinHtml.substr(
      coinHtml.indexOf(`data-target="price.price">`),
      coinHtml.lastIndexOf(`live-percent-change`)
    );
    curPrice = curPrice
      .split(`price.price">`)[1]
      .split(`live-percent-change`)[0];
    curPrice = curPrice.replace(`</span></span>`, '');
    curPrice = curPrice.replace(`<span class="`, '');
    curPrice = curPrice.trim();

    coinHtml = coinHtml.slice(
      coinHtml.indexOf('<tr>'),
      coinHtml.lastIndexOf('</tr>')
    );
    coinHtml = coinHtml.split('<tr>');
    coinHtml.shift();
    coinHtml.shift();
    coinHtml = coinHtml.map((tr) => {
      let date = new Date(
        tr
          .slice(tr.indexOf(`text-center">`), tr.indexOf('</th>'))
          .replace(`text-center">`, '')
      ).toISOString();
      date = date.substring(0, date.indexOf('T'));

      let mCap = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
      tr = tr.replace(`class="text-center">`, '');
      tr = tr.replace(`</td>`, '');
      while (mCap.includes(`\n`)) {
        mCap = mCap.replace(`\n`, '');
      }

      let vol = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
      tr = tr.replace(`class="text-center">`, '');
      tr = tr.replace(`</td>`, '');
      while (vol.includes(`\n`)) {
        vol = vol.replace(`\n`, '');
      }

      let open = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
      tr = tr.replace(`class="text-center">`, '');
      tr = tr.replace(`</td>`, '');
      while (open.includes(`\n`)) {
        open = open.replace(`\n`, '');
      }

      let close = tr.split(`class="text-center">`)[1].split(`</td>`)[0];
      tr = tr.replace(`class="text-center">`, '');
      tr = tr.replace(`</td>`, '');
      while (close.includes(`\n`)) {
        close = close.replace(`\n`, '');
      }
      return { id: req.params.id, curPrice, date, mCap, vol, open, close };
    });
    res.status(200).json({ data: coinHtml });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'no coin found' });
  }
});

module.exports = {
  getCoins,
  getCoin,
};
