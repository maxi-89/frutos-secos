import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";
import MealItemDestacado from "./MealItem/MealItemDestacado";



const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(()=>{
        const fetchMeals = async ()=>{
            const response = await fetch('https://meals-ba5e0-default-rtdb.firebaseio.com/meals.json');
            if(!response.ok){
                throw new Error('Something was wrong!');
            }
            const responseData = await response.json();

            const loadedMeals = []

            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                    url: responseData[key].url
                });
            }
            setMeals(loadedMeals);
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


    const mealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name}
                                                       description={meal.description}
                                                       price={meal.price} url={meal.url}></MealItem>);
    return (<section className={classes.meals}>
        <Card>
            <h3>PRODUCTOS DESTACADOS!</h3>
            <div className={classes.divider}></div>
            <ul>
                <MealItemDestacado id={"0001"} key={"0001"} name={"Aceitunas Verdes y Negras"}
                          description={"Producto Destacado!!"}
                          price={1200} url={"https://i.imgur.com/cqcjjpq.jpg"}></MealItemDestacado>
            </ul>
        </Card>
            <div className={classes.divider}></div>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>

    );
}
export default AvailableMeals