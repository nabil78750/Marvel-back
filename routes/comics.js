const express = require("express");
const router = express.Router();
const axios = require("axios");

// une route pour récup les comics
router.get("/comics", async (req, res) => {
  try {
    // - paramètre de recherche (titre)
    console.log(req.query);
    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.title) {
      query = query + `&title=${req.query.title}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour récup les comics liés à un  personnage (ID => params)
router.get("/comics/:characterID", async (req, res) => {
  try {
    // - paramètre de recherche (titre)
    console.log("query =>", req.query);
    console.log("params =>", req.params.characterID);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data.comics.length);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    // ex. de params: 5fce17e278edeb0017c93def
    const { comicId } = req.params;
    console.log(comicId);
    const { data } = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
