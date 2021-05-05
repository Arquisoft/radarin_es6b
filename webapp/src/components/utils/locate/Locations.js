import React, {useState, createContext} from "react";

export const LocationsContext = createContext();

export const Locations = (props) => {
    const [locations, setLocations] = useState([]);
    const [position, setPosition] = useState();    

    return (
        <LocationsContext.Provider value={{locations, setLocations, position, setPosition}}>
            {props.children}
        </LocationsContext.Provider>
    )
}