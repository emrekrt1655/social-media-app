# Lorem Minds Server 

Please follow the instructions..

Don't forget to open your own branch and make pr to the develop branch...

Install the  [Node](https://nodejs.dev/en/download/)

## Available Scripts

In the project directory, you can install the npm packages:

### `npm install`

Install the  DOCKER and create a new account


Delete migrations folder and files in prisma folder

________________________________________________________________
In the project directory, you can create your database:

### `docker-compose -f docker.compose.yml up -d`

In the project directory, you can generate your database:

### `npx prisma generate`

In the project directory, you can init your database:

### `npx prisma migrate dev --name init`

In the project directory, you can setup your database:

### `npx prisma db seed`


In the project directory, you can run the application:

### `npm run start`

If you see the "Server at listening on port 5000" 
The application works correctly..

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
And go to registration page and register to application.
Please give your real email address to get an activation email.
After activation you can login to your account

Also you can add data to prisma/seed.ts and run the command to seed database

Than you can open your databese interface to add multiple recordings 

### `npx prisma studio`

Note: When you register to application, your  password will be hashed and saved to the database. Therefore use hashed password in the prisma studio.
