import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropertyList from './components/PropertyList'

function App() {

const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PropertyList />
    </QueryClientProvider>
  )
}

export default App
