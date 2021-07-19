import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router";

const Home=()=>{
     console.log('in home');
    const history=useHistory();
    const [userData,setUserData]=useState({});
    // const [calData,setCalData]=useState({});
    useEffect(()=>{
        callHome();
        PostData();
    },[]);
  
    
    const callHome= async ()=>{
        try {
            const res=await fetch('/todos/home',{
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
        var totcal=0
         {data.meals.map((cal,index)=>{
             totcal+=parseInt(cal.calories);
            return(cal.calories,
                
                console.log(cal.calories) )
            
        })}
        console.log('calorie',totcal);
    }
}

    return(
        <div className="user" >
            <h1 class="user__title">Hello { userData.email}</h1>
            <p>Max calories allowed: {userData.maxcal}</p><br></br>
            <p>Calories Consumed{userData.totcal}</p>
        <br></br>
        <a href="/createmeal">Create Meal </a><br></br>
        <a href="/todos/updatemeal">Update Meal</a><br></br>
        <a href="/todos/deletemeal">Delete Meal</a><br></br>
        </div>
        )

}
export default Home;