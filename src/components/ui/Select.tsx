"use client";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: SelectOption[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

/**
 * Accessible labeled dropdown select with a custom chevron indicator.
 */
export default function Select({ label, options, value, placeholder, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 pr-10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none cursor-pointer transition-colors hover:border-muted"
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label}`}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-raised">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
