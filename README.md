# CUL Digital Signage

### Prerequisites
* [node](http://nodejs.org)
* [yarn](https://yarnpkg.com)

### Quickstart

``` bash
# clone this repo
$ git clone git@github.com:cul-it/signage.git

# install dependencies
$ cd signage
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

### Heroku Deploy

1. Configure the Heroku app as specified in the offical [Nuxt.js guide](https://nuxtjs.org/faq/heroku-deployment).

1. Push the latest

   ```sh
   $ git push heroku master
   ```

   > if you need to deploy another branch:
   > ```sh
   > $ git push heroku <branch-name>:master
   > ```
