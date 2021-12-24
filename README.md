# Simple User & Auth API service using Nodejs, Mongodb, Docker and Kubernetes
see each folder README.md for API usage
this app contain two service :
auth servcie handle user register, login, refresh token and logout
user service handle user CRUD


## authorization schema flow (docs not yet exist)
- client register first, see auth/README.md register
- client login, see auth/README.md login
- save the token either in local storage or copy for just testing
- apply token to headers Authorization before hit any API
- 
## RUN using docker
make sure docker is installed in your machine
- docker-compose up

## RUN using kubernetes (load balancer not working yet hehehe 🐌 🐌 🐌)
make sure kubectl is installed in your machine, install minikube or cloud service to put clusters
- using minikube, minikube start
- using AWS cloud: 
    - install aws cli sdk and eksctl for cli based installation
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
