#!/bin/sh

env HUGO_ENV="DEV" gulp
env HUGO_ENV="DEV" gulp watch &
env HUGO_ENV="DEV" hugo server --watch --buildDrafts=true --buildFuture=true -t robust $@