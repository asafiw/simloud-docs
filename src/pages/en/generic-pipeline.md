---
title: Pipeline deployment mode 
description: Pipeline deployment mode 
layout: ../../layouts/MainLayout.astro
---

```yaml

version: v2
kind: simloud-deployment
name: test-pipeline
type: pipeline
mode: strict

secrets:
  - path: secrets/cloud-resources
    env_name_prefix: CUSTENV1
    type: k8s

environment:
 - env_name: ENVNAME1
   value: "Yahoo!"

service:
  name: kube-service-3
  namespace: default
  annotations: {}

spec:
  pod:
    - name: vpn
  resources:
    replicas: 1
    requests:
      memory: "60Mi"
      cpu: "200m"
    limits:
      memory: "120Mi"
      cpu: "1000m"

```

[Download Simloudfile.yaml for generic-pipeline mode](/files/generic-pipeline.yaml)