import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import { createServer } from 'miragejs'
import { productsData } from './data/products.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
