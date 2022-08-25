# How to access logs?

Simloud configure logs in AWS CloudWatch Insight, for both application and infrastructure levels, and allows customers to easily access them.

1. In Simloud UI, on the main dashboard page choose deployment whose logs should be displayed.
2. Open context menu (three dots on the right side) and press **CloudWatch logs**.

![](/img/logs/how-to-access-logs/image1.png)

Now you can see CloudWatch Insight page with pre-defined log groups (no need to remove and add something), datetime picker (you can customize period of logs) and query form (you can customize query using powerful query language, see [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html) for more details). Once you select datetime and query is ready, press **Run query**.

![](/img/logs/how-to-access-logs/image2.jpg)

Query example for new infrastructure-engine (as k8s job):

```
parse log ‘“message”: “*”’ as message
| parse log ‘“module”: “*”’ as module
| parse log ‘“deployment_id”: “*”’ as deployment_id
| filter kubernetes.container_name like ‘infrastructure-engine-2’ and deployment_id=<dep_id>
| sort @timestamp desc
| limit 2000
```

Example of queries:

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

Run command this command in terminal:

```
kubectl get pod --namespace default
kubectl logs <name_of_your_pod> --namespace default
```

:::note
Don't forget to change the namespace to the one in which the POD is located.
:::

Example output from searching logs of ingress POD:

![](/img/logs/how-to-access-logs/image3.png)
