import * as fs from 'fs';
import * as path from 'path';

const pkgPath = path.join(__dirname, 'pkg', 'package.json');

// TypeScript requires explicit typing for dynamic imports. 
// You can define an interface for your package.json structure if needed.
const packageJson: any = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

packageJson.main = 'neo4j_cypher_props.js';

fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));
