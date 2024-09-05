import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  to?: string;
};

function Button({ children, disabled, type, to }: ButtonProps) {
  const className =
    'bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring focus:ring-neutral-500 focus:ring-opacity-50 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4 inline-block px-4 py-3 font-semibold tracking-wide uppercase transition-colors duration-300 rounded-full';

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button type={type} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
export default Button;
