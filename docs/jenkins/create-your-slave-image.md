# How to create your own slave image from Simloud jenkins image?

How to create your own slave image from Simloud jenkins image?

Docker file example

# Pull base image.

FROM simloud/jenkins-slave:4.6-3

# Install packages.

```
RUN apt-get update && \

    apt-get install -y wget && \

    rm -rf /var/lib/apt/lists/*
```

Build docker image

```
#docker build -t <imageName> .
```

Push image to registry

```
#docker push <imageName>:tag
```

How to change the jenkins slave image in job

Open job configuration

Change default value of `SLAVE_INAGE` variable

How to run a job on kubernetes dynamic slave?

A job can run either on the master pod or on a separate slave pod.

The general rule is to run “heavy” jobs on a separate slave pod and run “light” jobs such as a simple wrapper on the master pod in order to save resources.

Following agent section is required to be included in the pipeline in order to run this job as a separate slave pod

```
podTemplate (yaml: """

    apiVersion: v1

    kind: Pod

    spec:

      imagePullSecrets:

      - name: simloudsecret

      containers:

      - name: jnlp

        image: '$SLAVE_IMAGE'

        volumeMounts:

        - name: dockersock

          mountPath: /var/run/docker.sock

      volumes:

      - name: dockersock

        hostPath:

          path: /var/run/docker.sock

    """){

    node(POD_LABEL) {

        stage('stage 1') {

            echo "1"

        }

        stage('stage 2') {

            echo "2"

        }

    }

}
```

You can change these stages to make custom job

Alternative to custom Jenkins image could be Dockerfile of application itself, with customization of simloud_ci file. For example, if special version of yarn is required to build front-end application, instead of installing it in jenkins, it could be in Dockerfile, and simoud_ci just build docker, without direct usage of yarn:

Dockerfile content:

```
FROM node:14.16.1-alpine

WORKDIR /service

COPY config-overrides.js package.json yarn.lock ./

COPY public ./public

COPY src ./src

RUN yarn && yarn build
```

simloud_ci content:

```
#!/bin/bash

docker build -t $2 --network container:$1 -f Dockerfile .

docker create --name cont1 $2

docker cp temp:/service/build .

docker rm temp

# do whatever is needed with `build` folder
```
