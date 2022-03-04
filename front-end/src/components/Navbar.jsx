import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  NavbarDiv,
  NavBarProducs,
  NavBarOrders,
  NavBarProfile,
  NavBarCheckout,
} from '../Styles/navBarStyles/NavBarStyles';

export default function Navbar() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUserName(name);
  }, []);

  return (
    <NavbarDiv>
      <NavBarProducs>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          <div>
            <h3>produtos</h3>
          </div>
        </Link>
      </NavBarProducs>
      <NavBarOrders>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          <div>
            <h3>meus pedidos</h3>
          </div>
        </Link>
      </NavBarOrders>
      <NavBarProfile>
        <h3
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userName}
        </h3>
      </NavBarProfile>
      <NavBarCheckout>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
        >
          <button type="button" onClick={ () => localStorage.clear() }>sair</button>
        </Link>
      </NavBarCheckout>
    </NavbarDiv>
  );
}
