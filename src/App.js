import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.fetchTheQuote();
  }

  componentDidMount() {
    this.fetchTheQuote();
  }

  fetchTheQuote = (state) => {
    const API_URL = "https://zenquotes.io/api/random/";
    fetch(API_URL)
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result[0],
          });
        },
        (error) => {
          //   console.log(error)
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { error, isLoaded, items } = this.state;
    let quoteValue = "";
    if (error) {
      quoteValue = (
        <div className="quote-wrapper" id="text">
          <p id="id-text" className="quote__text quote__text--loading">
            There was an error loading Quote of The Day!
          </p>
        </div>
      );
    } else if (!isLoaded) {
      quoteValue = (
        <div className="quote-wrapper" id="text">
          <p id="id-text" className="quote__text quote__text--loading">
            Loading...
          </p>
        </div>
      );
    } else {
      quoteValue = (
        <div className="quote-wrapper" id="text">
          <p id="id-text" className="quote__text">
            {items.q}
          </p>
          <p id="author" className="quote__author">
            {items.a}
          </p>
        </div>
      );
    }
    return (
      <div className="App">
        <div id="quote-box" className="container">
          {quoteValue}
          <div className="quote-controls">
            <button
              id="new-quote"
              className="quote__btn"
              onClick={this.handleClick}
            >
              Get a new quote!
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${items.q} /by ${items.a}`}
              id="tweet-quote"
              className="quote__share"
            >
              tweet!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
