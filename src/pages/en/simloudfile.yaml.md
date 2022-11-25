---
title: Simloudfile.yaml
description: Simloudfile.yaml
layout: ../../layouts/MainLayout.astro
---

### Full `SimloudFile.yaml` file :

```yaml
version: v2
kind: simloud-deployment
name: <repo visual name>                          # "optional", if empty, will same with `.service.name`
type: (kubernetes|pipeline|serverless|front-end)  # default "kubernetes" @v5.0
mode: (strict|advаnced)                           # default "strict"
image: <jenkins-slave-image>                      # Send to jenkins as SLAVE_IMAGE parameter

cloud_resources:
  - name: service_name.db_1
    env_name_prefix: ENVDB1
    type: dynamodb
    params:
      dbname: aaa
      Region: eu-central-1

  - name: s3_1
    env_name_prefix: S31
    type: s3

  - name: lambda-service-3.s3_1
    env_name_prefix: LAMBDAS31
    type: s3

  - name: lambda-service-3.db1_1
    type: s3

secrets:
  - path: secrets/customer1/data1        # vault: <path>
    env_name_prefix: CUSTENV1            # mandatory in mode: `strict`, optional in `advanced`
    type: vault                          # default "vault"

environment:
  - env_name: ENVNAME1
    value: Yahoo!

external_api:       # internet facing loadbalancer
  base_url: kube-service
  sub_domain: xxx
  base_domain: base.domain.name
  regex:
    enabled: true             # default `false`
    rewrite-target: /$2$3$4    # default `for micro_service_type: serverless` will be `$1$2$3$4`, for all another modes `$2$3$4`
  redirects:
    http2https: true           # by default enabled
  cors:
    enable_cors: false          # default "false"
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 1728000
  auth:
    url: auth.demo.simloud.com    # default "" - empty string is disabled. set vouch domain as .
    sub_domain: auth              # <subdomain>.<base_domain> if auth.url is not set
    type: vouch                   # default "vouch", to integrate via vouch.
  headers:
    - header: "Content-Type: text/html; charset=UTF-8"
      override: true              # true - always override same header; false - set header, if is not set only

internal_api:
  base_url: kube-service
  sub_domain: xxx
  base_domain: base.domain.name
  regex:
    enabled: false             # default `false`
    rewrite-target: /$2$3$4    # default `for micro_service_type: serverless` will be `$1$2$3$4`, for all another modes `$2$3$4`
  redirects:
    http2https: true           # by default enabled
  cors:
    enable_cors: false          # default "false"
    cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    cors-allow-origin: "*"
    cors-allow-credentials: false
    cors-max-age: 1728000
  auth:
    url: auth.demo.simloud.com    # default "" - empty string is disabled. set vouch domain as .
    sub_domain: auth              # <subdomain>.<base_domain> if auth.url is not set
    type: vouch                   # default "vouch", to integrate via vouch.
  headers:
    - header: "Content-Type: text/html; charset=UTF-8"
      override: true              # true - always override same header; false - set header, if is not set only

service:
  name: kube-service-3  # microservice name
  namespace: default    # namespace
  type: ClusterIP
  servicePort: 80  # default 80
  podPort: 80      # default 80
  # `pod` type replaced with `deployment`
  specType: (deployment|job|cronjob)  # default "deployment"
  options:
    sidecars:
      vault:
        enable: false          # vault sidecar enable/disable
        policy: default-app    # default vault acl policy name
    timeouts:                  # @v4.2.17
      job_execute: 3600        # job spec execution timeout in sec
    job:                       # @v4.2.17 applicable only for job/cronjob type
      shell_command: ""        # default shell command
      cron: "*/1 * * * *"      # job cron execution. Only for cronjob type
      cron_concurrency: Allow  # Enable cron jobs concurrency: Allow/Forbid/Replace
      cron_suspend: false      # If it is set to true, all subsequent executions are suspended.
      cron_backoffLimit: 4     # to specify the number of retries before considering a Job as failed
      cron_completions: 1      #
      cron_parallelism: 1      #

spec:  # for k8s service, mutually exclusive with below
  pod:
    name: kube-service-3
    terminationGracePeriodSeconds: 300 # default 300sec
    replicas: 1
    strategy:
      # RollingUpdate: New pods are added gradually, and old pods are terminated gradually
      # Recreate: All old pods are terminated before any new pods are added
      type: (Recreate|RollingUpdate) # default "Recreate"
      rollingUpdate:                 # default empty
        maxSurge: 1                  # The number of pods that can be created above the desired amount of pods during an update
        maxUnavailable: 25%          # The number of pods that can be unavailable during the update process
    containers:                      # NOTE: currently supports only single container !!!
      - imagePullSecrets:                              #
          - name: <image-pull-secret-name>               # set customer one or more image pull secret name(s)
        lifecycle: # optional
          preStop:
            exec:
              # SIGTERM triggers a quick exit; gracefully terminate instead
              command: ["/usr/sbin/nginx","-s","quit"]
        resources:
          health_check:
            readinessProbe:
              exec:
                command:
                  - cat
                  - /tmp/healthy
              initialDelaySeconds: 5
              periodSeconds: 5
            livenessProbe:
              tcpSocket:
                port: 8080
              initialDelaySeconds: 5
              periodSeconds: 10
            startupProbe:
              httpGet:
                path: /healthz
                port: 8080
                httpHeaders:
                  - name: Custom-Header
                    value: Awesome
              initialDelaySeconds: 3
              periodSeconds: 3
          requests:
            memory: "60Mi"
            cpu: "200m"
            ephemeral-storage: "2G"
          limits:
            memory: "120Mi"
            cpu: "1000m"
            ephemeral-storage: "4G"

spec:  # for lambda mutually exclusive with above, see more in https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.create_function
  Runtime: 'python3.7'
  Timeout: 15
  MemorySize: 128

spec: {} # frontend service will be emply
```
[Download Simloudfile.yaml](/files/Simloudfile.yaml)



