---
title: How to access logs screen
description: How to access logs screen  
layout: ../../layouts/MainLayout.astro
---


Simloud configures logs in AWS CloudWatch Insight, for both application and infrastructure levels, and allows customers to access them easily.

1. In Simloud UI, on the main dashboard page choose deployment whose logs should be displayed.
2. Open context menu (three dots on the right side) and press **CloudWatch logs**.

![](/img/logs/how-to-access-logs/1.png)

On the CloudWatch Insight page, you can see pre-defined log groups (you don't have to remove or add anything), the datetime picker (for customizing the log period), and the query form, where you can customize queries using powerful query language (see [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html) for more details). When you have selected the datetime and the query is ready, click **Run query**.

![](/img/logs/how-to-access-logs/2.png)

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

Establish connection with kubernetes cluster. Please follow the instruction in documentation "**_Simloud connection to K8s and AWS services_**"

Run these commands in terminal:

```
kubectl get pod --namespace default
kubectl logs <name_of_your_pod> --namespace default
```

> **_NOTE:_**
Don't forget to change the namespace to the one in which the POD is located.


Ingress POD logs output example:

![](/img/logs/how-to-access-logs/image3.png)

