// TODO: Not yet functioning pagination. List 20 items per page and use nextToken to fetch next page.
const Pagination = ({ numberOfResults = 20 }) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Visar <span className="font-medium">1</span> till{' '}
          <span className="font-medium">{numberOfResults}</span>
          {/* av{' '}<span className="font-medium">20</span> resultat */}
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Föregående
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Nästa
        </a>
      </div>
    </nav>
  )
}

export default Pagination
