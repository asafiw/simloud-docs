---
title: How to create new deployment using Simloud Portal
description: How to create new deployment using Simloud Portal
layout: ../../layouts/MainLayout.astro
---



This instruction will show you how to create deployments using [Simloud Portal](https://portal.simloud.com:) 
- Launch Portal UI using your credentials

  ![](/img/create-deployment/1.png)
- Press the "Add group" button to create your group. Enter your name in the following field and click the "Save" button
  ![](/img/create-deployment/2.png)
  ![](/img/create-deployment/3.png)
- Press “Add deployment“ button to create your deployment
  ![](/img/create-deployment/4.png)
- Fill deployment information. Enter the name of your deployment and choose the region you want to use. **eu-central-1**, **eu-west-2** and **eu-west-3** - these regions have the widest selection of instance types
  ![](/img/create-deployment/5.png)
- There are some advanced options: you can edit your "**URL**" (it can be different from the "Deployment name" ). You can select some additional options such as "Application protection", "Start/Stop protection" or "Deletion protection". 
  ![](/img/create-deployment/11.png)
> **_NOTE:_**  _Select "Application protection" if you want no-one has an opportunity to  attach/detach/redeploy repositories. "Start/Stop protection" is used if you want no-one can start and stop your deployment. "Deletion protection" allow you to protect your deployment from deletion._ 
  - Select the "+Add notes" option, if you want to leave some information about your deployment.

  ![](/img/create-deployment/12.png)
- Fill in your Cluster info. Set kubernetes version from drop-down menu. Select instance type and additional options if you need it
  ![](/img/create-deployment/6.png)
> **_NOTE:_** 
> - **SNAT** — Source Network Address Translation, enables pods to communicate bi-directionally with the internet, using worker nodes public IPs. Recommended in case of lower network cost requirements.
**DNAT** — Destination Network Address Translation, enables pods to bi-directionally communicate with the internet using persistent static IP, via NAT gateway service. Recommended in case of high security requirements. 
> - **Enabling HA mode for Vault & Consul** requires more CPU and memory. All instances should have at least 16 GB of memory total.
> - AWS CloudFront will use as **Content Delivery Network**. It will be applied only to the root domain (which is generally used for frontend), but not to any of sub-domains.
> - **Web Application Firewall** protects your web applications from common web exploits. It's only available when CDN is on.
> - "**Skip DNS validation**" option should be checked in case of using external DNS hosting provider (e.g. not using route53 in AWS).
- Add services using your repositories and click the "Save" button
  ![](/img/create-deployment/7.png)
  ![](/img/create-deployment/8.png)
- Confirm your actions
  ![](/img/create-deployment/9.png)
  - Now you can go through all the steps to the status page and press the “Start” button
  ![](/img/create-deployment/10.png)
    - After deployment is created it will be in the "Active Running" state.
  ![](/img/create-deployment/14.png)
    - You can Delete/Redeploy or Add more repositories after deployment is created
  ![](/img/create-deployment/13.png)
       >   **_NOTE:_**
       >    - Use "Redeploy" option, when you want to restart deployment with the updated configuration

  
#