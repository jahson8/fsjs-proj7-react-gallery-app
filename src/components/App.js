import React, { Component } from "react";
import axios from "axios";

// React Router imports
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Component imports
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import Gallery from "./Gallery";
import apiKey from "../config";

class App extends Component {
  state = {
    // Search results
    images: [],
    // nav image results
    cats: [],
    dogs: [],
    computers: [],
    isloading: true,
  };

  componentDidMount() {
    const links = ["cats", "dogs", "computers"];
    links.map((link) => this.performSearch(link, true));
  }

  performSearch = (query, isLink = false) => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        // handle success
        if (isLink) {
          this.setState({
            [query]: response.data.photos.photo,
            isloading: false,
          });
        } else {
          this.setState({
            images: response.data.photos.photo,
            isloading: false,
          });
        }
      })
      .catch((error) => {
        // handle errors
        console.error("Error fetching and parsing Data", error);
      });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          {this.state.isloading ? (
            <p>Loading...</p>
          ) : (
            <Switch>
              <Route exact path="/" component={() => <Redirect to="/cats" />} />

              <Route
                path="/cats"
                children={<Gallery data={this.state.cats} />}
              />
              <Route
                path="/dogs"
                children={<Gallery data={this.state.dogs} />}
              />
              <Route
                path="/computers"
                children={<Gallery data={this.state.computers} />}
              />
              <Route
                path="/search/:query"
                children={(match) => <Gallery data={this.state.images} />}
              />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
