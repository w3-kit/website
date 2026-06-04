import { createFileRoute } from "@tanstack/react-router";
import { ChainDetailPage } from "../../../pages/chain-detail";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/registry/chains/$chainId")({
  head: ({ params }) => {
    const chainId = Number(params.chainId);
    const chain = CHAINS.find((c) => c.chainId === chainId);
    const seo = buildMeta({
      title: chain ? `${chain.name} — Chain Details` : "Chain Not Found",
      description: chain
        ? chain.learn.split("\n")[0].slice(0, 160)
        : `No chain registered with chainId ${params.chainId}.`,
      path: `/registry/chains/${params.chainId}`,
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: ChainDetailPage,
});
