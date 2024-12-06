# Technical Test

## Introduction

The repository features a simple solution to manage clocks. A clock is an entity that has a name and timezone. The user can manage an unlimited number of clocks. 
The clocks are persisted in a database.
The user can position himself in a timezone by selecting a clock.
This clock, refered as "reference clock", will then be used to calculate the time difference between the reference clock and the other clocks.
It is very useful when you have to deal with different timezones in a business context.

The solution features two services: 
- **clocks-ui**: The clock-ui service is a simple React web application.
- **clocks-api**: a REST API that helps with persisting the different clocks created by the user.

The UI is very inspired by the Apple Clock application. I chose to clone the design because it is very intuitive and user-friendly.

## How to run the solution

### Requirements

- Docker

### Steps

```bash
git clone https://github.com/tanguyjouannic/technical_test.git
cd technical_test
docker build -t clocks-api ./clocks-api
docker build -t clocks-ui ./clocks-ui
docker compose up
```

And then navigate to http://localhost:80