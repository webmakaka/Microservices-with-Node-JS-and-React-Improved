# [Stephen Grider] Microservices with Node JS and React [ENG, 2021]

<br/>

## Client Service

<br/>

### 11. Integrating a Server-Side-Rendered React App

<br/>

    $ cd app
    $ mkdir client
    $ cd client
    $ npm init -y
    $ npm install react react-dom next
    $ npm install bootstrap axios

<br/>

    http://SERVICENAME.NAMESPACE.svc.cluster.local

<br/>

```
$ kubectl get ingress
NAME          CLASS    HOSTS           ADDRESS        PORTS   AGE
ingress-svc   <none>   ticketing.dev   192.168.49.2   80      8m41s
```

<br/>

```
// NOT WORKS for ME.
http://ingress-svc.default.svc.cluster.local
```

<br/>

```
$ kubectl exec -it auth-deployment-9f9c79479-v865d -- nslookup ingress-svc
Server:		10.96.0.10
Address:	10.96.0.10:53

** server can't find ingress-svc.cluster.local: NXDOMAIN

** server can't find ingress-svc.default.svc.cluster.local: NXDOMAIN

** server can't find ingress-svc.svc.cluster.local: NXDOMAIN

** server can't find ingress-svc.cluster.local: NXDOMAIN

** server can't find ingress-svc.svc.cluster.local: NXDOMAIN

** server can't find ingress-svc.default.svc.cluster.local: NXDOMAIN

command terminated with exit code 1
```

<br/>

```
$ kubectl exec -ti auth-deployment-868cdc5b6c-66jdv -- nslookup 192.168.49.2
Server:		10.96.0.10
Address:	10.96.0.10:53

2.49.168.192.in-addr.arpa	name = 192-168-49-2.kubernetes.default.svc.cluster.local
```

<br/>

https://ticketing.dev/

<!--

<br/>

```
$ kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml

$ kubectl get pods dnsutils
$ kubectl exec -i -t dnsutils -- nslookup kubernetes.default
$ kubectl exec -i -t dnsutils -- nslookup ingress-svc.default.svc.cluster.local

$ kubectl exec -i -t dnsutils -- nslookup ingress-svc.default.svc.kubernetes.default

```

\*\* server can't find ingress-svc.default.svc.kubernetes.default: NXDOMAIN

```

$ kubectl exec -i -t dnsutils -- nslookup ingress-svc.default.svc.kubernetes.default
ERROR!


$ kubectl get ingress
NAME          CLASS    HOSTS           ADDRESS        PORTS   AGE
ingress-svc   <none>   ticketing.dev   192.168.49.2   80      35m


$ kubectl exec -i -t dnsutils -- nslookup 192.168.49.2
```

```
$ kubectl exec -i -t dnsutils -- nslookup 192-168-49-2.kubernetes.default.svc.cluster.local
OK!
```

$ kubectl exec -i -t dnsutils -- nslookup ingress-svc

-->

<br/>

### 22. Back to the Client

```
$ cd client
$ npm install react-stripe-checkout
```

<br/>

**Testing card**

https://stripe.com/docs/testing

<br/>

4242 4242 4242 4242

- Any 3 digits

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
