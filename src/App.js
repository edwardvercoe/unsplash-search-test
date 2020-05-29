import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import Masonry from "react-masonry-component";
import "./App.css";

const App = () => {
  const accessKey =
    "5c10fd889b471e98ba08c25dfb8cf60ce65a78997b0d810b7cf6ee525e4472e2";
  const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorNotice, setErrorNotice] = useState([]);

  const handleSubmit = () => {
    setErrorNotice([])
    if (searchTerm.length < 1) {
      return setErrorNotice(
        <Alert className="alert" severity="warning">
          Please enter something in the search bar!
        </Alert>
      );
    }
    return fetch(apiUrl + searchTerm, {
      method: "GET",
      headers: {
        Authorization: "Client-ID " + accessKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.results.length < 1
          ? setErrorNotice(
              <Alert className="alert" severity="error">
                No results found - try search something broader
              </Alert>
            )
          : setSearchResults(
              data.results.map((x) => (
                <div key={x.id}>
                  <img src={x.urls.small} alt={x.description} />
                </div>
              ))
            );
      });
  };

  const _keyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <Paper className="searchContainer">
        <InputBase
          placeholder="Search Unsplash"
          inputProps={{ "aria-label": "search unsplash" }}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => _keyPress(e)}
          className="input"
        />
        <IconButton
          edge="end"
          onClick={() => handleSubmit()}
          aria-label="search"
          className="searchIcon"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className="resultsContainer">
        <Masonry className={"gallery"}>{searchResults}</Masonry>
      </div>
      {errorNotice}
    </div>
  );
};

export default App;
