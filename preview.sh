#!/bin/sh

tup
env HUGO_ENV="DEV" hugo server --watch --buildDrafts=false --buildFuture=false -t robust $@
