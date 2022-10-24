# Simloud cost saving configuration

### 1. Billing (actual usage cost)     
To grant Simloud access to the calculation of actual usage cost, need to perform manual operations (they cannot be automated by Simloud due to restrictions from AWS side):
   
**Step 1** - enable [cost explorer](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-enable.html).

**Step 2** - enable Simloud tag through cost allocation tag:
1.  Create and deploy at least one [infrastructure](https://console.aws.amazon.com/billing/home#/preferences/tags) using Simloud UI.
2.  In AWS Console, go to Services Billing Cost allocation tags, choose **User-Defined Cost Allocation Tags** tab.
3.  Find _simloud:environment_ tag (you can search input box), check it and press **Activate**.
    If tag was not found, need to wait up to 24 hours OR try to press **Refresh**.

**Step 3** - required If you use nested (linked) accounts:
1.  In [AWS Console](https://console.aws.amazon.com/cost-management/home#/settings), sign in it to root account.
2.  Go to Services Cost Explorer Preferences.
3.  In AWS Cost Explorer section, check **Linked Account Access**, **Linked Account Refunds and Credits**, and **Linked Account Discounts**.
4.  Press **Save preferences**.
    ![](/img/cost-saving/configuration/image2.png)

### 2. Configure Account in Simloud Portal
1. In Simloud Portal enter on Cloud management > accounts page, create new account and click on "How to get Account role?" button
2. Then follow this instruction.