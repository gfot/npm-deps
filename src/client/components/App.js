import React from 'react';
import Header from './common/Header';
import SearchForm from './search/SearchForm';
import List from './list/List';

class App extends React.Component {
  constructor() {
    super();

    this.state = { rootPackage: {} };

    this.onFetchDependencies = this.onFetchDependencies.bind(this);
  }

  /**
   * Handler activated when dependencies have been feteched.
   *
   * @param {object} data The package data.
   */
  onFetchDependencies({ data: rootPackage }) {
    console.info('Dependencies fetched');
    console.info('data:', rootPackage);

    this.setState({ rootPackage });
  }

  render() {
    const { rootPackage } = this.state;

    return (
      <div className="App-container">
        <Header />
        <SearchForm onFetchData={this.onFetchDependencies} />
        <List rootPackage={rootPackage} />
      </div>
    );
  }
}

export default App;
