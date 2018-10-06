const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const logger = require("morgan");
const cheerio = require("cheerio");

const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

//var scrape = require("./scripts/scrape");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
//require("./routes/htmlRoutes")(app);

//mongoose.connect("mongodb://localhost/headlinesDB");
// test

app.listen(PORT, function () {
    console.log(`Connection successful! Listening on port: ${PORT}`);
});

app.get("/", function (req, res) {
    axios.get("https://www.pcgamer.com/news/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div.listingResult").each(function (i, element) {
            var articles = [];

            var title = $(element).find("h3.article-name").text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).find("a").attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            articles.push({
                title: title,
                link: link
            });

            console.log(articles);

            db.Article.create(articles)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    return resizeBy.json(err);
                });
        });
        res.render("index");
    });
});

app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


//connect mongoose to db
mongoose.connect("mongodb://localhost/headlinesDB", function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

module.exports = app;
