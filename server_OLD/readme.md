# `fields` server

# Usage

```ts
import server from "https://deno.land/x/fields@v0.0.4/server/mod.ts";
import initDb from "https://deno.land/x/fields@v0.0.4/db/sqlite/mod.ts";

const db = await initDb(":memory:");

server(db);
```

# Endpoints

- `POST /api/tables`
- `GET /api/tables`
- `GET /api/tables/:name`
- `DELETE /api/tables/:name`
- `GET /api/tables/:name/schema`
- `POST /api/tables/:name/data`
- `GET /api/tables/:name/data`
- `GET /api/tables/:name/data/:id`
- `DELETE /api/tables/:name/data/:id`
- `PATCH /api/tables/:name/data/:id`
- `PUT /api/tables/:name/data/:id`
