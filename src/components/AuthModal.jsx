import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose, onRegisterSuccess }) => {
    const [role, setRole] = useState('adoptante');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', address: '', phone: '', hours: '', services: ''
    });

    if (!isOpen) return null;

    // actualiza los datos del formulario
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Lógica de registro y Geocodificación
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            let locationData = {}; // Objeto para las coordenadas

            // 3. Geocodificación
            if (role !== 'adoptante') {
                const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`);
            
                if (geoRes.data.length > 0) {
                    locationData = {
                    lat: parseFloat(geoRes.data[0].lat),
                    lng: parseFloat(geoRes.data[0].lon),
                    address: formData.address
                    };
                } else {
                    setErrorMsg('No encontramos esa dirección en el mapa.');
                    setLoading(false);
                    return;
                }
            }

            // plantilla de espera igual que MongoDB
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: role,
                location: locationData, 
                services: formData.services,
                hours: formData.hours
            };  

            //Envio API
            const apiUrl = import.meta.env.VITE_API_URL;
            await axios.post(`${apiUrl}/register`, payload);


            alert('Institución registrada exitosamente');
            onRegisterSuccess(); //App.jsx recarga los pines
            onClose(); // cierra modal

        } catch (error) {
        console.error(error);
        setErrorMsg('Error al registrar. Verifica tus datos');
        } finally {
        setLoading(false);
        }
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
                    <input required name="password" onChange={handleChange} type="password" placeholder="Crea una contraseña segura" className="p-3 border rounded-xl" />
                    
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

                    {errorMsg && <p className="text-red-500 text-sm font-medium text-center">{errorMsg}</p>}

                    <button disabled={loading} type="submit" className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex justify-center">
                        {loading ? <Loader2 className="animate-spin" /> : 'Registrarme y Dejar Huella'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;