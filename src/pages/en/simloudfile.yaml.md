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

`v2` - Only available. From version v2, it is a mandatory parameter. <br /> `v0` , `v1` or empty, back compatible mode.

Described all supported versions for SimloudFile.yaml. Technically on current moment is supported just v2 version.

### `.kind`

**Default value**: `simloud-deployment`

**Type**: `const str`

By default, is set as simloud-deployment which is mandatory for deployments placed in Simloud.

### `.type`

**Default value**: `-`

**Type**: `set str`

**Possible Options**:
- `kubernetes` - deployment services as k8s service, any type.
- `apigw` or `serverless` - deployment, using API GW solution, for example: lambda functions.
- `external` or `front-end` - deployment, using k8s external service solution, for example, frontend on s3 bucket.
- `pipeline` - Simloud pipeline execution, only.

It is necessary to specify the type of deployment.

#### Optional parameters

### `.mode`

**Default value**: `strict`

**Type**: `set str`

**Possible Options**:
- `strict` - Strict syntax validation.
- `advanced` - Advanced syntax validation.

 In `advanced` mode, the prefix parameter: `env_name_prefix` is not mandatory.

### `.image`

**Default value**: `””`

**Type**: `str`

**Possible Options**:  Send to Jenkins as `SLAVE_IMAGE` parameter. 

Deprecated alias from `.cicd.image`.


## **Cloud Resources block**:

#### Required parameters:

### `.cloud_resources[].name`

**Default value**: `-`

**Type**: `str`

The name of cloud resource, for example the name of the database.

### `.cloud_resources[].env_name_prefix`

**Default value**: `-`

**Type**: `str`

It is necessary to specify the environment prefix. For example, `ENVDB1`.

### `.cloud_resources[].type`

**Default value**: `-`

**Type**: `str`

The type of the cloud resource as `dynamodb`.

#### Optional parameters

### `.cloud_resources`

**Default value**: `[]`

**Type**: `map`

The cloud resources used in the environment are described by this parameter.
 
### `.cloud_resources[].params`

**Default value**: `[]`

**Type**: `list`

It describes parameters for cloud resources. 

## **Secrets block:**

#### Required parameters:

### `.secrets[].path`

**Default value**: `-`

**Type**: `str`

**Possible Options**: if  `.secrets[].type` will be:

- `vault`: `<vault-kv-path>`
- ` k8s: <secret-name>.<namespace> `

Secrets are located along this path.

### `.secrets[].env_name_prefix`

**Default value**: `-`

**Type**: `str`

**Possible Options**: environment variable prefix. Will be generated by this logic: `.secrets[].env_name_prefix_secret-key`

It is mandatory in `.mode: strict` and optional in `.mode: advanced`.

#### Optional parameters

### `.secrets`

**Default value**: `[]`

**Type**: `list`

It is necessary to provide secrets, stored in hashicorp `vault` or `k8s` secrets, mount to pod as environment variables.

### `.secrets[].type`

**Default value**: `vault&#124;k8s`

**Type**: `set str`

**Possible Options**: 	

Storage type:
- `vault` - to read secret data from vault.
- `k8s` - to read secret data from kubernetes secret.

It describes the type of the secrets.

## **Environment block:**

#### Required parameters:

### `.environment[].env_name`

**Default value**: `-`

**Type**: `str`

Commonly used as an environment name.

### `.environment[].value`

**Default value**: `-`

**Type**: `str`

Commonly used as an environment variable.

#### Optional parameters
### `.environment`

**Default value**: `[]`

**Type**: `list`

It provides availability to apply hardcoded environment variables to pod.

## **Internet-facing interface:**

#### Required parameters:

### `.external_api.base_domain`

**Default value**: `-`

**Type**: `str`

Commonly used as a base domain name.

### `.external_api.cors.enable_cors`

**Default value**: `false`

**Type**: `bool`

**Possible Options**: `true`

It enables CORS headers support.

### `.external_api.auth.sub_domain`

**Default value**: `-`

**Type**: `str`

It is necessary to specify sub-domain.

### `.external_api.headers[].header`

**Default value**: `""`

**Type**: `str`

**Possible Options**: `"Content-Type: text/html; charset=UTF-8"`

 HTTP's headers let the client and the server pass additional information with an HTTP request or response. 

#### Optional parameters
### `.external_api`

**Default value**: `{}`

**Type**: `map`

An external API's parameters are described in this block.

### `.external_api.base_url`

**Default value**: `_""_`

**Type**: `str`

It is necessary to specify base url, if applicable.

### `.external_api.sub_domain`

**Default value**: `""`

**Type**: `str`

