# How to access logs

Simloud configures logs in AWS CloudWatch Insight, for both application and infrastructure levels, and allows customers to access them easily.

1. In Simloud UI, on the main dashboard page choose deployment whose logs should be displayed.
2. Open context menu (three dots on the right side) and press **CloudWatch logs**.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/logs/how-to-access-logs/image1.jpg)

On the CloudWatch Insight page, you can see pre-defined log groups (you don't have to remove or add anything), the datetime picker (for customizing the log period), and the query form, where you can customize queries using powerful query language (see [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html) for more details). When you have selected the datetime and the query is ready, click **Run query**.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/logs/how-to-access-logs/image2.jpg)

Query example for new infrastructure-engine (as k8s job):

```
parse log ‘“message”: “*”’ as message
| parse log ‘“module”: “*”’ as module
| parse log ‘“deployment_id”: “*”’ as deployment_id
| filter kubernetes.container_name like ‘infrastructure-engine-2’ and deployment_id=<dep_id>
| sort @timestamp desc
| limit 2000
```

Examples of queries:

- Application logs for specific service.

```
fields @timestamp, log
| filter kubernetes.container_name = ‘kube-service-1’
| sort @timestamp desc
| limit 1000
```

- Application logs for given string across all services.

```
fields @timestamp, log
| filter log like ‘/api/v1/’
| sort @timestamp desc
| limit 1000
```

- Infrastructure logs for specific k8s namespace.

```
fields @timestamp, log
| filter kubernetes.namespace_name = ‘kube-system’
| sort @timestamp desc
| limit 1000
```

- Sample complex stat query.

```
parse log “*TIME: *”  as logString, RequestTiming
| stats avg(RequestTiming), max(RequestTiming), min(RequestTiming)
| filter @message like “TIME:”
| fields tomillis(@timestamp) as millis
| filter millis < 1607420000000
| filter millis > 1607419800000
```

Another option to view logs is through k8s cli (kubectl):

Establish connection with [kubernetes cluster](https://docs.google.com/document/d/1o88eQGYYYcDfEq4MftpXBns4hEgOD5w-KrIufTsKwO0/edit).

Run these commands in terminal:

```
kubectl get pod --namespace default
kubectl logs <name_of_your_pod> --namespace default
```

:::note
Don't forget to change the namespace to the one in which the POD is located.
:::

Ingress POD logs output example:

![](/home/simloud/IdeaProjects/simloud-docs/static/img/logs/how-to-access-logs/image9.png)
