#!/bin/sh
# One-command setup: create the kind cluster and secret if missing, build images
# tagged with the current commit, load them into kind and apply the manifests.
set -e
TAG=$(git rev-parse --short HEAD)

kind get clusters | grep -qx kind || kind create cluster

kubectl get secret ybm-secrets >/dev/null 2>&1 || kubectl create secret generic ybm-secrets \
  --from-literal=MONGODB_URI=mongodb://mongo:27017/ybm \
  --from-literal=JWT_SECRET=$(openssl rand -hex 32)

docker build -t ybm-backend:$TAG server
docker build -t ybm-frontend:$TAG .
kind load docker-image ybm-backend:$TAG ybm-frontend:$TAG
sed "s/IMAGE_TAG/$TAG/" k8s/*.yaml | kubectl apply -f -
kubectl rollout status deployment/backend
kubectl rollout status deployment/frontend

echo
echo "Deployed version $TAG. Open the app with:"
echo "  kubectl port-forward svc/frontend 8080:8080     # http://localhost:8080"
echo "  kubectl port-forward svc/prometheus 9090:9090   # http://localhost:9090"
