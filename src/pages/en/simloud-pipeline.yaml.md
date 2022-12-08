---
title: Simloud-pipeline.yaml
description: Simloud-pipeline.yaml
layout: ../../layouts/MainLayout.astro
---

#### Configuration file for pipeline with possibility for deploying Terraform code

### Examples of `Simloud-pipeline.yaml` file :

\
**Bash shell example:**

```yaml
version: v1
kind: simloud-pipeline

pipeline:
  default: # profile name. Currently only default
    - stages:
        - name: "bash"
          shell: bash # “bash” by default ( optional )
          args: [] # shell arguments ( optional )
          homedir: /home/jenkins/agent/workspace/generic-pipeline # shell command default folder ( optional )
          scripts: # for “sh,bash,zsh” shells only
            - ./helm_install.sh
```
[Download Simloud-pipeline.yaml](/files/Simloud-pipeline.yaml)

### Example of `helm_install.sh` file :

```shell script
#!/bin/bash

if [ "$PIPELINE_ACTION" == "" ]; then
  echo "Please, provide action."
fi

if [ "$PIPELINE_ACTION" == "deploy" ]; then
  helm repo add bitnami https://charts.bitnami.com/bitnami
  env
  echo "helm upgrade --install my-release bitnami/wordpress --set wordpressUsername=$wordpressUsername --set wordpressPassword=$wordpressPassword --set wordpressEmail=$wordpressEmail --set ingress.enabled=true --set ingress.annotations.\"kubernetes\.io/ingress\.class=nginx\" --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL}"
  helm upgrade --install my-release bitnami/wordpress \
  --set wordpressUsername=$wordpressUsername \
  --set wordpressPassword=$wordpressPassword \
  --set wordpressEmail=$wordpressEmail \
  --set ingress.enabled=true \
  --set ingress.selfSigned=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class=nginx" \
  --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL}
fi

if [ "$PIPELINE_ACTION" == "destroy" ]; then
  env
  helm uninstall my-release
  kubectl delete pvc data-my-release-mariadb-0
fi
```
[Download helm_install.sh file](/files/helm_install.sh)



\
**Terraform shell example:**

```yaml
version: v1
kind: simloud-pipeline

pipeline:
  default: # profile name. Currently only default
    - stages:
        - name: “TF code”
          shell: terraform # for terraform case
          homedir: ./ # shell command directory
          terraform:
            version: 0.13 # tf version , default 0.12
            workspace: default # Workspace’s name. Default workspace: default
            statefile: # state file location
              storage: kubernetes # default “kubernetes” (k8s?)
              location: default.k8s-state # k8s: <namespace>.<secret_suffix>
            secrets: # `-var-file="testing.tfvars"`
              - storage: kubernetes # vault or k8s secrets
                paths: # vault pats, or k8s secers names
                  - kube-system.ssh-keys #
```
[Download Simloud-pipeline.yaml](/files/Simloud-pipeline1.yaml)