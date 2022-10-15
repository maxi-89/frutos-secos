import {useContext} from "react";
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(0)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return <li className={classes.meal}>

        <div className={classes.flexItem2}>
            <img className={classes.img} src={props.url} alt=""/>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price} kg</div>
        </div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}></MealItemForm>
        </div>
    </li>
}
export default MealItem;