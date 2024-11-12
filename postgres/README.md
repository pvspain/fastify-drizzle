# Postgres demo database <!-- omit from toc -->

## Index <!-- omit from toc -->

- [Building the tools](#building-the-tools)
- [Viewing the database with pgAdmin](#viewing-the-database-with-pgadmin)
- [Running the Postgres example](#running-the-postgres-example)
- [References](#references)

## Building the tools

> - **Prerequisites:** It is assumed you have [`docker-compose`][1] installed on your local system, and have access to a `bash` terminal.

The scripts in this folder:

- Create a containerised PostgreSQL database server
- Create a demo database: `fastify`
- Create a database UI, `pgAdmin`, running on `localhost:80`

> - The config for postgres and pgAdmin is stored in `./env`

To create this infrastructure, open a terminal in the repository root directory:

```bash
npm run postgres:build
```

## Viewing the database with pgAdmin

> Wait until the logging from the build script above has paused...

To use the GUI admin tool `pgAdmin`, open a browser on http://localhost:_port-number_

- _port-number_ is defined in [`./docker-compose.yml`][2] as the external port (second number) at `services | pgadmin | ports`. I have used `80`, the default HTTP port.

1. Login with credentials taken from the _values_ `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` defined in [`./.env`][3]

    ![login-screencap][4]

2. Select **Add New Server** under `Dashboard | Quick Links` 

    ![dashboard-screencap][5]

3. Define a name of your choosing in `General | Name` and then open the `Connection` tab, and fill out the form using these entries:

    | Name | Value | Source |
    |---|---|---|
    |Host name /address | _database_ | [`./docker-compose.yml`][2] `services: {db-service-name}` |
    | Port | _5432_ | [`./docker-compose.yml`][2] `services: database: ports: {external-port-number}` |
    | Maintenance database | _fastify_ | [`./.env`][3] `POSTGRES_DB value` |
    | Username | _username_ | [`./.env`][3] `POSTGRES_USER value` |
    | Password | _password_ | [`./.env`][3] `POSTGRES_PASSWORD value` |

    ![connection-screencap][6]

4. Select **Save** to close the dialog  

5. Select the database (_fastify_) in the **Object Explorer** window, and explore or query your database to your heart's content. More documentation on the [pgAdmin][8] site.

![explorer-screencap][7]

## Running the Postgres example

1. To run the package `example` script, you first need to create a file `secrets` in the repository root, with the postgres connection string. I have used the demo values from the **Connection** tab in the previous section.

    ```javascript
    // https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
    const dbURI = "postgresql://username:password@127.0.0.1:5432/fastify"

    module.exports = { dbURI }
    ```

2. Then from a terminal, run:

    ```bash
    npm run postgres:example
    ```

## References

- [Docker-compose script][9]
- [Postgres connection string format][10]
- [Docker _postgres_ image documentation][11]

[1]: https://docs.docker.com/compose/
[2]: ./docker-compose.yml
[3]: ./.env
[4]: ./img/login.png
[5]: ./img/dashboard.png
[6]: ./img/connection.png
[7]: ./img/explorer.png
[8]: https://www.pgadmin.org/docs/pgadmin4/latest/index.html
[9]: https://github.com/felipewom/docker-compose-postgres/
[10]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
[11]: https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/