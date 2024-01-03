# Neo4j Cypher Props

## Build the Wasm Module

Run wasm-pack build to build the Wasm module. This command generates a pkg directory with the compiled Wasm file and a JavaScript wrapper.

## Create npm Package

Navigate to the pkg directory:

```bash
cd pkg
```

You can add a package.json file here or modify the existing one to fit your package details (like name, version, description).

## Publish to npm

After setting up your npm account and logging in via npm login, you can publish your package:

```bash
npm publish
```

## Using the Package

After publishing, you can install your package in any Node.js project using npm:

```bash
npm install neo4j-cypher-props
```

And use the Rust function in your JavaScript code:

```bash
const rustWasmLib = require('neo4j-cypher-props');
console.log(rustWasmLib.greet('World'));
```

This is a basic example to get started. Real-world scenarios might require additional configuration and code for more complex interactions between Rust and JavaScript.
