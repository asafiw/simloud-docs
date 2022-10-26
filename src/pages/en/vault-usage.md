---
title: How to use Vault
description: How to use Vault
layout: ../../layouts/MainLayout.astro
---


1. Establish connection with kubernetes cluster. Please, follow the instruction in documentation [**_"Simloud connection to K8s and AWS services"_**](/en/connect-to-k8s-aws)

2. Run this command in terminal.
```
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

- Enter in Secrets Engines, for example in “deffault-app”

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
