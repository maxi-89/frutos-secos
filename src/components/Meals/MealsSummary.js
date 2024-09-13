import classes from "./MealsSummary.module.css";


const MealsSummary = ()=>{
    return (
        <section className={classes.summary}>
            <h1>Deliciosos frutos secos</h1>
            <p>Las frutas secas se destacan por sus beneficios para el corazón y sus propiedades
                antioxidantes. Reducen los niveles de colesterol malo (LDL) y aumenta el bueno (HDL).
                Aportan proteínas, vitaminas B y E y minerales como hierro, calcio, magnesio, potasio y fósforo.</p>
                <p>
                <a href="https://docs.google.com/spreadsheets/d/1kwL3YaZNy31Mmi8tn5KXeuiJLKUadUjM5DfkDL6McVU/edit?usp=sharing"
                   className={classes.button}>
                    ¡LISTA DE PRECIOS AQUÍ!
                </a>
            </p>
        </section>
    );
}
export default MealsSummary