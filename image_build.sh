#!/usr/bin/env bash

kubectl delete -f deploy.yaml

#eval $(minikube docker-env)

docker build ./database/ --tag "database"

docker build ./backend/ --tag "backend"

docker build ./frontend/ --tag "frontend"

kubectl apply -f deploy.yaml

minikube service load-balancer --wait=2 --interval=5 --url