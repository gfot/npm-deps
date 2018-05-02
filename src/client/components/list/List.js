import React from 'react';
import PropTypes from 'prop-types';
import './List.css';

const renderTree = root => {
  const { pName, pVersion, pDeps = [] } = root;

  if (!pName && !pVersion) {
    return null;
  }

  const children = pDeps.map(dep => {
    const { pName: cpName, pVersion: cpVersion, pDeps: cpDeps } = dep;
    return <li key={cpName}>{renderTree(dep)}</li>;
  });

  const list = <ul>{children}</ul>;

  return (
    <ul>
      {pName} ({pVersion})
      {list}
    </ul>
  );
};

const List = props => {
  const { rootPackage = {} } = props;

  return renderTree(rootPackage);
};

List.propTypes = {
  rootPackage: PropTypes.shape({}).isRequired,
};

export default List;
