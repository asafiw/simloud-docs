# How to hide parameters from "build with parameters" screen

In order to hide unnecessary parameters from “Build with parameters” screen, please follow these steps:

- Select the job you wish to remove parameters from.
- Press the **Configure** option in the job’s menu.

![](/img/jenkins/hide-params/image1.jpg)

- Scroll down to “This project is parameterized” option and press the cross button on the parameter you wish to remove.

![](/img/jenkins/hide-params/image2.jpg)

- Once the parameter is removed scroll down to the code of the pipeline and find the “parameters” block.
- Comment the parameter you wish to remove by adding `//` next to the corresponding line.

![](/img/jenkins/hide-params/image3.jpg)

- Scroll further down to the lowest stage and find the corresponding parameter.
- Change the appendix near the corresponding parameter from `params.GIT_REPO_URL` to `GIT_REPO_URL`.

Change the following:

![](/img/jenkins/hide-params/image4.png)

To the following:

![](/img/jenkins/hide-params/image5.png)
