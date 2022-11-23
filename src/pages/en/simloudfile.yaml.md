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

 ## **Annotation block:**
| Parameter |     Default value      |   Type    | M/O |                                                                                                                                                                           Variants                                                                                                                                                                            | Remarks                                                                                                                  |
|:---------:|:----------------------:|:---------:|:---:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------|
| .version  |         ``v2``         |    str    |  M  |                                                                                                                                                                    ``v2`` - Only available                                                                                                                                                                    | from version v2, mandatory parameter <br/> ``v0`` , ``v1`` or empty, back compatible mode. details in **?!!?** document. |
|   .kind   | ``simloud-deployment`` | const str |  M  |                                                                                                                                                                    ``simloud-deployment``                                                                                                                                                                     |                                                                                                                          |
|   .name   |   ``.service.name``    |    str    |  O  |                                                                                                                                                                                                                                                                                                                                                               | "Optional", if empty, will same with ``.service.name``                                                                   | 
|   .type   |         ``-``          |  set str  |  M  | -  ``kubernetes`` - deployment services as k8s service, any type. <br/> - ``apigw``  or ``serverless`` - deployment, using API GW solution, for example: lambda functions <br/> - ``external`` or ``front-end`` - deployment, using k8s external service solution, for example: frontend on s3 bucket <br/> - ``pipeline`` - Simloud pipeline execution, only | in ``advanced`` mode, prefix parameter: ``env_name_prefix`` is not mandatory                                             |
|   .mode   |       ``strict``       |  set str  |  O  |                                                                                                                                  - ``strict`` - Strict syntax validation. <br/> - ``advanced`` - Advanced syntax validation                                                                                                                                   |                                                                                                                          |
|  .image   |         ``””``         |    str    |  O  |                                                                                                                                                         Send to jenkins as ``SLAVE_IMAGE`` parameter.                                                                                                                                                         | Depricated<br/> alias from ``.cicd.image``                                                                               |



## **Cloud Resources block:**

|             Parameter              | Default value | Type | M/O | Variants | Remarks |
|:----------------------------------:|:-------------:|:----:|:---:|:--------:|:-------:|
|          .cloud_resources          |    ``[]``     | map  |  O  |          |         |
|      .cloud_resources[].name       |     ``-``     | str  |  M  |          |         |
| .cloud_resources[].env_name_prefix |     ``-``     | str  |  M  |          |         |
|      .cloud_resources[].type       |     ``-``     | str  |  M  |          |         |
|     .cloud_resources[].params      |    ``[]``     | list |  O  |          |         |

## **Secrets block:**
|         Parameter          |   Default value    |  Type   |             M/O              | Variants                                                                                                                       | Remarks                                                                                          |
|:--------------------------:|--------------------|---------|:----------------------------:|:-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
|          .secrets          |       ``[]``       |  list   |              O               |                                                                                                                                | Provide secrets, stored in hashicorp vault or k8s secrets, mount to pod as environment variables |
|      .secrets[].path       |       ``-``        |   str   |              M               | if ``.secrets[].type`` will be:<br/> - vault: ``<vault-kv-path>`` <br/> - k8s: ``<secret-name>.<namespace>``                   |                                                                                                  |
| .secrets[].env_name_prefix |       ``-``        |   str   | M - strict<br/> O - advanced | environment variable prefix. will be generated by this logic: <br/> ``.secrets[].env_name_prefix_secret-key``                  | Mandatory in ``.mode`` : ``strict`` <br/> Optional in ``.mode`` : ``advanced``                   |
|      .secrets[].type       | ``vault&#124;k8s`` | set str |              O               | Storage type: <br/>  - ``vault`` - to read secret data from vault <br/> - ``k8s`` - to read secret data from kubernetes secret |                                                                                                  | 


## **Environment block:**

