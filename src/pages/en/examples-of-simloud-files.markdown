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
    type: vault

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
    type: vault

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
    type: vault

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
- name: dynamodb_1
    env_name_prefix: ENVDB1
    type: dynamodb
    params:
      TableName: dynamodb_name1
      AttributeDefinitions:
        - AttributeName: Artist
          AttributeType: S
        - AttributeName: SongTitle
          AttributeType: S
        - AttributeName: AlbumTitle
          AttributeType: S
      KeySchema:
        - AttributeName: Artist
          KeyType: HASH                    # HASH'|'RANGE'
        - AttributeName: SongTitle
          KeyType: RANGE                   # HASH'|'RANGE'
      LocalSecondaryIndexes:
        - IndexName: AlbumTitleIndex
          KeySchema:
            - AttributeName: Artist
              KeyType: HASH                # HASH'|'RANGE'
            - AttributeName: AlbumTitle
              KeyType: RANGE
          Projection:
            ProjectionType: INCLUDE        # 'ALL'|'KEYS_ONLY'|'INCLUDE'
            NonKeyAttributes:
              - Genre
              - Year
      GlobalSecondaryIndexes:
        - IndexName: SongTitleIndex
          KeySchema:
            - AttributeName: SongTitle
              KeyType: HASH                 # HASH'|'RANGE'
          Projection:
            ProjectionType: INCLUDE         # 'ALL'|'KEYS_ONLY'|'INCLUDE'
            NonKeyAttributes:
              - Genre
          ProvisionedThroughput:
            ReadCapacityUnits: 1
            WriteCapacityUnits: 1
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      StreamSpecification:
        StreamEnabled: True
        StreamViewType: KEYS_ONLY          # 'NEW_IMAGE'|'OLD_IMAGE'|'NEW_AND_OLD_IMAGES'|'KEYS_ONLY'
      SSESpecification:
        Enabled: False                     # True|False
      Tags:
        - Key: katerina
          Value: test

```
For more information about deploying DynamoDB database, please, follow this link <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.create_table" target="_blank">DynamoDB</a>.

For deploying **RDS**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml:

```yaml
  - name: db_3
    env_name_prefix: ENVDB3
    type: rds
    params:
      DBInstanceIdentifier: pgsql-database1
      Port: 5432
      Engine: postgres                        # mysql | postgres
      EngineVersion: "13.7-R1"
      DBName: postgres_test
      DBInstanceClass: db.t3.micro
      AllocatedStorage: 5
      MasterUsername: postgresMaster
      BackupRetentionPeriod: 7
      CopyTagsToSnapshot: True
      PubliclyAccessible: False
      Tags:
        - Key: user
          Value: test

