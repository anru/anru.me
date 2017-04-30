#!/bin/sh

env HUGO_ENV="DEV" gulp
env HUGO_ENV="DEV" gulp watch &
env HUGO_ENV="DEV" hugo server --watch --buildDrafts=false --buildFuture=false -t robust $@