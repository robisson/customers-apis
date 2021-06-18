# Customers and favorite producs

Open source service api to manage customers and favorite produtcs.

**Made with**
* Node 14.5.0
* yarn 1.22.4
* Typescript
* NestJs
* REST Api
* MongoDB

**Concepts used**
* Apis Restful
* Hexagonal Architecture
* DDD (some build blocks)
* Units tests

**Deplyoment models**
* Docker + Kubernetes
* Docker + Kubernetes Istio Service Mesh

## How to use


#### For development

Rename `.env-sample` to `.env`

```sh
yarn

yarn start:dev

open your browser at http:/localhost/api/docs
```

#### Run tests
```sh

#with code coverage
yarn test:cov

```
#### To view code documentation
```sh

#with code coverage
yarn doc-generate

open your browser at http:/localhost

```



#### For production
Buid and run it:

```sh
yarn start
```

## How to test API

* To facilitate the test, I made a postman collection that has the name `postman_collection.json`

### Steps to test
1 - call api `oauth2/register` to create a user.

2 - call api `oauth2/token` to generate a access_token.

3 - Set up `access_token` as header `Authentication` with value `Bearer ${access_token}`

*In the case of using the postman collection to test I have already left some variables that define the access_token and other automatic product and client ids to facilitate the test*

## About authentication and authorizarion

For simulation purposes I created a very simple api that simulates the flow of `oauth 2.0 resource owner password` grant type.

For a production use case I would recommend using an external identity manager with oauth 2.0 and for a usuatio use case the `oauth 2.0 authorizarion code` flow and for the application case the `oauth 2.0 client credentials` flow