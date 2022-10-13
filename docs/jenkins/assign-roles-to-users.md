# How to manage and assign roles to users

Before we begin, it is important to understand that there are three types of roles: global, item and node roles. In Jenkins, global roles represent policies across all projects, while item and node roles are configured per project/agent. Here we will create a role called "dev-role" and assigning it to the user "dev".
### To create and configure this role we will execute the following steps:

1. Enter the **Manage Jenkins** menu on the dashboard.
2. Select **Manage and Assign Roles**.
3. Select **Manage Roles**.
4. To add a role, fill out the "Role to add" field below the "Global roles".
5. Press the **Add** button and configure global permissions of the role.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image1.png)

For this role, all users will only have **global** read permissions.

The next step is to configure permissions per **project** role:

1. In the “Item roles” segment enter a name of the role. In this case, the same role will be configured as before.
2. In the pattern field type `app_1*` and press the **Add button**. "**app_1***" is a regular expression, which will match all the jobs that start with "app_1" and configure the following permissions for our role.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image2.png)
![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image3.png)

3. Press the **Save** button at the bottom of the screen.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image4.png)

In the next step, we'll assign users to our newly created group.
To achieve this, we need:

1. Enter the **Assign Roles** tab in **“Manage and Assign Roles” menu**.
2. Enter the name of a user into **“User/group to add”** field below “Global roles” section and press the **Add** button.
3. Select a role for this newly added user from the table above. According to previous steps, we will assign the “dev” user to the “dev-role”.
4. Enter the name of the same user into “User/group to add” field below “Item roles” section and press the **Add** button.
5. Choose a role you want to assign from the table above.
6. Press the **Save** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image5.png)
