# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

### [Previous Version (close to original)](https://github.com/webmakaka/Microservices-with-Node-JS-and-React)

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

<br/>

## How to run project in development mode (current version)

<br/>

```
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=MY_JWT_SECRET
```

<!--

    // <STRIPE_SECRET_KEY> from stripe.com
    $ kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<STRIPE_SECRET_KEY>

<br/>


-->

<br/>

/app/client/src/api

Need to update baseURL.

<br/>

```
$ kubectl get ingress
NAME          CLASS    HOSTS           ADDRESS        PORTS   AGE
ingress-svc   <none>   ticketing.dev   192.168.49.2   80      8m41s
```

<br/>

Take ADDRESS and modify baseURL.

<br/>

baseURL should looks like:

<br/>

```
192-168-49-2.kubernetes.default.svc.cluster.local
```

<br/>

(more details)[./02-client-service.md]

<br/>

    $ cd skaffold

<!--

    $ docker login

-->

Need to update my docker image name webmakaka/microservices\*\*\* to your in scripts from skaffold and k8s folders.

    $ skaffold dev

<br/>

```
$ kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
auth-deployment-7449958bb9-h6dg8               1/1     Running   0          6m1s
auth-mongo-deployment-78b8bb6485-c4zhn         1/1     Running   0          6m1s
client-deployment-987955d46-vdnbm              1/1     Running   0          6m1s
expiration-deployment-69c859448b-s6sxh         1/1     Running   0          6m
expiration-redis-deployment-86595f5966-hk9m6   1/1     Running   0          6m
nats-deployment-85b984b55f-54lj5               1/1     Running   0          6m1s
orders-deployment-68845dc6b7-gtwv4             1/1     Running   0          6m1s
orders-mongo-deployment-56f88ccf79-hknr2       1/1     Running   0          6m1s
tickets-deployment-58874789d4-vv9fc            1/1     Running   0          6m1s
tickets-mongo-deployment-5f4956cd4c-bmj69      1/1     Running   0          6m1s

```

<br/>

chrome browser -> https://ticketing.dev/

<br/>

type: **thisisunsafe** in the browser window with security warning.

<br/>

### Requests to app

```
// SIGN UP
$ curl \
    --insecure \
    --cookie-jar /tmp/cookies.txt \
    --data '{"email":"marley@example.com", "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST https://ticketing.dev/api/users/signup \
    | python -m json.tool
```

<br/>

```
// SIGN IN
$ curl \
    --data '{"email":"marley@example.com", "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST http://ticketing.dev/api/users/signin \
    | python -m json.tool
```

<br/>

```
// GET CURRENT USER
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --header "Content-Type: application/json" \
    --request GET https://ticketing.dev/api/users/currentuser \
    | python -m json.tool
```

<br/>

```
// CREATE TICKET
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"title":"concert", "price":10}' \
    --header "Content-Type: application/json" \
    --request POST https://ticketing.dev/api/tickets \
    | python -m json.tool
```

<br/>

```
// GET TICKET
$ curl \
    --insecure \
    --header "Content-Type: application/json" \
    --request GET https://ticketing.dev/api/tickets/6037eaacbcc4a0001acb6d50 \
    | python -m json.tool
```

<br/>

```
// GET ALL TICKET
$ curl \
    --insecure \
    --header "Content-Type: application/json" \
    --request GET https://ticketing.dev/api/tickets/ \
    | python -m json.tool
```

<br/>

```
// UPDATE TICKET
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"title":"new concert", "price":100}' \
    --header "Content-Type: application/json" \
    --request PUT https://ticketing.dev/api/tickets/603b0e8036b9f80019154277 \
    | python -m json.tool
```

<br/>

```
// CREATE ORDER
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"ticketId":"603f00452d76c800181b6074"}' \
    --header "Content-Type: application/json" \
    --request POST https://ticketing.dev/api/orders \
    | python -m json.tool
```

<br/>

### [Development](./Development.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
