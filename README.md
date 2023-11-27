# Snowfall Tic-Tac-Toe API

This is an REST API written in Typescript and backed by a Postgres database. It has a websocket capacity to handle bidirectional communication for future capabilities such as turn notifications and win notifications to the client. 

To run locally, build and run with Docker Compose via `docker-compose up -d`

The following endpoints are available

```
    POST https://api.snowfall.io/users
    POST https://api.snowfall.io/games
    GET https://api.snowfall.io/games/:gameId
    POST https://api.snowfall.io/games/:gameId/join
    POST https://api.snowfall.io/moves/:gameId
```

Below are instructions to use them locally

### Create a user

This endpoints creates a user. It requires a name and email as inputs. The response provides a `user.id` field which will be used for subsequent requests

```bash
    curl --request POST \
    --url http://localhost:3000/users \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Sample User",
        "email": "user@example.com"
    }'
```

```json
HTTP/1.1 201 Created

{
	"name": "Sample User",
	"email": "user@example.com",
	"id": "4b2528e4-e0fa-4132-884a-370c639bcca7",
	"created_at": "2023-11-27T02:13:36.594Z"
}
```

### Create a game
This endpoints creates a game. Upon game creation, a player record is also created which corresponds to the `userId` utilized.
The response provides information about the game object.

```bash
    curl --request POST \
    --url http://localhost:3000/games \
    --header 'Content-Type: application/json' \
    --data '{
        "userId": "4b2528e4-e0fa-4132-884a-370c639bcca7"
    }'
```

```json
HTTP/1.1 201 Created

{
	"currentPlayer": "de1a8941-80b0-4941-876c-05e01c1a75c3",
	"winner": null,
	"ended_at": null,
	"id": "83934243-ef3f-445c-b569-a9f8ed0cb69c",
	"boardSize": 3,
	"created_at": "2023-11-27T02:13:52.413Z"
}
```

### Retrieve a game
This endpoints retrieves a game based on the game id in the url parameters. The response provides information about the game object.

``` bash
    curl --request GET \
    --url http://localhost:3000/games/83934243-ef3f-445c-b569-a9f8ed0cb69c \
```

```json
HTTP/1.1 200 OK

{
	"currentPlayer": "de1a8941-80b0-4941-876c-05e01c1a75c3",
	"winner": null,
	"ended_at": null,
	"id": "83934243-ef3f-445c-b569-a9f8ed0cb69c",
	"boardSize": 3,
	"created_at": "2023-11-27T02:13:52.413Z"
}
```

### Join a game
This endpoint enables a user to join an existing game. It provides some useful validation error messages for invalid game entry.
```bash
    curl --request POST \
    --url http://localhost:3000/games/83934243-ef3f-445c-b569-a9f8ed0cb69c/join \
    --header 'Content-Type: application/json' \
    --data '{
        "userId": "4b2528e4-e0fa-4132-884a-370c639bcca7"
    }'
```

```json
HTTP/1.1 201 Created

{
	"message": "New player added to the game"
}
```

### Make a move
This endpoints supports playing the game. It provides some useful validation error messages for invalid gameplay.
```bash
    curl --request POST \
    --url 'http://localhost:3000/moves/83934243-ef3f-445c-b569-a9f8ed0cb69c' \
    --header 'Content-Type: application/json' \
    --data '{
        "userId": "4b2528e4-e0fa-4132-884a-370c639bcca7",
        "row": 2,
        "column": 2
    }'
```

```json
HTTP/1.1 201 Created
{
	"gameId": "83934243-ef3f-445c-b569-a9f8ed0cb69c",
	"userId": "4b2528e4-e0fa-4132-884a-370c639bcca7",
	"symbol": "X",
	"row": 1,
	"column": 1,
	"moveId": "562198c3-6651-42a8-ac7a-73a543eb5229",
	"created_at": "2023-11-27T02:27:18.144Z"
}
```
