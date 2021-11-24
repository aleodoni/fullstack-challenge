import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleChangeDate = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (date: Date | null, keyboardInputValue?: string | undefined) => {
    setData({
      ...data,
      [key]: date,
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const value = event.target.value;
    const key = event.target.name;

    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }

    setData({...options?.initialValues} as T)
  };

  return {
    data,
    handleChange,
    handleChangeSelect,
    handleSubmit,
    handleChangeDate,
    errors,
  };
};
