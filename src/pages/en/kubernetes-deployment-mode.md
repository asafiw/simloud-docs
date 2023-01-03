---
title: Kubernetes deployment mode 
description: Kubernetes deployment mode 
layout: ../../layouts/MainLayout.astro
---

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

[Download Simloudfile.yaml for kubernetes](/files/kubernetes.yaml)