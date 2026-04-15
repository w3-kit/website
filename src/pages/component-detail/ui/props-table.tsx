import type { ComponentProp } from "../../../entities/component";

interface PropsTableProps {
  props: ComponentProp[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="mt-12">
      <h2
        className="mb-4 text-xl font-semibold tracking-tight"
        style={{ color: "var(--w3-gray-900)" }}
      >
        API Reference
      </h2>

      <div
        className="overflow-hidden rounded-xl"
        style={{
          border: "1px solid var(--w3-border-subtle)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--w3-surface-elevated)" }}>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold"
                  style={{ color: "var(--w3-gray-700)" }}
                >
                  Prop
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold"
                  style={{ color: "var(--w3-gray-700)" }}
                >
                  Type
                </th>
                <th
                  className="hidden px-4 py-3 text-left text-xs font-semibold md:table-cell"
                  style={{ color: "var(--w3-gray-700)" }}
                >
                  Default
                </th>
                <th
                  className="hidden px-4 py-3 text-left text-xs font-semibold lg:table-cell"
                  style={{ color: "var(--w3-gray-700)" }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop) => (
                <tr
                  key={prop.name}
                  style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
                >
                  <td className="px-4 py-3">
                    <code
                      className="text-[13px] font-medium"
                      style={{
                        color: "var(--w3-gray-900)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    >
                      {prop.name}
                      {prop.required && (
                        <span style={{ color: "var(--w3-accent)" }}>*</span>
                      )}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <code
                      className="text-xs"
                      style={{
                        color: "var(--w3-gray-600)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    >
                      {prop.type}
                    </code>
                  </td>
                  <td
                    className="hidden px-4 py-3 md:table-cell"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    <code
                      className="text-xs"
                      style={{ fontFamily: '"Geist Mono", ui-monospace, monospace' }}
                    >
                      {prop.default || "—"}
                    </code>
                  </td>
                  <td
                    className="hidden px-4 py-3 text-xs lg:table-cell"
                    style={{ color: "var(--w3-gray-600)" }}
                  >
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
