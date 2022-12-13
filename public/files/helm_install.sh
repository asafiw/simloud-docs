#!/bin/bash

if [ "$PIPELINE_ACTION" == "" ]; then
  echo "Please, provide action."
fi

if [ "$PIPELINE_ACTION" == "deploy" ]; then
  helm repo add bitnami https://charts.bitnami.com/bitnami
  env
  echo "helm upgrade --install my-release bitnami/wordpress --set wordpressUsername=$wordpressUsername --set wordpressPassword=$wordpressPassword --set wordpressEmail=$wordpressEmail --set ingress.enabled=true --set ingress.annotations.\"kubernetes\.io/ingress\.class=nginx\" --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL}"
  helm upgrade --install my-release bitnami/wordpress \
  --set wordpressUsername=$wordpressUsername \
  --set wordpressPassword=$wordpressPassword \
  --set wordpressEmail=$wordpressEmail \
  --set ingress.enabled=true \
  --set ingress.selfSigned=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class=nginx" \
  --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL}
fi

if [ "$PIPELINE_ACTION" == "update" ]; then
  helm repo add bitnami https://charts.bitnami.com/bitnami

  env
  echo "helm upgrade --install my-release bitnami/wordpress --set wordpressUsername=$wordpressUsername --set wordpressPassword=$wordpressPassword --set wordpressEmail=$wordpressEmail --set serviceContainer.resources.requests.cpu=\"400m\" --set serviceContainer.resources.requests.memory=\"1024Mi\" --set serviceContainer.resources.limits.cpu=\"600m\" --set serviceContainer.resources.limits.memory=\"1536Mi\""
  helm upgrade --install my-release bitnami/wordpress \
  --set wordpressUsername=$wordpressUsername \
  --set wordpressPassword=$wordpressPassword \
  --set wordpressEmail=$wordpressEmail \
  --set ingress.enabled=true \
  --set ingress.selfSigned=true \
  --set ingress.annotations."kubernetes\.io/ingress\.class=nginx" \
  --set ingress.hostname=${HostnamePrefix}.${JENKINS_BASEURL} \
  --set serviceContainer.resources.requests.cpu="600m" \
  --set serviceContainer.resources.requests.memory="1024Mi" \
  --set serviceContainer.resources.limits.cpu="800m" \
  --set serviceContainer.resources.limits.memory="1536Mi"
echo "Chart was succesfully upgrade!"
fi

if [ "$PIPELINE_ACTION" == "destroy" ]; then
  env
  helm uninstall my-release
  kubectl delete pvc data-my-release-mariadb-0
fi