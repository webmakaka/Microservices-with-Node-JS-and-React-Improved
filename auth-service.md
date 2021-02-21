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

# 08. Database Management and Modeling

<br/>

    $ cd app/auth
    $ npm install --save mongoose
    $ npm install --save @types/mongoose

<br/>

```
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=MY_JWT_SECRET
```

<br/>

    $ kubectl get pods
    NAME                                     READY   STATUS    RESTARTS   AGE
    auth-deployment-5985769fb8-j5k79         1/1     Running   0          57s
    auth-mongo-deployment-55d6d9cc49-jrzsc   1/1     Running   0          57s

<br/>

```
$ curl \
    --data '{
        "email":"marley@example.com", "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST http://ticketing.dev/api/users/signup \
    | python -m json.tool
```

<br/>

**response:**

```
{
    "__v": 0,
    "_id": "60325ddeb7fb1000192f6ac8",
    "email": "marley@example.com",
    "password": "4f4622052e653685a0a58f4f305d5e7455b968bd016a57a9002f8875c501f8d5efc553cba8e4a5c9b829ee3535b1b8a5fa37ce27b5d357d161a7c9a0628e9a72.add78bf1a35f0882"
}
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
