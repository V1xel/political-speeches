# Political Speeches (Test Task)

## Prerequisites

- Docker
- 3000 port needs to be open

## Running the app

- Pull the project
- From the root directory execute the following:
```bash
$ docker-compose up -d
```
After everything end loading you will see the following lines

```bash
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [NestFactory] Starting Nest application...
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +16ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] BullModule dependencies initialized +1ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] BullModule dependencies initialized +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] BullModule dependencies initialized +4ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [InstanceLoader] EvaluationModule dependencies initialized +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [RoutesResolver] EvaluationController {/}: +6ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [RouterExplorer] Mapped {/evaluation, GET} route +2ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [RouterExplorer] Mapped {/evaluation-async, GET} route +0ms
[Nest] 72  - 11/10/2022, 6:47:01 PM     LOG [NestApplication] Nest application successfully started +3ms
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
- make GET request to http://localhost:3000/evaluation
- include one or multiple 'url' as query parameters to specify the csv files to download.
- there are optional query parameter 'year' that specifies selected year for 'mostSpeeches' result. Default for this is 2013.
- response for this request will be the result.

### Asynchronous way:
- make GET request to http://localhost:3000/evaluation-async
- include one or multiple 'url' as query parameters to specify the csv files to download.
- there is optional query parameter 'year' that specifies selected year for 'mostSpeeches' result. Default for this is 2013.
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

https://i.gyazo.com/e67babe07ada149e5fc61912b6f83472.mp4
https://i.gyazo.com/56367e94f07bb899636cda330f153dfe.mp4
