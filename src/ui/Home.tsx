import CreateUser from '../features/user/CreateUser';
import { useAppSelector } from '../redux/hooks';
import Button from './Button';

function Home() {
  const { username } = useAppSelector((state) => state.user);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Green Room
        <br />
        <span className="text-green-700">Добавьте зелени в вашу жизнь!</span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button style="primary" to="/menu">
          Продолжить как {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
