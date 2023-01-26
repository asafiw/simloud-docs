---
title: SimloudFile.yaml examples
description: SimloudFile.yaml examples
layout: ../../layouts/MainLayout.astro
---

### Frontend deployment mode

```yaml

version: v2
kind: simloud-deployment
type: front-end
mode: advanced  # by default  it's "strict"


secrets:
  - path: secrets/customer1/data1  # vault or k8s paths where secrets located
    env_name_prefix: CUSTENV1     # this parameter is mandatory in mode `strict`and optional in `advanced`
    type: k8s

external_api:
  sub_domain: ""
  base_url: "/"
  sub_domain: xxx                 # It is necessary to specify sub-domain, if applicable.
  regex:
    enabled: false                # by default  it's `false`. It is possible to assign the 'true' value for this parameter
    rewrite-target: /$2$3$4
  base_domain: base.domain.name   # Commonly used as a base domain name.
  loadbalancer: aws_network       # A load balancer distributes incoming traffic across targets
  protocol: tcp                   # Possible options: tcp, udp, tls, tcp_udp
  port: 80                        # It is currently available only tcp for 80 port and tls for 443 port.
  redirects:
    http2https: true              # by default this parameter is enabled
  cors:
    enable_cors: true             # by  default it's "false"
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"  # by default is "*"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"  # by default is "*"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 1728000

internal_api:                     # @v4.2
  base_url: kube-service          # It is necessary to specify base url, if applicable
  sub_domain: xxx
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp                   # Possible options: tcp, udp, tls, tcp_udp
  port: 80

service:
  name: fe-canaveral
  namespace: default             # The namespace where the service is located
  type: ClusterIP                # Type of the service
  annotations: {}
  servicePort: 80                # Service is running on this port

spec: {}                         # frontend service will be empty


```

[Download Simloudfile.yaml for Frontend mode](/files/front-end-mode/Simloudfile.yaml)

### Lambda deployment mode

```yaml

version: v2
kind: simloud-deployment       # By default, is set as simloud-deployment
type: serverless               # It is necessary to specify the type of deployment
mode: advanced                 # In advanced mode, the prefix parameter: env_name_prefix is not mandatory

cloud_resources:
 - name: s3_1
   env_name_prefix: S31
   type: s3

 - name: lambda-service-2.sqs3_1
   env_name_prefix: SQS1
   type: sqs

secrets:
  - path: /secrets/customer1/data1
    env_name_prefix: CUSTENV1

environment:
 - env_name: ENVNAME1        # Commonly used as an environment name
   value: "Yahoo!"           # Commonly used as an environment variable

external_api:
  regex:
    enabled: false
    rewrite-target: "$1$2$3$4"
  sub_domain: "lambda"
  base_url: "/(lambda-service-1)/"
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80         # available 80 and 443 only
  redirects:
    http2https: true # by default enabled
  cors:
    enable_cors: true
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 86400



internal_api:                     # @v4.2
  base_url: kube-service
  sub_domain: xxx
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp    # Possible options: tcp, udp, tls, tcp_udp
  port: 80         # It is currently available only tcp for 80 port and tls for 443 port


spec:
  Runtime: python3.9
  MemorySize: 128
  Timeout: 15
  Handler: lambda_function.lambda_handler

service:
  name: lambda-service-1  # The name of the service

```

[Download Simloudfile.yaml for Lambda mode](/files/lambda-deployment-mode/Simloudfile.yaml)

### Kubernetes deployment mode

```yaml
version: v2
kind: simloud-deployment
type: kubernetes
mode: advanced

cloud_resources:
 - name: sqs_1
   env_name_prefix: SQS1
   type: sqs

 - name: sqs_2
   env_name_prefix: SQS2
   type: sqs

 - name: micro-service2.s3_1
   env_name_prefix: S31
   type: s3

secrets:
  - path: secrets/customer1/data1
    env_name_prefix: CUSTENV1
    type: k8s

environment:
 - env_name: ENVNAME1
   value: "Yahoo!"

external_api:
  regex:
    enabled: false
    rewrite-target: "$1$2$3$4"
  sub_domain: "lambda"
  base_url: "/(lambda-service-1)/"
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80         # available 80 and 443 only
  redirects:
    http2https: true # by default enabled
  cors:
    enable_cors: true
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 86400


internal_api:                     # @v4.2
  base_url: kube-service
  sub_domain: xxx
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80

service:
  name: micro-service1
  type: ClusterIP
  annotations: {}
  servicePort: 80
  podPort: 8080
  specType: deployment

spec:
  pod:
    name: micro-service1
    replicas: 1
    strategy: # @v3.4.6
      type: Recreate # default “Recreate”

```

[Download Simloudfile.yaml for kubernetes](/files/kubernetes-deployment-mode/Simloudfile.yaml)


### Pipeline deployment mode

