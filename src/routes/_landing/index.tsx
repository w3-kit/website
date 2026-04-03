import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div>
      <h1>Build and learn web3. Any chain.</h1>
      <p>Open source web3 developer toolkit</p>
    </div>
  );
}
