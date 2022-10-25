---
title: How to manage and assign roles to users
description: How to manage and assign roles to users
layout: ../../layouts/MainLayout.astro
---

Before we begin, it is important to understand that there are three types of roles: global, item and node roles. In Jenkins, global roles represent policies across all projects, while item and node roles are configured per project/agent. Here we are creating a role called "dev-role" and assigning it to the user "dev".

### To create and configure this role we will execute the following steps:

1. Enter the **Manage Jenkins** menu on the dashboard.
2. Go to **Manage Plugins** and Select "**Available plugins**". Install the "Role-based Authorization Strategy" plugin.

   ![](/img/jenkins/assign-roles-to-users/1.png)
   ![](/img/jenkins/assign-roles-to-users/2.png)
   ![](/img/jenkins/assign-roles-to-users/3.png)

3. Return to the **Manage Jenkins** menu on the dashboard and select the **Configure Global Security** in the tab **Security**
   ![](/img/jenkins/assign-roles-to-users/4.png)
4. In the **Authentication** segment - choose **Authorization** option. From drop-down menu select
   "Role-based strategy" option. Press the "Save" button.
   ![](/img/jenkins/assign-roles-to-users/5.png)
5. Return to the **Manage Jenkins** menu again. Select **Manage and Assign Roles**.
   ![](/img/jenkins/assign-roles-to-users/6.png)
6. Select **Manage Roles**.
7. Below the “Global roles” enter the name of a role into the “Role to add” field
8. Press the **Add** button and configure global permissions of the role:

   ![](/img/jenkins/assign-roles-to-users/7.png)

For this role, all users will only have **global** read permissions.

The next step is to configure permissions per **project** role:

1. In the “Item roles” segment enter a name of the role. In this case, the same role will be configured as before.
2. In the patter field type `app_1*` and press the **Add button**. "**app_1**" is a regular expression, which will match all the jobs that start with "app_1" and configure the following permissions for our role.
   ![](/img/jenkins/assign-roles-to-users/8.png)
3. Press the **Save** button.

   ![](/img/jenkins/assign-roles-to-users/image4.png)

Our next step will be to assign users to our newly created group.
In order to achieve this we need:

1. Enter the **Assign Roles** tab in **“Manage and Assign Roles” menu**.
2. Enter the name of a user into **“User/group to add”** field below “Global roles” section and press the **Add** button.
3. Select a role for this newly added user from the table above. According to previous steps, we will assign the “test” user to the “dev-role”.
4. Enter the name of the same user into “User/group to add” field below “Item roles” section and press the **Add** button.
5. Choose a role you want to assign from the table above.
6. Press the **Save** button.

![](/img/jenkins/assign-roles-to-users/10.png)
