---
title: Lambda deployment mode 
description: Lambda deployment mode 
layout: ../../layouts/MainLayout.astro
---

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


internal_api:                     # @v4.2
  base_url: kube-service
  sub_domain: xxx
  base_domain: base.domain.name
  loadbalancer: aws_network
  protocol: tcp    # options: tcp, udp, tls, tcp_udp
  port: 80      # available 80 and 443 only


spec:
  Runtime: python3.9
  MemorySize: 128
  Timeout: 15
  Handler: lambda_function.lambda_handler

service:
  name: lambda-service-1

```

[Download Simloudfile.yaml for Lambda mode](/files/front-end-mode.yaml)