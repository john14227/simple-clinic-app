# Clinic App

A simple app for clinic daily operation. 

## Pre-requisites
Please download/prepare the following items first.
- **[Node.js](https://nodejs.org/en/)** (version >= 14).
- **[PostgreSQL](https://www.postgresql.org/download/)** (Please also select installing pgAdmin4 option while installing database)
- (Optional) **[Docker](https://docs.docker.com/get-docker/)**. Please follow the instruction guide in the link to install Docker. 
- Android or IOS emulator/device
- Node package manager npm and yarn 
You can install yarn with `npm install -g yarn` after installing Node.js

## Setup
#### Frontend
- Install Expo CLI with `npm install -g expo-cli`
- Run `yarn install`
#### Backend
- Please create your database with pgAdmin (recommended)
- Run `yarn install` and `yarn sequelize db:migrate`
- (Optional) If you would like to use Docker to start the backend, then you can skip the backend setup and configuration sessions. Please refer to "how to start" session to start backend.

## Configuration
#### Frontend
Please change the host name of variable `host` to your testing environment in `./constants.js`. It could be your IP address or a link when you use USB connection. Please refer to your Expo DevTools on browser.

#### Backend
Please add `.env` file and specify the value of the following environment variables:
- `DB_USER` (username of your database)
- `DB_PASSWORD` (password of your database)
- `DB_NAME` (Your database name. It should be same as the database name you have created in setup session)

## How to start
#### Frontend
Input `expo start` at your terminal. Press d to open DevTools on browser. Select open the project in your devices/emulators or scan the QR code.

#### Backend
Input `yarn start` to start the server.
- (Optional) If you would like to use docker, please input `docker-compose up` to start the backend.



