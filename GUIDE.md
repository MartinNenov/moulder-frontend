This command reads your prisma/schema.prisma file and generates the Prisma Client. It will be generated in src/generated/prisma.
```bash
npx prisma generate
```

Example of an .env file, this is for local docker
```bash
# NextAuth.js Secret
NEXTAUTH_SECRET="YOUR_VERY_LONG_AND_RANDOM_SECRET_KEY"

# Database Connection URL for Prisma
DATABASE_URL="postgresql://root:mypassword@localhost:5432/myroguelikedb?schema=public"
```

You will also have to update your docker file with the configured database, username, password and port 
``` yml
services:
  db:
    image: postgres:15 # Use a specific version of PostgreSQL
    container_name: roguelike-db
    restart: always
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: myroguelikedb
    ports:
      - '5432:5432' # Map your local port 5432 to the container's port 5432
    volumes:
      - ./prisma/data:/var/lib/postgresql/data # IMPORTANT: This saves your data!
```

To start the docker file 
```bash
docker-compose up -d
```

Restart the docker 
```bash
docker compose down
docker-compose up -d
```