| Parameter               | Default value | Type | M/O | Variants | Remarks                                                           |
|-------------------------|---------------|------|-----|----------|-------------------------------------------------------------------|
| .environment            | ``[]``        | list | O   |          | Provide availability apply hardcoded environment variables to pod |
| .environment[].env_name | ``-``         | str  | M   |          | Environment name                                                  |
| .environment[].value    | ``-``         | str  | M   |          | Environment variable                                              |


## **Internet facing interface:**
| Parameter                                 | Default value   | Type        | M/O | Variants                                                                                                                                                                                          | Remarks                                                                       |  
|-------------------------------------------|-----------------|-------------|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| .external_api                             | ``{}``          | ``map``     | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.base_url                    | ``””``          | ``str``     | O   |                                                                                                                                                                                                   | Base url, if applicable                                                       |
| .external_api.sub_domain                  | ``””``          | ``str``     | O   |                                                                                                                                                                                                   | Subdomain, if applicable                                                      |
| .external_api.base_domain                 | ``-``           | ``str``     | M   |                                                                                                                                                                                                   | Base domain name                                                              |
| .external_api.loadbalancer                | ``aws_network`` | ``set str`` | O   | ``aws_network`` - AWS Network                                                                                                                                                                     |                                                                               |
| .external_api.protocol                    | ``tcp``         | ``set str`` | O   | - ``tcp - for TCP protocol`` <br/> - ``tls`` - SSL terminated TCP protocol <br/> - ``udp`` - for UDP protocol <br/> - ``tcp_udp`` - double support TCP and UDP                                    | Currently available only ``tcp`` for ``80`` port and ``tls`` for ``443`` port |
| .external_api.port                        | ``80,443``      | ``set int`` | O   |                                                                                                                                                                                                   | Currently available only values ``80`` or ``443`` or both                     |
| .external_api.redirects                   | ``{}``          | ``map``     | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.redirects.http2https        | ``true``        | ``bool``    | O   |                                                                                                                                                                                                   | Automatic redirect from ``HTTP`` to ``HTTPS`` protocol                        |
| .external_api.cors                        | ``{}``          | ``map``     | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.cors.enable_cors            | ``false``       | ``bool``    | M   | - ``true``                                                                                                                                                                                        | Enable ``CORS`` headers support                                               |
| .external_api.cors.cors-allow-methods     | ``*``           | ``set str`` | O   | - ``GET, PUT, POST, DELETE, PATCH, OPTIONS``                                                                                                                                                      |                                                                               |
| .external_api.cors.cors-allow-headers     | ``*``           | ``set str`` | O   | - ``DNT,X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization``                                                                 |                                                                               |
| .external_api.cors.cors-allow-origin      | ``*``           | ``str``     | O   | - ``*`` - will be set domain from ``Origin`` request header, or form ``.external_api.base_domain`` <br/> - ``<domain-name>`` - always will be set this domain                                     |                                                                               |
| .external_api.cors.cors-allow-credentials | ``false``       | ``bool``    | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.cors.cors-max-age           | ``1728000``     | ``int``     | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.auth                        | ``{}``          | ``map``     | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.auth.url                    | ``””``          | ``str``     | O   |                                                                                                                                                                                                   | Enable authentication, base on ingress logic                                  |
| .external_api.auth.sub_domain             | ``-``           | ``str``     | M   |                                                                                                                                                                                                   |                                                                               |
| .external_api.auth.type                   | ``vouch``       | ``set str`` | O   | - ``vouch`` - enable vouch-proxy support <br/> - ``keycloak`` - enable keycloak support <br/> - ``base`` - enable http basic authentication support                                               |                                                                               |
| .external_api.headers[]                   | ``[]``          | ``list``    | O   |                                                                                                                                                                                                   |                                                                               |
| .external_api.headers[].header            | ``""``          | ``str``     | M   | example: ``"Content-Type: text/html; charset=UTF-8"``                                                                                                                                             |                                                                               |
| .external_api.headers[].override          | ``false``       | ``bool``    | O   | ``true`` - always override same header; <br/> ``false`` - set header, if is not set only                                                                                                           |                                                                               |
| .external_api.regex                       | ``false``       | ``bool``    | O   | ``true`` - full control over the format in which url is configured; <br/> ``false`` - default regex configuration was provided end equals the following <br/> configuration as if entered by hand. |  