```yaml

version: v2
kind: simloud-deployment             # By default, is set as simloud-deployment
name: test-pipeline
type: pipeline                      # It is necessary to specify the type of deployment
mode: advanced                        # by default  it's "strict", "advanced" mode is also possible

secrets:
  - path: secrets/cloud-resources  # vault or k8s paths where secrets located
    env_name_prefix: CUSTENV1
    type: k8s

environment:
  - env_name: ENVNAME1           # Commonly used as an environment name
    value: "Yahoo!"              # Commonly used as an environment variable

service:
  name: kube-service-3           # it's necessary to specify the name of the service
  namespace: default
  annotations: {}

spec:
  pod:                          # This block describes parameters of spec pod
    - name: vpn
  resources:                    # Resources that should be specified directly for container usage
    replicas: 1
    requests:
      memory: "60Mi"
      cpu: "200m"
    limits:
      memory: "120Mi"
      cpu: "1000m"

```

[Download Simloudfile.yaml for generic-pipeline mode](/files/generic-pipeline-mode/Simloudfile.yaml)


### Deploying Databases

Please, add this code snippet to `cloud_resources` block at Simloudfile.yaml for deploying **DynamoDB**:

```yaml
cloud_resources:
 - name: dynamodb_1
   env_name_prefix: ENVDB1
   type: dynamodb
   params:
     AttributeDefinitions:
       - AttributeName: username
         AttributeType: S
       - AttributeName: lastname
         AttributeType: S
     KeySchema:
       - AttributeName: username
         KeyType: HASH
       - AttributeName: lastname
         KeyType: RANGE

```
Please, add this code snippet to `cloud_resources` block at Simloudfile.yaml for deploying **RDS**:

```yaml
 - name: db_1
    env_name_prefix: ENVDB1
    type: rds
    params:
      DBName: postgres_test
      MasterUsername: postgresmaster
      MasterUserPassword: 47379dc6-c120-pwd
```
For deploying both databases, RDS and DynamoDB, - you can deploy on the portal `k8s-service-3` microservice.
 
Simloudfile for `k8s-service-3`:
 
```yaml
version: v2
kind: simloud-deployment
name: kube-service-3
type: kubernetes
mode: advanced
#image:

cloud_resources:
  - name: db_1
    env_name_prefix: ENVDB1
    type: rds
    params:
      DBName: postgres_test
      MasterUsername: postgresmaster
      MasterUserPassword: 47379dc6-c120-pwd

  - name: ddb_1               # <resource-name>
    env_name_prefix: ENVDDB1  # <environment-variable-name>
    type: dynamodb           # <resource-type>
    params:                  # block of advanced parameters
      AttributeDefinitions:
        - AttributeName: a
          AttributeType: S
      KeySchema:
        - AttributeName: a
          KeyType: HASH

  - name: kube3_s3_1
    env_name_prefix: S31
    type: s3

  - name: lambda-service-3.s3_1
    env_name_prefix: LAMBDAS31
    type: s3

  - name: lambda-service-3.db1_1
    env_name_prefix: LAMBDADB1
    type: s3

secrets:
  - path: secrets/customer1/data1
    env_name_prefix: CUSTENV1

environment:
  - env_name: ENVNAME1
    value: "Yahoo!"

external_api:
  sub_domain: "k8s"
  base_url: "/kube-service-3"
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80     # available 80 and 443 only
  redirects:
    http2https: true # by default enabled
  cors:
    enable_cors: true
    enable_cors: true  # default "false"
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"  # default "*"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"  # default "*"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 1728000
  #auth: # @v4.2.16
   # url: auth.demo.simloud.com    # default "" - empty string is disabled. set vouch domain .
   # sub_domain: auth              # <subdomain>.<base_domain> if auth.url is not set
    #type: basic                   # default “vouch”, to integrate via vouch.

internal_api:                     # @v4.2
  base_url: kube-service
  sub_domain: " "
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80     # available 80 and 443 only

service:
  name: kube-service-3
  namespace: default
  type: ClusterIP
  annotations: {}
  servicePort: 80
  podPort: 80
  specType: deployment
  options: # @v3.4.10
    sidecars:
      vault:
       enable: false
    timeouts: # @v4.2.17
      job_execute: 3600        # job spec execution timeout in sec
    job: # @v4.2.17 applicable only for job/cronjob type
      shell_command: “”        # default shell command
      cron: “*/1 * * * *”      # job cron execution. Only for cronjob type
      cron_concurrency: Allow  # Enable cron jobs concurrency: Allow/Forbid/Replace

spec:
 pod:
   name: kube-service-3
   replicas: 1
   strategy: # @v3.4.6
     type: Recreate # default “Recreate”
     rollingUpdate: # default empty
       maxSurge: 1                  # The number of pods that can be created above the desired amount of pods during an update
       maxUnavailable: 25%          # The number of pods that can be unavailable during the update process
   hascaler: # @v4.2
     enabled: false
     min: 1
     max: 10
     cpu_percent: 80
   containers:
     - name: container-name
       resources:
         requests:
           memory: "60Mi"
           cpu: "200m"
         limits:
           memory: "120Mi"
           cpu: "1000m"

```
[Download Simloudfile.yaml for k8s-service-3](/files/k8s-service-3/Simloudfile.yaml)
