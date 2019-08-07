const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const cors = require("cors");
const axios = require("axios");
var morgan = require("morgan");

const getBreweryData = async (queryString, pageNum) => {
  var brewerySearchURL = `https://api.openbrewerydb.org/breweries?page=${pageNum}&per_page=6/search?query=${queryString}`;
  try {
    const response = await axios.get(brewerySearchURL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ express: "Your Express backend is connected to React" });
});
app.get("/breweries", async (req, res) => {
  const response = await getBreweryData(req.query.query, req.query.pageNum);
  res.send(response);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
