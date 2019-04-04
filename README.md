<p align="center">
  <img alt="Node.js GraphQL Highly Automated Service" src="http://oi64.tinypic.com/2rqoeqb.jpg">
</p>

[![Build Status](https://travis-ci.org/marcellobarile/graphql-has.svg?branch=master)](https://travis-ci.org/marcellobarile/graphql-has)

**Why Highly Automated?**
---
**GraphQL and resolvers self-composition**

The approach used in this solution is (almost) a "code-first" one. You will have to put both resolving functions and definitions in the same file and, only during the application bootstrap, the GraphQL will be automatically generated. Even if there is a pre-defined structure for such files, you are still free to adopt your own way to organize them (further details below).

:blush: _Tip: If you want to manually generate the GraphQL schema, just run ```npm run prepare-graphql```_

**Easily configurable**

The application does support two configuration files, both located in the root directory.
The 'serviceconfig.custom.json' is (obviously) used for custom configurations; for accessing the configurations from your TS files, there is a "Conf" class, placed under 'config/common.ts', that can be used.

:blue_book: **Special case:** How to access configurations for remotes services

_Note: The conf. helper will automatically derive the ENV to be used. You don't need to specify it._

```
// ...

import { getEndpoint } from '../../../config/apis';

// ...

const servUrl = getEndpoint('foobar-service');

// ...
```

**Tech. stack:**
---
1. Webpack 4 + TypeScript 3
2. Express 4 + ejs
3. Apollo Server 2
4. GraphQL 14
6. Lodash
7. Request Promise
5. NSP - Node Security Platform
6. PM2 ready
7. Docker ready

**Setup**
---
```
npm install
```

**First run after the setup**
---
If you are on production you just need to run the `npm run prod` command.

**GraphQL schema and resolvers self-composition**
---
As said before, during the bootstrap, the application is capable of self-composing the GraphQL definition and registering the resolvers by looking into the "resolvers" folder.
This allows the developer(s) to have everything as tight as possible, without spreading information over the solution.

**Resolvers and definitions: everything in one place**
---
Resolvers and definitions cohesists in the same file; these files are separated in contextual folders (mutations, queries, subscriptions, types) for the sake of order, though, you are free to rearrange them as you prefer (just remember to change the export in the index.ts file under 'resolvers').
You can also put queries, mutations, and different entities in general, in the same file if you prefer so.

**Single resolver**
<img src="http://i66.tinypic.com/fcsnxw.jpg" />

**Multiple resolvers**
<img src="http://i67.tinypic.com/96kg8y.jpg" />

**Extending the GraphQL context**
---
In the GraphQL world, a context is an object (or a function) that returns an object which will be shared across all the resolvers.
Under the 'server/context' folder, there is the file that exports the custom context object where you can add the properties that your solution does need.

**Shaping and expanding the GraphQL response**
---
The GraphQL response can be re-shaped or expanded using a custom function returning the new response.
You can find it under 'server/extensions'.

**Adding GraphQL middlewares**
---
For the Express framework, middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
Our custom middleware functions can be defined in the index.ts file under 'server/middlewares'.
Please note that it is an array of functions. :-)

**Working with custom validation rules**
---
The so called "validation rules" are additional GraphQL validations to be applied to client-specified queries. You can find the array containing them under 'server/validationRules'.

For further information (default rules already applied [https://github.com/graphql/graphql-js/tree/master/src/validation/rules](https://github.com/graphql/graphql-js/tree/master/src/validation/rules)

**About autogenerated interfaces**
---
It is important, after having added or changed something to the GraphQL definitions, to generate the interfaces before using them in the custom classes.
To do so, the server shall be manually run/restarted right after that.

The application exposes two endpoints to download types and interfaces (`{rest_endpoint}/types` and `{rest_endpoint}/interfaces`).

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
npm run dev
```

TRAIN env.:
```
npm run stage
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

**Prod. PM2 first run**
---
```
npm run pm2:prod:first-run
```
Remember to run `pm2 save` to dump the processes list

**Generate documentation**
---
```npm run docs``` to automatically generate documentation, ```npm run docs:clean``` to remove it

**Structure**
---
(!!!) TO BE UPDATED
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
