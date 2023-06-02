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
mode: advanced

secrets:
  - path: secrets/customer1/data1
    env_name_prefix: CUSTENV1
    type: vault

external_api:
  sub_domain: ""
  base_url: "/"
  regex:
    enabled: false                # by default  it's `false`. It is possible to assign the 'true' value for this parameter
    rewrite-target: /$2$3$4
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
    cors-max-age: 86400


service:
  name: fe-canaveral

spec: {}

```

[Download Simloudfile.yaml for Frontend mode](/files/front-end-mode/Simloudfile.yaml)

### Lambda deployment mode

```yaml

version: v2
kind: simloud-deployment
type: serverless
mode: advanced

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
  - env_name: ENVNAME1
    value: "Yahoo!"

external_api:
  sub_domain: "lambda"
  base_url: "lambda-service-1"
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


spec:
  Runtime: python3.9
  MemorySize: 128
  Timeout: 15
  Handler: lambda_function.lambda_handler

service:
  name: lambda-service-1
```

[Download Simloudfile.yaml for Lambda mode](/files/lambda-deployment-mode/Simloudfile.yaml)

### Kubernetes deployment mode

```yaml
version: v2
kind: simloud-deployment
name: kube-service
type: kubernetes
mode: advanced

cloud_resources:
  - name: sqs_1
    env_name_prefix: SQS1
    type: sqs

  - name: sqs_2
    env_name_prefix: SQS2
    type: sqs

  - name: kube-service1.s3_1
    env_name_prefix: S31
    type: s3

secrets:
  - path: secrets/customer1/data1
    env_name_prefix: CUSTENV1
    type: vault

environment:
  - env_name: ENVNAME1
    value: "Yahoo!"

external_api:
  regex:
    enabled: false
    rewrite-target: "/$2$3$4"
  sub_domain: "k8s"
  base_url: "/kube-service-1"
  redirects:
    http2https: true
  cors:
    enable_cors: true
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 86400

service:
  name: kube-service-1
  type: ClusterIP
  annotations: {}
  servicePort: 80
  podPort: 8080
  specType: deployment

spec:
  pod:
    name: kube-service-1
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
            ephemeral-storage: "2G"
          limits:
            memory: "120Mi"
            cpu: "1000m"
            ephemeral-storage: "4G"

```

[Download Simloudfile.yaml for kubernetes](/files/kubernetes-deployment-mode/Simloudfile.yaml)


### Pipeline deployment mode

```yaml

version: v2
kind: simloud-deployment             # By default, is set as simloud-deployment
name: test-pipeline
type: pipeline                        # It is necessary to specify the type of deployment
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


### Creating and deploying Databases
With Simloudfile.yaml functionality is also possible to deploy Databases. 
On the current moment are supported just few types of databases managed by AWS Cloud Provider. In those types are involved DynamoDB and RDS AWS services.

For deploying **DynamoDB**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml.

```yaml
 - name: dynamodb_ks3
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
For more information about deploying DynamoDB database, please, follow this link <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.create_table" target="_blank">DynamoDB</a>.

For deploying **RDS**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml:

```yaml
  - name: rds-db-ks3
    env_name_prefix: ENVDB3
    type: rds
    params:
      DBInstanceIdentifier: pgsql-rds-database-ks3
      Port: 5432
      Engine: postgres                        # mysql | postgres
      EngineVersion: "14.7"
      DBName: postgres_test
      DBInstanceClass: db.t3.micro
      AllocatedStorage: 5
      MasterUsername: postgresMaster
      BackupRetentionPeriod: 0
      CopyTagsToSnapshot: True
      PubliclyAccessible: False
      Tags:
        - Key: rds
          Value: database
      AutoMinorVersionUpgrade: false

```
For more information about deploying RDS databases, please, follow this link <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds.html#RDS.Client.create_db_instance" target="_blank">RDS</a>.

>NOTE: It is possible to deploy k8s-service-3 with additional options for cloud_resources block in Simloudfile.yaml, such as `S3`, `SQS`, `IAM` and others.

For deploying **S3**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml:

```yaml
- name: kube3_s3_1
    env_name_prefix: S31
    type: s3
```
```yaml
- name: lambda-service-3.s3_1
    env_name_prefix: LAMBDAS31
    type: s3
```
 S3 segment is parsed using the S3 module from the boto. More information <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.create_bucketz" target="_blank">here</a>.    

>NOTE: Using the k8s-service-3 microservice, you can deploy both databases, RDS, DynamoDB, and additional cloud_resources options.
 
Simloudfile for `k8s-service-3`:
```yaml
version: v2
kind: simloud-deployment
name: kube-service-3
type: kubernetes
mode: advanced

cloud_resources:
  - name: rds-db-ks3
    env_name_prefix: ENVDB3
    type: rds
    params:
      DBInstanceIdentifier: pgsql-rds-database-ks3
      Port: 5432
      Engine: postgres                        # mysql | postgres
      EngineVersion: "14.7"
      DBName: postgres_test
      DBInstanceClass: db.t3.micro
      AllocatedStorage: 5
      MasterUsername: postgresMaster
      BackupRetentionPeriod: 0
      CopyTagsToSnapshot: True
      PubliclyAccessible: False
      Tags:
        - Key: rds
          Value: database
      AutoMinorVersionUpgrade: false

  - name: dynamodb_ks3
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
    type: vault

environment:
  - env_name: ENVNAME1
    value: "Yahoo!"

external_api:
  regex:
    enabled: true
    rewrite-target: "/$2$3$4"
  sub_domain: "k8s"
  base_url: "/kube-service-3"
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80     # available 80 and 443 only
  redirects:
    http2https: true # by default enabled
  cors:
    enable_cors: true
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"  # default "*"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"  # default "*"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 86400

service:
  name: kube-service-3
  type: ClusterIP
  annotations: {}
  servicePort: 80
  podPort: 8080
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

### Deploying new Simloud services based on already created infrastructure components

  **It is an option to deploy new Simloud services based on already created infrastructure components with mentioning their dependencies within SimloudFile.yaml.** 


   In order to access resources that have been established in another service within the same cloud it is necessary:

1. Edit `cloud_resource` block of Simloudfile.yaml in following way:

```yaml
cloud_resources:
 - name: service-a.shared_bucket
   type: s3
service:
  name: service-b
```
`cloud_resources.name` - the name of shared resource

`service.name` - the name of the service

As example, cloud_resources block that we should to add in Simloudfile.yaml of kube-service-2 to deploy database from kube-service-3

```yaml
- name: kube-service-3.db3
    env_name_prefix: ENVDB3
    type: rds
```
Snippet that included such changes: [Download Simloudfile.yaml](/files/k8s-service-2-adv/Simloudfile.yaml)

### Links to repositories
 -  <a href="https://gitlab.com/simloud-demo/fe-demo" target="_blank">fe-demo</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-1" target="_blank">k8s-service-1</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-2" target="_blank">k8s-service-2</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-3" target="_blank">k8s-service-3</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-1" target="_blank">lambda-serverless-1</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-2" target="_blank">lambda-serverless-2</a>
 -  <a href="https://gitlab.com/simloud-demo/git-monorepo" target="_blank">git-monorepo</a>
 -  <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a>