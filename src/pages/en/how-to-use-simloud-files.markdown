---
title: How to use Simloud files
description: How to use Simloud files
layout: ../../layouts/MainLayout.astro
---


  **The Simloudfile.yaml** file is a global file that contains the configuration that we use during creating deployments.
   
Each of our standard microservices, such as `k8s-service`, `lambda-serverless`,  `fe-demo`, and `generic-pipeline` has its own Simloudfile.
>**_NOTE: Simloudfiles for microservices have the same parameters, but the values of those parameters are different._**



 ### How to connect your repository to Simloudfile

> There are two ways to connect your repository to Simloud file:
> -  Clone ready repositories and deploy from it.
> -  Deploy from your own repository.


### Clone ready repository
Choose this option if you do not need to edit Simloudfile.yaml. 

1. It is necessary to [create deployment](/en/create-deployment). 

2. When choosing the repositories to deploy, you need to choose following repositories from drop-down menu.
  ![](/img/onboarding/simloudfiles-usage/6.png)

3. To check the Simloudfile.yaml content you can use our [repositories](/en/how-to-use-simloud-files#links-to-repositories) from Gitlab.


### Deploy from own repository
Choose this option if you need to edit Simloudfile.yaml.

1. Firstly, it is necessary to clone repository to your local machine. 

**Command for cloning repository:**
``` shell script
git clone git@gitlab.com:simloud-demo/lambda-serverless-2.git
```
   ![](/img/onboarding/simloudfiles-usage/7.png)

2. Edit Simloudfile and push changes to your repository. 
  
  Simloudfile is located in the root directory of each repository. 
    It's necessary to locate Simloudfile.yaml in the root directory for correct work.
   ![](/img/onboarding/simloudfiles-usage/8.png)
   
   After editing Simloudfile - push your changes to your repository
   ```shell script
    git push origin 'name of your branch'
   ```
Please, follow this documentation for more commands in GitLab - <a href="https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html" target="_blank">gitlab basics</a>.

3.  Then it is necessary to add your repository on portal.
    ![](/img/onboarding/simloudfiles-usage/1.png)
    For example, adding the fe-demo repository:
    ![](/img/onboarding/simloudfiles-usage/2.png)
 
 Please, follow the instruction in documentation ["Add new git repositories"](/en/getting-started#add-new-git-repositories-services) for more information.

4. Once you have added the repository to the portal, you can start creating your deployment
 using  <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>. 
    ![](/img/onboarding/simloudfiles-usage/3.png)
 
 Please, follow the instruction in documentation ["How to create deployment using Simloud portal"](/en/create-deployment).
 
5. When choosing the repositories to deploy, you must select the ones you added to the portal. 
    ![](/img/onboarding/simloudfiles-usage/4.png)
    ![](/img/onboarding/simloudfiles-usage/5.png) 
 
 
 ### Git-pipeline repository
This type of repository allows deploying different custom configuration using script from simloud-pipeline file.
To execute this repository, it's necessary to deploy <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a> repository on <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>. 

   ![](/img/onboarding/simloudfiles-usage/10.png)
   

### Deploying Databases
 k8s-service-3 repository allows deploying both databases - RDS and DynamoDB. 
To execute this repository, it's necessary to deploy <a href="https://gitlab.com/simloud-demo/k8s-service-3" target="_blank">k8s-service-3</a> on <a href="https://portal.simloud.com:" target="_blank">Simloud Portal</a>.

  ![](/img/onboarding/simloudfiles-usage/11.png)

### Links to repositories
 -  <a href="https://gitlab.com/simloud-demo/fe-demo" target="_blank">fe-demo</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-1" target="_blank">k8s-service-1</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-2" target="_blank">k8s-service-2</a>
 -  <a href="https://gitlab.com/simloud-demo/k8s-service-3" target="_blank">k8s-service-3</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-1" target="_blank">lambda-serverless-1</a>
 -  <a href="https://gitlab.com/simloud-demo/lambda-serverless-2" target="_blank">lambda-serverless-2</a>
 -  <a href="https://gitlab.com/simloud-demo/git-monorepo" target="_blank">git-monorepo</a>
 -  <a href="https://gitlab.com/simloud-demo/git-pipeline" target="_blank">git-pipeline</a>
 
 
 ### Related documentation
 -  [Getting started](/en/getting-started)
 -  [Managing the SSH keys](/en/getting-started/#managing-the-ssh-keys)
 -  [Creating deployment](/en/create-deployment)
 - <a href="https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html" target="_blank">Gitlab basics</a>
 
 
 