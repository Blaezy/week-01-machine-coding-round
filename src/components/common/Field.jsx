export function Field({ label, children }) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-[0.78rem] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="text-[0.85rem] text-bad" role="alert">
      {children}
    </p>
  );
}

export function Options({ values }) {
  return values.map((value) => <option key={value}>{value}</option>);
}
