import { Route, Routes as Switch } from 'react-router-dom';

import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { Products } from './pages/products/Products';
import { RegisterProduct } from './pages/products/RegisterProduct';
import { NotFound } from './pages/NotFound';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

export default function Routes() {
  return (
    <Switch>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/register-product" element={<RegisterProduct />} />
      </Route>

      <Route path="/not-found" element={<NotFound />} />
    </Switch>
  );
}
