import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-neutral-950">
      <h1 className="text-center text-xl font-semibold text-green-700">
        Green Room.
        <br />
        Добавьте зелени в вашу жизнь!
      </h1>

      <Link to="/menu">Start Ordering</Link>
    </div>
  );
}

export default Home;
