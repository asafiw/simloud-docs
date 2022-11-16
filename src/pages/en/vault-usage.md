---
title: How to use Vault
description: How to use Vault
layout: ../../layouts/MainLayout.astro
---


1. Establish connection with kubernetes cluster. Please, follow the instruction in documentation [**_"Simloud connection to K8s and AWS services"_**](/en/connect-to-k8s-aws)

2. Run this command in terminal.
```sh
kubectl get secret --namespace kube-system vault-root-token -o jsonpath="{.data.root_token}" | base64 -d ; echo
```
3. Copy the output.
4. On the Simloud Portal, on the main dashboard page choose deployment where you want to use Vault.
5. Open context menu (three dots on the right side) and press “Vault”.

   ![](/img/onboarding/how-to-use-vault/1.png)

6. In Vault UI paste output from previous command in “Token” field.

   ![](/img/onboarding/how-to-use-vault/image3.jpg)

7. Here you can manage all your secrets.

   ![](/img/onboarding/how-to-use-vault/image4.jpg)

## Examples of using Vault

1. How to create secrets:

- Enter in Secrets Engines, for example in “default-app”

  ![](/img/onboarding/how-to-use-vault/image5.jpg)

- Press “Create secret” button

  ![](/img/onboarding/how-to-use-vault/image6.jpg)

- Fill these fields and press “Save” button

  ![](/img/onboarding/how-to-use-vault/image7.png)

2. How to view secrets: Press on “eye” button.

## Passing secrets from vault into the pod’s environmental variables through “Simoudfile.yaml” file.

In order to pass secrets into the container through Simloudfile.yaml you can do the following:

- Open “Simloudfile.yaml”.

- Find the “secrets” field.

  ![](/img/onboarding/how-to-use-vault/image8.jpg)

- “Path” specifies the vault path in which required secrets are stored. The path specified must correspond to a vault path to an existing secret. **Please note, that Jenkins is only permitted access to the "secrets" folder inside of vault.**

  ![](/img/onboarding/how-to-use-vault/image9.png)

- The "env_name_prefix" parameter specifies the prefix for the resulting environmental variable. In case the prefix is not needed, you can remove this field. Please, make sure that Simloudfile includes **“check_mode: advanced”** field (see example above).

  ![](/img/onboarding/how-to-use-vault/image10.jpg)
  ![](/img/onboarding/how-to-use-vault/image11.png)

  _Example of variables with prefix being passed into the container_

- Secrets can be passed from multiple paths in the following way:

  ![](/img/onboarding/how-to-use-vault/image12.jpg)

- It is possible to add as many such blocks as you need. 

Vault is integrated into Jenkins CD process, so to inject secrets into your pods you must run CI/CD or CD jobs through Jenkins.

In order to check if your variables were successfully passed through Jenkins, please, follow these steps:

- Open Jenkins dashboard.

- Select a job that uses "Simloudfile.yaml." and click on its menu.

- On the right panel choose a relevant build and press on it.

  ![](/img/onboarding/how-to-use-vault/image13.jpg)

- Choose the “Console Output” option.

  ![](/img/onboarding/how-to-use-vault/image14.jpg)

- Look for the value under the "path" parameter in your "Simloudfile.yaml".

- For this example we will search for the _“secrets/customer1/data1”_.

- In most browsers it can be done by pressing **Ctrl + F** buttons on your keyboard and entering the value used under the “path” parameter in the “Simloudfile.yaml”. We are only interested in the second match.

- The absence of _“No value found at `<path>`”_ message means that secrets were successfully passed into the container.

  ![](/img/onboarding/how-to-use-vault/image15.jpg)


## Passing secrets from vault via simloid_ci file

Follow these steps to output vault secrets through a simloud_ci file in a Jenkins job:
-  Add the following command to your simloud_ci file, where <path_to_secret> is a path to required secret in vault:
```yaml
  vault kv get <path_to_secret>
```

- You can view the values in question by navigating to the job build output after building the service from the branch.

For demonstration purposes, we will acquire a number of test values secured in a secret. The **path** to it in Vault is: ``jenkins/test/config``

**Vault path:** `jenkins -> test -> config`

![](/img/onboarding/how-to-use-vault/img17.png)
![](/img/onboarding/how-to-use-vault/img18.png)
![](/img/onboarding/how-to-use-vault/img19.png)
![](/img/onboarding/how-to-use-vault/img20.png)

The contents of edited simloud_ci file:
```sh
#!/bin/bash
echo 'how to use vault inside jenkins job example'
echo 'following example assumes that there is a secret named config with fields username and password in jenkins/test vault path'
echo 'add your jenkins secrets in jenkins/xxx path'
username=$(vault kv get -field=username  jenkins/test/config)
password=$(vault kv get -field=password  jenkins/test/config)
echo $username
echo $password
docker build -t $2 --network container:$1 -f Dockerfile .
```

[Download Simloudfile.yaml](/files/simloud_ci.sh)

>**_Note: we use the simloud_ci file for kube-service-1_**

Navigating to see the value output in Jenkins:
- Press the build result icon next to the job number.
  ![](/img/onboarding/how-to-use-vault/img21.png)
- To view the required output, navigate to the following part after building the micro-service:
  ![](/img/onboarding/how-to-use-vault/img22.png)


