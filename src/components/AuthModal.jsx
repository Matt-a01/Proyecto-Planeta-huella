import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const [role, setRole] = useState('adoptante');

    if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
                <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-center text-sky-900 mb-6">Únete a Planeta Huella</h2>

            <form className="flex flex-col gap-4">
            <input 
                type="text" 
                placeholder="Nombre completo / Nombre de institución" 
                className="p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-stone-600">¿Cómo quieres participar?</label>
                <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
                >

                <option value="adoptante">Persona interesada en adoptar</option>
                <option value="dador">Dar animales en adopción</option>
                <option value="refugio">Refugio de Animales</option>
                <option value="vet_prop">Clínica Veterinaria (Propietario)</option>
                <option value="vet_ref">Clínica Veterinaria (Referencia/Local)</option>
                <option value="gobierno">Institución Gubernamental</option>
                </select>
            </div>

                <button 
                    type="button" 
                    onClick={onClose}
                    className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition"
                >

                    Registrarme y Dejar Huella
                </button>
            </form>
        </div>
    </div>
);
};
export default AuthModal;
