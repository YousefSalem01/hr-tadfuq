import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/Router';
import { queryClient } from './services/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
        <AppRouter />
        <Toaster position="top-right" />
    </Router>
    </QueryClientProvider>
  );
}

export default App;

