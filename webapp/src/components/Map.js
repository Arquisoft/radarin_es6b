import React, { useCallback, useEffect, useState } from 'react';

function Map() {

    const [map, setMap] = useState(null);


    const mapRef = useCallback((nodo)=> {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "zxrFvGBh4mx3VNlzQJnDK9IozQjQ2g_i6E1wDgvoVec"
        });
    
        const defaultLayers = platform.createDefaultLayers();
    
        const map = new H.Map(
          nodo,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 50, lng: 5 },
            zoom: 10,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        window.addEventListener("resize", () => map.getViewPort().resize());
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        H.ui.UI.createDefault(map, defaultLayers);
             
        setMap(map);
        
    }, [setMap]); 

    useEffect(() => {
        if (map) {
            console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition((position)=>{
                const H = window.H;
                
                window.addEventListener("resize", () => map.getViewPort().resize());

                var LocationOfMarker = { lat: position.coords.latitude, lng: position.coords.longitude };

                var marker = new H.map.Marker(LocationOfMarker);    
                
                map.addObject(marker);

                map.setCenter(LocationOfMarker);

            } , (error)=>{
                console.error(error);
            })
            return () =>{
                map?.dispose();
            }    
        }
    }, [map])
    var tamX=window.screen.height;
    var tamY=window.screen.width;
    
    return (
        <div ref={mapRef} id="map" style={{ height: tamX, width: tamY}} />
      );
}

export default Map;