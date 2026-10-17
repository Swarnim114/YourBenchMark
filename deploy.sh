#!/bin/sh
# Build images tagged with the current commit, load them into kind and apply the manifests.
set -e
TAG=$(git rev-parse --short HEAD)
docker build -t ybm-backend:$TAG server
docker build -t ybm-frontend:$TAG .
kind load docker-image ybm-backend:$TAG ybm-frontend:$TAG
sed "s/IMAGE_TAG/$TAG/" k8s/*.yaml | kubectl apply -f -
kubectl rollout status deployment/backend
kubectl rollout status deployment/frontend
