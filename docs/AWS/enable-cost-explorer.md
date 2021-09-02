# How to enable cost explorer?

Billing (actual usage cost)
To grant Simloud access to the calculation of actual usage cost, need to perform manual operations (they cannot be automated by Simloud due to restrictions from AWS side):
Step 1 - enable cost explorer:
https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ce-enable.html
Step 2 - enable Simloud tag through cost allocation tag:

1.  Create and deploy at least one infrastructure using Simloud UI - https://console.aws.amazon.com/billing/home#/preferences/tags
2.  In AWS Console, go to Services Billing Cost allocation tags, chose User-Defined Cost Allocation Tags tab
    Find simloud:environment tag (you can search input box ), check it and press “Activate” [2] [3] [4]
3.

a.  
Screenshot
If tag was not found, need to wait up to 24 hours OR try to press “Refresh”[5]

https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
Step 3 - required If you use nested (linked) accounts:

1.  2.  In AWS Console, sign in it to root account
        [1] https://console.aws.amazon.com/cost-management/home#/settings

Go to Services Cost Explorer Preferences ( ) In AWS Cost Explorer section, check “Linked Account Access” , “Linked Account Refunds” and “Credits and Linked Account [2] [3] 3.  
Discounts”[4]
Press “Save preferences”[5] 4.  
Screenshot
