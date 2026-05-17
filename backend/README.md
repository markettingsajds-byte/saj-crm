# SAJ-CRM Backend

This backend provides authentication, enquiry management, and RBAC configuration persistence for the SAJ-CRM frontend.

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the backend:

```bash
npm run dev
```

Or in production mode:

```bash
npm start
```

## Environment Variables

- `PORT` - server port (default `5000`)
- `JWT_SECRET` - JSON Web Token secret
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - PostgreSQL database name

> Note: The current implementation uses an in-memory user and enquiry store. The database connection is configured in `src/config/db.js` for future persistence.

## API Endpoints

### Authentication

- `POST /api/auth/login`
  - body: `{ email, password }`
  - returns: `{ token, user }`

- `POST /api/auth/signup`
  - body: `{ email, password, fullName }`
  - returns: `{ token, user }`

- `POST /api/auth/otp/request`
  - body: `{ identifier }`
  - returns: `{ message, otp }`

- `POST /api/auth/otp/verify`
  - body: `{ identifier, code }`
  - returns: `{ token, user }`

- `GET /api/auth/me`
  - protected
  - returns active user info

- `GET /api/auth/users`
  - protected, admin/superadmin only
  - returns sanitized user list

- `GET /api/auth/users/:id`
  - protected
  - returns sanitized user details

### RBAC

- `GET /api/auth/rbac`
  - returns RBAC configuration from `src/config/rbac.json`

- `POST /api/auth/rbac`
  - protected, admin/superadmin only
  - body: RBAC configuration object
  - persists config to `src/config/rbac.json`

### Enquiries

- `GET /api/enquiries`
  - query params: `status`, `priority`, `source`, `assignedTo`, `search`, `page`, `limit`, `sortBy`, `sortOrder`

- `POST /api/enquiries`
  - create a new enquiry

- `GET /api/enquiries/stats`
  - returns enquiry dashboard statistics

- `GET /api/enquiries/:id`
  - returns single enquiry details

- `PUT /api/enquiries/:id`
  - update enquiry

- `PATCH /api/enquiries/:id/status`
  - update enquiry status

- `PATCH /api/enquiries/:id/assign`
  - update assignee

- `POST /api/enquiries/:id/notes`
  - add note to enquiry

- `DELETE /api/enquiries/:id`
  - delete enquiry

## Notes

- `src/config/db.js` sets up a PostgreSQL pool but the current routes still use in-memory data.
- For a production-ready backend, persist `users` and `enquiries` into a real database and replace the dummy data stores.
