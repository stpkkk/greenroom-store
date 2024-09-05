import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  to?: string;
  style: 'primary' | 'small';
};

function Button({ children, disabled, style, type, to }: ButtonProps) {
  const base =
    'bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-opacity-50 focus:ring-offset-2 disabled:cursor-not-allowed inline-block font-semibold tracking-wide uppercase transition-colors duration-300 rounded-full text';

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  };

  if (to)
    return (
      <Link className={styles[style]} to={to}>
        {children}
      </Link>
    );

  return (
    <button type={type} disabled={disabled} className={styles[style]}>
      {children}
    </button>
  );
}
export default Button;
