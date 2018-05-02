import express from 'express';
import apicache from 'apicache';
import PackageData from '../models/package-data';
import { getDeps } from '../utils';
import { DEPTH } from '../../config';

const router = express.Router();
const cache = apicache.middleware;

const getPackageDepsInDepth = async (packageName, packageVersion, depth, packageData) => {
  packageData.name = packageName;
  packageData.version = packageVersion;

  if (depth === 0) {
    return;
  }

  const populatedDeps = await getDeps(packageName, packageVersion);

  // sequential...
  for (let dep of populatedDeps) {
    packageData.deps.push(dep);
    const { name, version } = dep;
    await getPackageDepsInDepth(name, version, depth - 1, dep);
  }

  // parallel
  // const tasks = populatedDeps.map(async dep => {
  //   packageData.deps.push(dep);
  //   const { name, version } = dep;
  //   await getPackageDepsInDepth(name, version, depth - 1, dep);
  // });

  // Promise.all(tasks);
};

const init = async (packageName, packageVersion, depth = 1) => {
  const root = new PackageData();
  await getPackageDepsInDepth(packageName, packageVersion, depth, root);
  return root;
};

router.post('/dependencies/:packageName/:packageVersion', cache('5 minutes'), (req, res) => {
  const { packageName, packageVersion = 'latest' } = req.params;

  if (!packageName) {
    return res.json({ errors: ['Package name is required.'] });
  }

  return init(packageName, packageVersion, DEPTH)
    .then(rootPackage => {
      console.info(JSON.stringify(rootPackage, null, 2));
      res.json({ data: rootPackage });
    })
    .catch(err => {
      console.error(err);
      res.json({ errors: ['Internal server error'] });
    });
});

export default router;
