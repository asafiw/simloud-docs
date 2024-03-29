---
title: simloud-pipeline.yaml
description: simloud-pipeline.yaml
layout: ../../layouts/MainLayout.astro
---

#### Configuration file for pipeline with possibility To deploy Terraform code

### Full `simloud-pipeline.yaml` file

```yaml
version: v1                                          # @v5.0
kind: simloud-pipeline

pipeline:
  default:                                          # profile name. Currently, only default
    - hook: (preprocess|process|postprocess)        # default “process”. No hooke
      state: (build|update|create|destroy)          # by default, it is “build” value. It is available to  choose “build,update,create,destroy”
      action: (deploy|destroy).                     # by default, it is “deploy” value.  It is available to choose “deploy,destroy”

      stages:
        # === Terraform ===
        - name: “TF code”
          shell: terraform                            # for terraform case
          homedir: ./                                 # shell command directory
          terraform:
            version: 0.12                             # tf version, by default 0.12
            workspace: `name_of_workspace`;           # Workspace’s name. Default workspace: default
            statefile:                                # state file location
              storage: (file|kubernetes)              # by default it is “kubernetes” (k8s)
              location: /terraform/uuid/              # k8s: <namespace>.<secret_suffix>
            secrets:                                  # `-var-file="testing.tfvars"`
              - storage: (vault|kubernetes)           # vault or k8s secrets
                paths:                                # vault pats, or k8s secrets names
                  - /secrets/<srn:deployment>/sqs     # vault full location path
                  - /ssh/<srn:deployment>/ssh
                  - default.sqs                       # k8s secret: <namespace>.<secretname>
                  - kube-system.ssh-keys
            variables:                                # `-var-file="testing.tfvars"`
              - storage: (kubernetes|file)            # k8s configmap, local files
                paths:
                  - simloud.profile                   # k8s configmap: <namespace>.<configmap>
                  - ./variable.tfvars                 # local file location
                  - keys:
                key1: value
                key2: balue

        # === SHELL: SH, BASH, ZSH ===
        - shell: (sh|bash|zsh)                       # “bash” by default ( optional )
          args: []                                   # shell arguments ( optional )
          homedir: ./                                # shell command default folder ( optional )
          scripts:                                   # for “sh,bash,zsh” shells only
            - echo “hello!”

```
[Download simloud-pipeline.yaml](/files/Simloud-pipeline.yaml)

>NOTE: in order to deploy simloud-pipeline.yaml file as part of your configuration, you will need to deploy the files from the page ["simloud-pipeline.yaml examples"](/en/simloud-pipeline-examples).

## **Annotations block:**

#### Required parameters

### `.version`

**Default value**: `v2`

**Type**: `str`

`v2` - Only available. From version v2, it is a mandatory parameter. <br /> `v0` , `v1` or empty, back compatible mode.


### `.kind`

**Default value**: `simloud-pipeline`

**Type**: `const str`

#### Optional parameters

### `.image`

**Default value**: `””`

**Type**: `str`

**Possible Options**:  Send to Jenkins as `SLAVE_IMAGE` parameter.

Deprecated alias from `.cicd.image`.

## **Pipeline block:**

#### Required parameters
### `.pipeline.default[].stages`

**Default value**: `{}`

**Type**: `map`

This parameter describes stages block.

#### Optional parameters

### `.pipeline`

**Default value**: `{}`

**Type**: `map`

This parameter describes pipeline block.

### `.pipeline.default`

**Default value**: `[]`

**Type**: `list`

**Possible Options**:  Simloud profile name.

Currently, only `default` value is available for  `$SIMLOUD_PIPELINE_PROFILE` variable.

### `.pipeline.default[].state`

**Default value**: `build`

**Type**: `set str`

**Possible Options**: 
- `build` - used for build ( CI ) process
- `create` - used for the 1st time deploy process
- `update` - used for redeploy process
- `destroy` - used for destroy process

This parameter describes all possible options for the pipeline state.
`$SIMLOUD_PIPELINE_STATE` variable contains information about the current state of the pipeline

### `.pipeline.default[].action`

**Default value**: `deploy`

**Type**: `set str`

**Possible Options**:

- `deploy` - deploy action
- `destroy` - destroy action

This parameter describes all possible actions for the pipeline state.
`$SIMLOUD_PIPELINE_ACTION` variable contains information about the current action of the pipeline

### How to deploy pipeline

To deploy **`git-pipeline`** repository:
1. It is necessary to add <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a> repository on <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>. 

2. Please, follow the instruction in documentation ["Add new git repositories"](/en/getting-started#add-new-git-repositories-services) for more information.
3. Once you have added the repository to the portal, you can start creating your deployment using Simloud Portal. Please, follow the instruction in documentation ["How to create deployment using Simloud portal"](/en/create-deployment).
4. When choosing the repositories to deploy, you must select `git-pipeline` repository that you added to the portal.
 ![](/img/simloud-pipeline/1.jpg)

To deploy **`git-terraform`** repository:
1. It is necessary to add <a href="https://gitlab.com/simloud-demo/git-terraform" target="_blank">git-terraform</a> repository on <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>. Please, follow the instruction in documentation ["Add new git repositories"](/en/getting-started#add-new-git-repositories-services) for more information.
2. Once you have added the repository to the portal, you can start creating your deployment using Simloud Portal. Please, follow the instruction in documentation ["How to create deployment using Simloud portal"](/en/create-deployment).
3. When choosing the repositories to deploy, you must select `git-terraform` repository that you added to the portal.
  - To deploy vpn choose git-terraform.git/aws/vpn repository
  ![](/img/simloud-pipeline/2.png)

  - To deploy EC2 choose git-terraform.git/aws/ec2 repository
  ![](/img/simloud-pipeline/3.png)


### Links to repositories:
- <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a>
- <a href="https://gitlab.com/simloud-demo/git-terraform" target="_blank">git-terraform</a>