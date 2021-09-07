# Kubectl port forwarding

1. Enable [AWS credential](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) configuration.

2. Enable docker on your computer.

3. Run simloud docker image.

   On your local computer run following command:

   ```
   docker run --rm --network host -ti -v $HOME/.kube:/root/.kube -v $HOME/.ssh:/root/.ssh -v $HOME/.aws:/root/.aws simloud/aws-tools:1.1.22 /bin/bash
   ```

4. Add your aws user to trusted relationships role.

5. Assume kubernetes role.

Copy assumeRole script from UI by pressing the Copy AssumeRole button. That will copy a command line to your clipboard. Paste it into the docker and run it inside the docker.

![](/img/kubernetes/kubectl-port-forwarding/image1.png)

And paste.

6. Check kubectl access to kubernetes API.

```
root@docker-desktop:/code# kubectl get nodes
NAME STATUS ROLES AGE VERSION
ip-10-0-104-33.eu-central-1.compute.internal Ready <none> 8h v1.18.9-eks-d1db3c
ip-10-0-12-245.eu-central-1.compute.internal Ready <none> 8h v1.18.9-eks-d1db3c
```

7. Get chart notes of the relevant chart.

For couchbase chart use the following command:

```
xxx@xxx:/code# helm get notes couchbase

NOTES:



----------------

Installing, downloading or otherwise using this software is subject to the Couchbase, Inc. License Agreement posted at https://www.couchbase.com/LA08242020

----------------

== Couchbase-operator deployed.

   # Check the couchbase-operator logs

   kubectl logs -f deployment/couchbase-couchbase-operator  --namespace default





== Admission-controller deployed.

   # Check the admission-controller logs

   kubectl logs -f deployment/couchbase-couchbase-admission-controller --namespace default



== Connect to Admin console

   kubectl port-forward --namespace default couchbase-couchbase-cluster-0000 8091:8091



   # open http://localhost:8091

   username: Administrator

   password: TkFqbGJx



== Manage this chart
   # Upgrade Couchbase
   helm upgrade couchbase -f <values.yaml> stable/couchbase
   # Show this status again
   helm status couchbase
```

8. Set port-forwarding.

That action should be performed outside the docker in your local computer for Windows and MacOS
(in Linux like OS you can run inside docker container).

Use the commands from the helm note output:

Couchbase:

```
#kubectl port-forward --namespace default couchbase-couchbase-cluster-0000 8091:8091
```

Rabitmq:

```
#kubectl port-forward --namespace default svc/rabbitmq 15672:15672
```

Jenkins:

```
#kubectl port-forward service/jenkins 7000:80
```

**Note**

The service port can be detected from: `kubectl get service | grep service name`

E.g. `kubectl get service | grep couchbase`

9. Access web url according to port.

- Couchbase - http://127.0.0.1:8091

  Credentials - use helm note output:
  `#helm get notes couchbase`

- Rabitmq - http://127.0.0.1:15672/

  Find credentials in:
  `#helm get notes rabbitmq`

- Jenkins http://127.0.0.1:15672/
