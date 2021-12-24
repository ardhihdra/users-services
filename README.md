# Simple User & Auth API service using Nodejs, Mongodb, Docker and Kubernetes
see each folder README.md for API usage
this app contain two service :
auth servcie handle user register, login, refresh token and logout
user service handle user CRUD


## RUN using docker
make sure docker is installed in your machine
- docker-compose up

## RUN using kubernetes (not working yet hehehe 🐌 🐌 🐌)
make sure kubectl is installed in your machine, install minikube or cloud service to put clusters
- using minikube, minikube start
- using AWS cloud: 
    - eksctl create cluster \                                                          
        --zones us-east-2b --zones us-east-2a --name #yourclustername# \
        --version 1.21 \
        --with-oidc \
        --without-nodegroup
    - aws eks update-kubeconfig --region us-east-2 --name #yourclustername#
    - change zones and region above accordingly
    - kubectl config use-context #createdcontextnameabove#
- cd db && kubectl apply -f k8s/
- cd ../auth && kubectl apply -f k8s/
- cd ../user && kubectl apply -f k8s/
- cd ../ingress && kubectl apply -f k8s/
- further work unify all of them 😢
