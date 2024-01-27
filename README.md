# Expense Tracker - Backend
<img src="https://media.licdn.com/dms/image/D5622AQEuDkiryYvgsw/feedshare-shrink_800/0/1697783942283?e=2147483647&v=beta&t=Up1TzSPS5IjG3Tg4m8oC4tw0_3t-ijy_9vmvIHMSeG8" width="100" height="28"> <img src="https://img.shields.io/badge/Bun.js-FFF?style=for-the-badge&logo=bun&logoColor=black" width="100" height="28"> <img src="https://img.shields.io/badge/MongoDB-FFF.svg?style=for-the-badge&logo=mongodb&logoColor=green" width="100" height="28">

## Prerequisites
Before you can run this application, you will need to have the following installed on your machine:
- Bun: `curl -fsSL https://bun.sh/install | bash`
- MongoDB (version 3 or higher)

## Installation
1. Clone the repository.
2. Install the dependencies: `bun install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:
	- `MONGODB_URI=<your_mongodb_uri>`
	- `JWT_SECRET=<your_jwt_secret>`
	- `PORT=<port>`. Omit in order to use the default value (`3000`).

## Running the app
Start the application using `bun run src/app.ts`.
