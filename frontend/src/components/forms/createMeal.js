import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router";

const CreateMeals=()=>{
     console.log('in meals');
    const history=useHistory();
    const [userData,setUserData]=useState({});

    useEffect(()=>{
        callHome();
        PostData();
    },[]);
  
    
    const callHome= async ()=>{
        try {
            const res=await fetch('/todos/createMeal',{
                method:'GET',
                headers:{
                    
                    Accept:"application/json",
                    "Content-Type":"application/json"

                },
                credentials:"include"
            });
            const data= await res.json();
            console.log('user details ',data);
            
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const PostData= async (e)=>{
        
        var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today =  yyyy+ '-' + mm + '-' + dd ;
        
    const res=await fetch('/todos/fetchmeal',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            date:today
        })
    });

    const data=await res.json();
    if (data.error) {
        alert(data.success);
    } else {
        console.log("in home mealsfetched");
        console.log(data.meals);
        // history.push('/home');
    }
}

return(
    <div  className="user">
         <header className="user__header"> <h1 class="user__title">***** Login *****</h1></header>
        <form className="form" action="" onSubmit={PostData}>
        <div class="form__group">
        <input className='form__input' placeholder="Email" type="email" autoComplete="off" name="email"
        value={user.email}
        onChange={handelInput}
        /></div>
       <div class="form__group">
        <input className='form__input' placeholder="Password" type="password" autoComplete="off"  name="password"
        value={user.password}
        onChange={handelInput}
        /></div>
        <button class="btn" type="submit">Sign Up</button>
    </form>
    </div>
)

}
export default CreateMeals;