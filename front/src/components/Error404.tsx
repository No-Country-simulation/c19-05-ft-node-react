import Image from "next/image";

export default function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 font-sans">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p style={{ fontSize: "47px" }} className={` text-2xl mb-8`}>
          Página no encontrada
        </p>
        <a
          href="/"
          className="inline-block bg-secondary text-slate-900 font-semibold px-6 py-3 rounded-full text-lg transition duration-300 hover:bg-slate-700 hover:text-white"
        >
          Volver a la página de Principal
        </a>
      </div>
    </div>
  );
}
