    import React,{ useState } from "react";
    import { useHistory } from 'react-router';

const CreateMeals=()=>{
    
        const history=useHistory();
        const [user,setUser]= useState({
            mealname:"",
            calories:"",
            mealid:""
        });
    
    
    const handelInput =(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        console.log(name,value);
    
        setUser({...user,[name]:value});
    
    }
    
        const PostData= async (e)=>{
            e.preventDefault();
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today =  yyyy+ '-' + mm + '-' + dd ;
        const {mealname, calories ,mealid }=user;
    
        const res=await fetch('/todos/createMeal',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                mealname,mealid , calories, date:today
            })
        });

        const data=await res.json();
        if (data.error) {
            alert(data.message);
        } else {
            console.log("meal added");
            history.push('/home');
        }
        
    }  

    // const PostData= async (e)=>{
        
    //     var today = new Date();
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0');
    //         var yyyy = today.getFullYear();

    //         today =  yyyy+ '-' + mm + '-' + dd ;
        
    // const res=await fetch('/todos/fetchmeal',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         date:today
    //     })
    // });

    // const data=await res.json();
    // if (data.error) {
    //     alert(data.success);
    // } else {
    //     console.log("in home mealsfetched");
    //     console.log(data.meals);
    //     // history.push('/home');
    // }


return(
    <div  className="user">
         <header className="user__header"> <h1 class="user__title">***** Add meal *****</h1></header>
        <form className="form" action="" onSubmit={PostData}>
        <div class="form__group">
        <input className='form__input' placeholder="mealname" type="text" autoComplete="off" name="mealname"
        value={user.mealname}
        onChange={handelInput}
        /></div>
        <div class="form__group">
        <input className='form__input' placeholder="Meal ID" type="number" autoComplete="off"  name="mealid"
        value={user.mealid}
        onChange={handelInput}
        /></div>
       <div class="form__group">
        <input className='form__input' placeholder="calories" type="number" autoComplete="off"  name="calories"
        value={user.calories}
        onChange={handelInput}
        /></div>
        <button class="btn" type="submit">ADD MEAL</button>
    </form>
    </div>
)

}
export default CreateMeals;