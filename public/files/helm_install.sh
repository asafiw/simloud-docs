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

if [ "$PIPELINE_ACTION" == "destroy" ]; then
  env
  helm uninstall my-release
  kubectl delete pvc data-my-release-mariadb-0
fi