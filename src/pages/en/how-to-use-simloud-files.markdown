---
title: How to use Simloud files
description: How to use Simloud files
layout: ../../layouts/MainLayout.astro
---


  **The Simloudfile.yaml** file is a global file that contains the configuration that we use during creating deployments.
   
Each of our standard microservices, such as `kube-service`, `lambda`, `fe-canaveral`, and `generic-pipeline` has its own Simloudfile.
>**_NOTE: Simloudfiles for microservices have the same parameters, but the values of those parameters are different._**



 ### How to connect your repository to Simloudfile

> There are two variants to connect your repository to Simloud file:
> -  Clone ready repositories and deploy from it.
> -  Deploy from your own repository.


### Clone ready repository
Choose this variant if you do not need to edit Simloudfile.yaml. 

1. It is necessary to create deployment and choose repositories from drop-down menu.

Links to repositories: 
-  <a href="https://gitlab.com/simloud-demo/fe-canaveral" target="_blank">fe-canaveral</a>
-  <a href="https://gitlab.com/simloud-demo/kube-service-1" target="_blank">kube-service-1</a>
-  <a href="https://gitlab.com/simloud-demo/kube-service-2" target="_blank">kube-service-2</a>
-  <a href="https://gitlab.com/simloud-demo/lambda-service-1" target="_blank">lambda-service-1</a>
-  <a href="https://gitlab.com/simloud-demo/lambda-service-2" target="_blank">lambda-service-2</a>





### Deploy from own repository.
 1. Firstly, it is necessary to add repositroty on portal.
Please, follow the instruction in documentation [**"Add new git repositories"**](/en/getting-started#add-new-git-repositories-services).

 
 2. Once you have added the repository to the portal, you can start creating your deployment
 using  <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>. Please, follow the instruction in documentation [**"How to create deployment using Simloud portal"**](/en/create-deployment).
 
 3. When choosing the repositories to deploy, you must select the ones you added to the portal.
 
 
 Related documentation:
 - [**"Managing the SSH keys"**](/en/getting-started/#managing-the-ssh-keys).
 
 