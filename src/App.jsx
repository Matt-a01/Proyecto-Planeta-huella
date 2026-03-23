import React, { useState, useEffect} from 'react';
import axios from 'axios';
import InteractiveMap from './components/InteractiveMap';
import AuthModal from './components/AuthModal';
import './index.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // lista de ubicaciones vacía
  const [locations, setLocations] = useState([]);

  console.log("URL DEL BACKEND DETECTADA:", import.meta.env.VITE_API_URL);

  const loadLocationsFromDB = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL; 
      if (!apiUrl) {
        console.warn("Falta configurar VITE_API_URL en el archivo .env");
        return; 
      }
      const response = await axios.get(`${apiUrl}/pins`);
      setLocations(response.data);
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
    }
  };

  // llama cuando la página carga por primera vez
  useEffect(() => {
    loadLocationsFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen font-sans text-stone-800 selection:bg-emerald-200">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer">
          <img src="/log.png" alt="Logo de Planeta Huella" className="h-10 w-auto" />
            <h1 className="text-xl font-extrabold text-emerald-400 tracking-tight">
              Planeta Huella
            </h1>
          </div>
            <div className="flex gap-4">
              <button className="hidden sm:block text-stone-400 hover:text-emerald-400 font-medium transition">
                Nuestro Impacto
              </button>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-5 rounded-lg shadow-lg transition-all"
              >
                Únete a la Red
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 pt-20 pb-24 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold tracking-wider mb-6 uppercase">
              Tecnología para el Bienestar Animal
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Cada huella transforma{" "}
              <span className="text-emerald-400">nuestro mundo.</span>
            </h2>

            <p className="text-lg md:text-xl text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Una red inteligente que conecta personas, tecnología y acción
              para generar impacto real en el bienestar animal.
            </p>
          </div>
        </section>

        {/* Sección del Mapa interactivo */}
        <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-24">
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 md:p-12 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-stone-800 mb-2 text-center">Explora el Ecosistema</h3>
            <p className="text-stone-500 mb-8 text-center">Encuentra veterinarias, refugios y campañas cerca de ti.</p>

            <InteractiveMap locations={locations} />

          </div>
        </section>

        {/* Historias */}
        <section className="bg-stone-800 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Historias de Impacto
                </h3>
                <p className="text-stone-400 mt-2">
                  Pequeñas acciones, grandes cambios.
                </p>
              </div>
              <button className="text-emerald-400 font-semibold hover:text-emerald-300 transition">
                Ver todas →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Tarjeta 1 */}
              <div className="group bg-stone-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border border-stone-700 flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"
                    alt="Perro rescatado"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-orange-400 bg-orange-900/40 inline-block px-2 py-1 rounded mb-3 w-max">
                    ODS 10
                  </span>
                  <h4 className="font-bold text-xl text-white mb-2">
                    Comunidad que rescata
                  </h4>
                  <p className="text-sm text-stone-400">
                    Gracias a la red colaborativa, más de 300 animales fueron
                    atendidos este año.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2 */}
              <div className="group bg-stone-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border border-stone-700 flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400"
                    alt="Gato saludable"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 inline-block px-2 py-1 rounded mb-3 w-max">
                    ODS 3
                  </span>
                  <h4 className="font-bold text-xl text-white mb-2">
                    Salud accesible
                  </h4>
                  <p className="text-sm text-stone-400">
                    Tecnología que facilita atención veterinaria preventiva.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onRegisterSuccess={loadLocationsFromDB} />

      <footer className="bg-black text-stone-500 py-8 text-center text-sm">
        <p>© 2026 Planeta Huella. Construyendo impacto sostenible.</p>
      </footer>
    </div>
  );
}

export default App;