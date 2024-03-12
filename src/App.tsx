import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from './Routes';
import { ResponseContextProvider } from './providers/ResponseContext';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResponseContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Toaster />
      </ResponseContextProvider>
    </QueryClientProvider>
  );
}

export default App
