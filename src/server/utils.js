import fetch from 'node-fetch';
import PackageData from './models/package-data';
import { NPM_BASE_URL as npmBaseUrl } from '../config';

/**
 * Returns the package version stripped off any character (if any) in front of major version part.
 *
 * @param {string} packageVersion The package version.
 * @returns {string} The normalized package version.
 */
export const normalizeVersion = packageVersion => {
  if (/[^0-9]/.test(packageVersion[0])) {
    return packageVersion.slice(1);
  }

  return packageVersion;
};

/**
 * Tranforms the NPM dependecies object to an array of dependencies which has the form defined by
 * `createPackageMetadata()`.
 *
 * @param {object} npmDepsObj The NPM dependencies object.
 * @returns {array} An array of `PackageMetadata` objects.
 */
export const transformDeps = npmDepsObj =>
  Object.entries(npmDepsObj).map(
    ([packageName, packageVersion]) => new PackageData(packageName, normalizeVersion(packageVersion)),
  );

/**
 * Returns the transformed dependencies.
 * _Transformed_ means each NPM dependency will be converted to an `PackageData` object.
 *
 * @param {string} packageName The package name.
 * @param {string} packageVersion The package version.
 * @returns {array} An array of dependencies.
 */
export const getDeps = async (packageName, packageVersion) => {
  const endpoint = `${npmBaseUrl}/${packageName}/${packageVersion}`;
  const res = await fetch(endpoint);
  const jsonObj = await res.json();
  const { dependencies: npmDeps = {} } = jsonObj;
  const deps = transformDeps(npmDeps);
  return deps;
};
