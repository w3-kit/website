import type { ComponentProp } from "../../../entities/component";

export function PropsTable({ props }: { props: ComponentProp[] }) {
  if (props.length === 0) return null;

  return (
    <section aria-labelledby="props-title" className="mt-24">
      <h2 id="props-title" className="text-w3-statement font-medium text-w3-ink">
        Props
      </h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-w3-small">
          <thead>
            <tr className="border-b border-w3-tone-2 text-w3-ink-soft">
              <th scope="col" className="py-3 pr-6 font-medium">
                Prop
              </th>
              <th scope="col" className="py-3 pr-6 font-medium">
                Type
              </th>
              <th scope="col" className="py-3 pr-6 font-medium">
                Default
              </th>
              <th scope="col" className="py-3 font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b border-w3-tone-2 align-top">
                <td className="py-4 pr-6">
                  <code className="font-medium text-w3-ink">{prop.name}</code>
                  {prop.required && (
                    <span className="ml-2 text-[13px] text-w3-accent">required</span>
                  )}
                </td>
                <td className="py-4 pr-6">
                  <code className="text-[13px] text-w3-ink-soft">{prop.type}</code>
                </td>
                <td className="py-4 pr-6">
                  <code className="text-[13px] text-w3-ink-soft">{prop.default || "none"}</code>
                </td>
                <td className="py-4 text-w3-ink">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
