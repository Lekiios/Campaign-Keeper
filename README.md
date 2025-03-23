# Campaign-Keeper
This is a simple API designed to help you keep track of your campaigns in Dungeons & Dragons (D&D) or any other tabletop RPG.
It is built with Node.js, Fastify, Prisma, and PostgreSQL.

## Features

- Track campaign details and progress.
- Manage characters, spells, inventory and other campaign-related information.
- Easy to set up and use with Docker.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory of the project with the following variables:

```dotenv
# For docker container

POSTGRES_DB_USER=your_db_user
POSTGRES_DB_ROOT_PASSWORD=your_db_password
POSTGRES_DB_DATABASE=your_db_name
POSTGRES_DB_LOCAL_PORT=your_local_db_port
POSTGRES_DB_DOCKER_PORT=your_docker_db_port
SERVER_LOCAL_HOST=your_local_server_host
SERVER_LOCAL_PORT=your_local_server_port
SERVER_DOCKER_PORT=your_docker_server_port
SERVER_DOCKER_HOST=your_server_host

# For local development

SERVER_HOST=${SERVER_LOCAL_HOST}
SERVER_PORT=${SERVER_LOCAL_PORT}

DATABASE_URL="postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_ROOT_PASSWORD}@localhost:${POSTGRES_DB_LOCAL_PORT}/${POSTGRES_DB_DATABASE}"
```

### 3. Build and Run the Project with Docker Compose

```bash
docker compose up --build
```
This command will build the Docker images and start the containers for both the API and the PostgreSQL database.

### 4. Access the API

Once the containers are up and running, you can access the API at :

`http://<SERVER_DOCKER_HOST>:<SERVER_LOCAL_PORT>.`

You can also access the API documentation at :
`http://<SERVER_DOCKER_HOST>:<SERVER_LOCAL_PORT>/swagger-ui`

## API Endpoints
    Work in progress

## Docker Configuration
### Dockerfile

The Dockerfile sets up the Node.js environment, installs dependencies, builds the project, migrate database and starts the server.

### docker-compose.yml

The docker-compose.yml file defines two services:

    db: A PostgreSQL database service.
    api: The API service that depends on the database service.

## Dependencies

Dependencies are managed using Yarn. The main dependencies are listed in the `package.json` file.

## Git Workflow

This project follows the Git Flow branching model to manage development and release processes. The main branches are:

- **master :** The stable branch containing production-ready code.
- **develop :** The branch for integrating features and preparing for the next release.

### Branch Naming Conventions

- **features/\* :** Branches for developing new features.
- **fix/\* :** Branches for bug fixes or minor improvements.

### Contribution Rules

1. **Branching :** Create a new branch from `develop` for each feature or fix. Use descriptive names for your branches.

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   
## Contributing

Feel free to open issues for any bugs or improvements.
### Start the project in development mode

#### Requirements
- Node.js (v22+)
- Docker
- Docker Compose

#### Install dependencies
```bash
corepack enable
yarn install
```

#### Start the development server and database
```bash
docker compose up db -d --build
yarn generate
yarn db:migrate:dev
yarn dev
```

### Contributors
- [Lekiios](https://github.com/Lekiios)
- [Vladouh](https://github.com/Vladouh)
