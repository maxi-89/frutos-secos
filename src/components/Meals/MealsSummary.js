import classes from "./MealsSummary.module.css";


const MealsSummary = ()=>{
    return (
        <section className={classes.summary}>
            <h1>Deliciosos frutos secos</h1>
            <p>Las frutas secas se destacan por sus beneficios para el corazón y sus propiedades
                antioxidantes. Reducen los niveles de colesterol malo (LDL) y aumenta el bueno (HDL).
                Aportan proteínas, vitaminas B y E y minerales como hierro, calcio, magnesio, potasio y fósforo.</p>
            <p>Nuestra misión es brindar un excelente servicio a los clientes, proveer mercadería
                de primera calidad generando vínculos que duren para toda la vida.</p>
        </section>
    );
}
export default MealsSummary