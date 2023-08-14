---
title: How to use Docker buildx CLI
description: How to use Docker buildx CLI
layout: ../../layouts/MainLayout.astro
---

Currently, we have two approaches for working with Docker images - the classic Docker build and the more contemporary buildx. At the moment, we are in the midst of transitioning between the two. Docker buildx is an advanced extension of the traditional `docker build` command, offering enhanced capabilities for building multi-architecture Docker images efficiently. 

### **Benefits of Buildx over Docker Build:**
1. **Parallelism:** Buildx supports parallel execution of multiple build stages, what is particularly valuable when dealing with complex Dockerfiles or large projects, as it optimizes resource utilization and reduces build times.

2. **Multi-platform support:** Buildx enables the creation of images for multiple architectures (e.g., ARM, x86) from a single build definition, streamlining the process for diverse deployment environments. Define the target platforms using the - -platform flag during builder creation (for example: `--platform linux/arm64,linux/amd64`).

3. **Build caching:** Buildx incorporates advanced caching mechanisms that enhance build efficiency. It intelligently reuses layers and caches, resulting in faster subsequent builds and reduced network usage.

4. **Advanced build features:** It offers features like buildkit-based builds, build secrets, and inline build arguments for enhanced security and flexibility during the build process.

5. **Output formats:** Buildx supports multiple output formats, such as Docker images, OCI archives, and root filesystems, facilitating integration into various deployment workflows.

### **Using Docker buildx in simloud_ci.sh file**
To use Docker buildx CLI in your service deployment process, you need to make changes to simloud_ci.sh script. You can also familiarize yourself with its functionality using the example of **k8s-service-4** from our [GitLab repository](https://gitlab.com/simloud-demo/k8s-service-4/).

simloud_ci.sh example:
```
#!/bin/bash
docker buildx create --name buildx --use
aws ecr get-login-password \
  --region $CLUSTER_REGION | \
  docker login \
    --username AWS \
    --password-stdin <your-aws-account-id>.dkr.ecr.$CLUSTER_REGION.amazonaws.com
docker buildx build \
  -t $ECR_REPOSITORY \
  --cache-from=type=registry,ref=$ECR_REPOSITORY:cache \
  --cache-to=mode=max,image-manifest=true,oci-mediatypes=true,type=registry,ref=$ECR_REPOSITORY:cache \
  --push \
  .
docker pull $ECR_REPOSITORY:latest && docker tag $ECR_REPOSITORY:latest $DOCKER_IMAGE_NAME:latest
```
In this section brief explanation will be provided:

**Step 1: Creating a Buildx builder instance**    

`docker buildx create --name buildx --use`
This step creates a new Docker Buildx builder instance named "buildx" (you can use any other name) and sets it as the active builder for subsequent commands. 

**Step 2: Authenticate with AWS ECR**

`aws ecr get-login-password --region $CLUSTER_REGION | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.$CLUSTER_REGION.amazonaws.com`

This step uses the AWS CLI to retrieve an authentication token from Amazon Elastic Container Registry. It then uses this token to authenticate the Docker client with the ECR repository in the specified AWS region. This allows Docker to securely push and pull images from the repository. 

***Please note***, that $CLUSTER_REGION variable is passed through Jenkins parameters.

**Step 3: Build and push Docker image with Buildx**

```
docker buildx build \
  -t $ECR_REPOSITORY \
  --cache-from=type=registry,ref=$ECR_REPOSITORY:cache \
  --cache-to=mode=max,image-manifest=true,oci-mediatypes=true,type=registry,ref=$ECR_REPOSITORY:cache \
  --push \
  .
```
This step utilizes the Buildx builder instance to build a Docker image. It specifies the following options:

`-t $ECR_REPOSITORY`: Tags the built image with the specified ECR repository URL.

`--cache-from`: Specifies the source for build caching, which is an ECR repository acting as a cache.

`--cache-to`: Specifies the target for caching, allowing caching to be shared between builds.

`--push`: Pushes the built image to the specified ECR repository.

`.`: Specifies the build context, which is the current directory (it is equal to -f Dockerfile).

***Please note***, that $ECR_REPOSITORY variable is passed through Jenkins parameters.\
<br>

**Step 4: Pull and tag latest image**

This step is required because of Jenkins pipelines set up to rely on a locally available Docker image file. It is a temporary workaround while we are switching to the new approach.

`docker pull $ECR_REPOSITORY:latest && docker tag $ECR_REPOSITORY:latest $DOCKER_IMAGE_NAME:latest` - 
in this final step, the script pulls the latest image from the ECR repository and then tags it with the name needed for the Jenkins pipeline.\
<br>

 

***Please, note:*** there are certain pros and cons of using Buildx CLI in the current implementation of Jenkins pipelines, observed during the testing of demo k8s-services:

- during the initial job execution, it requires slightly more time because of cache creating, whereas all subsequent builds run significantly faster.
- due to the necessity of pulling an image for successful pipeline operation, a larger ephemeral storage size is sometimes required for job completion (approximately 7GiB will suffice for k8s-service-1/2 and 10GiB for k8s-service-3).
- more space in ECR is utilized - buildx exports multiple images at once, as opposed to a single image in the current version.