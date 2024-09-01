import { FormEvent, useState } from 'react'

function CreateUser() {
	const [username, setUsername] = useState('')

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full max-w-72"
      />

      {username !== '' && (
        <div>
          <button>Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser
