import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...rest }: IButtonProps) => {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
};
