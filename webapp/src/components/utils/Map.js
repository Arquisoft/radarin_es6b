import React, { useCallback, useEffect, useState } from 'react';

function Map() {

    const [map, setMap] = useState(null);


    const mapRef = useCallback((nodo)=> {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "r6M0oC6XBjo6an8ToKcHlQkBhHQpSCL-zqcjm5xFS84"
        });
    
        const defaultLayers = platform.createDefaultLayers();
    
        const map = new H.Map(
          nodo,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 50, lng: 5 },
            zoom: 18,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        H.ui.UI.createDefault(map, defaultLayers);
             
        setMap(map);
        
    }, [setMap]); 

    useEffect(() => {
        if (map) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const H = window.H;
                var imagenIcono = new H.map.Icon("/img/marker-icon.png", { size: { w: 50, h: 50 } });

                var LocationOfMarker = { lat: position.coords.latitude, lng: position.coords.longitude };

                var marker = new H.map.Marker(LocationOfMarker,{icon: imagenIcono}); 

                window.addEventListener("resize", () => map.getViewPort().resize());

                map.addObject(marker);

                map.setCenter(LocationOfMarker);

            } , (error)=>{
                console.log(error);
            })
            return () =>{
                map?.dispose();
            }    
        }
    }, [map]);
    const tam=window.screen.height/1.25;
    return (
             <div ref={mapRef} id="map" style={{ height: tam }}/>
      );
}

export default Map;