import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";
import { getSubdomain } from "./app/middleware";

const handler = createStartHandler({
  handler: defaultStreamHandler,
});

export default createServerEntry({
  async fetch(request) {
    const url = new URL(request.url);
    const host = request.headers.get("host") || url.host;
    const subdomain = getSubdomain(host);

    if (subdomain !== "landing" && !url.pathname.startsWith(`/${subdomain}`)) {
      const rewrittenUrl = new URL(`/${subdomain}${url.pathname}${url.search}`, url.origin);
      const rewrittenRequest = new Request(rewrittenUrl.toString(), request);
      return handler(rewrittenRequest);
    }

    return handler(request);
  },
});
