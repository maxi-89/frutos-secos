import {useContext} from "react";
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(0)}`;

    const addToCartHandler = (amount) => {
        console.log(amount)
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
            <MealItemForm id={props.id} unidad={props.unidad} onAddToCart={addToCartHandler}></MealItemForm>
        </div>
    </li>
}
export default MealItem;