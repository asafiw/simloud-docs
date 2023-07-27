---
title: How to manage ephemeral storage parameters
description: How to manage ephemeral storage parameters
layout: ../../layouts/MainLayout.astro
---

To manage custom ephemeral storage parameters, you can directly modify the parameters within the Jenkins job settings. Follow these steps:

- Access your Jenkins job.
- Open the job configuration and select the service where you wish to manage ephemeral storage parameters.
  ![](/img/jenkins/ephemeral-storage-parameters/1.jpg)
- Go to the job configuration 
  ![](/img/jenkins/ephemeral-storage-parameters/2.jpg)
- Find the `CICD_REQUEST_EPHEMERAL_STORAGE` and `CICD_LIMIT_EPHEMERAL_STORAGE` variables, put your custom values there and run your job to apply the changes.
  ![](/img/jenkins/ephemeral-storage-parameters/3.jpg)
- Review the console output to verify the updated parameters.
  ![](/img/jenkins/ephemeral-storage-parameters/4.png)
  
