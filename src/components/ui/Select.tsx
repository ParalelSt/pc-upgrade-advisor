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
 * Accessible labeled dropdown select component.
 */
export default function Select({ label, options, value, placeholder, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none cursor-pointer"
      >
        <option value="" disabled>
          {placeholder ?? `Select ${label}`}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
