/** @jsx h */
import { h } from "../../deps.ts";
import type { Handler } from "../../local.ts";
import "../../types.d.ts";
import Layout from "../../ui/layout.tsx";
import Each from "../../ui/each.tsx";

const Main = ({ data }: { data: { label: string; name: string }[] }) => (
  <div>
    <a href="/new/table">
      <button>New</button>
    </a>
    <ul>
      <Each<{ label: string; name: string }>
        data={data}
        render={({ label, name }) => (
          <a href={`/tables/${name}`}>
            <li>{label}</li>
          </a>
        )}
      />
    </ul>
  </div>
);

const get: Handler = async (_, res, { meta }) => {
  const { body } = await meta.getAll();
  return res.jsx(
    <Layout
      main={<Main data={body || []} />}
    />,
  );
};

export default get;
