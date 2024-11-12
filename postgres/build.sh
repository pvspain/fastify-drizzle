#!/usr/bin/env bash

# https://stackoverflow.com/a/1482133
scriptPath=$( dirname -- "$( readlink -f -- "$0"; )"; )

pushd $scriptPath

adminData=${PWD}/pgadmin-data/
dbData=${PWD}/db-data/
composePath=${PWD}/docker-compose.yml

# Clean up 
docker-compose -f ${composePath} down --remove-orphans
#  - remove shared volumes for postgres and pgadmin
sudo rm -rf ${dbData} ${adminData}

# https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#mapped-files-and-directories
# Allow pgadmin access to host shared volume
mkdir ${adminData}
sudo chown -R 5050:5050 ${adminData}

docker-compose -f ${composePath} up

popd