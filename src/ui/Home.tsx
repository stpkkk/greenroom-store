import { Link } from 'react-router-dom';
import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Green Room.
        <br />
        <span className="text-green-700">Добавьте зелени в вашу жизнь!</span>
      </h1>

      <CreateUser />
      <Link to="/menu">Start Ordering</Link>
    </div>
  );
}

export default Home;
