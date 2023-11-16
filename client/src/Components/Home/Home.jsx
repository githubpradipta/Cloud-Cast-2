import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert2'

import './Home.css'

import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import cloudy from '../../Assets/Icons/clouds.png';
import snow from '../../Assets/Icons/snowman.png';
import atm from '../../Assets/Icons/atmospheric-pollution.png';
import rainy from '../../Assets/Icons/rain.png';
import clear from '../../Assets/Icons/sun.png';
import thunder from '../../Assets/Icons/thunderstorm.png';

export default function Home() {
    const[weather,setWeather] = useState({cityName:"",temp_max:"",temp_min:"",feels_like:"",status:"",humidity:"",wind:"",id:""})
    const[statusIcon,setStatusIcon] = useState(null);
    const[place,setPlace] = useState(null)
    const[city,setCity] = useState('')
    const navigate = useNavigate();

    let mainData;
    let data
    
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await swal.fire({
                title: "Welcome to CloudCast",
                text:"You can search for any place and get the weather details or can go with your current location's weather",
                confirmButtonText:"Get Weather",
                showCancelButton:true,
                cancelButtonText:"Your Location",
                input: 'text',
                inputPlaceholder:'Find with name of any place',
              });
            if(result.isConfirmed){
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${result.value}&appid=254f74bd063a0d2a6483f751f03d59ad`)
                .then((res)=>{
            data=res.data

           mainData=res.data.main
           setWeather({...weather,
            cityName:data.name,
            temp_max:mainData.temp_max,
            temp_min:mainData.temp_min,
            feels_like:mainData.feels_like,
            status:data.weather[0].description,
            humidity:mainData.humidity,
            wind: data.wind.speed,
            id:data.weather[0].id
                                    })
                 })
                .catch(err=>{
                    swal.fire({
                        icon: "info",
                        title: "Sorry !!!",
                        text: "Place not found or check internet connection",
                        confirmButtonText:"Understood"
                      });
                })
            }
            else{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition((pos)=>{
                        let lat = pos.coords.latitude
                        let long = pos.coords.longitude
            
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=254f74bd063a0d2a6483f751f03d59ad`)
                        .then((res)=>{
                        data=res.data
    
                       mainData=res.data.main
                       setWeather({...weather,
                        cityName:data.name,
                        temp_max:mainData.temp_max,
                        temp_min:mainData.temp_min,
                        feels_like:mainData.feels_like,
                        status:data.weather[0].description,
                        humidity:mainData.humidity,
                        wind: data.wind.speed,
                        id:data.weather[0].id
                                                })
                    })
                    .catch(err=>{
                        swal.fire({
                            icon: "info",
                            title: "Sorry !!!",
                            text: "Place not found or check internet connection",
                            confirmButtonText:"Understood"
                          });
                    })
            
                    })
                }
            }
        }
        fetchData();

        
    },[])


    const sendPlace = ()=>{
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=254f74bd063a0d2a6483f751f03d59ad`)
        .then((res)=>{
            data=res.data
          
           mainData=res.data.main
           setWeather({...weather,
            cityName:data.name,
            temp_max:mainData.temp_max,
            temp_min:mainData.temp_min,
            feels_like:mainData.feels_like,
            status:data.weather[0].description,
            humidity:mainData.humidity,
            wind: data.wind.speed,
            id:data.weather[0].id
                                    })
        })
        .catch(err=>{
            swal.fire({
                icon: "info",
                title: "Sorry !!!",
                text: "Place not found or check internet connection",
                confirmButtonText:"Understood"
              });
        })

    }


    useEffect(()=>{
    let id=weather.id
    if(id>200 && id<300){
        setStatusIcon(thunder)
    }
    else if(id>400 && id<=500){
        setStatusIcon(rainy)
    }
    else if(id>500 && id<600){
        setStatusIcon(snow)
    }
    else if(id>=700 && id<800){
        setStatusIcon(atm)
    }
    else if(id===800){
        setStatusIcon(clear)
    }
    else if(id>=801 && id<805){
        setStatusIcon(cloudy)
    }
    },[weather])
   
    const getPlace = (e)=>{
            let searchData = e.target.value;
            setPlace(searchData);
    }
    useEffect(()=>{
        setCity(place)
    },[sendPlace])
    
    const logout = ()=>{
        navigate('/login')
    }
    
   
  return (
    <div className='homeContainer'>   
    <div className="topHeader">
    <div className="searchBar">
    <input type="text" className='search' onChange={getPlace} placeholder='Search with name of any place'/>
    <button className='searchBtn' onClick={sendPlace}>search</button>
    </div>
    
    <button className="logout" onClick={logout}>Logout</button>

    </div>
        <div className="HomeBox">
            <div className="header">
                <h1>Weather of {weather.cityName}</h1>
                <img src={statusIcon} alt="" className='statusIcon'/>
                <div className="feelsLike">
                <h1 className="feelslike">{
                weather.feels_like!=""?
                Math.round(weather.feels_like-272):
                0
                }°c</h1>
                <p>Feels Like</p>
                </div>
                <p className="status">{weather.status}</p>
            </div>
            <div className="buttom">
                <div className="temp">
                    <div className="temp_div">

                        <p><span>{
                        weather.temp_max!=""?
                        Math.round(weather.temp_max-272):
                        0
                        }</span>°c</p>
                        <p>Highest Temp</p>

                    </div>
                    <div className="temp_div">

                        <p><span>{
                        weather.temp_min!=""?
                        Math.round(weather.temp_min-278):
                        0
                        }</span>°c</p>

                        <p>Lowest Temp</p>
                    </div>
                    
                </div>
                <div className="others">
                    <div className="other_box">
                        <p className="humidity">Humidity</p>
                        <h1><span>{
                        weather.humidity!=""?
                        weather.humidity:
                        0
                        }&nbsp;</span>%</h1>
                        <WaterDropIcon className='whaterdrop'/>
                    </div>
                    <div className="other_box">
                        <p className="pressure">Wind Speed</p>
                        <h1><span>{
                        weather.wind!=""?
                        weather.wind:
                        0
                        }&nbsp;</span></h1>
                        <AirIcon/>
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
  )
}
