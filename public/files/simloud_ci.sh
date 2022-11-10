#!/bin/bash
docker build -t $2 --network container:$1 -f Dockerfile .
docker create --name cont1 $2
docker cp temp:/service/build .
docker rm temp
# do whatever is needed with `build` folder