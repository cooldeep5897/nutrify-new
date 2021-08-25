import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';

const DeleteMeal=()=>{
     console.log('in home');
    const history=useHistory();
    // const [userData,setUserData]=useState({});
    // const [calData,setCalData]=useState("");
    const [meals,setMeals]=useState([{}]);
    console.log("after useState");
    useEffect(()=>{
        // callHome();
        PostData();
    },[]);
  
    
    // const callHome= async ()=>{
    //     try {
    //         const res=await fetch('/todos/home',{
    //             method:'GET',
    //             headers:{
                    
    //                 Accept:"application/json",
    //                 "Content-Type":"application/json"

    //             },
    //             credentials:"include"
    //         });
    //         const data= await res.json();
    //         console.log('user details ',data);
            
    //         setUserData(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const deleteMeal= async (e)=>{
        var id=e.target.value;
        const res=await fetch('/todos/deletemeal',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id
            })
        });
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
            setMeals(data.meals);
            console.log(data.meals);
            // history.push('/home');
            // let totcal=0
            // {data.meals.map((cal,index)=>{
            //      totcal+=parseInt(cal.calories);
            //         console.log(cal.calories) ;
                
            // })}
            // setCalData(totcal);
            // // console.log(calData);
            // // console.log(userData);
            // console.log('calorie',totcal);
        }
    }

    return(
        <div className="user" >
            {/* <h1 class="user__title">Hello { userData.email}</h1>
            <p>Max calories allowed: {userData.maxcal}</p>
            <p>Calories Consumed: {calData}</p>
        { parseInt(calData)>userData.maxcal?(<div className="background-red ">U are abouve ur limit</div>):(<div>u have {userData.maxcal-parseInt(calData)}  calories to go</div>)} */}
        {/* <ul>{
            meals.map((meal,index)=>{
                return(<li>{meal.mealname}</li>)
            } )
        }</ul> */}
        
                    <select onChange={deleteMeal}>
                        { meals.map((meal,index)=>{
                        return (
                            <option value={meal._id} key={meal._id} style={{margin:"auto"}} >{meal.mealname}</option>
                        
                            )
                        })}
                    </select>&nbsp;
                    <br></br>

                    {/* <label>CurretTime:{currenttime}</label> */}
            
        </div>
        )
}
export default DeleteMeal;