const express = require("express");
const cors = require("cors");
const axios = require("axios");
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 9000;

const getBreweryData = async queryString => {
  var brewerySearchURL = `https://api.openbrewerydb.org/breweries/search?query=${queryString}&per_page=12`;
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
  const response = await getBreweryData(req.query.query);
  res.send(response);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
