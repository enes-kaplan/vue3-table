export function applyFilter(columns, data, locale) {
  columns.forEach(col => {
    if (col.filterValue && col.filterValue.length > 0) {
      data = data.filter(d => {
        const cellValue = d[col.name]
        const filterValue = col.filterValue
        const dataType = col.dataType

        if (dataType === 'text') {
          return cellValue.trim().toLocaleLowerCase(locale).includes(
            filterValue.trim().toLocaleLowerCase(locale)
          )
          || cellValue.trim().toLocaleUpperCase(locale).includes(
            filterValue.trim().toLocaleUpperCase(locale)
          )
        }

        return []
      })
    }
  })

  return data
}

export function applyPagination(columns, data, currentPage, perPage, sortField, sortDirection) {

}
