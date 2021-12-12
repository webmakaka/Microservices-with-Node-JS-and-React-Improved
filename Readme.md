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

```
$ sudo apt install -y jq
```

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

<br/>

```
$ export \
    PROFILE=microservices-with-nodejs-and-react \
    MEMORY=8192 \
    CPUS=4 \
    DRIVER=docker \
    KUBERNETES_VERSION=v1.22.4
```

<br/>

```
$ {
    minikube --profile ${PROFILE} config set memory ${MEMORY}
    minikube --profile ${PROFILE} config set cpus ${CPUS}
    minikube --profile ${PROFILE} config set disk-size 20g

    minikube --profile ${PROFILE} config set vm-driver ${DRIVER}

    minikube --profile ${PROFILE} config set kubernetes-version ${KUBERNETES_VERSION}
    minikube start --profile ${PROFILE} --embed-certs

    // Enable ingress
    minikube addons --profile ${PROFILE} enable ingress

    // Enable registry
    // minikube addons --profile ${PROFILE} enable registry
}
```

<br/>

    $ minikube --profile ${PROFILE} ip
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

<br/>

**stripe.com**

Developers --> API keys

<br/>

```
// <STRIPE_SECRET_KEY> from stripe.com
$ kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<STRIPE_SECRET_KEY>
```

<br/>

app/client/src/pages/orders/[orderId].js

Set your **stripeKey** (stripe public key) instead mine.

<br/>

**Need to update baseURL (Ingress HostName).**

/app/client/src/api

<br/>

```
// It will show after skaffold starts
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

[more details](./docs/02-client-service.md)

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
auth-deployment-84bffc5564-cjqzt               1/1     Running   0          64s
auth-mongo-deployment-57db5fc46f-9g7wh         1/1     Running   0          64s
client-deployment-77f9896bdb-zdwwg             1/1     Running   0          64s
expiration-deployment-69b678458d-l5w2p         1/1     Running   0          63s
expiration-redis-deployment-777554b4f8-vkttt   1/1     Running   0          63s
nats-deployment-6486d9669f-lmv8p               1/1     Running   0          63s
orders-deployment-765c6cfc5b-kcjpr             1/1     Running   0          63s
orders-mongo-deployment-5997f95f7f-hzf4l       1/1     Running   0          63s
payments-deployment-bff95d98c-qv6w4            1/1     Running   0          63s
payments-mongo-deployment-7ccdb6f6c9-tqlzk     1/1     Running   0          63s
tickets-deployment-79b9854cdf-5d8ld            1/1     Running   0          63s
tickets-mongo-deployment-545dc7d7c5-md59k      1/1     Running   0          63s
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
    --request POST \
    --url https://ticketing.dev/api/users/signup \
    | jq
```

<br/>

```
// SIGN IN
$ curl \
    --data '{"email":"marley@example.com", "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url http://ticketing.dev/api/users/signin \
    | jq
```

<br/>

```
// GET CURRENT USER
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --header "Content-Type: application/json" \
    --request GET \
    --url https://ticketing.dev/api/users/currentuser \
    | jq
```

<br/>

```
// CREATE TICKET
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"title":"concert", "price":10}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url https://ticketing.dev/api/tickets \
    | jq
```

<br/>

```
// GET ALL TICKETS
$ curl \
    --insecure \
    --header "Content-Type: application/json" \
    --request GET \
    --url https://ticketing.dev/api/tickets/ \
    | jq
```

<br/>

```
// GET TICKET
$ curl \
    --insecure \
    --header "Content-Type: application/json" \
    --request GET \
    --url https://ticketing.dev/api/tickets/6037eaacbcc4a0001acb6d50 \
    | jq
```

<br/>

```
// UPDATE TICKET
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"title":"new concert", "price":100}' \
    --header "Content-Type: application/json" \
    --request PUT \
    --url https://ticketing.dev/api/tickets/603b0e8036b9f80019154277 \
    | jq
```

<br/>

```
// CREATE ORDER
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"ticketId":"604150ce9a43b7001a54b720"}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url https://ticketing.dev/api/orders \
    | jq
```

<br/>

```
// GET ALL ORDERS
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --header "Content-Type: application/json" \
    --request GET \
    --url https://ticketing.dev/api/orders \
    | jq
```

<br/>

```
// GET SINGLE ORDER
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --header "Content-Type: application/json" \
    --request GET \
    --url https://ticketing.dev/api/orders/604150e7d42b880019802e99 \
    | jq
```

<br/>

```
// CREATE PAYMENT
$ curl \
    --insecure \
    --cookie /tmp/cookies.txt \
    --data '{"orderId":"5ec6c93f6c627e0023725faf", "token": "tok_visa"}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url https://ticketing.dev/api/payments/ \
    | jq
```

<br/>

### [Development](./docs/Development.md)

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
