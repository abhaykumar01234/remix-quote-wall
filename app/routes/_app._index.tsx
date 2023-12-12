import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    quotes: await db.quote.findMany(),
  });
};

export default function Index() {
  const { quotes } = useLoaderData<typeof loader>();

  return (
    <div className="grid lg:grid-flow-row grid-cols-1 lg:grid-cols-3">
      {quotes.map(({ quote, by }, i) => (
        <figure key={i} className="m-4 py-10 px-4 shadow-md shadow-sky-100">
          <blockquote cite="https://wisdomman.com" className="py-3">
            <p className="text-gray-800  text-xl">{quote}</p>
          </blockquote>
          <figcaption>
            <cite className="text-gray-600 text-md mb-4 text-right">
              - {by}
            </cite>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