## **LAN facing interface:**
| Parameter                        | Default value   | Type        | M/O | Variants                                                                                                                                                       | Remarks                                                                       |  
|----------------------------------|-----------------|-------------|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| .internal_api                    | ``{}``          | ``map``     | O   |                                                                                                                                                                |                                                                               |
| .internal_api.base_url           | ``””``          | ``str``     | O   |                                                                                                                                                                |                                                                               |
| .internal_api.sub_domain         | ``””``          | ``str``     | O   |                                                                                                                                                                |                                                                               |
| .internal_api.base_domain        | ``-``           | ``str``     | M   |                                                                                                                                                                |                                                                               |
| .internal_api.loadbalancer       | ``aws_network`` | ``set str`` | O   | ``aws_network`` - AWS Network                                                                                                                                  |                                                                               |
| .internal_api.protocol           | ``tcp``         | ``set str`` | O   | - ``tcp`` - for TCP protocol <br/> - ``tls`` - SSL terminated TCP protocol <br/> - ``udp`` - for UDP protocol <br/> - ``tcp_udp`` - double support TCP and UDP | Currently available only ``tcp`` for ``80`` port and ``tls`` for ``443`` port |
| .internal_api.port               | ``80,443``      | ``set int`` | O   |                                                                                                                                                                | Currently available only values ``80`` or ``443`` or both                     |
| .internal_api.headers[]          | ``[]``          | ``list``    | O   |                                                                                                                                                                |                                                                               |
| .internal_api.headers[].header   | ``""``          | ``str``     | M   | example: ``"Content-Type: text/html; charset=UTF-8"``                                                                                                          |                                                                               |
| .internal_api.headers[].override | ``true``        | ``bool``    | O   | - ``true`` - always override same header; <br/> - ``false`` - set header, if is not set only                                                                   |                                                                               |

## **Service block:**
| Parameter                               | Default value   | Type         | M/O | Variants                                                            | Remarks                                                                              |  
|-----------------------------------------|-----------------|--------------|-----|---------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| .service                                | ``{}``          | ``map``      | M   |                                                                     |                                                                                      |
| .service.name                           | ``-``           | ``str``      | M   |                                                                     |                                                                                      |
| .service.namespace                      | ``default``     | ``str``      | O   |                                                                     |                                                                                      |
| .service.type                           | ``ClusterIP``   | ``set str``  | O   |                                                                     |                                                                                      |
| .service.annotations                    | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.servicePort                    | ``80``          | ``int``      | O   |                                                                     |                                                                                      |
| .service.podPort                        | ``80``          | ``int``      | O   |                                                                     |                                                                                      |
| .service.specType                       | ``deployment``  | ``set str``  | O   | - ``deployment, job, cronjob, replicasets, daemonset, statefulset`` |                                                                                      |
| .service.options                        | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.options.sidecars               | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.options.sidecars.vault         | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.options.sidecars.vault.enable  | ``false``       | ``bool``     | M   | - ``enable`` <br/> - ``disable``                                    |                                                                                      |
| .service.options.sidecars.vault.policy  | ``default-app`` | ``str``      | O   |                                                                     | Mandatory, if ``.service.options.sidecars.vault_hcl`` present                        |
| .service.options.sidecars.vault.hcl     | ``””``          | ``str``      | O   |                                                                     | File with ACL policy body. Path is relative from current ``simloudfile.yaml`` folder |
| .service.options.sidecars.consul        | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.options.sidecars.consul.enable | ``false``       | ``bool``     | M   | - ``enable`` <br/> - ``disable``                                    |                                                                                      |
| .service.options.sidecars.consul.policy | ``default-app`` | ``str``      | O   |                                                                     | Mandatory, if ``.service.options.sidecars.consul_hcl`` present                       |
| .service.options.sidecars.consul.hlc    | ``""``          | ``str``      | O   |                                                                     | File with ACL policy body. Path is relative from current ``simloudfile.yaml`` folder |
| .service.options.timeouts               | ``{}``          | ``map``      | O   |                                                                     |                                                                                      |
| .service.options.timeouts.job_execute   | ``3600``        | ``int``      | M   |                                                                     | Job spec execution timeout in sec.                                                   |
| .service.options.job                    | ``{}``          | ``map``      | O   |                                                                     | Applicable only for job/cronjob type                                                 |
| .service.options.job.shell_command      | ``””``          | ``str``      | M   |                                                                     | Default shell command                                                                |
| .service.options.job.cron               | ``*/1 * * * *`` | ``str``      | O   |                                                                     | Only for cronjob type                                                                |
| .service.options.job.cron_concurrency   | ``Allow``       | ``set str``  | O   | - ``Allow`` <br/> - ``Forbid`` <br/> - ``Replace``                  |                                                                                      |
| .service.options.job.cron_suspend       | ``false``       | ``bool``     |     |                                                                     |                                                                                      |
| .service.options.job.cron_backoffLimit  | ``4``           | ``int``      |     |                                                                     |                                                                                      |
| .service.options.job.cron_completions   | ``1``           | ``int``      |     |                                                                     |                                                                                      |
| .service.options.job.cron_parallelism   | ``1``           | ``int``      |     |                                                                     |                                                                                      |

