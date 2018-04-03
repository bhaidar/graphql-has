### TypeScript, Express, GraphQL microservice seed

[![Build Status](https://travis-ci.org/marcellobarile/typescript-express-graphql-seed.svg?branch=master)](https://travis-ci.org/marcellobarile/typescript-express-graphql-seed)

**Tech. stack:**
---
1. Webpack 4 + TypeScript 2.8
2. Express 4 + ejs
3. Apollo Server
4. GraphQL / GraphQLi
6. Lodash
7. Request Promise
5. NSP - Node Security Platform
6. PM2 ready

**Setup**
---
```
npm install
```

**Run Builds**
---
For DEV environment:
```
npm run build:dev
```
For TEST environment:
```
npm run build:stage
```
For PROD environment:
```
npm run build:prod
```

**Dev First run**
---
With the following steps you will generate the schema.graphql file, typings interfaces and fragments.

Step 1. Edit your schema and/or create your custom GraphQL types

Step 2. Run the server

Step 3. Run `npm run prepare-graphql`

**Run Application**
---
DEV env.:
```
npm run dev1
npm run dev2
npm run dev3
```

TEST env.:
```
npm run test1
npm run test2
npm run test3
```

PROD env.:
```
npm run prod
```

**GraphQL to TypeScript - autogenerate schema, types, fragments and TS interfaces**
---
```
npm run prepare-graphql
```

**GraphQL to JavaScript**
---
[TBD]

**Manual vulnerability check**
---
```
npm run check-vuln
```

**Run Tests**
---
[TBD]

**Prod. PM2 first run**
---
```
npm run pm2:prod:first-run
```
Remember to run `pm2 save` to dump the processes list

** Structure **
---
```
├── app.ts
├── .tmp
├── .vs
├── bin
│   └── www.ts
├── build
│   └── compiled
├── config
|   ├── apis
|   |   ├── dev.js
|   |   ├── index.js
|   |   ├── prod.js
|   |   └── test.js
|   ├── common.ts
|   ├── webpack.config.js
|   ├── webpack.production.config.js
│   └── webpack.stage.config.js
├── package.json
├── README.md
├── graphql
|   ├── types
|   |   └── [...]
|   ├── base.graphql
|   └── index.ts
├── server
|   ├── connectors
|   ├── errors
|   ├── helpers
|   ├── resolvers
|   ├── routes
|   ├── schemas
│   └── views
│       ├── error.ejs
│       └── index.ejs
├── .editorconfig
├── .gitignore
├── .graphqlconfig
├── .travis.yml
├── ecosystem.config.js
├── package-lock.json
├── package.json
├── README
└── tsconfig.json
```

*This module was made possible thanks to [LearnMEAN.com](https://www.learnmean.com/)*
