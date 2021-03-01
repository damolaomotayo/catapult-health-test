# Catapult Health Test

This is an implementation demostrating a basic way to REST API endpoints.

## Features
* Test cases for creating dictionary.
* Test cases for deleting a dictionary.
* Test cases for creating/modifying a Key-Value Pair.

## Instructions on how to install
Please follow the instructions below to run or install the application:

* Clone the project using `git clone`.
* On the root folder of the create a `.env` file and copy the content in the `.env.example` file and initialize require values.
* On the root folder of the project run `npm install` or `yarn install` to add dependencies of the project.
* Then to run the test cases, run `npm run test` or `yarn test`. 

## Technologies
* Node.js
* Jest
* Supertest

### Observations:
* A general observation I have is that the resource routes endpoints are not properly structured. When designing RESTFul APIs, its good practice to use **path params** to identify a specific resource or resources instead of using **query string**. In the public API both **path params** and **query string** were used together, this is not good practice. **Query string** are best for sorting or searching.
* There were no proper request validation specifically for creating/modifying a Key-Value Pair dictionary, and the status code return when you pass an empty request payload is wrong.
* The **creating/modifying a Key-Value Pair** endpoint should be a **PATCH** or **PUT** not **POST** request.


Thank you!!!