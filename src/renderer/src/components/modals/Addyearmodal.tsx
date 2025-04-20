


type SearchBarProps = {
  closemodal: () => void
}
const Addyearmodal: React.FC<SearchBarProps> = ({ closemodal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter une année</h2>

        <input
          type="text"
          placeholder="Ex: 2025"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => closemodal()}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Annuler
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Addyearmodal
