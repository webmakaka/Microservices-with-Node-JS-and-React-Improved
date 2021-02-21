# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## 05. Architecture of Multi-Service Apps

<br/>

    $ npm install -g nodemon
    $ npm install -g typescript

<br/>

    $ cd app
    $ mkdir auth
    $ npm init -y
    $ npm install --save typescript express @types/express
    $ npm install --save-dev ts-node-dev

    $ tsc --init
    $ npm start

<br/>

    $ cd skaffold
    $ skaffold dev

<br/>

```
browser --> https://ticketing.dev/api/users/currentuser

type: **thisisunsafe** in the browser window with security warning.

OK!
```

<br/>

## 07. Response Normalization Strategies

<br/>

    $ cd app/auth
    $ npm install --save express-validator
    $ npm install --save express-async-errors

<br/>

```
$ curl \
    --data '{"email":"notValidEmail", "password":"1"}' \
    --header "Content-Type: application/json" \
    --request POST http://ticketing.dev/api/users/signup \
    | python -m json.tool
```

<br/>

response:

```
{
    "errors": [
        {
            "field": "email",
            "message": "Email must be valid"
        },
        {
            "field": "password",
            "message": "Password must be between 4 and 20 characters"
        }
    ]
}

```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
