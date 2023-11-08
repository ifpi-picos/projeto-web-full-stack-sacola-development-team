export default function Filter() {
    return (
      <div className="bg-gray-500 ml-3 w-84 h-10 sm:w-2/3 sm:h-12 rounded-xl flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <h2 className="text-white text-sm font-semibold mr-4">
            Todos os jogos (<span className="text-gray-300 text-sm">{}</span>)
          </h2>
          <select className="text-gray-800 bg-gray-400 border border-gray-500 rounded py-1 px-2">
            <option className="text-white" value="">
              Já zerei
            </option>
            <option className="text-white" value="">
              Quero zerar
            </option>
            <option className="text-white" value="">
              Estou jogando
            </option>
            <option className="text-white" value="">
              Desisti de zerar
            </option>
          </select>
        </div>
      </div>
    );
  }
  