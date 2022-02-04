import { html } from "../deps.ts";

export default (content: string) =>
  html`
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.4.4/css/pico.classless.min.css" />
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
