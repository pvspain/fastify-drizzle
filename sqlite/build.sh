#! /usr/bin/env bash

pushd ./sqlite
rm -f ./local.db && \
npx drizzle-kit --config=./drizzle.config.ts push --verbose && \
tsx ./index.ts
popd