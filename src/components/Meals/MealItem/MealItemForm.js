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
        if(props.unidad === 'xunidad'){
            if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 100){
                setAmountIsValid(false);
                return;
            }

        }else{
            if(enteredAmount.trim().length === 0 || enteredAmountNumber < 100 || enteredAmountNumber > 1000){
                setAmountIsValid(false);
                return;
            }
        }
       

        props.onAddToCart(enteredAmountNumber);

    }

    let label;
    let min;
    let max;
    let step;

    if(props.unidad === 'xunidad'){
         label = 'x1'
         min = '1'
         max = '100'
         step = '1'
    }else{
         label = 'grs'
         min = '100'
         max = '1000'
         step = '50'
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label={label}
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: {min},
                max: {max},
                step: {step},
                defaultValue: props.unidad === 'xunidad' ? 1 : 100,
            }}
        />
        <button>Agregar</button>
        {!amountIsValid && <p>Please, enter a value amount({min}-{max})</p>}
    </form>
}

export default MealItemForm;