```
For more information about deploying RDS databases, please, follow this link <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds.html#RDS.Client.create_db_instance" target="_blank">RDS</a>.

>NOTE: It is possible to deploy k8s-service-3 with additional options for cloud_resources block in Simloudfile.yaml, such as `S3`, `SQS`, `IAM` and others.

For deploying **S3**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml:

```yaml
- name: s3_1
    env_name_prefix: S31l
    type: s3
    params:
     region: eu-west-1                    # also change region value in CreateBucketConfiguration: {LocationConstraint: some region}
     config:
       Bucket: some-unique-name983742398
       CreateBucketConfiguration:
         LocationConstraint: eu-west-1    # if you change value of region above, this one also must be changed
     static_hosting_config:
       Bucket: some-unique-name983742398
       WebsiteConfiguration:
         ErrorDocument:
           Key: error.html
         IndexDocument:
           Suffix: index.html
     policy_config:
       Bucket: some-unique-name983742398
       Policy: '{
       "Version": "2012-10-17",
       "Statement": [{
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::some-unique-name983742398/*"
       }]
}'
     tags_config:
       Bucket: some-unique-name983742398
       Tagging:
         TagSet:
           - Key: user_tag
             Value: user_value

```
 S3 segment is parsed using the S3 module from the boto. More information <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.create_bucketz" target="_blank">here</a>.    

For deploying **SQS**, it is necessary to add following code snippet to `cloud_resources` block at Simloudfile.yaml:

```yaml
 - name: sqs_1
    env_name_prefix: SQS1
    type: sqs
    params:
     QueueName: 2347918-43728.fifo        # If FifoQueue: True, the name of a FIFO queue can only include alphanumeric characters, hyphens, or underscores, must end with .fifo suffix a>
     # attributes must be strings -> ''
     Attributes:
       DelaySeconds: '5'                  # 0 to 900 seconds
       MaximumMessageSize: '2048'         # from 1,024 bytes (1 KiB) to 262,144 bytes
       MessageRetentionPeriod: '7200'     # from 60 seconds (1 minute) to 1,209,600 seconds
       Policy: '{
   "Version": "2012-10-17",
   "Id": "Policy2374982789374987",
   "Statement" : [{
      "Sid": "Stmt1345234234",
      "Effect": "Deny",
      "Principal": {
         "AWS": [
            "322219090568"
         ]
      },
      "Action": [
         "sqs:SendMessage",
         "sqs:ReceiveMessage"
      ],
      "Resource": "arn:aws:sqs:ap-southeast-1:322219090568:sqs_name1"
   }]
}'
       ReceiveMessageWaitTimeSeconds: '3' # from 0 to 20 (seconds)
       VisibilityTimeout: '300'           # from 0 to 43,200 (12 hours)
       FifoQueue: 'True'                  # If True, the name of a FIFO queue can only include alphanumeric characters, hyphens, or underscores, must end with .fifo suffix and be 1 to >
     tags:
       user_tag: user_value
```
SQS segment is parsed using the SQS module from the boto. More information <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sqs.html#SQS.Client.create_queue" target="_blank">here</a>.


>NOTE: Using the k8s-service-3 microservice, you can deploy both databases, RDS, DynamoDB, and additional cloud_resources options.
 
Simloudfile for `k8s-service-3`:
```yaml
version: v2
kind: simloud-deployment
name: kube-service-3
type: kubernetes
mode: advanced
#image:

cloud_resources:
  - name: dynamodb_1
    env_name_prefix: ENVDB1
    type: dynamodb
    params:
      TableName: dynamodb_name1
      AttributeDefinitions:
        - AttributeName: Artist
          AttributeType: S
        - AttributeName: SongTitle
          AttributeType: S
        - AttributeName: AlbumTitle
          AttributeType: S
      KeySchema:
        - AttributeName: Artist
          KeyType: HASH                    # HASH'|'RANGE'
        - AttributeName: SongTitle
          KeyType: RANGE                   # HASH'|'RANGE'
      LocalSecondaryIndexes:
        - IndexName: AlbumTitleIndex
          KeySchema:
            - AttributeName: Artist
              KeyType: HASH                # HASH'|'RANGE'
            - AttributeName: AlbumTitle
              KeyType: RANGE
          Projection:
            ProjectionType: INCLUDE        # 'ALL'|'KEYS_ONLY'|'INCLUDE'
            NonKeyAttributes:
              - Genre
              - Year
      GlobalSecondaryIndexes:
        - IndexName: SongTitleIndex
          KeySchema:
            - AttributeName: SongTitle
              KeyType: HASH                 # HASH'|'RANGE'
          Projection:
            ProjectionType: INCLUDE         # 'ALL'|'KEYS_ONLY'|'INCLUDE'
            NonKeyAttributes:
              - Genre
          ProvisionedThroughput:
            ReadCapacityUnits: 1
            WriteCapacityUnits: 1
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      StreamSpecification:
        StreamEnabled: True
        StreamViewType: KEYS_ONLY          # 'NEW_IMAGE'|'OLD_IMAGE'|'NEW_AND_OLD_IMAGES'|'KEYS_ONLY'
      SSESpecification:
        Enabled: False                     # True|False
      Tags:
        - Key: user1
          Value: test

  - name: s3_1
    env_name_prefix: S31l
    type: s3
    params:
      region: eu-west-1                    # also change region value in CreateBucketConfiguration: {LocationConstraint: some region}
      config:
        Bucket: some-unique-name983742398
        CreateBucketConfiguration:
          LocationConstraint: eu-west-1    # if you change value of region above, this one also must be changed
      static_hosting_config:
        Bucket: some-unique-name983742398
        WebsiteConfiguration:
          ErrorDocument:
            Key: error.html
          IndexDocument:
            Suffix: index.html
      policy_config:
        Bucket: some-unique-name983742398
        Policy: '{
       "Version": "2012-10-17",
       "Statement": [{
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::some-unique-name983742398/*"
       }]
}'
      tags_config:
        Bucket: some-unique-name983742398
        Tagging:
          TagSet:
            - Key: user_tag
              Value: user_value

  - name: db_3
    env_name_prefix: ENVDB3
    type: rds
    params:
      DBInstanceIdentifier: pgsql-database1
      Port: 5432
      Engine: postgres                        # mysql | postgres
      EngineVersion: "13.7-R1"
      DBName: postgres_test
      DBInstanceClass: db.t3.micro
      AllocatedStorage: 5
      MasterUsername: postgresMaster
      BackupRetentionPeriod: 0
      CopyTagsToSnapshot: True
      PubliclyAccessible: False
      Tags:
        - Key: user
          Value: test

  - name: sqs_1
    env_name_prefix: SQS1
    type: sqs
    params:
      QueueName: 2347918-43728.fifo        # If FifoQueue: True, the name of a FIFO queue can only include alphanumeric characters, hyphens, or underscores, must end with .fifo suffix and be 1 to 80 in length.
      # attrituptes must be strings -> ''
      Attributes:
        DelaySeconds: '5'                  # 0 to 900 seconds
        MaximumMessageSize: '2048'         # from 1,024 bytes (1 KiB) to 262,144 bytes
        MessageRetentionPeriod: '7200'     # from 60 seconds (1 minute) to 1,209,600 seconds
        Policy: '{
   "Version": "2012-10-17",
   "Id": "Policy2374982789374987",
   "Statement" : [{
      "Sid": "Stmt1345234234",
      "Effect": "Deny",
      "Principal": {
         "AWS": [
            "322219090568"
         ]
      },
      "Action": [
         "sqs:SendMessage",
         "sqs:ReceiveMessage"
      ],
      "Resource": "arn:aws:sqs:ap-southeast-1:322219090568:sqs_name1"
   }]
}'
        ReceiveMessageWaitTimeSeconds: '3' # from 0 to 20 (seconds)
        VisibilityTimeout: '300'           # from 0 to 43,200 (12 hours)
        FifoQueue: 'True'                  # If True, the name of a FIFO queue can only include alphanumeric characters, hyphens, or underscores, must end with .fifo suffix and be 1 to 80 in length.
      tags:
        user_tag: user_value


  - name: iam_role_12345
    env_name_prefix: MAIN_ROLE
    type: iam
    params:
      partial_name: "infra_role"                   # mandatory, part of the role name(usually name of service, e.g.: cluster, lambda).
      relationships:
        - "arn:aws:iam::322219090568:user/assafw"  # users or roles considered to be trusted
      services:
        - "ec2.amazonaws.com"                      # mandatory, AWS service list that can assume a role, for example: `lambda.amazonaws.com`
      inline_policies:                             # all sub-fields are optional
        - name: "assume-role-policy"               # uuid4 by default
          action:
            - "sts:AssumeRole"                     # empty list by default
          version: "2012-10-17"
          effect: "Allow"
          resource: "*"
        #access_policy_arns:                          # list of access policy arn to attach to the role
        - "arn:aws:iam::aws:policy/AdministratorAccess"
      # trusted_by:                                  # creating role will be in trusted relationships for roles in the list bellow
      #  - "E2ETest-7f23fea4-owner-1594197846249196"  # role name, not ARN

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

### Links to repositories
 -  <a href="https://gitlab.com/simloud-demo/fe-demo" target="_blank">fe-demo</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-1" target="_blank">k8s-service-1</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-2" target="_blank">k8s-service-2</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-3" target="_blank">k8s-service-3</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-1" target="_blank">lambda-serverless-1</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-2" target="_blank">lambda-serverless-2</a>
 -  <a href="https://gitlab.com/simloud-demo/git-monorepo" target="_blank">git-monorepo</a>
 -  <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a>