import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
	const [query, setQuery] = useState('')
	const navigate = useNavigate()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!query) return

		navigate(`/order/${query}`)
		setQuery('')
	}

	return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-900 transition-all duration-300 focus:outline-none focus:ring focus:ring-neutral-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
export default SearchOrder
