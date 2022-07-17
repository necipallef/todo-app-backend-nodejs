## Install App

```
yarn install
touch .env
echo $'PORT=<ENTER_PORT_HERE>\nJWT_SECRET=<ENTER_JWT_SECRET_HERE>' > .env
yarn start
```

## APIs

### Session APIs

#### Create Session

Request:
```shell
curl -i -X POST http://<ENTER_HOST_HERE>/session -d'{"username" : "admin", "password": "1234567"}' -H"content-type: application/json"
```

Response: HTTP 200
```
{
    "jwt":string
}
```

Response: HTTP 401

### User APIs

#### Get User

Requires: Authentication (if fails HTTP 401)

Request:
```shell
curl -i http://<ENTER_HOST_HERE>/user/me
```

Response: HTTP 200
```
{
    "username":string,
    "nameSurname":string
}
```

#### Create User

Request:
```shell
curl -i -X POST http://<ENTER_HOST_HERE>/user -d'{"username" : "admin", "password": "1234567", "nameSurname": "Necip Allef"}' -H"content-type: application/json"
```

Response: HTTP 201
Response: HTTP 409

### Todo APIs

#### Create Todo

Requires: Authentication (if fails HTTP 401)

Request:
```shell
curl -i http://<ENTER_HOST_HERE>/todo
```

Response: HTTP 200
```
{
    "title":string,
    "details":string
}
```

Response: HTTP 201
