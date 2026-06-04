import { createFileRoute } from "@tanstack/react-router";
import { TokenDetailPage } from "../../../pages/token-detail";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/registry/tokens/$symbol")({
  head: ({ params }) => {
    const token = TOKENS.find((t) => t.symbol.toLowerCase() === params.symbol.toLowerCase());
    const seo = buildMeta({
      title: token ? `${token.symbol} — ${token.name}` : "Token Not Found",
      description: token
        ? token.learn.split("\n")[0].slice(0, 160)
        : `No token registered with symbol ${params.symbol}.`,
      path: `/registry/tokens/${params.symbol}`,
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: TokenDetailPage,
});