## **Kubernetes oriented Spec block:**
| Parameter                                                      | Default value | Type          | M/O | Variants                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Remarks                                                                                                                                                                       |  
|----------------------------------------------------------------|---------------|---------------|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| .spec                                                          | ``{}``        | ``map``       | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Should be present, but empty ``{}``, is is not used                                                                                                                           |
| .spec.pod                                                      | ``{}``        | ``map``       | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.name                                                 | ``-``         | ``str``       | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.terminationGracePeriodSeconds                        | ``300``       | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.replicas                                             | ``1``         | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.strategy                                             | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.strategy.type                                        | ``Recreate``  | ``set str``   | O   | ``RollingUpdate``                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                               |
| .spec.pod.strategy.rollingUpdate                               | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default empty                                                                                                                                                                 |
| .spec.pod.strategy.rollingUpdate.maxSurge                      | ``1``         | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The number of pods that can be created above the desired amount of pods during an update                                                                                      |
| .spec.pod.strategy.rollingUpdate.maxUnavailable                | ``25%``       | ``int/str``   | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The number of pods that can be unavailable during the update process                                                                                                          |
| .spec.pod.hascaler                                             | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.hascaler.enabled                                     | ``false``     | ``bool``      | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.hascaler.min                                         | ``1``         | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.hascaler.max                                         | ``10``        | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.hascaler.cpu_percent                                 | ``80``        | ``int``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[]                                         | ``[]``        | ``list``      | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].name                                    | ``-``         | ``str``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | if is not set, will be same with .service.name, if used nore that one container, will be add number, for example: my-service-0, or my-service-1                               |
| .spec.pod.containers[].image                                   | ``-``         | ``str``       | O   | set custom pod container image ( override )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                               |
| .spec.pod.containers[].imagePullSecrets                        | ``[]``        | ``list``      | O   | set custom pod container image pull secret name(s)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | more information: <a href="https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials">Persistent Volumes</a> |
| .spec.pod.containers[].lifecycle                               | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].lifecycle.preStop                       | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].lifecycle.preStop.exec                  | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].lifecycle.preStop.exec.command          | ``-``         | ``list(str)`` | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources                               | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[]                       | ``[]``        | ``list``      | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[].name                  | ``-``         | ``str``       | M   | pvc name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[].size                  | ``8G``        | ``str``       | M   | You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[].mount                 | ``/data``     | ``str``       | M   | mount point                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[].className             | ``gp2``       | ``str``       | M   | pvc class name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                               |
| .spec.pod.containers[].resources.disks[].AccessModes[]         | ``{}``        | ``list``      | M   | The access modes are: <br/> **ReadWriteOnce** - the volume can be mounted as read-write by a single node. ReadWriteOnce access mode still can allow multiple pods to access the volume when the pods are running on the same node. <br/> **ReadOnlyMany** - the volume can be mounted as read-only by many nodes. <br/> **ReadWriteMany** - the volume can be mounted as read-write by many nodes. <br/> **ReadWriteOncePod** - the volume can be mounted as read-write by a single Pod. Use ReadWriteOncePod access mode if you want to ensure that only one pod across whole cluster can read that PVC or write to it. **This is only supported for CSI volumes and Kubernetes version 1.22+.** <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes">Persistent Volumes</a> | default should be **ReadWriteOnce**                                                                                                                                           |
| .spec.pod.containers[].resources.requests                      | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.requests.memory               | ``-``         | ``str``       | O   | Limits and requests for memory are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these <a href="https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/quantity/">quantity</a>  suffixes: E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                               |
| .spec.pod.containers[].resources.requests.cpu                  | ``-``         | ``float/str`` | O   | Fractional requests are allowed. When you define a container with ``spec.containers[].resources.requests.cpu`` set to ``0.5``, you are requesting half as much CPU time compared to if you asked for ``1.0`` CPU. For CPU resource units, the <a href="https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/quantity/">quantity</a> expression ``0.1`` is equivalent to the expression ``100m``, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.                                                                                                                                                                                                                                                        |                                                                                                                                                                               |
| .spec.pod.containers[].resources.requests.ephemeral-storage    | ``-``         | ``str``       | O   | Limits and requests for ``ephemeral-storage`` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                               |
| .spec.pod.containers[].resources.limits                        | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.limits.memory                 | ``-``         | ``str``       | O   | Limits and requests for ``memory`` are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these <a href="https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/quantity/">quantity</a> suffixes: E, P, T, G, M, k. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                               |
| .spec.pod.containers[].resources.limits.cpu                    | ``-``         | ``float/str`` | O   | Fractional requests are allowed. When you define a container with spec.containers[].resources.requests.cpu set to 0.5, you are requesting half as much CPU time compared to if you asked for 1.0 CPU. For CPU resource units, the quantity expression 0.1 is equivalent to the expression 100m, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                               |
| .spec.pod.containers[].resources.limits.ephemeral-storage      | ``-``         | ``str``       | O   | Limits and requests for ``ephemeral-storage`` are measured in byte quantities. You can express storage as a plain integer or as a fixed-point number using one of these suffixes: E, P, T, G, M, K. You can also use the power-of-two equivalents: Ei, Pi, Ti, Gi, Mi, Ki.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check                  | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.readinessProbe   | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.readinessProbe{} | ``-``         | ``various``   | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.livenessProbe    | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.livenessProbe{}  | ``-``         | ``various``   | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.startupProbe     | ``{}``        | ``map``       | O   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |
| .spec.pod.containers[].resources.health_check.startupProbe{}   | ``-``         | ``various``   | M   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                               |


## **Lambda / APIGW oriented Spec block:**
| Parameter  | Default value | Type        | M/O | Variants | Remarks                                                                                                                                                                                           |  
|------------|---------------|-------------|-----|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| .spec      | ``{}``        | ``map``     | M   |          | Should be present, but empty ``{}``, if is not used                                                                                                                                               |
| .spec{}    | ``-``         | ``various`` | O   |          | For lambda mutually exclusive with above, see more in  <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.create_function">AWS doc</a> |


## **Frontend / External service oriented Spec block:**
| Parameter | Default value | Type    | M/O | Variants | Remarks                             |  
|-----------|---------------|---------|-----|----------|-------------------------------------|
| .spec     | ``{}``        | ``map`` | M   |          | Should be present, but empty ``{}`` |



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
[Download Simloudfilefork8s.yaml for k8s](/files/SImloudfilefork8s.yaml)



