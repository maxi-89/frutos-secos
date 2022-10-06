import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";



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
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>

    );
}
export default AvailableMeals