# How to use Vault ?

How to use Vault

Establish connection with kubernetes cluster. Please see the documentation SimloudConnectToK8sAndAWSServices

Run this command in terminal:

```
kubectl get secret vault-root-token --namespace kube-system -- template={{.data.root_token}} | base64 -d && echo
```

Copy the output Example output:

In Simloud UI, on the main dashboard page choose deployment in which you want to use Vault

Open context menu (three dots on the right side) and press “Vault”

In Vault UI paste output from previous command in “Token” field

Here you can manage all your secrets

Examples of using Vault:

How to create secrets:

Enter in Secrets Engine, for example “deffault-app”

Press in “Create secret” button

Fill these fields and press “Save” button

How to view secrets: Press on “eye” button

Passing secrets from vault into the pod’s environmental variables through “Simoudfile.yaml” file.

In order to pass secrets into the container through simloudfile.yaml you can do the following:

Open “Simloudfile.yaml”.

Find the “secrets” field.

The “path” specifies a path in vault to required secrets are stored. The path specified must correspond with a vault path to an existing secret. It is important to remember that Jenkins only has access to the “secrets” folder inside of vault.

The “env_name_prefix” parameter specifies the prefix which the resulting environmental variable will have. You can remove this field if there is no need in prefix. Please make sure that Simloudfile includes “check_mode: advanced” field (see above example)

•

•

Example of variables with prefix being passed into the container

If you would like to pass secrets from multiple path you can do it in the following manner:

You can add as many such blocks as you require. In order to check if your secrets were successfully passed

Vault is integrated in the Jenkins CD process, it means that in order to inject the secrets to your pods you need to preform CI/CD or CD job through the Jenkins.

In order to check if your variables were successfully passed through Jenkins please follow these steps:

Open Jenkins dashboard.

Choose a job that makes use of “Simloudfile.yaml” and open it’s menu.

On the right panel choose a relevant build and press on it.

Choose the “Console Output” option.

Check your “Simloudfile.yaml” and look for the the value used under the “path” parameter.

In this example we will be searching for the “secrets/customer1/data1”.

In most browsers it can be done by pressing Ctrl + F buttons on your keyboard and entering the value used under the “path” parameter in the “Simloudfile.yaml”. Only the second match is of interest.
