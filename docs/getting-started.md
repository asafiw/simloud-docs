---
sidebar_position: 1
slug: "/"
---

# Getting started

1. Browse to simloud portal: https://portal.simloud.com/
2. Login using your credentials.
3. Go to the Account tab.
   - press "Add Account" button.
   - Follow the instructions in the pop up message.
     ![](/img/onboarding/intro/image1.png)
   - Download the CloudFormation script to your local computer.
   - Open your AWS account console CloudFormation service and press the Create stack button.
     ![](/img/onboarding/intro/image2.png)
   - Chose the following options, upload the script and click on the next button:
     ![](/img/onboarding/intro/image3.png)
     ![](/img/onboarding/intro/image4.png)
   - Scroll down and click again on the next button:
     ![](/img/onboarding/intro/image5.png)
   - Scroll down and select the following options and press the create stack button:
     ![](/img/onboarding/intro/image6.png)
   - Wait couple of minutes until the script completes (CREATE_COMPLETE)
     ![](/img/onboarding/intro/image7.png)
   - Go to Outputs tab and copy the following value:
     ![](/img/onboarding/intro/image8.png)
   - Paste this value into Account Role field and press the save button:
     ![](/img/onboarding/intro/image9.png)

:::note
Make sure that there are no spaces before or after the Account Role string!
:::

4. Following steps are related to CI/CD, they can be skipped in deployment creation and added later.

### Create new SSH key pair

- Go to the "Repositories" tab.
- Press on the "SSH key list" button.
  ![](/img/onboarding/intro/image10.png)
- Press the "Add SSH key" button.
- Enter value to the "SSH key name" field and press the save button for creation.
  ![](/img/onboarding/intro/image11.png)
- Copy the public SSH key.
  ![](/img/onboarding/intro/image12.png)
- Pass this SSH key to the git user who has read permission in your repository (Bitbucket/GitLab/GitHb, etc)

### Add new git repositories (services):

- Go to the "Repositories" tab.
- Press the "Add repository" button
- Paste the repository URL (e.g. git@bitbucket.org:xxxx/xxx-2.git)
- If you are using mono/single repo paste the path to the service folder(e.g. service1)
- Select the SSH key from the drop down field and save changes.
  ![](/img/onboarding/intro/image13.png)

### Add Simloudfle and .simloud_ci files to git repositories

- Attached are snippets of Simloudfle and .simloud_ci that can use a reference.
- Edit them according to your definitions:

**Simloudfle**:

- contain the microservice cloud resources definitions (currently s3/sqs/RDS mysql, RDS postgres, later it will contain other resources)
- path to ingress if needed if (if not needed then it should be empty (external_api: {})
- cloud resources per service (if not needed then it should be empty (cloud_resources: {})
- k8s deployment fields

**.simloud_ci**

- Uses for customization in CI process for each service.
- Should be located next to the Dockerfile
- Contains bash script for CI steps (there are plans to change it to yml file)
- if there is no customization (maybe in lambda) then there should be an empty file.
- For each microservice repository add these two files in the root folder.

5. Create Deployment
   - follow the different steps in the wizard
