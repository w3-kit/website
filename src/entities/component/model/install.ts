/**
 * npm's `w3-kit` moved to the recipe CLI at 0.2.0; 0.1.7 is the last release that adds UI
 * components. Every install command on the sites reads from here, so pinning changes once.
 */
const COMPONENT_CLI = "w3-kit@0.1.7";

export const componentInstallCommand = (id: string) => `npx ${COMPONENT_CLI} add ${id}`;
