import {useContext} from "react";
import classes from './MealItemDestacado.module.css';
import CartContext from "../../../store/cart-context";
import MealItemDestacadoForm from "./MealItemDestacadoForm";

const MealItemDestacado = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(0)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
            unidad: props.unidad
        })
    }

    return <li className={classes.meal}>

        <div className={classes.flexItem2}>
            <img className={classes.img} src={props.url} alt=""/>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price} { props.unidad }</div>
        </div>
        </div>
        <div>
            <MealItemDestacadoForm id={props.id} unidad={props.unidad} onAddToCart={addToCartHandler}></MealItemDestacadoForm>
        </div>
    </li>
}
export default MealItemDestacado;