It is necessary to specify sub-domain, if applicable.

### `.external_api.loadbalancer`

**Default value**: `aws_network`

**Type**: `set str`

**Possible Options**: `aws_network` - AWS Network.

A load balancer distributes incoming traffic across targets.

### `.external_api.protocol`

**Default value**: `tcp`

**Type**: `set str`

**Possible Options**:
- `tcp` - for TCP protocol
- `tls` - SSL terminated TCP protocol
- `udp` - for UDP protocol
- `tcp_udp` - double support TCP and UDP

It is currently available only `tcp` for `80` port and `tls` for `443` port.

### `.external_api.port`

**Default value**: `80,443`

**Type**: `set int`

It is currently available only values `80` or `443` or both.

### `.external_api.redirects`

**Default value**: `{}`

**Type**: `map`

Redirect rules accept a number of options to customize how the paths are matched and redirected.

### `.external_api.redirects.http2https`

**Default value**: `true`

**Type**: `bool`

An automatic redirect from HTTP to HTTPS protocol.

### `.external_api.cors`

**Default value**: `{}`

**Type**: `	map`

It is a browser security feature that restricts HTTP requests that are initiated from scripts running in the browser.

### `.external_api.cors.cors-allow-methods`

**Default value**: `*`

**Type**: `set str`

**Possible Options**: `GET, PUT, POST, DELETE, PATCH, OPTIONS`

The `Access-Control-Allow-Methods` response header specifies one or more methods allowed when accessing a resource in response to a preflight request. 

### `.external_api.cors.cors-allow-headers`

**Default value**: `*`

**Type**: `set str`

**Possible Options**: `DNT,X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization`

The `Access-Control-Allow-Headers` response header is used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request.

### `.external_api.cors.cors-allow-origin`

**Default value**: `*`

**Type**: `str`

**Possible Options**:
- `* ` - will be set domain from `Origin` request header or form `.external_api.base_domain`;
- `<domain-name>`- will always be set this domain.

The `Access-Control-Allow-Origin` response header indicates whether the response can be shared with requesting code from the given origin.

### `.external_api.cors.cors-allow-credentials`

**Default value**: `false`

**Type**: `bool`

The `Access-Control-Allow-Credentials` response header tells browsers whether to expose the response to the frontend code when the request's credentials mode is include.

### `.external_api.cors.cors-max-age`

**Default value**: `1728000`

**Type**: `int`

The `Access-Control-Max-Age` response header indicates how long the results of a preflight request (that is the information contained in the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers) can be cached.

### `.external_api.auth`

**Default value**: `{}`

**Type**: `map`

It enables authentication, based on ingress logic.

### `.external_api.auth.url`

**Default value**: `””`

**Type**: `str`

The `auth-url` command specifies the URL to the endpoint that authenticates user credentials.

### `.external_api.auth.type`

**Default value**: `vouch`

**Type**: `set str`

By default it is “vouch”, to integrate via vouch.

### `.external_api.headers[]`

**Default value**: `[]`

**Type**: `list`

This block describes `.external_api.headers[]` parameters.


### `.external_api.headers[].override`

**Default value**: `false`

**Type**: `bool`

**Possible Options**:
`true` - always override the same header;
`false` - set header, if it is not set only.

Override - is  receiving one method and interpreting another.

### `.external_api.regex`

**Default value**: `false`

**Type**: `bool`

**Possible Options**:
- `true` - for service, the regex rules will be applied based on the already set and specifically configured regex rules in Simloudfile.yaml. It could be a custom value that suits a customer's needs;
- `false` - service will be deployed without any regex rules and according to already specified configuration in URL path.

If you choose the `true` option - the `user-regex` parameter will be **true**.
If you choose the `false` option - the `user-regex` parameter will be **false**.

## **LAN facing interface:**
#### Required parameters:

### `.internal_api.base_domain`

**Default value**: `-`

**Type**: `str`

Commonly used as a base domain name.

### `.internal_api.headers[].header`

**Default value**: `””`

**Type**: `str`

HTTP headers let the client and the server pass additional information with an HTTP request or response. 

#### Optional parameters
### `.internal_api`

**Default value**: `{}`

**Type**: `map`

An internal API's parameters are described in this block.
 

### `.internal_api.base_url`

**Default value**: `""`

**Type**: `str`

It is necessary to specify base url, if applicable.

### `.internal_api.sub_domain`

**Default value**: `””`

**Type**: `str`

It is necessary to specify sub-domain, if applicable.

### `.internal_api.loadbalancer`

**Default value**: `aws_network`

**Type**: `set str`

