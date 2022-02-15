/*
 * This file is generated
 * do not update it manually
 */

import type { Endpoint } from "./local.ts";

import routes_get from "./routes/get.ts";
import routes_api_tables_get from "./routes/api/tables/get.ts";
import routes_api_tables_post from "./routes/api/tables/post.ts";
import routes_api_tables_name_schema_get from "./routes/api/tables/[name]/schema/get.ts";
import routes_api_tables_name_data_get from "./routes/api/tables/[name]/data/get.ts";
import routes_api_tables_name_data_post from "./routes/api/tables/[name]/data/post.ts";
import routes_api_tables_name_data_id_delete from "./routes/api/tables/[name]/data/[id]/delete.ts";
import routes_api_tables_name_data_id_get from "./routes/api/tables/[name]/data/[id]/get.ts";
import routes_api_tables_name_data_id_put from "./routes/api/tables/[name]/data/[id]/put.ts";
import routes_tables_get from "./routes/tables/get.tsx";
import routes_tables_name_get from "./routes/tables/[name]/get.tsx";
import routes_assets_file_get from "./routes/assets/[file]/get.ts";

const routes: Endpoint[] = [
  {
    path: "/",
    method: "GET",
    handler: routes_get,
  },
  {
    path: "/api/tables",
    method: "GET",
    handler: routes_api_tables_get,
  },
  {
    path: "/api/tables",
    method: "POST",
    handler: routes_api_tables_post,
  },
  {
    path: "/api/tables/:name/schema",
    method: "GET",
    handler: routes_api_tables_name_schema_get,
  },
  {
    path: "/api/tables/:name/data",
    method: "GET",
    handler: routes_api_tables_name_data_get,
  },
  {
    path: "/api/tables/:name/data",
    method: "POST",
    handler: routes_api_tables_name_data_post,
  },
  {
    path: "/api/tables/:name/data/:id",
    method: "DELETE",
    handler: routes_api_tables_name_data_id_delete,
  },
  {
    path: "/api/tables/:name/data/:id",
    method: "GET",
    handler: routes_api_tables_name_data_id_get,
  },
  {
    path: "/api/tables/:name/data/:id",
    method: "PUT",
    handler: routes_api_tables_name_data_id_put,
  },
  {
    path: "/tables",
    method: "GET",
    handler: routes_tables_get,
  },
  {
    path: "/tables/:name",
    method: "GET",
    handler: routes_tables_name_get,
  },
  {
    path: "/assets/:file",
    method: "GET",
    handler: routes_assets_file_get,
  },
];

export default routes;