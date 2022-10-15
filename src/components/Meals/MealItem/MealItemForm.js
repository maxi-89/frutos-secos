import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useRef, useState} from "react";


const MealItemForm = (props) => {
    const[amountIsValid, setAmountIsValid]=useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 100 || enteredAmountNumber > 1000){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);

    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label='Grs'
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '100',
                max: '1000',
                step: '50',
                defaultValue: '100',
            }}
        />
        <button>Agregar</button>
        {!amountIsValid && <p>Please, enter a value amount(100-1000)</p>}
    </form>
}

export default MealItemForm;