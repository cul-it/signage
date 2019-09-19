# CUL Digital Signage

Nuxt.js app powering digital signage throught Cornell University Library.

* [Current Lineup](#current-lineup)
* [Dev QuickStart](#dev-quickstart)
* [Deployment via Heroku](#deployment-via-heroku)

## Current Lineup

### Consultation Desks (@ Mann)

* CISER
* CSCU
* ELSO
* GIS
* IT@CORNELL
* KNIGHT
* REFERENCE

### Service Desks

* Olin Circ
* Uris Circ

### Spaces

#### Mann

* B30 Classrooms
* Bissett Workstations
* Interview Room
* Room 261

#### mannUfactory

* Multimedia Studio

#### Olin

* CoLab
* Room 104

#### Uris

* Cocktail Lounge
* Interview Room

## Dev Quickstart

### Prerequisites
* [node](https://nodejs.org)
* [yarn](https://yarnpkg.com)

``` sh
# clone this repo
$ git clone git@github.com:cul-it/signage.git

# install dependencies
$ cd signage
$ yarn

# manage secrets via dotenv
$ cp .env.example .env   # -- swap placeholders with valid values

# serve with hot reload at localhost:3000
$ yarn dev
```

> For further details on all things Nuxt.js, checkout the [official docs](https://nuxtjs.org/guide).

## Deployment via Heroku

### Testing
Automatic review apps spun up for all PRs. Just click the **View Deployment** button from the PR.

> Stale review apps are destroyed after 5 days of inactivity

### Staging
Automatic deploy to staging instance on every PR merge to `master` branch.

### Production
Production instance must be manually deployed via [Heroku dashboard](https://dashboard.heroku.com).