export function applyFilter(columns, data, locale) {
  columns.forEach(col => {
    if (col.isFilterable && col.filterValue !== null && col.filterValue !== undefined) {
      data = data.filter(d => {
        const cellValue = d[col.name]
        const filterValue = col.filterValue
        const dataType = col.dataType

        if (dataType === 'text') {
          console.log(filterValue.trim().length)
          return filterValue.trim().length > 0
            ? cellValue.trim().toLocaleLowerCase(locale).includes(
              filterValue.trim().toLocaleLowerCase(locale)
            )
            || cellValue.trim().toLocaleUpperCase(locale).includes(
              filterValue.trim().toLocaleUpperCase(locale)
            )
            : true
        } else if (dataType === 'select' || dataType === 'boolean') {
          return cellValue === filterValue || filterValue === ''
        } else if (dataType === 'date') {
          return cellValue === filterValue.date || filterValue.date === null
        } else if (dataType === 'daterange') {
          if (filterValue.dateStart !== null && filterValue.dateEnd !== null) {
            return cellValue >= filterValue.dateStart && cellValue <= filterValue.dateEnd
          } else if (filterValue.dateStart !== null) {
            return cellValue >= filterValue.dateStart
          } else if (filterValue.dateEnd !== null) {
            return cellValue <= filterValue.dateEnd
          } else {
            return true
          }
        }
        return true
      })
    }
  })

  return data
}

export function applyPagination(columns, data, currentPage, perPage, sortField, sortDirection) {

}
