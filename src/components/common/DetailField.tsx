interface DetailFieldProps {
  label: string;
  value: string;
}

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
