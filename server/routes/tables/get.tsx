/** @jsx h */
import { h } from "../../deps.ts";
import type { Handler } from "../../local.ts";
import "../../types.d.ts";
import Layout from '../../ui/layout.tsx'
import Each from '../../ui/each.tsx'

const Main = ({ data }: { data: { name: string }[] }) => (
  <ul>
    <Each<{ name: string }>
      data={data}
      render={({ name }) => (
        <a href={`/tables/${name}`}>
          <li>{name}</li>
        </a>
      )}
    />
  </ul>
)

const get: Handler = async (req, res, { meta }) => {
  const { status, body } = await meta.getAll()
  return res.jsx(
    <Layout
      main={<Main data={body} />}
    />
  );
}

export default get
