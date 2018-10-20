#!/bin/sh

tup
env HUGO_ENV="DEV" hugo server --watch --buildDrafts=true --buildFuture=true -t robust $@
