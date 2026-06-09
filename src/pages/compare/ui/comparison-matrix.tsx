import type { Alternative, FeatureRow } from "../model/types";

export function ComparisonMatrix({
  alternatives,
  features,
}: {
  alternatives: Alternative[];
  features: FeatureRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-w3-border-subtle">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-w3-border-subtle bg-w3-surface-alt">
            <th scope="col" className="px-4 py-3 text-left font-medium text-w3-gray-500">
              Feature
            </th>
            <th
              scope="col"
              className="border-l border-w3-accent/20 bg-w3-accent-wash px-4 py-3 text-left font-medium text-w3-accent"
            >
              w3-kit
            </th>
            {alternatives.map((a) => (
              <th
                key={a.id}
                scope="col"
                className="border-l border-w3-border-subtle px-4 py-3 text-left font-medium text-w3-gray-700"
              >
                {a.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row) => (
            <tr key={row.label} className="border-b border-w3-border-subtle last:border-0">
              <th scope="row" className="px-4 py-3 text-left font-medium text-w3-gray-700">
                {row.label}
              </th>
              <td className="border-l border-w3-accent/20 bg-w3-accent-wash/40 px-4 py-3 font-medium text-w3-gray-900">
                {row.w3kit}
              </td>
              {alternatives.map((a) => (
                <td
                  key={a.id}
                  className="border-l border-w3-border-subtle px-4 py-3 text-w3-gray-700"
                >
                  {row.values[a.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
