import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const [role, setRole] = useState('adoptante');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleRegister = async () => {
        if (!nombre || !email || !password) {
            alert('Completa todos los campos');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, role, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Registro exitoso');
                onClose();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error al registrar');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-zinc-700">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center text-sky-400 mb-6">
                    Únete a Planeta Huella
                </h2>

                <form className="flex flex-col gap-4">

                    <input 
                        type="text" 
                        placeholder="Nombre completo / Nombre de institución"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />

                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />

                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-zinc-300">
                            ¿Cómo quieres participar?
                        </label>

                        <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                        onClick={handleRegister}
                        className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-sky-500/40"
                    >
                        Registrarme y Dejar Huella
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AuthModal;