# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## Payments Service

<br/>

### 21. Handling Payments

    $ cd payments
    $ npm install --save mongoose-update-if-current
    $ npm install --save stripe

<br/>

stripe.com

Developers --> API keys

<br/>

**Creating a Stripe Secret**

```
$ kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<STRIPE_SECRET_KEY>
```

<br/>

    $ cd payments
    $ npm update @webmak/microservices-common
    $ npm run test

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
