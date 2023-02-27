#!/bin/bash
echo 'how to use vault inside jenkins job example'
echo 'following example assumes that there is a secret named config with fields username and password in jenkins/test vault path'
echo 'add your jenkins secrets in jenkins/xxx path'
username=$(vault kv get -field=username  jenkins/test/config)
password=$(vault kv get -field=password  jenkins/test/config)
echo $username
echo $password
docker image build --network host  -t $DOCKER_IMAGE_NAME -f Dockerfile .