**Possible Options**: `aws_network` - AWS Network.

A load balancer distributes incoming traffic across targets for internal api.

### `.internal_api.protocol`

**Default value**: `tcp`

**Type**: `set str`

**Possible Options**:
- `tcp` - for TCP protocol
- `tls` - SSL terminated TCP protocol
- `udp` - for UDP protocol
- `tcp_udp` - double support TCP and UDP

It is currently available only `tcp` for `80` port and `tls` for `443` port.

### `.internal_api.port`

**Default value**: `80,443`

**Type**: `set int`

It is currently available only values `80` or `443` or both.

### `.internal_api.headers[]`

**Default value**: `[]`

**Type**: `list`

This block describes `.internal_api.headers[]` parameters.

### `.internal_api.headers[].override`

**Default value**: `true`

**Type**: `bool`

**Possible Options**:
- `true` - always override the same header;
- `false` - set header, if it is not set only.

Override is – receiving one method and interpreting another.

### `.internal_api.regex`

**Default value**: `false`

**Type**: `bool`

**Possible Options**:
- `true` - for service, the regex rules will be applied based on the already set and specifically configured regex rules in Simloudfile.yaml. It could be a custom value that suits a customer's needs;
- `false` - service will be deployed without any regex rules and according to already specified configuration in URL path.


## **Service block:**

#### Required parameters:

### `.service`

**Default value**: `{}`

**Type**: `map`

This block describes the services parameters. 


### `.service.name`

**Default value**: `-`

**Type**: `str`

The name of the service.

### `.service.options.sidecars.vault.enable`

**Default value**: `false`

**Type**: `bool`

**Possible Options**:
- enable;
- disable.

 Allows to dynamically inject vault agent as sidecar container and seamlessly fetch secrets from Vault.

### `.service.options.sidecars.consul.enable`
**Default value**: `false`

**Type**: `bool`

**Possible Options**:
- enable;
- disable.

Consul sidecar can be automatically injected into pods in your cluster, making configuration for Kubernetes automatic

### `.service.options.timeouts.job_execute`
**Default value**: `3600`

**Type**: `	int`

Job spec execution timeout in sec.

### `.service.options.job.shell_command`
**Default value**: `””`

**Type**: `str`

It is necessary to specify default shell command.

#### Optional parameters
### `.service.namespace`

**Default value**: `default`

**Type**: `str`

The namespace where the service is located.

### `.service.type`

**Default value**: `ClusterIP`

**Type**: `	set str`

Type of the service.

### `.service.annotations`

**Default value**: `{}`

**Type**: `	map`


### `.service.servicePort`
**Default value**: `80`

**Type**: `int`

Service is running on this port.

### `.service.podPort`

**Default value**: `80`

**Type**: `int`

Service pod is running on this port.

### `.service.specType`

**Default value**: `deployment`

**Type**: `set str`

**Possible Options**: `deployment, job, cronjob, replicasets, daemonset, statefulset`

Spectype of the deployment.

### `.service.options`

**Default value**: `{}`

**Type**: `map`



### `.service.options.sidecars`

**Default value**: `{}`

**Type**: `map`

### `.service.options.sidecars.vault`

**Default value**: `{}`

**Type**: `map`

Specifed additional options for using sidecars.

### `.service.options.sidecars.vault.policy`

**Default value**: `default-app`

**Type**: `str`

It is mandatory, if `.service.options.sidecars.vault_hcl` present.

### `.service.options.sidecars.vault.hcl`

**Default value**: `””`

**Type**: `str`

File with ACL policy body. Path is relative to current `simloudfile.yaml` folder.

### `.service.options.sidecars.consul`

**Default value**: `{}`

**Type**: `map`

Specifed additional options for using sidecars.

### `.service.options.sidecars.consul.policy`

**Default value**: `default-app`

**Type**: `str`

It is mandatory, if `.service.options.sidecars.consul_hcl` present.  Default consul acl policy name.

### `.service.options.sidecars.consul.hlc`

**Default value**: `""`

**Type**: `str`

File with ACL policy body. Path is relative to current `simloudfile.yaml` folder.

### `.service.options.timeouts`

**Default value**: `{}`

**Type**: `map`

Timeout option allows you to set the global timeout for job.

### `.service.options.job`

**Default value**: `{}`

**Type**: `map`

Applicable only for job/cronjob type.

### `.service.options.job.cron`

**Default value**: `*/1 * * * *`

**Type**: `str`

Used only for cronjob type.

### `.service.options.job.cron_concurrency`
**Default value**: `Allow`

**Type**: `set str`

**Possible Options**:
- `Allow`
- `Forbid`
- `Replace`

