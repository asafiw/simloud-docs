---
title: Kubectl port forwarding
description: Kubectl port forwarding
layout: ../../layouts/MainLayout.astro
---


1. Install and configure [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) in your local computer.
2. Enable [AWS credential](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) configuration.

2. Install and enable [Docker](https://docs.docker.com/get-docker/) in your local computer.

3. Run simloud docker image.

   On your local computer run following command:

   ```sh
   docker run --rm --network host -ti -v $HOME/.kube:/root/.kube -v $HOME/.ssh:/root/.ssh -v $HOME/.aws:/root/.aws simloud/aws-tools:1.1.38 /bin/bash
   ```

4. Add your AWS user to trusted relationship role.

5. Assume kubernetes role.

Copy assumeRole script from Simloud Portal by pressing the **Copy AssumeRole button**. That will copy a command to your clipboard. Paste it into the docker and run it inside the docker.

![](/img/kubernetes/kubectl-port-forwarding/1.png)


6. Check kubectl access to kubernetes API.

```sh
root@docker-desktop:/code# kubectl get nodes
NAME STATUS ROLES AGE VERSION
ip-10-0-104-33.eu-central-1.compute.internal Ready <none> 8h v1.18.9-eks-d1db3c
ip-10-0-12-245.eu-central-1.compute.internal Ready <none> 8h v1.18.9-eks-d1db3c
```

7. Get chart notes of the relevant chart.


_**Example.**_ For jenkins chart is necessary to use the following command:

```sh
helm get notes jenkins```
```

NOTES:

----------------
```sh
Get your 'admin' user password by running:
  printf $(kubectl get secret --namespace default jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
```
----------------




8. Set port-forwarding.

That action should be performed outside the docker in your local computer for Windows and MacOS
(fot the Linux OS you can run inside docker container).

Use the commands from the helm note output:

Couchbase:

```sh
#kubectl port-forward --namespace default couchbase-couchbase-cluster-0000 8091:8091
```

Rabbitmq:

```sh
#kubectl port-forward --namespace default svc/rabbitmq 15672:15672
```

Jenkins:

```sh
#kubectl port-forward service/jenkins 7000:80
```

**Note**

The service port can be detected from: `kubectl get service | grep service name`

E.g. `kubectl get service | grep jenkins`