### Minimal Requirements:

- Jenkins release/5.0
- Backend:

## **Annotations block:**

#### Required parameters

### `.version`

**Default value**: `v2`

**Type**: `str`

`v2` - Only available. From version v2, it is a mandatory parameter. <br /> `v0` , `v1` or empty, back compatible mode

### `.kind`

**Default value**: `simloud-deployment`

**Type**: `const str`

### `.type`

**Default value**: `-`

**Type**: `set str`

**Possible Options**:
- `kubernetes` - deployment services as k8s service, any type.
- `apigw` or `serverless` - deployment, using API GW solution, for example: lambda functions
- `external` or `front-end` - deployment, using k8s external service solution, for example: frontend on s3 bucket
- `pipeline` - Simloud pipeline execution, only

#### Optional parameters

### `.mode`

**Default value**: `strict`

**Type**: `set str`

**Possible Options**:
- `strict` - Strict syntax validation.
- `advanced` - Advanced syntax validation
In `advanced` mode, prefix parameter: `env_name_prefix` is not mandatory

### `.image`

**Default value**: `””`

**Type**: `str`

**Possible Options**:  Send to jenkins as `SLAVE_IMAGE` parameter. Deprecated alias from `.cicd.image`.


## **Cloud Resources block**:

#### Required parameters:

### `.cloud_resources[].name`

**Default value**: `-`

**Type**: `str`

### `.cloud_resources[].env_name_prefix`

**Default value**: `-`

**Type**: `str`

### `.cloud_resources[].type`

**Default value**: `-`

**Type**: `str`

#### Optional parameters

### `.cloud_resources`

**Default value**: `[]`

**Type**: `map`

### `.cloud_resources[].params`

**Default value**: `[]`

**Type**: `list`


## **Secrets block:**

#### Required parameters:

### `.secrets[].path`

**Default value**: `-`

**Type**: `str`

**Possible Options**: if  `.secrets[].type` will be:

- `vault`: `<vault-kv-path>`
- ` k8s: <secret-name>.<namespace> `

### `.secrets[].env_name_prefix`

