interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p role="alert" className="field-error">
      {message}
    </p>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>
      {hint && <p className="form-field__hint">{hint}</p>}
      {children}
      <FieldError message={error} />
    </div>
  );
}
