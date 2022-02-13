/*
 * This file is generated
 * do not update it manually
 */

import type { Endpoint } from "./local.ts";

import routes_get from "./routes/get.ts";
import routes_api_tables_name_data_get from "./routes/api/tables/[name]/data/get.ts";
import routes_api_tables_name_data_post from "./routes/api/tables/[name]/data/post.ts";

const routes: Endpoint[] = [
  {
    path: "/",
    method: "GET",
    handler: routes_get,
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
];

export default routes;
