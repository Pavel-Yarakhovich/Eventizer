# MIRAGE JS

## Route handlers

Define a list of URL which your mock server can handle.
The route maps a URL to 'response', which may be presented as

### object

this.get("/movies", { movies: ["Interstellar", "Inception", "Dunkirk"] })

### or function (the most flexible option)

this.get("/movies", (schema, request) => {
return ["Interstellar", "Inception", "Dunkirk"]
})

### schema

provides an access to Mirage's data layer

### request

contains information about the request your app made

### dynamic paths and query params

## Shorthands

Make your routes shorter hence speed up the development process.
It's good to use shorthands if you do not plan to share your code. Otherwise I recommend to use a full form or routes which is more explicit.

## Database

At the core of Mirage's data layer is a simple in-memory database.
Most of your Mirage code will not access the database directly, but will interact with it through Mirage's ORM instead.
The most common place you'll use the database directly is in your tests, where you can access it via server.db

### server.db

#### server.db.loadData({ movies: [] })

to add data to database

### schema.db.movies

to access db from routes

More DB related API can be found [here](https://miragejs.com/api/classes/db/).

## The ORM (Object Relational Mapper)

!!! JSONAPISerializer

## Factory

Factories are classes that help you organize your data-creation logic, making it easier to define different server states during development or within tests.

Factory.extend({ ...specify properties inside });
