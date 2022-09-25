# Installation Manual

## Software Resources

**Web Server:** Node v16.14.2
**Database:** PostgreSQL

## Getting Started

### Running the web page development server:

1. Set the following environment variables on a `.env` file.
```bash
APP_DOMAIN=http://localhost:3000

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=673a6fed0759690cf14255ce74ac1db1

GITHUB_ID=c2bc7d846fdd05d4fe6d
GITHUB_SECRET=faad5942c17cde930a4a54b669a3483dafb3df71

LINKEDIN_ID=787ckfgdtwdcib
LINKEDIN_SECRET=MyoLDkisVJHH8GoP

GEOAPIFY_API_KEY=facd74e15656477d9d0c024f869c3814
```

2. Install node modules.
```bash
npm install
```

3. If you already set the database development server, run the project.
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can edit pages by modifying `pages/*.js`. The page auto-updates as you edit and save the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/*](http://localhost:3000/api). Endpoints can be edited in `pages/api` directory. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Running the database development server:

1. Install [PostgreSQL](https://www.postgresql.org/download/).

2. Open pgAdmin 4 and create a new database.

3. Set the environment variable `DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"` with your database information.

4. Run the next command to migrate the project schema to your database:
```bash
npx prisma migrate dev
```

### Running the web page production server:

1. As we are currently using your CI/CD scripts from your infra-lab project, you just need to set the github repository secrets and set these following environment variables on the `DEV_ENV` secret.
```bash
APP_DOMAIN=YOUR_APP_DOMAIN(ex. http://100.26.46.163)

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

NEXTAUTH_URL=YOUR_APP_DOMAIN(ex. http://100.26.46.163)
NEXTAUTH_SECRET=673a6fed0759690cf14255ce74ac1db1

GITHUB_ID=ce6eedf0124927caae6a
GITHUB_SECRET=e51f3c1d78458f36cb9da922e7adb55483fec4d1

LINKEDIN_ID=787ckfgdtwdcib
LINKEDIN_SECRET=MyoLDkisVJHH8GoP

GEOAPIFY_API_KEY=facd74e15656477d9d0c024f869c3814
```
