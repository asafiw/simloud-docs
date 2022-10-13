---
sidebar_position: 1
slug: "/"
---

# Getting started

1. Browse to the Simloud portal: https://portal.simloud.com/
2. Login using your credentials.
3. Go to the Account tab.
   - press "Cloud management" button.
   - press "Accounts" button
  
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/1.png)
   -  press "Add Account" button.
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/2.png)
   - Follow the instructions "how to get Account role" in the pop-up message.
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/12.png)
    
   - Download the CloudFormation script to your local computer. ????
   - Open your AWS account console CloudFormation service and press the **Create stack** button.
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image2.png)
   - Chose the following options, upload the script and click on the **Next button.** 
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image3.png)
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image4.png)
   - Scroll down and click again on the **Next button.**
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image5.png)
   - Scroll down and select the following options and press the **Create stack** button.
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image6.png)
   - Wait for a few minutes until the script will complete (CREATE_COMPLETE)
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image7.png)
   - Go to **Outputs** tab and copy the following value.
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image8.png)
   - Paste this value into **Account Role** field and press the **Save** button
     ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image9.png)

:::note
Make sure that there are no spaces before or after the Account Role string!
:::

4. CI/CD steps are included here, but they can be skipped during deployment creation and added later.

### Create new SSH key pair         

- Go to the "Infrastructure" tab -> "Repositories".
- Press on the "SSH key list" button.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/11.png)
- Press the "Add key" button.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/6.png)
- Enter value to the "Key name" field and press the save button for creation.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/77.png)
- Make sure if everything is correct. If yes - press "Confirm" button.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/8.png)
- Copy the public SSH key.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/image12.png)
- Provide this SSH key to the git user with read permissions on your repository. (Bitbucket/GitLab/GitHb, etc)

### Add new git repositories (services):

- Go to the "Repositories" tab -> "Repositories".
- Press the "Add repository" button
- Paste the repository URL (e.g. git@bitbucket.org:xxxx/xxx-2.git)
- Paste the service folder's path if you are using mono/single repo(e.g. service1)
- Select the SSH key from the drop down field and save changes.
  ![](/home/simloud/IdeaProjects/simloud-docs/static/img/onboarding/intro/13.png)

### Add Simloudfle and .simloud_ci files to git repositories

- The attached Simloudfle and .simloud_ci can be used as references.
- Edit them according to your definitions.

**Simloudfle**:

- Contains the microservice cloud resources definitions (currently s3/sqs/RDS mysql, RDS postgres, later it will contain other resources).
- The path to the ingress should be filled if it is needed (if not, then leave it empty (external_api: {}).
- Cloud resources per service (if it is not needed, it should be empty (cloud_resources: {}).
- k8s deployment fields.

**.simloud_ci**:

- Provides customizations for each service's CI process.
- Should be located next to the Dockerfile.
- Contains bash script for CI steps (there are plans to change it to yml file)
- The file should be empty if there is no customization (maybe in lambda).

Place these two files at the root folder of each microservice repository.

5. Create Deployment
   - follow the different steps in the wizard
