#! /usr/bin/env bash

pushd ./sqlite
npx drizzle-kit --config=./drizzle.config.ts studio
popd