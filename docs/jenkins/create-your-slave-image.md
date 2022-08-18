# How to create your own slave image from Simloud jenkins image?

### How to build custom jenkins slave image

**Docker file example:**

```
# Pull base image.
FROM simloud/jenkins-slave:4.9-2330-jdk11   

# Install packages.
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*
```
Choose jenkins-slave image `4.9-2330-jdk8` or `4.9-2330-jdk11` according to your requirenments

**Build docker image:**

`#docker build -t <imageName>:tag`

**Push image to registry:**

`#docker push <imageName>:tag`

### There is several options how to deploy your custom jenkins slave image:

- Using Simloufile.yaml
- Changing Jenkins slave image in the job
- Running a job on kubernetes dynamic slave


### How to use Simloufile.yaml

1. Go to GitHub/Bitbucket etc. and **clone** your **service repository**
2. Open **Simloufile.yaml** file and change **image** field value from default to custom
3. **Push** your **changes** to GitHub/Bitbucket etc.
2. Launch Portal UI and find your environment
2. Open your environment configuration
3. Switch to **Services tab**
4. Choose a service which was customized at 1-st step and fill **BRANCH/TAG field**
5. Press **Simloud file** button above
6. Confirm your changes and press **Save** button in the lower right corner
7. Wait untill deploy will be finished


In case when you don't have image field in simloudfile.yaml


### How to change jenkins slave image in the job

1. Launch to your Jenkins job
2. Open job configuration
2. Change default value of `SLAVE_IMAGE` variable

![](../../../img/jenkins/create-your-slave-image/image1.png)

### How to run a job on kubernetes dynamic slave?

A job can run either on the master pod or on a separate slave pod.
The general rule is to run “heavy” jobs on a separate slave pod and run “light” jobs such as a simple wrapper on the master pod in order to save resources.

Following agent section is required to be included in the pipeline in order to run this job as a separate slave pod

```
podTemplate (yaml: """
    apiVersion: v1
    kind: Pod
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: '$VAULT_SIDECAR'
        vault.hashicorp.com/agent-inject-status: '$VAULT_AGENT_STATUS'
        vault.hashicorp.com/agent-configmap: '$VAULT_AGENT_CONFIGMAP'
        vault.hashicorp.com/agent-init-first: '$VAULT_AGENT_INIT_FIRST'
    spec:
      serviceAccount: '$JENKINS_SERVICE_ACCOUNT'
      imagePullSecrets:
      - name: '$JENKINS_IMAGE_PULL_SECRET'
      containers:
      - name: jnlp
        image: '$SLAVE_IMAGE'
        volumeMounts:
        - name: dockersock
          mountPath: /var/run/docker.sock
        envFrom:
        - configMapRef:
            name: jenkins-global-variables
            optional: true
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

You can change these stages to make custom job.

Alternative to custom Jenkins image could be **Dockerfile** of application itself, with customization of **simloud_ci** file. For example, if special version of yarn is required to build front-end application, instead of installing it in jenkins, it could be in Dockerfile, and simoud_ci just build docker, without direct usage of yarn:

![](../../../img/jenkins/create-your-slave-image/image2.png)

**Dockerfile** content:

```
FROM jenkins/jnlp-slave:4.13.2-1-jdk11

WORKDIR /service
COPY config-overrides.js package.json yarn.lock ./
COPY public ./public
COPY src ./src

RUN yarn && yarn build
```

**simloud_ci** content:

```
#!/bin/bash
docker build -t $2 --network container:$1 -f Dockerfile .
docker create --name cont1 $2
docker cp temp:/service/build .
docker rm temp
# do whatever is needed with `build` folder
```

