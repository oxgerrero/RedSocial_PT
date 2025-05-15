import { AppRouter } from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </>
  );
}

export default App;
