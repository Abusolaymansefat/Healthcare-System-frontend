import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AuthInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function AuthInput({
  id,
  label,
  type = "text",
  value,
  error,
  autoComplete,
  inputMode,
  maxLength,
  onChange,
  onBlur,
}: AuthInputProps) {
  const errorId = `${id}-error`;

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
        htmlFor={id}
      >
        {label}
      </FieldLabel>
      <Input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border-slate-200 bg-white px-3 text-sm focus-visible:border-teal-600 focus-visible:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-950"
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={id}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? (
        <p className="text-xs text-destructive" id={errorId}>
          {error}
        </p>
      ) : null}
    </Field>
  );
}
