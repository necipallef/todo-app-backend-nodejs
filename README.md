## Install App

```
yarn install
touch .env
echo PORT=<ENTER_PORT_HERE> > .env
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

#### Create User