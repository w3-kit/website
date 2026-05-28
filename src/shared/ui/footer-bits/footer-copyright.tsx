interface FooterCopyrightProps {
  /** Optional trailing children rendered to the right of the copyright. */
  children?: React.ReactNode;
}

export function FooterCopyright({ children }: FooterCopyrightProps) {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-8 lg:px-16">
      <p className="text-xs text-w3-gray-500">
        &copy; {new Date().getFullYear()} w3-kit. MIT License.
      </p>
      {children}
    </div>
  );
}
