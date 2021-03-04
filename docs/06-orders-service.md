# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## Orders Service

<br/>

### 17. Cross-Service Data Replication In Action

<br/>

```
$ cd common
$ npm version patch
```

**push changes to github**

```
$ cd orders/
$ npm install @webmak/microservices-common
$ npm run test
```

<br/>

**returns:**

```
Test Suites: 4 passed, 4 total
Tests:       2 todo, 7 passed, 9 total
Snapshots:   0 total
Time:        14.434 s
Ran all test suites.
```

<br/>

### 18. Understanding Event Flow

<br/>

```
$ cd common
$ npm version patch
```

**push changes to github**

```
$ cd orders/
$ npm install @webmak/microservices-common
$ npm run test
```

<br/>

### 19. Listening for Events and Handling Concurrency Issues

<br/>

    $ cd tickets
    $ npm install --save mongoose-update-if-current

    $ cd orders
    $ npm install --save mongoose-update-if-current

<br/>

**push changes to github**

<br/>

    $ cd orders
    $ npm update @webmak/microservices-common

<br/>

    $ cd tickets
    $ npm update @webmak/microservices-common

<br/>

    $ cd tickets
    $ npm run test

<br/>

    $ cd orders
    $ npm run test

<br/>

All Tests are OK!

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
