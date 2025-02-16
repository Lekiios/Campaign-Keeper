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
POSTGRES_DB_USER=your_db_user
POSTGRES_DB_ROOT_PASSWORD=your_db_password
POSTGRES_DB_DATABASE=your_db_name
POSTGRES_DB_LOCAL_PORT=your_local_db_port
POSTGRES_DB_DOCKER_PORT=your_docker_db_port
SERVER_LOCAL_PORT=your_local_server_port
SERVER_DOCKER_PORT=your_docker_server_port
SERVER_DOCKER_HOST=your_server_host
```

### 3. Build and Run the Project with Docker Compose

```bash
docker compose up --build
```
This command will build the Docker images and start the containers for both the API and the PostgreSQL database.

### 4. Access the API

Once the containers are up and running, you can access the API at :

`http://<SERVER_DOCKER_HOST>:<SERVER_LOCAL_PORT>.`

## Docker Configuration
### Dockerfile

The Dockerfile sets up the Node.js environment, installs dependencies, builds the project, migrate database and starts the server.

### docker-compose.yml

The docker-compose.yml file defines two services:

    db: A PostgreSQL database service.
    api: The API service that depends on the database service.

## Dependencies

Dependencies are managed using Yarn. The main dependencies are listed in the `package.json` file.

## Contributing

Feel free to open issues for any bugs or improvements.

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
