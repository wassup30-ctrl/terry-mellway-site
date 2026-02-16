'use client';

import Link from 'next/link';

export default function DataTable({ columns, rows, editHref, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-warm-gray overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-warm-gray bg-cream-dark/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 font-medium text-charcoal-light text-xs uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-charcoal-light text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row._key || i} className="border-b border-warm-gray/50 hover:bg-cream-dark/30 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-charcoal">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={editHref(row)}
                      className="px-3 py-1.5 text-xs rounded-md bg-brown/10 text-brown hover:bg-brown/20 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(row)}
                      className="px-3 py-1.5 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-charcoal-light">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
