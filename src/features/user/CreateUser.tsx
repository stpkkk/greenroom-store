import { FormEvent, useState } from 'react';
import Button from '../../ui/Button';
import { useAppDispatch } from '../../redux/hooks';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateName(username));
    navigate('/menu');
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
          <Button style="primary">Оформить заказ</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
