# SQLite demo database <!-- omit from toc -->

## Index <!-- omit from toc -->

- [Creating the database](#creating-the-database)
- [Running the SQLite example](#running-the-sqlite-example)
- [References](#references)

## Creating the database

The scripts in this folder build and view a demo database `./local.db`

- To **build** the database, from a terminal in the repository root directory:

    ```bash
    npm run sqlite:build 
    ```

- To **view** and query the database, from a terminal

    ```bash
    npm run sqlite:view 
    ```

...then open a browser on https://local.drizzle.studio 

## Running the SQLite example

- To run the **example** SQLite script, from a terminal in the repository root directory:

    ```bash
    npm run sqlite:example
    ```

- Then open any of the following links:
  - http://localhost:3000/
  - http://localhost:3000/members
  - http://localhost:3000/groups
  - http://localhost:3000/friends

## References

- [Drizzle ORM][1]

[1]: https://orm.drizzle.team/docs/get-started