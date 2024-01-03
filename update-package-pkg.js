const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, 'pkg', 'package.json');
const packageJson = require(pkgPath);

packageJson.main = 'neo4j_cypher_props.js';

fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));
