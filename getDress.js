const axios = require("axios");
const cheerio = require("cheerio");
const Dress = require("./models/Dress");

const page_url =
  "https://www.koton.com/tr/kadin-suni-kurk-detayli-kaban/p/1KAK06624EW999?productPosition=0&listName=Kad%C4%B1n%20Kaban%20Modelleri#tab-1";

async function getDress() {
  const { data } = await axios.get(page_url);
  const $ = cheerio.load(data);
  const title = $("title").text().trim();
  const oldPrice = $("div.price-contain span.insteadPrice").text().trim();
  const newPrice = $("div.price-contain span.newPrice").text().trim();
  const color = $("div.color span.title").text().trim();

  const Prices = [];

  var discount = new Boolean(false);
  const price = oldPrice - newPrice;
  if (price > 0) {
    discount = true;
  }

  Prices.push(oldPrice);
  Prices.push(newPrice);

  let uri = [];
  const img_uri = $(
    "div.productDetailImageContainer.prod-pics-sect.clearfix img"
  ).each((i, element) => {
    const $Uri = $(element);
    uri[i] = $Uri.attr("alt-src");
  });

  const category = $("div.breadcrumb li a").text();
  const productDetail = $("div.left-content p.alt-text").first().text().trim();

  const newDress = new Dress({
    id: page_url,
    title: title,
    description: productDetail,
    images: uri,
    productCategory: category,
    color: color,
    prices: Prices,
  });
  const promise = newDress.save();
  promise.then((data) => {
    console.log(data);
    promise.catch((err) => {
      console.log(err);
    });
  });
}

getDress();
