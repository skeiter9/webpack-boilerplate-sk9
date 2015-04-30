#My Webpack-boilerplate

Simple boilerplate for bootstrap a new project with webpack

## Requirements

- node >0.10

## Options


### Run a development server

    npm start

It's equivalent:
> $ npm run clean && node_modules/.bin/nodemon server/server.js

- Execute webpack and storage bundle files in memory(fast mode)

- Enable Hot Replacement module(Livereload)

- Run a express server in 3000 port

### Run a production server*

    npm run deploy

> npm run clean && BUILD_DEPLOY=1 node_modules/.bin/webpack -p --config webpack.config.js --progress --color && NODE_ENV=production node_modules/.bin/nodemon server/server.js"

- Execute webpack in production mode, storage files in public/build

- (*) Run a express server in 8080

### Run only webpack-dev-server

    npm run webpack-dev-server

> npm run clean && STANDALONE=1 node_modules/.bin/nodemon server/webpack-dev-server.js

- Execute webpack for development mode, storage bundled files in memory(fast)

- Run a webpack-dev-server(express + webpack-dev-middleware) server in 8080

### Eliminate build directory in public

    npm run clean

It's equivalent :
> $ rm -rf public/build,

### Execute only webpack for development stage

    npm run webpack

It's equivalent:
> $ npm run clean && node_modules/.bin/webpack --config webpack.config.js --progress --color

### Execute webpack for production stage

npm run build

It's equivalent:
> $ npm run clean && BUILD_DEPLOY=1 node_modules/.bin/webpack -p --config webpack.config.js --progress --color"
