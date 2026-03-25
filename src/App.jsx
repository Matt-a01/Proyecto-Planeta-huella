import React, { useState, useEffect} from 'react';
import axios from 'axios';
import InteractiveMap from './components/InteractiveMap';
import { X } from 'lucide-react';
import AuthModal from './components/AuthModal';
import { impactStories } from './data/impactStories';
import './index.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // lista de ubicaciones vacía
  const [locations, setLocations] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [showAllStories, setShowAllStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

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
    // Revisar si ya había una sesión guardada en el navegador
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    // Cargar los pines del mapa
    loadLocationsFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // funcion para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsDropdownOpen(false);
  };

  const scrollToImpact = () => {
    const impactSection = document.getElementById('impact-section');
    if (impactSection) {
      impactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            
            <div className="flex gap-4 items-center">
              <button onClick={scrollToImpact} className="hidden sm:block text-stone-400 hover:text-emerald-400 font-medium transition" >
                Nuestro Impacto
              </button>

              {/* render de deteccion de si tiene un loging*/}
              {currentUser ? (
                <div className="relative">
                  {/* Foto de perfil generada por API */}
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center focus:outline-none">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=10b981&color=fff`} 
                      alt="Perfil" 
                      className="w-10 h-10 rounded-full border-2 border-emerald-500 hover:scale-105 transition-transform" 
                    />
                  </button>
                  
                  {/* Menú Desplegable de Logout */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 py-2 z-50">
                      <p className="px-4 py-2 text-sm text-stone-700 font-bold border-b border-stone-100 truncate">
                        Hola, {currentUser.name.split(' ')[0]}
                      </p>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-5 rounded-lg shadow-lg transition-all"
                >
                  Únete a la Red
                </button>
              )}
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

<section id="impact-section" className="bg-stone-800 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Historias de Impacto
                </h3>
                <p className="text-stone-400 mt-2">
                  Pequeñas acciones, grandes cambios.
                </p>
              </div>
              <button 
                onClick={() => setShowAllStories(!showAllStories)}
                className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
              >
                {showAllStories ? 'Ver menos ↑' : 'Ver todas →'}
              </button>
            </div>

            {/* Renderizado dinámico de las tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactStories.slice(0, showAllStories ? impactStories.length : 2).map((story) => (
                <div 
                  key={story.id} 
                  onClick={() => setSelectedStory(story)}
                  className="group bg-stone-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border border-stone-700 flex flex-col sm:flex-row cursor-pointer"
                >
                  <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={story.img}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                    <h4 className="font-bold text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {story.title}
                    </h4>
                    <p className="text-sm text-stone-400">
                      {story.shortDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal Historia */} 
      {selectedStory && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-stone-900 rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative border border-stone-700 flex flex-col max-h-[90vh]">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedStory(null)} 
              className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-emerald-600 transition"
            >
              <X size={20} />
            </button>

            {/* Imagen Superior */}
            <div className="h-64 w-full relative">
              <img 
                src={selectedStory.img} 
                alt={selectedStory.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
            </div>

            {/* Texto Inferior */}
            <div className="p-8 overflow-y-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedStory.title}
              </h2>
              <p className="text-stone-300 text-lg leading-relaxed">
                {selectedStory.fullDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* onAuthSuccess actualiza el usuario */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={(user) => {
          setCurrentUser(user); // Guarda al usuario logueado en la memoria de la página
          loadLocationsFromDB(); // Recarga el mapa (por si registró una nueva institucion)
        }} 
      />

      <footer className="bg-black text-stone-500 py-8 text-center text-sm">
        <p>© 2026 Planeta Huella. Construyendo impacto sostenible.</p>
      </footer>
    </div>
  );
}

export default App;