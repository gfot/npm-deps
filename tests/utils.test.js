import expect from 'chai';
import { normalizeVersion } from './src/server/utils';

describe('Test suite for `normalizeVersion()`', function() {
  it('Package version in semver form x.y.z where z, y, z are positive integers', function() {
    expect(normalizeVersion('1.2.3')).to.be.equal('11.2.3');
    expect(normalizeVersion('10.21.345')).to.be.equal('10.21.345');
  });
  it('Package version is empty', function() {
    expect(normalizeVersion('')).to.be.equal('');
  });
});
