import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

// --- CONFIGURACIÓN DE ICONOS ---
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// CONFIGURACION DE BUSCADOR DE MAPA

const SearchField = () => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
            showMarker: false, 
            searchLabel: 'Ingresa una dirección...',
        });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
    }, [map]);

    return null;
};

// MAPA INTERACTIVO DE LOCALICACIONES

const InteractiveMap = ({ locations }) => {
    const centerPosition = [25.6700, -100.3500];

    return (
        <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border-2 border-emerald-100 relative z-0">
            <MapContainer 
                center={centerPosition} 
                zoom={12} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}>

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* buscador del mapa */}
            <SearchField />

            {/* Mapeo de DB para colocar los pines */}
            {locations && locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>

                <Popup>
                {/* Tarjeta Informativa */}
                <div className="p-1 min-w-[220px]">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-2 inline-block ${loc.badgeColor}`}>
                    {loc.type}
                    </span>
                    <h3 className="font-bold text-base text-stone-800 leading-tight mb-1">
                    {loc.name}
                    </h3>
                    
                    <div className="text-xs text-stone-600 mt-2 space-y-1">
                    <p><strong className="text-stone-700">Responsable:</strong> {loc.owner}</p>
                    <p><strong className="text-stone-700">Horario:</strong> {loc.hours}</p>
                    <p><strong className="text-stone-700">Atención:</strong> {loc.services}</p>
                    
                    {/* Si es una campaña, se muesta su periodo (duracion) */}
                    {loc.period && (
                        <p className="mt-2 p-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-[10px] font-semibold">
                            ⏱️ {loc.period}
                        </p>
                    )}
                    </div>
                    
                    <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 rounded transition">
                        Ver más detalles
                    </button>
                </div>

                <h3 className="font-bold">{loc.name}</h3>
                <p className="text-xs">Dirección guardada exitosamente.</p>

                </Popup>
            </Marker>
            ))}
        </MapContainer>
        </div>
    );
};

export default InteractiveMap;