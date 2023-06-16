---
title: How to hide parameters from "build with parameters" screen
description: How to hide parameters from "build with parameters" screen
layout: ../../layouts/MainLayout.astro
---

In order to hide unnecessary parameters from “Build with parameters” screen, please, follow these steps:

- Select the job you wish to remove parameters from.
- Click on the **Configure** option in the job’s menu.

![](/img/jenkins/hide-params/image1.jpg)

- In the configuration page, locate the "This project is parameterized" section and click the cross button next to the parameter you want to remove.

![](/img/jenkins/hide-params/image2.jpg)

- Once the parameter is removed, scroll down to the pipeline code and find the "parameters" block.
- Comment out the parameter you wish to remove by adding `//` next to the corresponding line.

![](/img/jenkins/hide-params/image3.jpg)


- Continue scrolling down to the lowest level and find the corresponding parameter.
- Modify the appendix near the corresponding parameter from `params.GIT_REPO_URL` to `GIT_REPO_URL`.

Change the following:

![](/img/jenkins/hide-params/image4.png)

To the following:

![](/img/jenkins/hide-params/image5.png)