**Default value**: `-`

**Type**: `str`

**Possible Options**: environment variable prefix. will be generated by this logic:
`.secrets[].env_name_prefix_secret-key`

It is mandatory in `.mode : strict` and optional in `.mode : advanced`

#### Optional parameters

### `.secrets`

**Default value**: `[]`

**Type**: `list`

It is necessary to provide secrets, stored in hashicorp `vault` or `k8s` secrets, mount to pod as environment variables

### `.secrets[].type`

**Default value**: `vault&#124;k8s`

**Type**: `set str`

**Possible Options**: 	
Storage type:
- `vault` - to read secret data from vault
- `k8s` - to read secret data from kubernetes secret

## **Environment block:**

#### Required parameters:

### `.environment[].env_name`

**Default value**: `-`

**Type**: `str`

Commonly used as environment name

### `.environment[].value`

**Default value**: `-`

**Type**: `str`

Commonly used as environment variable

#### Optional parameters
### `.environment`

**Default value**: `[]`

**Type**: `list`

It provides availability apply hardcoded environment variables to pod 

## **Internet facing interface:**

#### Required parameters:

### `.external_api.base_domain`

**Default value**: `-`

**Type**: `str`

Commonly used as base domain name

### `.external_api.cors.enable_cors`

**Default value**: `false`

**Type**: `bool`

**Possible Options**: `true`

It enables CORS headers support

### `.external_api.auth.sub_domain`

**Default value**: `-`

**Type**: `str`

### `.external_api.headers[].header`

**Default value**: `""`

**Type**: `str`

**Possible Options**: `"Content-Type: text/html; charset=UTF-8"`

#### Optional parameters
### `.external_api`

**Default value**: `{}`

**Type**: `map`

### `.external_api.base_url`

**Default value**: `_""_`

**Type**: `str`

Base url, if applicable

### `.external_api.sub_domain`

**Default value**: `""`

**Type**: `str`

Subdomain, if applicable

### `.external_api.loadbalancer`

**Default value**: `aws_network`

**Type**: `set str`

**Possible Options**: `aws_network` - AWS Network

### `.external_api.protocol`

**Default value**: `tcp`

**Type**: `set str`

**Possible Options**: 
- `tcp` - for TCP protocol
- `tls` - SSL terminated TCP protocol
- `udp` - for UDP protocol
- `tcp_udp` - double support TCP and UDP

It is currently available only `tcp` for `80` port and `tls` for `443` port

### `.external_api.port`

**Default value**: `80,443`

**Type**: `set int`

It is currently available only values `80` or `443` or both

### `.external_api.redirects`

**Default value**: `{}`

**Type**: `map`

### `.external_api.redirects.http2https`

**Default value**: `true`

**Type**: `bool`

Automatic redirect from HTTP to HTTPS protocol

### `.external_api.cors`

**Default value**: `{}`

**Type**: `	map`

### `.external_api.cors.cors-allow-methods`

**Default value**: `*`

**Type**: `set str`

**Possible Options**: `GET, PUT, POST, DELETE, PATCH, OPTIONS`

### `.external_api.cors.cors-allow-headers`

**Default value**: `*`

**Type**: `set str`

**Possible Options**: `DNT,X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization`

### `.external_api.cors.cors-allow-origin`

**Default value**: `*`

**Type**: `str`

**Possible Options**:
- `* ` - will be set domain from `Origin` request header, or form `.external_api.base_domain`
- `<domain-name>`- will always be set this domain



### `.external_api.cors.cors-allow-credentials`

**Default value**: `false`

**Type**: `bool`


### `.external_api.cors.cors-max-age`

**Default value**: `1728000`

**Type**: `int`


### `.external_api.auth`

**Default value**: `{}`

**Type**: `map`

It enables authentication, base on ingress logic

### `.external_api.auth.url`

**Default value**: `””`

**Type**: `str`

### `.external_api.auth.type`

**Default value**: `vouch`

**Type**: `set str`

### `.external_api.headers[]`

**Default value**: `[]`

**Type**: `list`

