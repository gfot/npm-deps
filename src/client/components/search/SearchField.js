import React from 'react';
import PropTypes from 'prop-types';
import './SearchField.css';

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handles the input change.
   *
   * @param {object} e The event object.
   */
  handleInputChange(e) {
    this.props.onValueChange(e.target.value);
  }

  render() {
    const { label, placeholder, readOnly } = this.props;

    return (
      <div className="SearchField-container">
        <div className="SearchField-label">{label}</div>
        <input
          className="SearchField-input"
          type="text"
          placeholder={placeholder}
          onChange={this.handleInputChange}
          readOnly={readOnly}
        />
      </div>
    );
  }
}

SearchField.defaultProps = {
  label: '',
  readOnly: false,
};

SearchField.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default SearchField;