Enable cron jobs concurrency: `Allow/Forbid/Replace`.

### `.service.options.job.cron_suspend`
**Default value**: `false`

**Type**: `bool`

 If it is set to true, all subsequent executions are suspended.

### `.service.options.job.cron_backoffLimit`
**Default value**: `4`

**Type**: `int`

To specify the number of retries before considering a Job as failed.

### `.service.options.job.cron_completions`
**Default value**: `1`

**Type**: `int`
Allows to use and configure specific conditions for cron job.

### `.service.options.job.cron_parallelism`
**Default value**: `1`

**Type**: `int`
Allows using and configure specific conditions for cron job.


## **Kubernetes oriented Spec block:**

#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`. It is used for for k8s service.

### `.spec.pod`

**Default value**: `{}`

**Type**: `map`

This block describes parameters of spec pod.

### `.spec.pod.name`

**Default value**: `-`

**Type**: `str`

If it is not set, will be same with .service.name.

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

Disk mount point, default "/" root.

### `.spec.pod.containers[].resources.disks[].className`
**Default value**: `gp2`

**Type**: `	str`

**Possible Options**: pvc class name

PVC className ( possible any active in k8s class name ).

### `.spec.pod.containers[].resources.disks[].AccessModes[]`
**Default value**: `{}`

**Type**: `list`

**Possible Options**:

The access modes are:
- **ReadWriteOnce** - the volume can be mounted as read-write by a single node. ReadWriteOnce access mode still can allow multiple pods to access the volume when the pods are running on the same node.
- **ReadOnlyMany** - the volume can be mounted as read-only by many nodes.
- **ReadWriteMany** - the volume can be mounted as read-write by many nodes.
- **ReadWriteOncePod** - the volume can be mounted as read-write by a single Pod. Use ReadWriteOncePod access mode if you want to ensure that only one pod across the whole cluster can read that PVC or write to it. This is only supported for CSI volumes and Kubernetes version 1.22+. [Persistent Volumes.](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)

 Pvc access modes. As default value should be **ReadWriteOnce**.

### `.spec.pod.containers[].resources.health_check.readinessProbe{}`
**Default value**: `-`

**Type**: `various`

It is used to control the readiness of the pod to work. Failing readiness probe will stop application from serving traffic.

### `.spec.pod.containers[].resources.health_check.livenessProbe{}`
**Default value**: `-`

**Type**: `	various`

It is used to control the workability of pod. Failing liveness probe will restart the container.

### `.spec.pod.containers[].resources.health_check.startupProbe{}`
**Default value**: `-`

**Type**: `various`

Should be specified proper conditions for health-check probe.

#### Optional parameters
### `.spec.pod.terminationGracePeriodSeconds`

**Default value**: `300`

**Type**: `	int`

Could be configured specific value for grace period of termination.


### `.spec.pod.replicas`

**Default value**: `1`

**Type**: `int`

The deployment creates a ReplicaSet that creates replicated pods, indicated by the `.spec.pod.replicas` field.

### `.spec.pod.strategy`

**Default value**: `{}`

**Type**: `	map`

This pod describes the pod's strategy.

### `.spec.pod.strategy.type`
**Default value**: `Recreate`

**Type**: `set str`

**Possible Options**:
- `RollingUpdate`
- `Recreate`

The type of strategy. 

### `.spec.pod.strategy.rollingUpdate`

**Default value**: `{}`

**Type**: `map`

By  default is empty.

### `.spec.pod.strategy.rollingUpdate.maxSurge`

**Default value**: `1`

**Type**: `int`

The number of pods that can be created above the desired amount of pods during an update.

### `.spec.pod.strategy.rollingUpdate.maxUnavailable`

**Default value**: `25%`

**Type**: `int/str`

The number of pods that can be unavailable during the update process.

### `.spec.pod.hascaler`

**Default value**: `{}`

**Type**: `map`

This block describes the hascaler parameters.

### `.spec.pod.hascaler.enabled`

**Default value**: `false`

**Type**: `bool`

Indicates whether hascaler is enabled or disabled.

### `.spec.pod.hascaler.min`

**Default value**: `1`

**Type**: `int`

The minimum value of hascaler.

### `.spec.pod.hascaler.max`

**Default value**: `10`

**Type**: `int`

The maximum value of hascaler.

### `.spec.pod.hascaler.cpu_percent`

**Default value**: `80`

**Type**: `int`

Provides possibility for automatically scaling pods with the horizontal pod autoscaler when cpu is set to specific value.


### `.spec.pod.containers[]`

**Default value**: `[]`

**Type**: `list`