### `.external_api.headers[].override`

**Default value**: `false`

**Type**: `bool`

**Possible Options**: 
`true` - always override same header;
`false` - set header, if is not set only

### `.external_api.regex`

**Default value**: `false`

**Type**: `bool`

**Possible Options**:
- `true` - full control over the format in which url is configured;
- `false` - default regex configuration was provided end equals the following
  configuration as if entered by hand.

## **LAN facing interface:**
#### Required parameters:

### `.internal_api.base_domain`

**Default value**: `-`

**Type**: `str`

### `.internal_api.headers[].header`

**Default value**: `””`

**Type**: `str`

#### Optional parameters
### `.internal_api`

**Default value**: `{}`

**Type**: `map`

### `.internal_api.base_url`

**Default value**: `""`

**Type**: `str`


### `.internal_api.sub_domain`

**Default value**: `””`

**Type**: `str`

### `.internal_api.loadbalancer`

**Default value**: `aws_network`

**Type**: `set str`

**Possible Options**: `aws_network` - AWS Network

### `.internal_api.protocol`

**Default value**: `tcp`

**Type**: `set str`

**Possible Options**: 
- `tcp` - for TCP protocol
- `tls` - SSL terminated TCP protocol
- `udp` - for UDP protocol
- `tcp_udp` - double support TCP and UDP

It is currently available only `tcp` for `80` port and `tls` for `443` port

### `.internal_api.port`

**Default value**: `80,443`

**Type**: `set int`

It is currently available only values `80` or `443` or both

### `.internal_api.headers[]`

**Default value**: `[]`

**Type**: `list`


### `.internal_api.headers[].override`

**Default value**: `true`

**Type**: `bool`

**Possible Options**:
- `true` - always override same header;
- `false` - set header, if is not set only 



## **Service block:**

#### Required parameters:

### `.service`

**Default value**: `{}`

**Type**: `map`

### `.service.name`

**Default value**: `-`

**Type**: `str`

### `.service.options.sidecars.vault.enable`

**Default value**: `false`

**Type**: `bool`

**Possible Options**: 
- enable
- disable
  
### `.service.options.sidecars.consul.enable`
**Default value**: `false`

**Type**: `bool`

**Possible Options**: 
- enable
- disable
  
### `.service.options.timeouts.job_execute`
**Default value**: `3600`

**Type**: `	int`

Job spec execution timeout in sec

### `.service.options.job.shell_command`
**Default value**: `””`

**Type**: `str`

Default shell command

#### Optional parameters
### `.service.namespace`

**Default value**: `default`

**Type**: `str`

### `.service.type`

**Default value**: `ClusterIP`

**Type**: `	set str`


### `.service.annotations`

**Default value**: `{}`

**Type**: `	map`

### `.service.servicePort`
**Default value**: `80`

**Type**: `int`

### `.service.podPort`

**Default value**: `80`

**Type**: `int`

### `.service.specType`

**Default value**: `deployment`

**Type**: `set str`

**Possible Options**: `deployment, job, cronjob, replicasets, daemonset, statefulset`


### `.service.options`

**Default value**: `{}`

**Type**: `map`

### `.service.options.sidecars`

**Default value**: `{}`

**Type**: `map`

### `.service.options.sidecars.vault`

**Default value**: `{}`

**Type**: `map`

### `.service.options.sidecars.vault.policy`

**Default value**: `default-app`

**Type**: `str`

It is mandatory, if `.service.options.sidecars.vault_hcl` present

### `.service.options.sidecars.vault.hcl`

**Default value**: `””`

**Type**: `str`

File with ACL policy body. Path is relative from current `simloudfile.yaml` folder

### `.service.options.sidecars.consul`

**Default value**: `{}`

**Type**: `map`

### `.service.options.sidecars.consul.policy`

**Default value**: `default-app`

**Type**: `str`

Ir is mandatory, if `.service.options.sidecars.consul_hcl` present

### `.service.options.sidecars.consul.hlc`

**Default value**: `""`

**Type**: `str`

