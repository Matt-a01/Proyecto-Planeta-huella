import React from 'react';
import { X, ShieldCheck, HeartHandshake } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
if (!isOpen) return null;

return (
<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    
    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative border border-stone-100 flex flex-col max-h-[85vh] overflow-hidden">
    
    {/* Encabezado fijo de la ventana */}
    <div className="flex justify-between items-center p-6 border-b border-stone-200 bg-stone-50">
        <div className="flex items-center gap-2">
        <ShieldCheck className="text-emerald-600" size={24} />
        <h3 className="text-xl font-bold text-stone-800">
            Términos, Condiciones y Políticas de Privacidad
        </h3>
        </div>
        {/* Botón para cerrar la ventana */}
        <button 
        onClick={onClose}
        className="text-stone-400 hover:text-stone-600 transition p-1 rounded-full hover:bg-stone-200"
        >
        <X size={20} />
        </button>
    </div>

    {/* Cuerpo con barra de desplazamiento (Scroll) para leer todo el documento */}
    <div className="p-6 overflow-y-auto space-y-6 text-stone-600 text-sm leading-relaxed">
        
        {/* Sección 1: Normas de convivencia */}
        <div>
        <h4 className="flex items-center gap-2 font-bold text-base text-emerald-800 mb-2">
            <HeartHandshake size={18} /> 1. Normas de Convivencia y Protección Animal
        </h4>
        <p>
            En <strong>Planeta Huella</strong>, nuestro objetivo primordial es salvaguardar la vida, 
            dignidad y bienestar de todos los animales. Al registrarte como adoptante, veterinaria o refugio, 
            te comprometes a:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-500">
            <li>No publicar ni fomentar ningún tipo de maltrato, abandono o explotación comercial no ética.</li>
            <li>Verificar que toda la información provista sobre casos de rescate o adopción sea verídica y verificable.</li>
            <li>Tratar con respeto, empatía y cordialmente a todos los demás miembros de la red colaborativa.</li>
        </ul>
        </div>

        <hr className="border-stone-200" />

        {/* Sección 2: Polticas de Privacidad */}
        <div>
        <h4 className="font-bold text-base text-stone-800 mb-2">
            2. Políticas de Privacidad y Uso de Datos
        </h4>
        <p>
            La seguridad de tus datos es fundamental para nosotros. Toda información personal provista 
            durante el registro (nombre, correo electrónico, ubicación geográfica y teléfonos de contacto) 
            será utilizada única y exclusivamente para los fines operativos de la plataforma:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-500">
            <li><strong>Geolocalización:</strong> Las direcciones de veterinarias y refugios se convierten en coordenadas anónimas en nuestro mapa interactivo.</li>
            <li><strong>Protección de credenciales:</strong> Tus contraseñas son encriptadas mediante algoritmos seguros (bcrypt) antes de ser almacenadas en nuestra base de datos.</li>
            <li><strong>Cero comercialización:</strong> Planeta Huella no venderá, cederá ni distribuirá tus datos personales a terceros bajo ninguna circunstancia.</li>
        </ul>
        </div>

        <hr className="border-stone-200" />

        {/* Sección 3: Responsabilidad */}
        <div>
        <h4 className="font-bold text-base text-stone-800 mb-2">
            3. Limitación de Responsabilidad
        </h4>
        <p>
            Planeta Huella actúa como un puente tecnológico de conexión ciudadana. La responsabilidad 
            final sobre acuerdos de adopción, tratamientos médicos veterinarios o donaciones recae 
            directamente en las partes involucradas. Recomendamos siempre tomar medidas de precaución 
            y verificar las credenciales institucionales.
        </p>
        </div>
    </div>

    {/* Pie de página fijo con botón para confirmar lectura */}
    <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
        <button
        type="button"
        onClick={onClose}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
        Entendido y cerrar
        </button>
    </div>

    </div>
</div>
);
};

export default TermsModal;