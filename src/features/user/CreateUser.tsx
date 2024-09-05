import { FormEvent, useState } from 'react'
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm">👋 Приветствуем! Скажите как вас зовут:</p>

      <input
        type="text"
        placeholder="Ваше имя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-full max-w-72"
      />

      {username !== '' && (
        <div>
          <Button to="/menu" type="submit">
            Start Ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser
