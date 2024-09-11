import { useAppSelector } from '../redux/hooks';

function Username() {
  const { username } = useAppSelector((state) => state.user);

  if (!username) return null;

  return <div className="text-sm font-semibold md:block">{username}</div>;
}

export default Username;
