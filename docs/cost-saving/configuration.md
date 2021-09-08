# Simloud cost saving configuration

### Supported cloud resources3:

1. Stand alone EC2 instances.
2. Auto scaling for EC2 instances
3. RDS

### Configuration:

1. Create Access role:

- Download following [CloudFormation script](https://drive.google.com/file/d/1JCgKJ4DRPt2Ipm6cvELNQAaYlvB8LtRW/view?usp=sharing).
- Open your AWS account console CloudFormation service and press the **Create stack** button.

![](/img/cost-saving/configuration/image1.png)

- Chose the following options, upload the script and click on the **Next** button.

![](/img/cost-saving/configuration/image2.png)
![](/img/cost-saving/configuration/image3.png)

- Scroll down and click again on the **Next** button.

![](/img/cost-saving/configuration/image4.png)

- Scroll down and select the following options and press the **Create stack** button.

![](/img/cost-saving/configuration/image5.png)

- Wait couple of minutes until the script completes (CREATE_COMPLETE status).

![](/img/cost-saving/configuration/image6.png)

- Go to Outputs tab and copy the following value:

![](/img/cost-saving/configuration/image7.png)

Paste this value into Account Role field and press the **Save** button.

![](/img/cost-saving/configuration/image8.png)

2. Per cloud resource add the following tag:

   Key: `simloud:environment`.

   Value: `<your-environment-name>`.

![](/img/cost-saving/configuration/image9.png)