File with ACL policy body. Path is relative from current `simloudfile.yaml` folder

### `.service.options.timeouts`

**Default value**: `{}`

**Type**: `map`


### `.service.options.job`

**Default value**: `{}`

**Type**: `map`

Applicable only for job/cronjob type

### `.service.options.job.cron`

**Default value**: `*/1 * * * *`

**Type**: `str`

Used only for cronjob type

### `.service.options.job.cron_concurrency`
**Default value**: `Allow`

**Type**: `set str`

**Possible Options**: 
- `Allow`
- `Forbid`
- `Replace` 

### `.service.options.job.cron_suspend`
**Default value**: `false`

**Type**: `bool`

### `.service.options.job.cron_backoffLimit`
**Default value**: `4`

**Type**: `int`

### `.service.options.job.cron_completions`
**Default value**: `1`

**Type**: `int`

### `.service.options.job.cron_parallelism`
**Default value**: `1`

**Type**: `int`

## **Kubernetes oriented Spec block:**

#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`

### `.spec.pod`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.name`

**Default value**: `-`

**Type**: `str`

**Possible Options**: 
- enable
- disable
  
### `.spec.pod.containers[].resources.disks[].name`

**Default value**: `-`

**Type**: `str`

**Possible Options**: pvc name 

### `.spec.pod.containers[].resources.disks[].size`
**Default value**: `8G`

**Type**: `	str`

You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

### `.spec.pod.containers[].resources.disks[].mount`
**Default value**: `/data`

**Type**: `str`

**Possible Options**: mount point

### `.spec.pod.containers[].resources.disks[].className`
**Default value**: `gp2`

**Type**: `	str`

**Possible Options**: pvc class name

### `.spec.pod.containers[].resources.disks[].AccessModes[]`
**Default value**: `{}`

**Type**: `list`

**Possible Options**:
The access modes are:
- **ReadWriteOnce** - the volume can be mounted as read-write by a single node. ReadWriteOnce access mode still can allow multiple pods to access the volume when the pods are running on the same node.
- **ReadOnlyMany** - the volume can be mounted as read-only by many nodes.
- **ReadWriteMany** - the volume can be mounted as read-write by many nodes.
- **ReadWriteOncePod** - the volume can be mounted as read-write by a single Pod. Use ReadWriteOncePod access mode if you want to ensure that only one pod across whole cluster can read that PVC or write to it. This is only supported for CSI volumes and Kubernetes version 1.22+. Persistent Volumes

As default value should be **ReadWriteOnce**

### `.spec.pod.containers[].resources.health_check.readinessProbe{}`
**Default value**: `-`

**Type**: `various`


### `.spec.pod.containers[].resources.health_check.livenessProbe{}`
**Default value**: `-`

**Type**: `	various`

### `.spec.pod.containers[].resources.health_check.startupProbe{}`
**Default value**: `-`

**Type**: `various`

#### Optional parameters
### `.spec.pod.terminationGracePeriodSeconds`

**Default value**: `300`

**Type**: `	int`

### `.spec.pod.replicas`

**Default value**: `1`

**Type**: `int`

### `.spec.pod.strategy`

**Default value**: `{}`
**Type**: `	map`

### `.spec.pod.strategy.type`
**Default value**: `Recreate`

**Type**: `set str`

**Possible Options**: 
- `RollingUpdate`
- `Recreate`

### `.spec.pod.strategy.rollingUpdate`

**Default value**: `{}`

**Type**: `map`

As default is empty

### `.spec.pod.strategy.rollingUpdate.maxSurge`

**Default value**: `1`

**Type**: `int`

The number of pods that can be created above the desired amount of pods during an update

### `.spec.pod.strategy.rollingUpdate.maxUnavailable`

**Default value**: `25%`

**Type**: `int/str`

The number of pods that can be unavailable during the update process

### `.spec.pod.hascaler`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.hascaler.enabled`

**Default value**: `false`

**Type**: `bool`

### `.spec.pod.hascaler.min`

**Default value**: `1`

**Type**: `int`

### `.spec.pod.hascaler.max`

