"use client"
import { useEffect, useRef } from "react"
import { Leaf, Recycle, Globe } from "lucide-react"

export default function PlanetGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let rotation = 0

    function drawPlanet() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 90

      const gradient = ctx.createRadialGradient(
        centerX - 30,
        centerY - 30,
        20,
        centerX,
        centerY,
        radius
      )

      gradient.addColorStop(0, "#34d399")
      gradient.addColorStop(1, "#065f46")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      rotation += 0.003
      requestAnimationFrame(drawPlanet)
    }

    drawPlanet()
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">

      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mb-12">

        {/* Línea orbital */}
        <div className="absolute w-80 h-80 rounded-full border border-emerald-400/20 shadow-[0_0_25px_rgba(16,185,129,0.25)]"></div>

        {/* ÓRBITA */}
        <div className="absolute w-80 h-80 animate-spin-slow">

          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Leaf size={28} className="text-emerald-400" />
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Recycle size={28} className="text-emerald-300" />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Globe size={28} className="text-emerald-500" />
          </div>

        </div>

        {/* Planeta */}
        <canvas
          ref={canvasRef}
          className="w-64 h-64 z-10"
        />
      </div>

      <div className="text-center max-w-xl px-6 -mt-12">
        <h1 className="text-4xl font-bold mb-4 text-emerald-400">
          EcoPlaneta
        </h1>
        <p className="text-zinc-300">
          Pequeñas acciones generan grandes cambios. Únete al movimiento verde
          y haz que tu impacto sea positivo para el planeta.
        </p>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 25s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}