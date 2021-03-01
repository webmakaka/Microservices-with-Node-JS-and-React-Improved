# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## Messaging (NATS Streaming Server) Service

<br/>

### 14. NATS Streaming Server - An Event Bus Implementation

<br/>

    $ cd app
    $ mkdir nats-test
    $ cd nats-test
    $ npm init -y
    $ npm install --save node-nats-streaming ts-node-dev typescript @types/node

<br/>

    $ tsc --init

```
$ kubectl get pods
NAME                                        READY   STATUS    RESTARTS   AGE
auth-deployment-59d887f775-h9nxq            1/1     Running   0          109m
auth-mongo-deployment-d79ff8f7c-lj92m       1/1     Running   0          109m
client-deployment-65576ffc88-vxvv4          1/1     Running   0          109m
nats-deployment-6bf654c867-cvc2q            1/1     Running   0          109m
tickets-deployment-5c57b69d6c-kbb6c         1/1     Running   0          109m
tickets-mongo-deployment-869f7b4c75-9q48f   1/1     Running   0          109m
```

<br/>

    $ kubectl port-forward nats-deployment-6bf654c867-cvc2q 4222:4222
    $ kubectl port-forward nats-deployment-6bf654c867-cvc2q 8222:8222

<br/>

    $ cd nats-test
    $ npm run publish
    $ npm run listen

<br/>
    
    console with publisher: rs + [Enter]

<br/>

**browser web ui with stats**

    http://localhost:8222/streaming
    http://localhost:8222/streaming/channelsz?subs=1

<br/>

    $ cd common
    $ npm install --save node-nats-streaming
    $ npm version patch

<br/>

**push sources to github**

<br/>

```
$ cd tickets/
$ ncu -u
$ npm update @webmak/microservices-common
```

<br/>

```
$ cd nats-test/
$ npm install @webmak/microservices-common
```

<!--

$ npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
$ npm install @webmakaka/microservices-common

-->

<br/>

    $ kubectl port-forward nats-deployment-7d9dfd65d9-jjhgq 4222:4222
    $ cd app/nats-test
    $ npm run listen

<br/>

```
// CREATE TICKET
```

<br/>

**returns:**

```
***
[tickets] Event published to subject ticket:created
***
```

<br/>

```
Listener connected to NATS
Message received: ticket:created / payments-service
Event data!  {
  id: '603b0e8036b9f80019154277',
  title: 'concert',
  price: 10,
  userId: '603b06996ed60700194e7eee'
}
```

<br/>

```
// UPDATE TICKET
```

<br/>

**returns:**

```
***
[tickets] Event published to subject ticket:updated
***
```

<br/>

**Run Tests:**

    $ cd tickets
    $ npm run test

<br/>

**returns:**

```
Test Suites: 4 passed, 4 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        14.75 s
Ran all test suites.
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
