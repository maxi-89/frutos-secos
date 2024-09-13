import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props)=>{
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1><ion-icon name="rose-outline"></ion-icon> Rous</h1>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table of delicius food" />
            </div>

        </React.Fragment>
    );
};

export default Header