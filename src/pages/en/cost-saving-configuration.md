---
title: Simloud cost saving configuration
description: Simloud cost saving configuration
layout: ../../layouts/MainLayout.astro
---


### 1. Billing (actual usage cost)     
To grant Simloud access to the calculation of actual usage cost, need to perform manual operations (it cannot be automated by Simloud due to restrictions from AWS side):
   
**Step 1** - enable [cost explorer](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-enable.html).

**Step 2** - enable Simloud tag through cost allocation tag:
- Create and deploy at least one infrastructure using Simloud UI. Please, follow the instruction in documentation ["_**How to create deployment**_"](/en/create-deployment/)
- In AWS Console, go to Services Billing Cost allocation tags, choose **[User-Defined Cost Allocation Tags](https://console.aws.amazon.com/billing/home#/preferences/tags)** tab.
- Find _simloud:environment_ tag (by searching the input box), check it and press **Activate**.
   If tag was not found, need to wait up to 24 hours OR try to press **Refresh**.

   ![](/img/cost-saving/configuration/2.png)


**Step 3** - required If you use nested (linked) accounts:
1.  In [AWS Console](https://console.aws.amazon.com/cost-management/home#/settings), sign in to the root account.
2.  Go to Services [Cost Explorer Preferences](https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1&skipRegion=true#/settings).
3.  In AWS Cost Explorer section, check **Linked Account Access**, **Linked Account Refunds and Credits**, and **Linked Account Discounts**.
4.  Press **Save preferences**.
    ![](/img/aws/enable-cost-explorer/image3.png)

    