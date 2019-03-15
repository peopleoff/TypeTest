#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

git add dist
git commit -m 'deploy'

# if you are deploying to https://peopleoff.github.io/TypeTest
git push -f git@github.com:Peopleoff/TypeTest.git origin:gh-pages

cd -