import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import { createServer } from 'miragejs'
import { productsData } from './data/products.ts'

if (import.meta.env.MODE === 'development') {
	createServer({
		routes() {
			this.urlPrefix = 'http://greenroom-store.netlify.app'
			this.namespace = 'api'

			this.get('/products', () => {
				return {
					products: productsData.data,
				}
			})
		},
	})
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
