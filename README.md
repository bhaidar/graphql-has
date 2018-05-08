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

**First run after the setup**
---
If you are on production you just need to run the `npm run prod` command.
If you are on dev and you still have to define your schema then do your changes under the "graphql" folder;
once finished just run the server or use the wizard (```npm help```) to generate TypeScript interfaces and GraphQL assets.

**After having changed the schema or GraphQL types**
---
This service is capable to automatically create fragments, typescript interfaces and the schema.graphql file for you...
after having made changes to the graphql types is highly reccomended to start the server and then run ```npm run prepare-graphql```

**How to work with autogenerated interfaces**
---
It is important, after having added or changed something to the GraphQL schemas, to generate the interfaces before using them to implements
our custom classes. To do so, you can run the server immediately after or use the wizard (```npm help```).
You can also share these interfaces + fragments with UI WebApps.

**Run Builds**
---
```
npm run build:dev
```
```
npm run build:stage
```
```
npm run build:prod
```

**Run Application locally**
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

**Manual vulnerability check**
---
```
npm run check-vuln
```

**Run Tests**
---
```
npm run test
```

**Run Coverage**
---
[TBD]

**Manually install typings**
---
Even if deprecated, execute ```npm run install-typings``` to manually install typings

**Generate documentation**
---
```npm run docs``` to automatically generate documentation, ```npm run docs:clean``` to remove it

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
