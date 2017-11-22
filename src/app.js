/* global document, fetch */
import React, { Component } from 'react';
import { render } from 'react-dom';

import Quote from './quote';

class QuotesLibrary extends Component {
  state = { allQuotes: [] };
  componentDidMount() {
    fetch(`/graphql?query={allQuotes{id,text,author}}`)
      .then(response => response.json())
      .then(json => this.setState(json.data))
      .catch(ex => console.error(ex));
  }

  render() {
    return (
      <div className="quotes-lis">
        {this.state.allQuotes.map(quote => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
    );
  }
}
render(<QuotesLibrary />, document.getElementById('react'));
