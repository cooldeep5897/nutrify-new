import React, { useState } from 'react';
import { useHistory } from 'react-router';

const MultipleInputs=()=>{
    const history=useHistory();
    const [user,setUser]= useState({
            email:"",
            password:"",
            maxcal:""
    });


    const handelInput =(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        console.log(name,value);

        setUser({...user,[name]:value});

    }

    // const handelSubmit=(e)=>{
    //     e.preventDefault();

    //     const newRecord ={...userRegistration}
    //     console.log(records);
    //     setRecords([...records,newRecord]);
    //     console.log(records);
    //     setUserRegistration({ email:"",password:"",maxcal:"" });

    // }
    const PostData= async (e)=>{
        e.preventDefault();

        const {email, password,maxcal }=user;

        const res=await fetch('/auth/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email, password , maxcal
            })
        });

        const data=await res.json();
        if (data.error) {
            alert(data.message);
        } else {
            console.log("in mutipleInputs");
            history.push('/login');
        }
        
    }  


    return(
    <div  className="user">
       <header className="user__header"> <h1 class="user__title">***** Sign Up *****</h1></header>
        <form method="POST" className="form" >
        
            <div class="form__group">
            <input className='form__input' placeholder="Email" type="email" autoComplete="off" name="email"
            value={user.email}
            onChange={handelInput}
            />
            </div>
            <div class="form__group">
            <input className='form__input' placeholder="Password" type="password" autoComplete="off"  name="password"
            value={user.password}
            onChange={handelInput} 
            />
            <div class="form__group">
            <input className='form__input' placeholder="Total calories" type="text"  autoComplete="off" name="maxcal"
            value={user.maxcal}
            onChange={handelInput}
            /></div>
            </div>
            <button class="btn" type="submit" onClick={PostData}>Sign Up</button>
        </form>

    </div>
    )
}

export default MultipleInputs;
