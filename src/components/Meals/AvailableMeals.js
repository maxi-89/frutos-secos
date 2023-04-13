import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";
import MealItemDestacado from "./MealItem/MealItemDestacado";



const AvailableMeals = () => {
    const [mealsKilo, setMealsKilo] = useState([]);
    const [mealsDestacado, setMealsDestacado] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(()=>{
        const fetchMeals = async ()=>{
            const response = await fetch('https://meals-ba5e0-default-rtdb.firebaseio.com//1MJf-bwAu6slS8saPkQL9lDqD4NSc_pSytzpM5cDUiLg/catalogo_productos.json');
            if(!response.ok){
                throw new Error('Something was wrong!');
            }
            const responseData = await response.json();
            const loadedMealsKilo = []
            const loadedMealsDestacado = []

            for(const key in responseData){
                    loadedMealsKilo.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                        url: responseData[key].url,
                        type: responseData[key].type,
                        unit_of_measure: responseData[key].unit_of_measure,
                    });

                if(responseData[key].type === 'Destacado'){
                    loadedMealsDestacado.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                        url: responseData[key].url,
                        type: responseData[key].type,
                        unit_of_measure: responseData[key].unit_of_measure,
                    });
                }
               
            }

            console.log(loadedMealsKilo)
            console.log(loadedMealsDestacado)
            setMealsKilo(loadedMealsKilo);
            setMealsDestacado(loadedMealsDestacado);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    },[]);

    if (isLoading){
        return <section className={classes.MealsLoading}>
            <p>Loading ...</p>
        </section>
    }

    if(httpError){
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }


    const mealListKilo = mealsKilo.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name}
                                                       description={meal.description}
                                                       price={meal.price} url={meal.url} type={meal.type} unidad={meal.unit_of_measure}></MealItem>);

    const mealListDestacado = mealsDestacado.map(meal => <MealItemDestacado id={meal.id} key={meal.id} name={meal.name}
                                            description={meal.description}
                                            price={meal.price} url={meal.url} type={meal.type} unidad={meal.unit_of_measure}></MealItemDestacado>);


    return (<section className={classes.meals}>
        <Card>
            <h3>PRODUCTOS DESTACADOS!</h3>
            <div className={classes.divider}></div>
            <ul>
                    {mealListDestacado}
            </ul>
        </Card>
            <div className={classes.divider}></div>
            <Card>
                <ul>
                    {mealListKilo}
                </ul>
            </Card>
        </section>

    );
}
export default AvailableMeals