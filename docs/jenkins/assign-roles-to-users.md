# How to manage and assign roles to users?

Before we begin it is important to know that there are three types of roles: global, item and node roles. Global roles represent the policies across all Jenkins, while item and node roles are configured per project/agent. In this example we will configure a role for a developer called “dev-role” and assign it to the “dev” user.

### To create and configure this role we will execute the following steps:

1. Enter the **Manage Jenkins** menu on the dashboard.
2. Select **Manage and Assign Roles**.
3. Select **Manage Roles**.
4. Below the “Global roles” enter the name of a role into the “Role to add” field
5. Press the **Add** button and configure global permissions of the role:

![](/img/jenkins/assign-roles-to-users/image1.png)

In our case all users belonging to this role will only have **global** read permissions. Next we will configure per **project** role permissions:

1. In the “Item roles” segment enter a name of the role. In this case, as we configure the same role it will remain the same.
2. In the patter field type `app_1*` and press the **Add button**. `app_1*` is a regular expression, which will match all the jobs that start with "app_1" and configure the following permissions for our role.

![](/img/jenkins/assign-roles-to-users/image2.png)
![](/img/jenkins/assign-roles-to-users/image3.png)

3. Press the **Save** button at the bottom of the screen.

![](/img/jenkins/assign-roles-to-users/image4.png)

Next we will assign users to our newly created group.
In order to achieve this:

1. Enter the **Assign Roles** tab in “Manage and Assign Roles” menu.
2. Enter the name of a user into “User/group to add” field below “Global roles” section and press the **Add** button.
3. Choose a role you want to assign to this newly added user in the table above. In our case, as per previous steps, we are going to assign the “dev” user to the “dev-role”.
4. Enter the name of the same user into “User/group to add” field below “Item roles” section and press the **Add** button.
5. Choose a role you want to assign in the table above.
6. Press the **Save** button at the bottom of this page.

![](/img/jenkins/assign-roles-to-users/image5.png)
