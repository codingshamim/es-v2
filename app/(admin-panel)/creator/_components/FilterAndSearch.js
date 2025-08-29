import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";

export default function FilterAndSearch({filterInput}) {
  return (
     <div className="bg-gradient-to-r from-dark-800/50 to-dark-700/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
           <SearchInput/>
           {filterInput}
          </div>
        </div>
      </div>
  )
}