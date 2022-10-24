# Simloud-pipeline.yaml

#### Configuration file for pipeline with possibility for deploying Terraform code

### Examples of `Simloud-pipeline.yaml` file :
\
**Bash shell example:**

```
version: v1
kind: simloud-pipeline

pipeline:
  default:                                         # profile name. Currently only default
    - stages:
        - name: "bash"
          shell: bash                                # “bash” by default ( optional )
          args: []                                   # shell arguments ( optional )
          homedir: /home/jenkins/agent/workspace/generic-pipeline                                # shell command default folder ( optional )
          scripts:                                   # for “sh,bash,zsh” shells only
          - ./helm_install.sh
```
\
**Terraform shell example:**

```
version: v1
kind: simloud-pipeline

pipeline:
  default:                                         # profile name. Currently only default
    - stages:
        - name: “TF code”
          shell: terraform                           # for terraform case
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
                  - kube-system.ssh-keys               #
```