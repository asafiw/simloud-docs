# Simloud cost saving configuration

### Supported cloud resources3:

1. Standalone EC2 instances.
2. Auto scaling for EC2 instances.
3. RDS.

### Configuration:

1. Create Access role:

- Download following [CloudFormation script](https://drive.google.com/file/d/1JCgKJ4DRPt2Ipm6cvELNQAaYlvB8LtRW/view?usp=sharing).
- Open your AWS account console CloudFormation service and press the **Create stack** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image1.png)

- Chose the following options, upload the script and click on the **Next** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image2.png)
![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image3.png)
- Enter the name of the stack in the "Stack name" field.
![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/1.png)
- Scroll down and click again on the **Next** button.

 ![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image4.png)

- Scroll down and select the following options and press the **Create stack** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image5.png)

- Wait for a few minutes until the script completes (CREATE_COMPLETE status).

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image6.png)

- Go to **Outputs** tab and copy the following value:

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image7.png)

Paste this value into **Account** Role field and press the **Save** button.

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image8.png)

2. Per cloud resource add the following tag:

   Key: `simloud:environment`

   Value: `<your-environment-name>`

![](/home/simloud/IdeaProjects/simloud-docs/static/img/cost-saving/configuration/image9.png)
