---
title: Getting started
description: Getting started
layout: ../../layouts/MainLayout.astro
---


1. Browse to the Simloud portal: https://portal.simloud.com/
2. Login using your credentials.
3. Go to the Account tab:

   - press "Cloud management" button.
   - press "Accounts" button
   
    ![](/img/onboarding/intro/new1.png)

   - press "Add Account" button.
   
   ![](/img/onboarding/intro/new2.png)

   - Follow the instructions "how to get Account role" in the pop-up message.

   ![](/img/onboarding/intro/12.png)
     
   - Scroll down and select the following options and press the **Create stack** button.

   ![](/img/onboarding/intro/image6.png)
   
   - Wait for a few minutes until the script will complete (CREATE_COMPLETE)
   
   ![](/img/onboarding/intro/new3.png)

   - Go to **Outputs** tab and copy the following value.

    ![](/img/onboarding/intro/new4.png)

   - Paste this value into **Account Role** field and press the **Save** button.
   
    ![](/img/onboarding/intro/new5.png)


> **_NOTE:_**
 _Make sure that there are no spaces before or after the Account Role string!_




### Create new SSH key pair         

- Go to the "Infrastructure" tab -> "Repositories".
- Press on the "SSH key list" button.
  ![](/img/onboarding/intro/11.png)
- Press the "Add key" button.
  ![](/img/onboarding/intro/6.png)
- Enter value to the "Key name" field and press the save button for creation.
  ![](/img/onboarding/intro/77.png)
- Make sure if everything is correct. If yes - press "Confirm" button.
  ![](/img/onboarding/intro/8.png)
- Copy the public SSH key.
  ![](/img/onboarding/intro/image12.png)
- Provide this SSH key to the git user with read permissions on your repository (Bitbucket/GitLab/GitHb, etc).

### Add new git repositories (services):

- Go to the "Repositories" tab -> "Repositories".
- Press the "Add repository" button.
- Paste the repository URL (e.g. git@bitbucket.org:xxxx/xxx-2.git)
- Paste the service folder's path if you are using mono/single repo.
- Select the SSH key from the drop down field and save changes.
  ![](/img/onboarding/intro/13.png)

### Add Simloudfle and .simloud_ci files to git repositories

- The attached Simloudfle  and .simloud_ci can be used as references. 
- Edit them according to your definitions.

[**_SimloudFile._**](/en/simloudfile.yaml)

- Contains the microservice cloud resources definitions (currently s3/sqs/RDS mysql, RDS postgres, later it will contain other resources).
- The path to the ingress should be filled if it is needed (if not, then leave it empty (external_api: {}).
- Cloud resources per service (if it is not needed, it should be empty (cloud_resources: {}).
- k8s deployment fields.

[**.simloud_ci**](/en/simloud-pipeline.yaml)

- Provides customizations for each service's CI process.
- Should be placed in the same directory with Dockerfile.
- Contains bash script with specific CI steps  
- The file should be empty if there is no customization.

Place these two files at the root folder of each microservice repository.


