var dbClient=require('../db/index');


// Creating meal
const createMeal = async (meal,callback) =>{
    console.log("Meal" , meal);
   try { 
       const meals = dbClient.get('meals');
   await meals.insert({
        // meal_id:meal.mealid,
        email:meal.email,
        date:meal.date,
        mealname:meal.mealname,
        calories:meal.calories
    })
        callback(null,{
            success:true,
            message: 'Successfully created meal'
        });
    }
    catch(e){
        callback(e,null);
    }
}

module.exports.createMeal=createMeal;

//updating meal
const updateMeal = async (meal,callback) =>{
    console.log("Meal" , meal);
   try { 
       const meals = dbClient.get('meals');
   await meals.update({
        email:meal.email,
        meal_id:meal.mealid
   },{$set:{
        mealname:meal.newmeal,
        calories:meal.calories
    }})
        callback(null,{
            success:true,
            message: 'Successfully updated'
        });
    }
    catch(e){
        callback(e,null);
    }
}
module.exports.updateMeal=updateMeal;


//Delete Meal
const deleteMeal = async (meal,callback) =>{
    console.log("Meal" , meal);
   try { 
       const meals = dbClient.get('meals');
       
       const dbUsers=await meals.findOne({
           email:meal.email,
           _id:meal.id
    });
        console.log("meal found",dbUsers);
       if(dbUsers){
        await meals.remove({
            email:meal.email,
            _id:meal.id
        })
            callback(null,{
                success:true,
                message: 'Successfully deleted meal'
            });
        }else{
            callback(null,{
                success:true,
                message: 'no meal present'
            });
        }
    }
        catch(e){
            callback(e,null);
        }
    
}
module.exports.deleteMeal=deleteMeal;

//Fetch meal
const fetchMeal = async (meal,callback) =>{
    console.log("meal" , meal);
   try { 
       const meals = dbClient.get('meals');
       
    const fetchedmeals = await meals.find({
        email:meal.email,
        date:meal.date
    })
        callback(null,{
            success:true,
            meals:fetchedmeals
        });
    }
    catch(e){
        callback(e,null);
    }
}
module.exports.fetchMeal=fetchMeal;