#!/bin/bash

rm -rf db/csv/__test__ &&
mkdir -p db/csv/__test__ &&
deno test --allow-read --allow-write &&
rm -rf db/csv/__test__
