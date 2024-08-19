import { Link } from 'react-router-dom'

function Home() {
	return (
		<div>
			<h1>
				The best pizza.
				<br />
				Straight out of the oven, straight to you.
			</h1>

			<Link to='/menu'>Start Ordering</Link>
		</div>
	)
}

export default Home
