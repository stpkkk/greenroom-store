import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LinkButtonProps = {
  children: ReactNode;
  to: string;
};

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className =
    'hover: hover:text-blue-600 text-sm text-blue-500 underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
export default LinkButton;
