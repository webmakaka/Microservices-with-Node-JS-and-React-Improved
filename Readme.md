# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

### [Previous Version close to original](https://github.com/webmakaka/Microservices-with-Node-JS-and-React)

<br/>

### Here we will develop only project 2 from course.

<br/>

## Preparation

I am working in ubuntu linux 20.04.

Minikube, Kubectl, Docker, Skaffold should be installed.

<br/>

### Minikube setup

```
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

<br/>

### Kubectl setup

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

<br/>

### Skaffold setup

```
$ curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && chmod +x ./skaffold && sudo mv ./skaffold /usr/local/bin
```

<br/>

### Run minikube

```
$ {
    minikube --profile microservices-with-nodejs-and-react config set memory 8192
    minikube --profile microservices-with-nodejs-and-react config set cpus 4
    minikube --profile microservices-with-nodejs-and-react config set disk-size 20g

    // minikube --profile microservices-with-nodejs-and-react config set vm-driver virtualbox
    minikube --profile microservices-with-nodejs-and-react config set vm-driver docker

    minikube --profile microservices-with-nodejs-and-react config set kubernetes-version v1.20.4
    minikube start --profile microservices-with-nodejs-and-react --embed-certs
}
```

<br/>

    // Enable ingress
    $ minikube addons --profile microservices-with-nodejs-and-react enable ingress

<br/>

    $ minikube --profile microservices-with-nodejs-and-react ip
    192.168.49.2

<br/>

    $ sudo vi /etc/hosts

```
#---------------------------------------------------------------------
# Minikube
#---------------------------------------------------------------------
192.168.49.2 ticketing.dev
```

<!--

<br/>

## How to run project

<br/>

    $ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

    // <STRIPE_SECRET_KEY> from stripe.com
    $ kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<STRIPE_SECRET_KEY>

<br/>

    $ cd 22_Back_to_the_Client
    $ cd skaffold

    $ docker login

Need to update my docker image name webmakaka/grider-ms-app2\*\*\* to your in scripts from skaffold and k8s folders.

    $ skaffold dev

<br/>

    $ kubectl get pods
    NAME                                           READY   STATUS    RESTARTS   AGE
    auth-deployment-57d779fd9-48s9v                1/1     Running   0          24s
    auth-mongo-deployment-579c6dbd8f-69jbv         1/1     Running   0          23s
    client-deployment-f5cfc5b8d-k2lxp              1/1     Running   0          23s
    expiration-deployment-6bb67856b4-jkkbl         1/1     Running   0          23s
    expiration-redis-deployment-5b58b869fd-hmq5f   1/1     Running   0          23s
    nats-deployment-76479997ff-lpss8               1/1     Running   0          23s
    orders-deployment-5c68dff5c9-dq6hl             1/1     Running   0          23s
    orders-mongo-deployment-6896c8b9-42vpd         1/1     Running   0          23s
    payments-deployment-68d4c7f4ff-nfsxb           1/1     Running   0          23s
    payments-mongo-deployment-c89cb4fc7-4ggn7      1/1     Running   0          23s
    tickets-deployment-7b746fff9-tvhzw             1/1     Running   0          23s
    tickets-mongo-deployment-54f456bd95-hv9fb      1/1     Running   0          22s

<br/>

chrome browser -> https://ticketing.dev/

<br/>

type: **thisisunsafe** in the browser window with security warning.

-->

<br/>

### [Development](./Development.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
