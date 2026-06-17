import React, { useState } from 'react';
import { X, Loader2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
 
const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [role, setRole] = useState('adoptante');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
 
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
 
        if (!isLoginMode && !acceptedTerms) {
        setErrorMsg('Debes aceptar los derechos y políticas de protección animal.');
        setLoading(false);
        return;
    }
 
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
 
            // Si es Login
            if (isLoginMode) {
                const res = await axios.post(`${apiUrl}/login`, {
                    email: formData.email,
                    password: formData.password
                });
 
                // Guarda sesión en el navegador
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
               
                onAuthSuccess(res.data.user);
                onClose();
            }
            else {
                let locationData = {};
 
                if (role !== 'adoptante') {
                    const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`);
                    if (geoRes.data.length > 0) {
                        locationData = {
                            lat: parseFloat(geoRes.data[0].lat),
                            lng: parseFloat(geoRes.data[0].lon),
                            address: formData.address
                        };
                    } else {
                        setErrorMsg('Dirección no encontrada en el mapa.');
                        setLoading(false);
                        return;
                    }
                }
 
                // Plantilla MongoDB
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: role,
                    location: locationData,
                    services: formData.services,
                    hours: formData.hours
                };
 
                // Envío API a la ruta de registro
                const res = await axios.post(`${apiUrl}/register`, payload);
               
                // Auto-login al registrarse
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
 
                alert('¡Bienvenido a Planeta Huella!');
                onAuthSuccess(res.data.user);
                onClose();
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.error || 'Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
 
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition"
                >
                    <X size={24} />
                </button>
 
                <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
                    {isLoginMode ? 'Iniciar Sesión' : 'Únete a Planeta Huella'}
                </h2>
 
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                   
                    {/* Campos exclusivos para el registro */}
                    {!isLoginMode && (
                        <>
                            <input required name="name" onChange={handleChange} type="text" placeholder="Nombre completo / Institución" className="p-3 border rounded-xl" />
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="p-3 border rounded-xl bg-white">
                                <option value="adoptante">Persona interesada en adoptar</option>
                                <option value="refugio">Refugio de Animales</option>
                                <option value="veterinaria">Clínica Veterinaria</option>
                            </select>
                        </>
                    )}
 
                    {/* Campos comunes (login y registro) */}
                    <input required name="email" onChange={handleChange} type="email" placeholder="Correo electrónico" className="p-3 border rounded-xl" />
 
 
                    <div className="relative">
    <input
        required
        name="password"
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        placeholder={isLoginMode ? "Contraseña" : "Crea una contraseña segura"}
        className="p-3 border rounded-xl w-full pr-12"
    />
 
    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-emerald-600"
    >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
               </div>
                   
                    {/* FORMULARIO CONDICIONAL: si el usuario no es adoptante*/}
                    {!isLoginMode && role !== 'adoptante' && (
                        <div className="flex flex-col gap-3 bg-emerald-50 p-4 rounded-xl">
                            <p className="text-xs font-bold text-emerald-800">Datos para el Mapa</p>
                            <input required name="address" onChange={handleChange} type="text" placeholder="Dirección exacta (Ej. Calle 123, Monterrey)" className="p-2 border rounded text-sm" />
                            <input required name="phone" onChange={handleChange} type="text" placeholder="Teléfono" className="p-2 border rounded text-sm" />
                            <input required name="hours" onChange={handleChange} type="text" placeholder="Horarios (Ej. 9am - 5pm)" className="p-2 border rounded text-sm" />
                            <input required name="services" onChange={handleChange} type="text" placeholder="Servicios principales" className="p-2 border rounded text-sm" />
                        </div>
                    )}
 
                    <div className="flex flex-col gap-3">
 
    {!isLoginMode && (
        <div className="bg-stone-50 p-3 rounded-xl border">
            <label className="flex items-start gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1"
                />
 
                <span className="text-sm text-stone-600">
                    Declaro que conozco y acepto los{" "}
                    <a
                        href="/politicas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 font-semibold hover:underline"
                    >
                        derechos y políticas de protección animal
                    </a>
                    {" "}y las normas de convivencia de Planeta Huella.
                </span>
            </label>
        </div>
    )}
 
    {errorMsg && (
        <p className="text-red-500 text-sm font-medium text-center">
            {errorMsg}
        </p>
    )}
 
</div>
 
 
 
<button
    disabled={loading}
    type="submit"
    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex justify-center"
>
    {loading ? (
        <Loader2 className="animate-spin" />
    ) : (
        isLoginMode ? 'Entrar' : 'Registrarme y Dejar Huella'
    )}
</button>
                </form>
 
                {/* boton para alternar entre Login y Registro */}
                <div className="mt-6 text-center text-sm text-stone-500">
                    {isLoginMode ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'} {' '}
                    <button
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setErrorMsg(''); // Limpia errores al cambiar de modo
                        }}
                        className="text-emerald-600 font-bold hover:underline"
                    >
                        {isLoginMode ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                    </button>
                </div>
 
            </div>
        </div>
    );
};
 
export default AuthModal;