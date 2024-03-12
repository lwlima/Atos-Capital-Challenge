import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { Products } from './pages/products/Products';
import { CreateProduct } from './pages/products/CreateProduct';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';
import { NotFound } from './pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<CreateProduct />} />
      </Route>

      <Route path="*" element={<Navigate to="/not-found" replace />} />
      <Route path="/not-found" element={<NotFound />} />
    </Switch>
  );
}
