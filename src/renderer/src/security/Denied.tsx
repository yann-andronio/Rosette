



export default function Denied() {
  return (
    <div className="fixed top-0 left-64 right-0 bottom-0 z-50 flex items-center justify-center">
      
      {/* Background flou seulement sur le contenu */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

      {/* Contenu */}
      <div className="relative z-10 text-center text-white">
        <div className="text-7xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-2">Accès refusé</h2>
        <p className="text-gray-200">
          Vous n'avez pas accès à cette page.
        </p>
      </div>

    </div>
  );
}