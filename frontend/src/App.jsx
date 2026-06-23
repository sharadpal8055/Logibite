  import { ToastContainer, toast } from 'react-toastify';

import { CartProvider } from "./context/CartContext";
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
function App() {
  return   (
  <AuthProvider>
  <CartProvider>
      <AppRoutes />
    </CartProvider>
    </AuthProvider>)
}

export default App;