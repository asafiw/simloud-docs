---
title: Getting started
description: Getting started
layout: ../../layouts/MainLayout.astro
---

1. Browse to the [Simloud portal](https://portal.simloud.com/)
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

> **_NOTE:_** _Make sure that there are no spaces before or after the Account Role string!_

### Create new SSH key pair

- Go to the "Infrastructure" tab -> "Repositories".
- Press on the "SSH key list" button.
  ![](/img/onboarding/intro/image100.png)
- Press the "+ Add key" button. Enter value to the "Key name" field and press the "Save" button for creation.
  ![](/img/onboarding/intro/image101.png)
- Copy the public SSH key.
  ![](/img/onboarding/intro/image12.png)

### Managing the SSH keys

> **_NOTE:_** _Please follow these steps to add your SSH key to your private repositories only **if you already have an account on Bitbucket/ GitHub/ GitLab**_

#### **For Bitbucket**:

- Copy the public SSH key.

![](/img/onboarding/intro/image12.png)

- Go to your Bitbucket account. Select the **"Personal settings"** option

![](/img/onboarding/intro/14.png)

- In the tab **"Security"** select **"SSH keys"** option and press the **"Add key"** button.
  ![](/img/onboarding/intro/15.png)
- Enter the name of your SSH key in the **_"Label"_** field, and paste your public SSH key in the **_"Key"_** field. Press the **"Add key"** button.
  ![](/img/onboarding/intro/16.png)

#### **For GitHub**:

- Copy the public SSH key.

![](/img/onboarding/intro/image12.png)

- Go to your GitHub account. Select the **"Settings"** option

![](/img/onboarding/intro/17.png)

- In the tab **"Access"** select **"SSH and GPG keys"** option and press the **"New SSH key"** button.
  ![](/img/onboarding/intro/18.png)
- Enter the name of your SSH key in the **_"Title"_** field, and paste your public SSH key in the **_"Key"_** field. Press the **"Add SSH key"** button.
  ![](/img/onboarding/intro/19.png)

#### **For GitLab**:

- Copy the public SSH key.

![](/img/onboarding/intro/image12.png)

- Go to your GitLab account. Select the **"Preferences"** option

![](/img/onboarding/intro/20.png)

- In the tab **"User Settings"** select **"SSH keys"** option.
- Enter the name of your SSH key in the **_"Title"_** field, and paste your public SSH key in the **_"Key"_** field. Press the **"Add key"** button.
  ![](/img/onboarding/intro/21.png)

> **_NOTE:_** _**If you don't have an account on Bitbucket/ Github/ Gitlab - it's necessary to create a user and attach this user to all the accessed repositories.**_

- [Link](https://id.atlassian.com/) to create your account for **Bitbucket**.
- [Link](https://github.com/login) to create your account for **GitHub**.
- [Link](https://gitlab.com/users/sign_in) to create your account for **GitLab**.

### Add new git repositories (services):

- Go to the "Repositories" tab -> "Repositories".
- Press the "Add repository" button.
- Paste the repository URL (e.g. git@bitbucket.org:xxxx/xxx-2.git)
- Paste the service folder's path if you are using mono/single repo.
- Select the SSH key from the drop down field and save changes.
  ![](/img/onboarding/intro/13.png)

### Add Simloudfile.yaml and simloud_pipeline.yaml files to git repositories

- The attached Simloudfile.yaml and simloud_pipeline.yaml files can be used as references.
- Edit them according to your definitions.

[**_Simloudfile.yaml_**](/en/simloudfile.yaml)

- This file contains definitions for microservice cloud resources, such as s3, sqs, RDS MySQL, and RDS PostgreSQL. Additional resources can be added in the future.
- If an ingress path is required, provide the appropriate path. If not needed, leave it empty (external_api: {}).
- Specify cloud resources per service, leaving it empty if it's not required (cloud_resources: {}).
- k8s deployment fields.

[**simloud-pipeline.yaml**](/en/simloud-pipeline.yaml)
- This file allows you to add custom Continuous Integration (CI) stages for your microservices.
- It provides customization options for each service's CI process.
- The file contains bash scripts with specific CI steps.

Place these two files at the root folder of each microservice repository.
