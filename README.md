# Political Speeches (Test Task)

## Prerequisites

- Docker
- 3000 port needs to be open

## Running the app

```bash
$ docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Guide to functionality

Application is running on 3000 port

### Synchronous way:
- create GET request to http://localhost:3000/evaluation
- include one or multiple 'url' as query parameters to specify the csv files to download.
- there are optional query parameter 'year' that specifies selected year for 'mostSpeeches' result. Default for this is 2013.
- response for this request will be the result.

### Asynchronous way:
- create GET request to http://localhost:3000/evaluation-async
- include one or multiple 'url' as query parameters to specify the csv files to download.
- there are optional query parameter 'year' that specifies selected year for 'mostSpeeches' result. Default for this is 2013.
- response for this request will be a uuid for subscription.
- create websocket connection to ws://localhost:3000
- send the uuid that you got from the previous step.

```javascript
//Websocket operations can be done via rest client. 
//In case you don't have one you can use following javascript code.
//Open your browser, open dev-tools(usually F12 hotkey)
const client = new WebSocket('ws://localhost:3000')
client.onmessage = (ar) => console.log(ar)
client.send('bb9f0366-769d-45c0-97f7-3f8f372bbbdf')

//You will get the message that you have subscribed.
//After the CSV are processed you will get the result.
```