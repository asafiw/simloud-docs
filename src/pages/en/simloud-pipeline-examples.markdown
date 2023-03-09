---
title: Simloud-pipeline.yaml examples
description: Simloud-pipeline.yaml examples
layout: ../../layouts/MainLayout.astro
---

### Example of `helm_install.sh` file

```sh                                                                   helm_install.sh
#!/bin/bash

if [ "$PIPELINE_ACTION" == "" ]; then
  echo "Please, provide action."
fi

if [[ "$PIPELINE_ACTION" == "deploy" &&  "$PIPELINE_STATE" == "build" ]]; then
  helm repo add bitnami https://charts.bitnami.com/bitnami
  env
  echo "helm upgrade --install my-release bitnami/wordpress --set wordpressUsername=$wordpressUsername --set wordpressPassword=$wordpressPassword --set wordpressEmail=$wordpressEmail ->
  helm upgrade --install my-release bitnami/wordpress \
  --set wordpressUsername=$wordpressUsername \
  --set wordpressPassword=$wordpressPassword \
  --set wordpressEmail=$wordpressEmail \
  --set ingress.enabled=true \
  --set ingress.selfSigned=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class=nginx" \
  --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL}
fi

if [[ "$PIPELINE_ACTION" == "deploy" && "$PIPELINE_STATE" != "build" ]]; then
  helm repo add bitnami https://charts.bitnami.com/bitnami
  env
  echo "helm upgrade --install my-release bitnami/wordpress --set wordpressUsername=$wordpressUsername --set wordpressPassword=$wordpressPassword --set wordpressEmail=$wordpressEmail ->
  helm upgrade --install my-release bitnami/wordpress \
  --set wordpressUsername=$wordpressUsername \
  --set wordpressPassword=$wordpressPassword \
  --set wordpressEmail=$wordpressEmail \
  --set ingress.enabled=true \
  --set ingress.selfSigned=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class=nginx" \
  --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL} \
  --set serviceContainer.resources.requests.cpu="600m" \
  --set serviceContainer.resources.requests.memory="1024Mi" \
  --set serviceContainer.resources.limits.cpu="800m" \
  --set serviceContainer.resources.limits.memory="1536Mi"
  echo "Chart was successfully upgrade"
fi

if [[ "$PIPELINE_ACTION" == "destroy" ]]; then
  env
  helm uninstall my-release
  kubectl delete pvc data-my-release-mariadb-0
fi
```
[Download helm_install.sh file](/files/helm_install.sh)

> **_So, there are 2 variants of PIPELINE ACTION:_**
> - **`Deploy`** - _for building job via Simloud pipeline_;
> - **`Destroy`** - _for terminating job via Simloud pipeline_.




### **Terraform shell example**

```yaml
version: v1
kind: simloud-pipeline

pipeline:
  default:
    - action: deploy,destroy
      state: build,create,update,destroy                                     # profile name. Currently only default
      stages:
        - name: “TF code”
          shell: terraform
          args: []                            # for terraform case
          homedir: ./                                # shell command directory
          terraform:
            version: 0.13                            # tf version , default 0.12
            workspace: default           # Workspace’s name. Default workspace: default
            statefile:                               # state file location
              storage: kubernetes                    # default “kubernetes” (k8s?)
              location: default.k8s-state            # k8s: <namespace>.<secret_suffix>
            secrets:                                   # `-var-file="testing.tfvars"`
              - storage: kubernetes            # vault or k8s secrets
                paths:                                 # vault pats, or k8s secers names
                  - kube-system.ssh-keys          
```
[Download simloud-pipeline.yaml](/files/terraform/simloud-pipeline.yaml)