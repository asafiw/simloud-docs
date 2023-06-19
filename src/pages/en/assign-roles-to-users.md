---
title: How to manage and assign roles to users
description: How to manage and assign roles to users
layout: ../../layouts/MainLayout.astro
---

Before we start, it is important to understand that there exist three distinct categories of roles: global, item, and node roles. In the context of Jenkins, global roles represent policies across all projects, whereas item and node roles are specific to individual projects or agents. In this particular instance, we are establishing a role named "dev-role" and associating it with the user "dev".

### To create and configure this role, please follow these steps:

1. Access the Jenkins dashboard and navigate to the "**Manage Jenkins**" menu.
2. Select "**Manage Plugins**" and click on "**Available plugins**." Install the "Role-based Authorization Strategy" plugin.

   ![](/img/jenkins/assign-roles-to-users/1.png)
   ![](/img/jenkins/assign-roles-to-users/2.png)
   ![](/img/jenkins/assign-roles-to-users/3.png)

3. Return to the **Manage Jenkins** menu on the dashboard and choose the **Configure Global Security** in the tab **Security**
   ![](/img/jenkins/assign-roles-to-users/4.png)
4. In the "**Authentication**" section, select the "**Authorization**" option. From the drop-down menu, choose "Role-based strategy" and save the settings.
   ![](/img/jenkins/assign-roles-to-users/5.png)
5. Go back to the **Manage Jenkins** menu again. Select **Manage and Assign Roles**.
   ![](/img/jenkins/assign-roles-to-users/6.png)
6. Select **Manage Roles**.
7. Below the “Global roles” enter the name of a role into the “Role to add” field
8. Click the **Add** button and configure global permissions of the role:

   ![](/img/jenkins/assign-roles-to-users/7.png)

For this role, all users will only have **global** read permissions.

The next step involves configuring permissions per **project** role:

1. In the “Item roles” section enter the name of the role. In this case, the same role will be configured as before.
2. In the "**Pattern**" field, enter `app_1*` and press the **Add button**. "**app_1**" is a regular expression, which will match all the jobs that start with "app_1" and configure the following permissions for our role.
   ![](/img/jenkins/assign-roles-to-users/8.png)
3. Press the **Save** button.

   ![](/img/jenkins/assign-roles-to-users/image4.png)

Our next step will be to assign users to our newly created group.
In order to achieve this we need:

1. Enter the **Assign Roles** tab in **“Manage and Assign Roles” menu**.
2. Enter the name of the user into **“User/group to add”** field below “Global roles” section and click the **Add** button.
3. Select a role for this newly added user from the table above. According to previous steps, we will assign the “test” user to the “dev-role”.
4. Enter the name of the same user into “User/group to add” field below “Item roles” section and press the **Add** button.
5. Choose the appropriate role from the table above.
6. Press the **Save** button.

![](/img/jenkins/assign-roles-to-users/10.png)
