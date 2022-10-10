# How to use Vault?

1. Establish connection with kubernetes cluster. Please see the documentation SimloudConnectToK8sAndAWSServices

2. Run this command in terminal:

```
kubectl get secret --namespace kube-system vault-root-token -o jsonpath="{.data.root_token}" | base64 -d ; echo
```

3. Copy the output

   _Example output_
   ![](../../../img/onboarding/how-to-use-vault/image1.jpg)

4. In Simloud UI, on the main dashboard page choose deployment in which you want to use Vault.

5. Open context menu (three dots on the right side) and press “Vault”.

   ![](/img/onboarding/how-to-use-vault/image2.jpg)

6. In Vault UI paste output from previous command in “Token” field.

   ![](/img/onboarding/how-to-use-vault/image3.jpg)

7. Here you can manage all your secrets.

   ![](../../../img/onboarding/how-to-use-vault/image4.jpg)

## Examples of using Vault:

1. How to create secrets:

- Enter in Secrets Engine, for example “deffault-app”

  ![](/img/onboarding/how-to-use-vault/image5.jpg)

- Press in “Create secret” button

  ![](/img/onboarding/how-to-use-vault/image6.jpg)

- Fill these fields and press “Save” button

  ![](/img/onboarding/how-to-use-vault/image7.png)

2. How to view secrets: Press on “eye” button.

## Passing secrets from vault into the pod’s environmental variables through “Simoudfile.yaml” file.

In order to pass secrets into the container through simloudfile.yaml you can do the following:

- Open “Simloudfile.yaml”.

- Find the “secrets” field.

  ![](/img/onboarding/how-to-use-vault/image8.jpg)

- The “path” specifies a path in vault to required secrets are stored. The path specified must correspond with a vault path to an existing secret. **It is important to remember that Jenkins only has access to the “secrets” folder inside of vault.**

  ![](/img/onboarding/how-to-use-vault/image9.png)

- The “env_name_prefix” parameter specifies the prefix which the resulting environmental variable will have. You can remove this field if there is no need in prefix. Please make sure that Simloudfile includes **“check_mode: advanced”** field (see above example).

  ![](/img/onboarding/how-to-use-vault/image10.jpg)
  ![](/img/onboarding/how-to-use-vault/image11.png)

  _Example of variables with prefix being passed into the container_

- If you would like to pass secrets from multiple path you can do it in the following manner:

  ![](/img/onboarding/how-to-use-vault/image12.jpg)

- You can add as many such blocks as you require. In order to check if your secrets were successfully passed.

Vault is integrated in the Jenkins CD process, it means that in order to inject the secrets to your pods you need to preform CI/CD or CD job through the Jenkins.

In order to check if your variables were successfully passed through Jenkins please follow these steps:

- Open Jenkins dashboard.

- Choose a job that makes use of “Simloudfile.yaml” and open it’s menu.

- On the right panel choose a relevant build and press on it.

  ![](/img/onboarding/how-to-use-vault/image13.jpg)

- Choose the “Console Output” option.

  ![](/img/onboarding/how-to-use-vault/image14.jpg)

- Check your “Simloudfile.yaml” and look for the the value used under the “path” parameter.

- In this example we will be searching for the _“secrets/customer1/data1”_.

- In most browsers it can be done by pressing **Ctrl + F** buttons on your keyboard and entering the value used under the “path” parameter in the “Simloudfile.yaml”. Only the second match is of interest.

- The absence of _“No value found at `<path>`”_ message means that secrets were successfully passed into the container.

  ![](/img/onboarding/how-to-use-vault/image15.jpg)