This block describes an information about containers.


### `.spec.pod.containers[].name`

**Default value**: `-`

**Type**: `str`

The value will be the same if it is not set, if more than one container is used, the number will be added, for example: `my-service-0,` or `my-service-1`.

### `.spec.pod.containers[].image`

**Default value**: `-`

**Type**: `str`

**Possible Options**: set custom pod container image (override)

### `.spec.pod.containers[].imagePullSecrets`

**Default value**: `[]`

**Type**: `list`

**Possible Options**: set custom pod container image pull secret name(s). More information [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials).

### `.spec.pod.containers[].lifecycle`

**Default value**: `{}`

**Type**: `map`
Describes the lifecycle of a Pod. 
Pods follow a defined lifecycle, starting in the `Pending` phase, moving through `Running` if at least one of its primary containers starts OK, and then through either the `Succeeded` or `Failed` phases depending on whether any container in the Pod terminated in failure.


### `.spec.pod.containers[].lifecycle.preStop`
**Default value**: `{}`

**Type**: `map`

This hook is called immediately before a container is terminated due to an API request or management event such as a liveness/startup probe failure, preemption, resource contention and others.

### `.spec.pod.containers[].lifecycle.preStop.exec`

**Default value**: `{}`

**Type**: `map`

### `.spec.pod.containers[].lifecycle.preStop.exec.command`
**Default value**: `-`

**Type**: `list(str)`

### `.spec.pod.containers[].resources`
**Default value**: `{}`

**Type**: `map`

Resources that should be specified directly for container usage.


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

**Possible Options**: Fractional requests are allowed. When you define a container with `spec.containers[].resources.requests.cpu` set to `0.5`, you are requesting half as much CPU time compared to if you asked for `1.0` CPU. For CPU resource units, the quantity expression `0.1` is equivalent to the expression `100m`, which can be read as "one hundred millicpu". Some people say "one hundred milli-cores", and this is understood to mean the same thing.

### `.spec.pod.containers[].resources.requests.ephemeral-storage`
**Default value**: `-`

**Type**: `str`

**Possible Options**: Limits and requests for `ephemeral-storage` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

### `.spec.pod.containers[].resources.limits`
**Default value**: `{}`

**Type**: `map`

This block describes limits for memory, cpu and  ephemeral-storage.

### `.spec.pod.containers[].resources.limits.memory`
**Default value**: `-`

**Type**: `str`

**Possible Opti.service.options.sidecars.vault.enableons**: Limits and requests for `memory` are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these quantity suffixes: E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

This block describes limits for memory.

### `.spec.pod.containers[].resources.limits.cpu`
**Default value**: `-`

**Type**: `	float/str`

**Possible Options**: Fractional requests are allowed. When you define a container with `spec.containers[].resources.requests.cpu` set to `0.5`, you are requesting half as much CPU time compared to if you asked for `1.0 `CPU. For CPU resource units, the quantity expression `0.1 `is equivalent to the expression `100m`, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.

This block describes limits for cpu.

### `.spec.pod.containers[].resources.limits.ephemeral-storage`
**Default value**: `-`

**Type**: `str`

**Possible Options:**: Limits and requests for `ephemeral-storage` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.

This block describes limits for ephemeral-storage.

### `.spec.pod.containers[].resources.health_check`
**Default value**: `{}`

**Type**: `map`

It helps to be sure is pod work or not.

### `.spec.pod.containers[].resources.health_check.readinessProbe`

**Default value**: `{}`

**Type**: `map`

It is used to control the readiness of the pod to work. Failing readiness probe will stop application from serving traffic.

### `.spec.pod.containers[].resources.health_check.livenessProbe`

**Default value**: `{}`

**Type**: `map`

It is used to control the workability of pod. Failing liveness probe will restart the container

### `.spec.pod.containers[].resources.health_check.startupProbe`

**Default value**: `{}`

**Type**: `map`

## **Lambda / APIGW oriented Spec block:**
#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`, if it is not used.

#### Optional parameters
### `.spec{}`

**Default value**: `-`

**Type**: `various`

For lambda mutually exclusive with above, see more in [AWS doc.](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.create_function)



## **Frontend / External service oriented Spec block:**
#### Required parameters:

### `.spec`

**Default value**: `{}`

**Type**: `map`

It should be present, but empty `{}`, if it is not used.



## Examples of SimloudFile.yaml v2:

- [**_Front-end deployment mode_**](/en/front-end-deployment-mode)
- [**_Lambda deployment mode_**](/en/lambda-deployment-mode)
- [**_Kubernetes deployment mode_**](/en/kubernetes-deployment-mode)






