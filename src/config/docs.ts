interface DocPage {
  title: string;
  href: string;
  section: "getting-started" | "components" | "examples";
}

const pages: DocPage[] = [
  // Components (in alphabetical order)

  {
    title: "Bridge",
    href: "/docs/components/bridge",
    section: "components",
  },
  {
    title: "Connect Wallet",
    href: "/docs/components/connect-wallet",
    section: "components",
  },
  {
    title: "Contract Interaction",
    href: "/docs/components/contract-interaction",
    section: "components",
  },
  {
    title: "Gas Calculator",
    href: "/docs/components/gas-calculator",
    section: "components",
  },
  {
    title: "Multisignature Wallets",
    href: "/docs/components/multisig-wallet",
    section: "components",
  },
];

export const docsConfig = { pages };

export function getPageNavigation(currentPath: string) {
  const currentIndex = pages.findIndex((page) => page.href === currentPath);

  if (currentIndex === -1) return { prev: undefined, next: undefined };

  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : undefined,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined,
  };
}

export function getComponentList() {
  return pages.filter((page) => page.section === "components");
}
