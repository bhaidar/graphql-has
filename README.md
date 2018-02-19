### TypeScript, Express, GraphQL microservice seed

[![Build Status](https://travis-ci.org/marcellobarile/typescript-express-graphql-seed.svg?branch=master)](https://travis-ci.org/marcellobarile/typescript-express-graphql-seed)

**Tech. stack:**
---
1. Webpack + TypeScript
2. Express + ejs
3. Apollo Server
4. GraphQL / GraphQLi
6. Lodash
7. Request Promise
5. NSP - Node Security Platform

**Setup**
---
```
npm install
```

**Run Builds**
---
```
npm run build
```

**First run**
---
With the following steps you will generate the schema.graphql file, the typings interfaces and the fragments.
(Note: It will be improved soon)

Step 1. Edit your schema and/or create your custom GraphQL types

Step 2. Run the server

Step 3. Run the `prepare-graphql` command

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

**Run Coverage**
---
[TBD]

** Structure **
---
```
├── app.ts
├── bin
│   └── www.ts
├── build
│   └── compiled
├── config
│   └── webpack.config.js
├── package.json
├── README.md
├── server
│   ├── routes.ts
│   └── views
│       ├── error.ejs
│       └── index.ejs
├── tsconfig.json
└── typings.json
```

*This module was made possible thanks to [LearnMEAN.com](https://www.learnmean.com/)*
