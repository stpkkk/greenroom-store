import { Link } from 'react-router-dom';
import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold text-green-700">
        Green Room.
        <br />
        Добавьте зелени в вашу жизнь!
      </h1>

      <CreateUser />
      <Link to="/menu">Start Ordering</Link>
    </div>
  );
}

export default Home;
