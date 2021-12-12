# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## Auth Service

<br/>

### 05. Architecture of Multi-Service Apps

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
    --request POST \
    --url http://ticketing.dev/api/users/signup \
    | jq
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

## 08. Database Management and Modeling

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
// SIGN UP
$ curl \
    --data '{
        "email":"marley@example.com", "password":"123456789"}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url http://ticketing.dev/api/users/signup \
    | jq
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

## 09. Authentication Strategies and Options

<br/>

    $ cd app/auth
    $ npm install --save cookie-session @types/cookie-session
    $ npm install --save jsonwebtoken @types/jsonwebtoken

<br/>

```
// SIGN UP
$ curl \
    --insecure \
    --data \
        '{
            "email":"marley@example.com", "password":"123456789"
        }' \
    --cookie-jar /tmp/cookies.txt \
    --header "Content-Type: application/json" \
    --request POST \
    --url https://ticketing.dev/api/users/signup \
    | jq
```

<br/>

    $ cat /tmp/cookies.txt

```
#HttpOnly_ticketing.dev	FALSE	/	TRUE	0	express:sess	eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall3TXpOa1pqWm1OekJoTlRobE1EQXhPV1ZtWVdFME5pSXNJbVZ0WVdsc0lqb2liV0Z5YkdWNVFHVjRZVzF3YkdVdVkyOXRJaXdpYVdGMElqb3hOakUwTURFeU1qY3hmUS5IRWRoMk9yeFo2eW1iV3lrMUk5NG1ONTBkeC1ZdkdpbzdwR0cxeXpLelNNIn0=
```

<br/>

https://www.base64decode.org/

<br/>

**decode**

```
{"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzNkZjZmNzBhNThlMDAxOWVmYWE0NiIsImVtYWlsIjoibWFybGV5QGV4YW1wbGUuY29tIiwiaWF0IjoxNjE0MDEyMjcxfQ.HEdh2OrxZ6ymbWyk1I94mN50dx-YvGio7pGG1yzKzSM"}
```

<br/>

https://jwt.io/

<br/>

decode with key: 'MY_JWT_SECRET'

<br/>

**response:**

<br/>

```
{
  "id": "6033df6f70a58e0019efaa46",
  "email": "marley@example.com",
  "iat": 1614012271
}
```

<br/>

```
// SIGN UP
$ curl \
    --insecure \
    --cookie-jar /tmp/cookies.txt \
    --data \
    '{
        "email":"marley1@example.com", "password":"123456789"}
    ' \
    --header "Content-Type: application/json" \
    --request POST \
    --url https://ticketing.dev/api/users/signup \
    | jq
```

<br/>

```
// SIGN IN
$ curl \
    --data \
    '{
        "email":"marley1@example.com", "password":"123456789"
    }' \
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

**response:**

```
{
    "currentUser": {
        "email": "marley1@example.com",
        "iat": 1614012915,
        "id": "6033e1f270a58e0019efaa47"
    }
}
```

<br/>

## 10. Testing Isolated Microservices

<br/>

    $ cd app/auth
    $ npm install --save-dev jest @types/jest supertest @types/supertest ts-jest mongodb-memory-server

<br/>

    $ npm run test

<br/>

**Output:**

```
Test Suites: 4 passed, 4 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        13.794 s
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
