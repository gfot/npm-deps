import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import { API_URL } from '../../../config';
import './SearchForm.css';

/**
 * Returns true if input is a valid package version, otherwise returns false.
 *
 * @param {string} packageVersion The package version (semver format).
 * @returns {boolean} True for valid package version format.
 */
const validatePackageVersion = packageVersion => /latest|\d+\.\d+\.\d+/.test(packageVersion);

/**
 * Returns true if input is a valid package name.
 *
 * @param {string} packageName The package name.
 * @returns {boolean} True if valid package name.
 */
const validatePackageName = packageName => /.+/.test(packageName);

/**
 * The form submit handler.
 *
 * @param {object} event The event object.
 */
const handleSubmit = event => {
  event.preventDefault();
  console.info('Prevent form default submit');
};

class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      error: [],
      loading: false,
      packageName: '',
      packageVersion: 'latest',
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.onPackageNameValueChange = this.onPackageNameValueChange.bind(this);
    this.onPackageVersionValueChange = this.onPackageVersionValueChange.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  /**
   * Handles the package name on input change.
   *
   * @param {string} value The package name value.
   */
  onPackageNameValueChange(value) {
    this.setState({ packageName: value });
  }

  /**
   * Handles the package version on input change.
   *
   * @param {string} value The package version value.
   */
  onPackageVersionValueChange(value) {
    this.setState({ packageVersion: value || 'latest' });
  }

  handleSearchClick() {
    console.info('Search button clicked.');

    // On every search, clear the previous errors.
    this.setState({ error: [] });

    const { packageName, packageVersion } = this.state;

    const isPackageNameValid = validatePackageName(packageName);
    const isPackageVersionValid = validatePackageVersion(packageVersion);

    if (!isPackageNameValid) {
      this.setState(prevState => ({
        error: prevState.error.concat(['Type a valid express package name.']),
      }));

      // clear list
      this.props.onFetchData({});
    }

    if (!isPackageVersionValid) {
      this.setState(prevState => ({
        error: prevState.error.concat([
          "Type a valid express package version or leave empty for 'latest'. Hint: must be a semver (x.y.z) input.",
        ]),
      }));

      // clear list
      this.props.onFetchData({});
    }

    if (isPackageNameValid && isPackageVersionValid) {
      console.info('Sending request to server');

      this.setState({ loading: true });

      fetch(`${API_URL}/dependencies/${packageName}/${packageVersion}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(res => res.json())
        .then(rootPackage => {
          console.info('Server response success');
          console.info(rootPackage);

          this.props.onFetchData(rootPackage);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.info('Server response error');

          this.setState({
            error: err.errors || ['Internal error'],
            loading: false,
          });

          // clear list
          this.props.onFetchData({});
        });
    }
  }

  renderError() {
    const { error } = this.state;

    if (error.length > 0) {
      return error.map(errorMessage => (
        <p key={errorMessage} className="SearchForm-error">
          {errorMessage}
        </p>
      ));
    }

    return false;
  }

  render() {
    return (
      <div className="SearchForm-container">
        <form onSubmit={handleSubmit}>
          <SearchField
            label="Package name:"
            placeholder="i.e. express"
            onValueChange={this.onPackageNameValueChange}
            readOnly={this.loading}
          />
          <SearchField
            label="Package version:"
            placeholder="Leave empty for 'latest'"
            onValueChange={this.onPackageVersionValueChange}
            readOnly={this.loading}
          />
          <button
            className="SearchForm-button"
            ref={this.btnSearchRef}
            onClick={this.handleSearchClick}
            disabled={this.state.loading}
          >
            Search
          </button>
        </form>
        <div className="SearchForm-errors">{this.renderError()}</div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onFetchData: PropTypes.func.isRequired,
};

export default SearchForm;
