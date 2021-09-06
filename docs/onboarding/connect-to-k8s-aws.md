# Simloud connect to K8s and AWS services

1. Install and enable docker in your local computer - https://docs.docker.com/get-docker/
2. Install and configure AWS cli in your local computer - https://aws.amazon.com/cli/
3. Configure aws cli user in your local directory.
4. Create a new cloud user in your Simloud account:

![](/img/onboarding/connect-k8s-aws/image1.png)

5. Add this user to your cloud account and press the save button:

![](/img/onboarding/connect-k8s-aws/image2.png)

6. Go to the deployment which is configured with this cloud account and press the button "Connect K8s" and follow the instructions:

![](/img/onboarding/connect-k8s-aws/image3.png)
![](/img/onboarding/connect-k8s-aws/image4.png)
![](/img/onboarding/connect-k8s-aws/image5.png)

### How to access jenkins/grafana/k8s-dashboarf

Open deployment menu and choose the service:

![](/img/onboarding/connect-k8s-aws/image6.png)

1. Jenkins - admin/LA#$4zUFl%Xk9!WM
2. monitoring (grafana) - admin/password
   password = kubectl get secret --namespace kube-system grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
3. vault (Hashicorp vault) - token
   Token = kubectl get secret --namespace kube-system vault-root-token -o jsonpath="{.data.root_token}" | base64 -d ; echo
4. k8s dashboard - click on the CPU/Memory graph

Use token.

```jsx
Token = kubectl get secret -n kube-system $(kubectl get secret -n kube-system | grep dashboard-token | awk '{ print $1 }') -o jsonpath="{.data.token}" | base64 -d ; echo
```

### How to access AWS services - Cloudwatch logs/System manager

1. Login to your aws console.
2. Click the relevant button on Simloud UI

![](/img/onboarding/connect-k8s-aws/image7.png)

3. System manager:

   - Allows you to ssh to the k8s worker nodes.
   - Once you select this option this service will be opened in your AWS console.
   - It will display the list of available worker nodes.
   - Please select the worker node you would like to connect.

4. Cloudwatch logs:

   - Allows you to connect to Cloudwatch insight to perform centralized log query.
   - Simloud sends all k8s traffic to AWS Cloudwatch log groups - both application and cluster level.
   - In addition lambda functions are sending logs to AWS Cloudwatch log group.
   - Once you press the Cloudwatch logs button this service will be opened in your AWS console with the relevant log groups already selected.
   - Please perform the log query according to AWS insight syntax.

5. SSH to pod

   - Get list of pods:
     - kubectl get pod
   - Connect to pods:
     - kubectl exec --stdin --tty pod-xx -- /bin/sh
     - kubectl exec --stdin --tty pod-xx -- /bin/bash
   - Mount a folder to the local docker linux/mac:

     ```jsx
     docker run --rm -ti -v $HOME/Downloads:/tmp -v $HOME/.kube:/root/.kube -v $HOME/.ssh:/root/.ssh -v $HOME/.aws:/root/.aws -v $(pwd):/code hub.simloudcorp.customers.simloud.com/simloud/simloud-tools:1.1.28 /bin/bash
     ```

   - Mount a folder to the local docker windows:

     ```jsx
     docker run --rm -ti -v %HOMEDRIVE%%HOMEPATH%/.kube:root/.kube -v %HOMEDRIVE%%HOMEPATH%/.ssh:/root/.ssh -v %HOMEDRIVE%%HOMEPATH%/.aws:/root/.aws -v %CD%:/code simloud/aws-tools:1.1.26 /bin/bash
     ```

   - Copy to pod from local docker
     - kubectl cp file pod-xx:/service/srv/tmp
