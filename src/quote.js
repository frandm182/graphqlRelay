import React from 'react';
import PropTypes from 'prop-types';

class Quote extends React.Component {
  static propTypes = {
    quote: PropTypes.shape({
      text: PropTypes.string,
      author: PropTypes.string
    })
  };
  render() {
    return (
      <blockquote>
        <p>{this.props.quote.text}</p>
        <footer>{this.props.quote.author}</footer>
      </blockquote>
    );
  }
}
export default Quote;
