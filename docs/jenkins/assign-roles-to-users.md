# How to manage and assign roles to users

Before we begin, it is important to understand that there are three types of roles: global, item and node roles. In Jenkins, global roles represent policies across all projects, while item and node roles are configured per project/agent. As default Jenkins creates the admin user with global permissions.
### To create and configure this role we will execute the following steps:

1. Enter the **Manage Jenkins** menu on the dashboard.
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new1.png)
2. Select **Configure Global Security** in the tab **Security**.
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new2.png)
3. In the **Authentication** segment - choose **Authorization** option. From drop-down menu select
   "Project-based matrix authorization strategy" option.
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new3.png)
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new4.png)
4. To add a user, select the "Add user" button below the table with permissions.
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new5.png)
5. Select permissions you need for current user. Press the "Save" button. 
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new6.png)
   ![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/new7.png)

In the next step, we'll assign users to our newly created group.
To achieve this, we need:

1. Enter the **Assign Roles** tab in **“Manage and Assign Roles” menu**.
2. Enter the name of a user into **“User/group to add”** field below “Global roles” section and press the **Add** button.
3. Select a role for this newly added user from the table above. According to previous steps, we will assign the “dev” user to the “dev-role”.
4. Enter the name of the same user into “User/group to add” field below “Item roles” section and press the **Add** button.
5. Choose a role you want to assign from the table above.
6. Press the **Save** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/jenkins/assign-roles-to-users/image5.png)