**Default value**: `10`

**Type**: `int`

### `.spec.pod.hascaler.cpu_percent`

**Default value**: `80`

**Type**: `int`

### `.spec.pod.containers[]`

**Default value**: `[]`

**Type**: `list`

### `.spec.pod.containers[].name`

**Default value**: `-`

**Type**: `str`

If is not set, will be same with `.service.name`, if used more than one container, will be added number, for example: `my-service-0,` or `my-service-1`

### `.spec.pod.containers[].image`

**Default value**: `-`

**Type**: `str`

**Possible Options**: set custom pod container image ( override )

### `.spec.pod.containers[].imagePullSecrets`

**Default value**: `[]`

**Type**: `list`

**Possible Options**: set custom pod container image pull secret name(s). More information [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials)

### `.spec.pod.containers[].lifecycle`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].lifecycle.preStop`
**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].lifecycle.preStop.exec`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].lifecycle.preStop.exec.command`
**Default value**: `-`

**Type**: `list(str)`

### `.spec.pod.containers[].resources`
**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.disks[] `
**Default value**: `[]`

**Type**: `list`

### `.spec.pod.containers[].resources.requests`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.requests.memory`
**Default value**: `-`

**Type**: `str`

**Possible Options**: Limits and requests for `memory` are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these quantity suffixes: E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

### `.spec.pod.containers[].resources.requests.cpu`

**Default value**: `-`

**Type**: `float/str`

**Possible Options**: Fractional requests are allowed. When you define a container with `spec.containers[].resources.requests.cpu` set to `0.5`, you are requesting half as much CPU time compared to if you asked for `1.0` CPU. For CPU resource units, the quantity expression `0.1` is equivalent to the expression `100m`, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.`

### `.spec.pod.containers[].resources.requests.ephemeral-storage`
**Default value**: `-`

**Type**: `str`

**Possible Options**: Limits and requests for `ephemeral-storage` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

### `.spec.pod.containers[].resources.limits`
**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.limits.memory`
**Default value**: `-`

**Type**: `str`

**Possible Options**: Limits and requests for `memory` are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these quantity suffixes: E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki


### `.spec.pod.containers[].resources.limits.cpu`
**Default value**: `-`

**Type**: `	float/str`

**Possible Options**: Fractional requests are allowed. When you define a container with `spec.containers[].resources.requests.cpu` set to `0.5`, you are requesting half as much CPU time compared to if you asked for `1.0 `CPU. For CPU resource units, the quantity expression `0.1 `is equivalent to the expression `100m`, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.`

### `.spec.pod.containers[].resources.limits.ephemeral-storage`
**Default value**: `-`

**Type**: `str`

**Possible Options:**: Limits and requests for `ephemeral-storage` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

### `.spec.pod.containers[].resources.health_check`
**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.health_check.readinessProbe`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.health_check.livenessProbe`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].resources.health_check.startupProbe`

**Default value**: `{}`

**Type**: `map`

## **Lambda / APIGW oriented Spec block:**
#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`, if it is not used

#### Optional parameters
### `.spec{}`

**Default value**: `-`

**Type**: `various`

For lambda mutually exclusive with above, see more in [AWS doc](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.create_function)



## **Frontend / External service oriented Spec block:**
#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`, if it is not used



## Example for V2 SimloudFile.yaml:

