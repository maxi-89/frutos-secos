import {useState} from 'react';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Footer from "./components/Layout/Footer";


function App() {
    const [cartIsShown, setCartIsShown]= useState(false)
    const showCartHandler = () =>{
        setCartIsShown(true);
    };
    const hideCartHandler = () =>{
        setCartIsShown(false);
    };

  return (
    <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
        <Header onShowCart={showCartHandler}></Header>
        <main>
            <Meals></Meals>
        </main>
        <Footer></Footer>
    </CartProvider>
  );
}

export default App;
