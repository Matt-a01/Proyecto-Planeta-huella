import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onRegister }) => {

    const [role, setRole] = useState('adoptante');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', address: '', phone: '', hours: '', services: '' });

    if (!isOpen) return null;

    // actualiza los datos del formulario
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Lógica de registro y Geocodificación
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (role !== 'adoptante') {
            try {
                // Consultamos la API formData.address
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`);
                const data = await response.json();

                if (data.length > 0) {
                    // Si encuentra la dirección, crea el objeto para el mapa
                    const newPin = {
                        id: Date.now(), // ID temporal
                        type: role,
                        name: formData.name,
                        lat: parseFloat(data[0].lat), // Latitud obtenida
                        lng: parseFloat(data[0].lon), // Longitud obtenida
                        owner: formData.email,
                        hours: formData.hours,
                        services: formData.services,
                        badgeColor: 'bg-orange-100 text-orange-800'};

                    onRegister(newPin); //Registra nuevo pin

                } else {
                    alert('No encontramos esa dirección. Intenta agregar la ciudad.');
                }
            } catch (error) {
                console.error("Error al buscar dirección", error);
            }
        }
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition">
                        <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center text-sky-400 mb-6">
                    Únete a Planeta Huella
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input required name="name" onChange={handleChange} type="text" placeholder="Nombre completo / Institución" className="p-3 border rounded-xl" />
                    <input required name="email" onChange={handleChange} type="email" placeholder="Correo electrónico" className="p-3 border rounded-xl" />
                    
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="p-3 border rounded-xl">
                        <option value="adoptante">Persona interesada en adoptar</option>
                        <option value="refugio">Refugio de Animales</option>
                        <option value="veterinaria">Clínica Veterinaria</option>
                    </select>

                    {/*FORMULARIO CONDICIONAL: Si el usuario no es adoptante */}
                    {role !== 'adoptante' && (
                        <div className="flex flex-col gap-3 bg-emerald-50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-emerald-800">Datos para el Mapa</p>
                        <input required name="address" onChange={handleChange} type="text" placeholder="Dirección exacta (Ej. Calle 123, Monterrey)" className="p-2 border rounded text-sm" />
                        <input required name="phone" onChange={handleChange} type="text" placeholder="Teléfono" className="p-2 border rounded text-sm" />
                        <input required name="hours" onChange={handleChange} type="text" placeholder="Horarios (Ej. 9am - 5pm)" className="p-2 border rounded text-sm" />
                        <input required name="services" onChange={handleChange} type="text" placeholder="Servicios principales" className="p-2 border rounded text-sm" />
                        </div>
                    )}

                    <button disabled={loading} type="submit" className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition">
                        {loading ? 'Buscando dirección...' : 'Registrarme'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;