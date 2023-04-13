import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from 'react'

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        if(item.unidad === 'xunidad'){

            cartCtx.addItem({...item, amount: 1});
        }else{

            cartCtx.addItem({...item, amount: 100});
        }
    }

    const orderHandler = (event) => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://meals-ba5e0-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        //TODO:VER AGREGAAR ESTAS LINEAS A SEND
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart()


    }
    const getMessageToSend= (dataUser, items)=>{
        let message = 'Nombre: '+dataUser.name + ' %0ADireccion: '+dataUser.street+ ' %0ABarrio: '+dataUser.city +
           ' %0ATelefono: '+ dataUser.postalCode + ' %0APedido:%0A';
        items.forEach(item =>{
            message += item.name + ' ' + item.amount + 'grs  %0A';
        })
        message+= '%0A Total: $ ' + cartCtx.totalAmount;
        return message;
    };

    const senWhatsUpHandler = (userData)=>{
        const mensaje = getMessageToSend(userData,cartCtx.items);
        let href = "https://api.whatsapp.com/send?phone=541136283520&text="+mensaje;
        let but = document.getElementById("hiddenButton");
        but.setAttribute('href', href);
        console.log(but.getAttribute('href'));
        but.click();
        setDidSubmit(true);
        cartCtx.clearCart()
    }


    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const hasItems = cartCtx.items.length > 0;

    const modalActions = (<div className={classes.actions}>
        <button className={classes['button-alt']} onClick={props.onClose}>Volver</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Enviar</button>}
    </div>);

    const cartModalContent = (<React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total:</span>
            <span>{totalAmount}</span>

        </div>
        <a  id="hiddenButton" target="_blank" href="/" alt="whatsapp"> </a>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onSend={senWhatsUpHandler} onCancel={props.onClose}></Checkout>}
        {!isCheckout && modalActions}
    </React.Fragment>);

    const isSubmittingModalContent = <p>Enviando orden...</p>;
    const didSubmitModalContent = <React.Fragment><p>La orden se envio con exito!! ...</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Cerrar</button>
        </div>
    </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};
export default Cart;
