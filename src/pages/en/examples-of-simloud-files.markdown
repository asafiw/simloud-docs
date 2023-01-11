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
  sub_domain: "lambda"         # It is necessary to specify sub-domain, if applicable
  base_url: "lambda-service-1" # It is necessary to specify base url, if applicable
  regex:
    enabled: true             # by default  it's `false`. It is possible to assign the 'true' value for this parameter
    rewrite-target: /$2$3$4
  loadbalancer: aws_network
  protocol: tcp              # Possible options: tcp, udp, tls, tcp_udp
  port: 80                   # It is currently available only tcp for 80 port and tls for 443 port
  redirects:
    http2https: true        # By default this parameter is enabled
  cors:
    enable_cors: true       # By default it's a true
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
  sub_domain: "k8s"
  base_url: "kube-service-1"
  sub_domain: xxx
  base_domain: base.domain.name
  regex:
    enabled: true             # by default  it's `false`. It is possible to assign the 'true' value for this parameter
    rewrite-target: /$2$3$4
  loadbalancer: aws_network
  protocol: tcp_udp    # options: tcp, udp, tls, tcp_udp
  port: 443
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
mode: strict                        # by default  it's "strict", "advanced" mode is also possible

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