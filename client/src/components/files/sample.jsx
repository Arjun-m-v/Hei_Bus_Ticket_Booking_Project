{isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay">
      <div className="bg-white rounded-lg p-10 w-[600px] h-[400px]  modal-content">
        <h2 className="text-2xl font-bold mb-6 text-center">Search Buses</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={handleSearchChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={handleSearchChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
  