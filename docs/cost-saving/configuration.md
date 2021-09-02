# Simloud cost saving configuration

Supported cloud resources:

Stand alone EC2 instances.
Auto scaling for EC2 instances
RDS

Configuration:
Create Access role:
Download following CloudFormation script.
Open your AWS account console CloudFormation service and press the Create stack button.

Chose the following options, upload the script and click on the next button:

Scroll down and click again on the next button:

Scroll down and select the following options and press the create stack button:

Wait couple of minutes until the script completes (CREATE_COMPLETE)

Go to Outputs tab and copy the following value:

Paste this value into Account Role field and press the save button:

Per cloud resource add the following tag:

Key: simloud:environment
Value: your-environment-name
