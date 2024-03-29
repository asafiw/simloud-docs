---
title: Simloud connection to K8s and AWS services
description: Simloud connection to K8s and AWS services
layout: ../../layouts/MainLayout.astro
---

1. Install and enable [Docker](https://docs.docker.com/get-docker/) on your local computer.
2. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) on your local computer.
3. Configure the AWS CLI user in your local directory.
4. Create a new cloud user in your Simloud account (**CLOUD MANAGEMENT** -> **Users** -> "**Add user**" -> Enter the name of the user -> "**Save**" ).
   ![](/img/onboarding/connect-k8s-aws/1.png)

5. Add the created user to your cloud account (**CLOUD MANAGEMENT** -> **Accounts** -> From the "**CLOUD USERS**" drop-down menu select the user you want to add -> "**Save**" ).

   ![](/img/onboarding/connect-k8s-aws/2.png)

6. Go to the deployment which is configured with this cloud account and and click the "Connect K8s" button and follow the instructions.

   ![](/img/onboarding/connect-k8s-aws/3.png)

### How to connect K8s

1. Make sure that your [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) credentials are installed on your local computer.
2. Enable [Docker](https://docs.docker.com/engine/install/) on your local computer.
3. Copy the following docker commands and run it locally:

   **Windows**

   ```powershell
   docker run --rm -ti -v %HOMEDRIVE%%HOMEPATH%/.kube:/root/.kube -v %HOMEDRIVE%%HOMEPATH%/.ssh:/root/.ssh -v %HOMEDRIVE%%HOMEPATH%/.aws:/root/.aws -v %CD%:/code simloud/aws-tools:1.1.43 /bin/bash
   ```

   **MacOS/Linux**

   ```sh
   docker run --rm -ti -v $HOME/.kube:/root/.kube -v $HOME/.ssh:/root/.ssh -v $HOME/.aws:/root/.aws -v $(pwd):/code simloud/aws-tools:1.1.43 /bin/bash
   ```

4. Copy assume role and run it inside your docker container.
   ![](/img/onboarding/connect-k8s-aws/4.png)

   > **_NOTE:_**
   > String to connect will be generated after deployment creation.

5. Copy file from/to docker _(Optional)_

   **From**

   ```sh
   docker cp simloud:tmp/yourfile /tmp/yourfile
   ```

   **To**

   ```sh
   docker cp /tmp/yourfile simloud:tmp/yourfile
   ```

### How to access jenkins/grafana/k8s-dashboarf

Open deployment menu and choose the service:
![](/img/onboarding/connect-k8s-aws/5.png)

1. Jenkins - `admin` / `password`  
   **To get password run this command in your terminal:**
   ```sh
    kubectl get secrets jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 -d ; echo
   ```
2. Grafana (monitoring) - `admin` / `password`

   **To get password run this command in your terminal:**

   ```sh
   kubectl get secret --namespace kube-system  grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
   ```

3. Vault (Hashicorp vault) - `token`

   **To get token run this command in your terminal:**

   ```sh
   kubectl get secret --namespace kube-system vault-root-token -o jsonpath="{.data.root_token}" | base64 -d ; echo
   ```

4. K8s dashboard - click on the CPU/Memory graph

   **To get token run this command:**

   ```sh
   kubectl get secret -n kube-system  $(kubectl get secret -n kube-system | grep dashboard-token | awk '{ print $1 }') -o jsonpath="{.data.token}" | base64 -d ; echo
   ```

### How to access AWS services - Cloudwatch logs/System manager

1. Login to your aws console.
2. Click the relevant buttons on Simloud UI.

![](/img/onboarding/connect-k8s-aws/6.png)

**System manager:**

- Allows you to ssh to the k8s worker nodes.
- This service will open in your AWS console once you select this option.
- The list of available worker nodes will be displayed.
- Please select the worker node you would like to connect.

**CloudWatch logs:**

- Allows you to connect to CloudWatch Logs Insights to perform centralized log query.
- Simloud sends all Kubernetes (k8s) traffic to AWS CloudWatch log groups, including both application and cluster-level logs.
- In addition, Lambda functions send logs to AWS Cloudwatch log group.
- This service will open in your AWS console with the relevant log groups already selected once you press the "CloudWatch Logs" button.
- Please perform the log query according to AWS CloudWatch Logs Insights syntax.

3. SSH to pod.

   - Get list of pods:
     ```sh
     kubectl get pod
     ```
   - Connect to pods:
     ```sh
     kubectl exec --stdin --tty pod-xx -- /bin/sh
     ```
     ```sh
     kubectl exec --stdin --tty pod-xx -- /bin/bash
     ```
   - Mount a folder to the local docker linux/mac:

     ```sh
     docker run --rm -ti -v $HOME/Downloads:/tmp -v $HOME/.kube:/root/.kube -v $HOME/.ssh:/root/.ssh -v $HOME/.aws:/root/.aws -v $(pwd):/code hub.simloudcorp.customers.simloud.com/simloud/simloud-tools:1.1.43 /bin/bash
     ```

   - Mount a folder to the local docker windows:

     ```sh
     docker run --rm -ti -v %HOMEDRIVE%%HOMEPATH%/.kube:root/.kube -v %HOMEDRIVE%%HOMEPATH%/.ssh:/root/.ssh -v %HOMEDRIVE%%HOMEPATH%/.aws:/root/.aws -v %CD%:/code simloud/aws-tools:1.1.43 /bin/bash
     ```

   - Copy to pod from local docker
     ```sh
     kubectl cp file pod-xx:/service/srv/tmp
     ```
