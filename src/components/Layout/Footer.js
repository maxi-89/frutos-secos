import classes from './Footer.module.css'
import React from 'react';

const Footer = ()=>{

    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <p className={classes.text}><ion-icon name="logo-whatsapp"></ion-icon> 1136283520</p>
                <p className={classes.text}>
                <a href="https://maximiliano-rodriguez.com" target="_blank" rel="noreferrer">
                 <ion-icon name="code-slash-outline"></ion-icon>
                  Desarrollado por</a>
                </p>
            </footer>
        </React.Fragment>
    );

}

export default Footer