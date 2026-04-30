'use client';

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const baseInput = 'w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2.5 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:opacity-60 disabled:cursor-not-allowed';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function InputField({ label, error, helperText, id, className = '', ...props }: InputFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium">
        {label}
        {props.required && <span className="ml-0.5 text-danger-500">*</span>}
      </label>
      <input id={fieldId} className={`${baseInput} ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''} ${className}`} aria-invalid={!!error} aria-describedby={error ? `${fieldId}-error` : undefined} {...props} />
      {error && <p id={`${fieldId}-error`} className="text-xs text-danger-500" role="alert">{error}</p>}
      {helperText && !error && <p className="text-xs text-[var(--muted)]">{helperText}</p>}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({ label, error, options, placeholder, id, className = '', ...props }: SelectFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium">
        {label}
        {props.required && <span className="ml-0.5 text-danger-500">*</span>}
      </label>
      <select id={fieldId} className={`${baseInput} ${error ? 'border-danger-500' : ''} ${className}`} aria-invalid={!!error} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-danger-500" role="alert">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextareaField({ label, error, id, className = '', ...props }: TextareaFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium">{label}</label>
      <textarea id={fieldId} className={`${baseInput} min-h-[100px] resize-y ${error ? 'border-danger-500' : ''} ${className}`} aria-invalid={!!error} {...props} />
      {error && <p className="text-xs text-danger-500" role="alert">{error}</p>}
    </div>
  );
}

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function CheckboxField({ label, id, ...props }: CheckboxFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label htmlFor={fieldId} className="flex items-center gap-2.5 cursor-pointer text-sm">
      <input type="checkbox" id={fieldId} className="h-4 w-4 rounded border-[var(--input-border)] text-primary-600 focus:ring-primary-500" {...props} />
      <span>{label}</span>
    </label>
  );
}

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function DatePicker({ label, error, id, ...props }: DatePickerProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium">{label}</label>
      <input type="date" id={fieldId} className={`${baseInput} ${error ? 'border-danger-500' : ''}`} aria-invalid={!!error} {...props} />
      {error && <p className="text-xs text-danger-500" role="alert">{error}</p>}
    </div>
  );
}
