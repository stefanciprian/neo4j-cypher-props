"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var pkgPath = path.join(__dirname, 'pkg', 'package.json');
// TypeScript requires explicit typing for dynamic imports. 
// You can define an interface for your package.json structure if needed.
var packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
packageJson.main = 'neo4j_cypher_props.js';
fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));
