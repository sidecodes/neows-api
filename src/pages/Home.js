import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'pDBJ4JwMvCY5zhrx5IjQffa6eCdJgCXWmMwquBYg'

const listasteroids = async () =>{
    return await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${API}`,{
        method: "GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(error => console.log(error))
}


function Home(){

    const [asteroids, setAsteroids] = useState([]);

    const preload = () => {
        listasteroids()
            .then(data=>{
                setAsteroids(data.near_earth_objects)
            })
	}
	
	useEffect(() => {
        preload()
    }, []);

    return(
            <div>
                <form>
                <div className="field actions">
                <button className="ui primary button login" type="submit">
                Signup
                </button>
                or
                <Link to="/login">Log In</Link>
            </div>
                </form>
                <h1 className="content">Asteroids List</h1>
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Magnitude</th>
                                <th scope="col">Diameter(miles)</th>
                                <th scope="col">Hazardous</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                asteroids.map(asteroid => {
                                    return(
                                    <tr>
                                        <th scope="row">{asteroid.id}</th>
                                        <td>{asteroid.name}</td>
                                        <td>{asteroid.absolute_magnitude_h}</td>
                                        <td>{asteroid.estimated_diameter.miles.estimated_diameter_max}</td>
                                        <td>{asteroid.is_potentially_hazardous_asteroid ? <i className="positive"></i> : <i className="negative"></i>}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            </div>
    )
}

export default Home;