class PackageData {
  constructor(name, version) {
    this.pName = name;
    this.pVersion = version;
    this.pDeps = [];
  }

  get name() {
    return this.pName;
  }

  get version() {
    return this.pVersion;
  }

  get deps() {
    return this.pDeps;
  }

  set name(value) {
    this.pName = value;
  }

  set version(value) {
    this.pVersion = value;
  }
}

export default PackageData;
