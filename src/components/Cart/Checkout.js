import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = (value)=> value.trim() === '';
const isFiveChars = (value) => value.trim().length > 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCod = postInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const isEnteredNameValid = !isEmpty(enteredName);
        const isEnteredStreetValid = !isEmpty(enteredStreet);
        const isEnteredCodValid = isFiveChars(enteredCod);
        const isEnteredCityValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: isEnteredNameValid,
            street: isEnteredStreetValid,
            city: isEnteredCityValid,
            postalCode: isEnteredCodValid
        });

        const isFormValid = isEnteredCityValid && isEnteredCodValid && isEnteredStreetValid && isEnteredNameValid

        if(!isFormValid){
    return;
        }

        //submit data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredCod
        });


    };

    const onSendHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCod = postInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const isEnteredNameValid = !isEmpty(enteredName);
        const isEnteredStreetValid = !isEmpty(enteredStreet);
        const isEnteredCodValid = isFiveChars(enteredCod);
        const isEnteredCityValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: isEnteredNameValid,
            street: isEnteredStreetValid,
            city: isEnteredCityValid,
            postalCode: isEnteredCodValid
        });

        const isFormValid = isEnteredCityValid && isEnteredCodValid && isEnteredStreetValid && isEnteredNameValid

        if(!isFormValid){
            return;
        }

        //submit data
        props.onSend({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredCod
        });


    };

    const nameClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid }`;
    const streetClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid }`;
    const cityClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid }`;
    const codClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Nombre</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Dirección</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={codClasses}>
                <label htmlFor='postal'>Teléfono</label>
                <input type='text' id='postal' ref={postInputRef}/>
                {!formInputsValidity.postalCode && <p>Please enter a valid phone!</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>Ciudad</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button type='button' className={classes.send} onClick={onSendHandler}>Whatsapp</button>
            </div>
        </form>
    );
};

export default Checkout;