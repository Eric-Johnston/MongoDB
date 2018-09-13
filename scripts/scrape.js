const request = require("request");
const cheerio = require("cheerio");

var scrape = function(cb) {
    request("https://www.pcgamer.com/news/", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = []

        $(".listingResult").each(function(i, element) {
            var headline = $(this).children(".article-name").text().trim();
            var summary = $(this).children(".synopsis").text().trim();
            var link = $(this).children("<a> href");

            var toArray = {
                headline: headline,
                summary: summary,
                link: link
            };

            articles.push(toArray);
        });

        return(articles);
        console.log(articles);
    });
};

module.exports = scrape;