**Kubernetes deployment mode:**
``` yaml 
version: v2
kind: simloud-deployment
name: <repo visual name>                         # "optional", if empty, will same with `.service.name`
type: kubernetes
mode: (strict|advаnced)                          # default "strict"
image: <jenkins-slave-image>                     # default empty. Send to jenkins as
# SLAVE_IMAGE parameter
dependency:
microservices:                                 # check depended microservices
- name: <service_name>.                        # `.service.name` parameters from another
  namespace: <namespace>                       # default "default"
  check:                                       # what need to check
  helm: (exist|notexist)                     # default "exist"

cloud_resources:
- name: service_name.db_1
  env_name_prefix: ENVDB1
  type: dynamodb
  params:
  dbname: aaa
  Region: eu-central-1

- name: s3_1
  env_name_prefix: S31
  type: s3

- name: lambda-service-3.s3_1
  env_name_prefix: LAMBDAS31
  type: s3

- name: lambda-service-3.db1_1
  type: s3

secrets:
- path: secrets/customer1/data1        # vault: <path> ; k8s: `<secret-name>.<namespace>`
  env_name_prefix: CUSTENV1            # mandatory in mode: `strict`, optional in `advanced`
  type: (vault|k8s)                    # default "vault", k8s - kubernetes secret

environment:
- env_name: ENVNAME1
  value: Yahoo!

external_api:
base_url: kube-service
sub_domain: xxx
base_domain: base.domain.name
loadbalancer: aws_network
protocol: tcp    # options: tcp, udp, tls, tcp_udp
port: 80,443     # available 80 and 443 only
redirects:
http2https: true # by default enabled
cors:
enable_cors: true  # default "false"
cors-allow-methods: "GET, PUT, POST, DELETE, PATCH, OPTIONS"  # default "*"
cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"  # default "*"
cors-allow-origin: "*"
cors-allow-credentials: false
cors-max-age: 1728000
auth:                           # @v4.2.16
url: auth.demo.simloud.com    # default "" - empty string is disabled. set vouch domain .
sub_domain: auth              # <subdomain>.<base_domain> if auth.url is not set
type: (vouch|keycloak)        # default “vouch”, to integrate via vouch.

internal_api:                     # @v4.2
base_url: kube-service
sub_domain: xxx
base_domain: base.domain.name
loadbalancer: aws_network
protocol: tcp    # options: tcp, udp, tls, tcp_udp
port: 80,443     # available 80 and 443 only

service:
name: kube-service-3
namespace: default
type: ClusterIP
annotations: {}
servicePort: 80 # default 80
podPort: 80 # default 80
# `pod` type replaced with `deployment`
specType: (deployment|job|cronjob|replicasets|daemonset|statefulset)  # default “deployment”
options:                                 # @v3.4.10
sidecars:
vault: false
timeouts:                  # @v4.2.17
job_execute: 3600        # job spec execution timeout in sec
job:                       # @v4.2.17 applicable only for job/cronjob type
shell_command: “”        # default shell command
cron: “*/1 * * * *”      # job cron execution. Only for cronjob type
cron_concurrency: Allow  # Enable cron jobs concurrency: Allow/Forbid/Replace

spec:  # for k8s service, mutually exclusive with below
pod:
name: kube-service-3
terminationGracePeriodSeconds: 300 # default 300sec
replicas: 1
strategy: # @v3.4.6
# RollingUpdate: New pods are added gradually, and old pods are terminated gradually
# Recreate: All old pods are terminated before any new pods are added
type: (Recreate|RollingUpdate) # default “Recreate”
rollingUpdate:                 # default empty
maxSurge: 1                  # The number of pods that can be created above the desired amount of pods during an update
maxUnavailable: 25%          # The number of pods that can be unavailable during the update process
hascaler: # @v4.2
enabled: false
min: 1
max: 10
cpu_percent: 80
containers:
- name: container-name
image: <image path>
lifecycle:
preStop:
exec:
# SIGTERM triggers a quick exit; gracefully terminate instead
command: ["/usr/sbin/nginx","-s","quit"]
resources:
health_check: # @v4.2 - details
readinessProbe:
exec:
command:
- cat
- /tmp/healthy
initialDelaySeconds: 5
periodSeconds: 5
livenessProbe:
tcpSocket:
port: 8080
initialDelaySeconds: 5
periodSeconds: 10
startupProbe:
httpGet:
path: /healthz
port: 8080
httpHeaders:
- name: Custom-Header
value: Awesome
initialDelaySeconds: 3
periodSeconds: 3
requests:
memory: "60Mi"
cpu: "200m"
limits:
memory: "120Mi"
cpu: "1000m"
 ```
[Download Simloudfile.yaml for k8s](/files/SImloudfilefork8s.yaml)



