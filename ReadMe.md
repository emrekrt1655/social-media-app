# Social Media App Server 

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

In the project directory, you can generate your database or create anyone you like:

### `npx prisma generate`

In the project directory, you can init your database:

### `npx prisma migrate dev --name init`

In the project directory, you can setup and seed your database with samples:

### `npx prisma db seed`

In the project directory, you can run the application:

### `npm run start`

If you see the "Server at listening on port ..." 
The application works correctly..

Also you can add data to prisma/seed.ts and run the command to seed database

Than you can open your databese interface to add multiple recordings 

### `npx prisma studio`

Note: When you register to application, your  password will be hashed and saved to the database. Therefore use hashed password in the prisma studio.


### `Swagger API `
Open [http://localhost:<port>/api-docs/#/](http://localhost:<port>/api-docs/#/) to view apis.


# Social Media App Client

It is located in the client directory.

It is created Vite with React TypeScript template. 
For the state management, it will be used [TanStack Query](https://tanstack.com/query/latest).


Currently react query architecture is under development.

I will share the development phase step by step.