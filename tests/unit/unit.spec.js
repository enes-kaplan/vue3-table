// import { shallowMount } from '@vue/test-utils'
import { applyFilter, applyPagination, applySorting } from '../../src/helpers/filtering.js'

describe('Filtering tests', () => {
  it('filtering text without locale', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name',
        dataType: 'text',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Chris'
      },
      {
        name: 'Bruce'
      },
      {
        name: 'Alice'
      }
    ]

    columns[0].filterValue = 'chr'
    let filteredData = applyFilter(columns, data)
    expect(filteredData[0].name).toMatch('Chris')

    columns[0].filterValue = 'ce'
    filteredData = applyFilter(columns, data)
    expect(filteredData[0].name).toMatch('Bruce')
    expect(filteredData[1].name).toMatch('Alice')
  })

  it('filtering text with locale', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name',
        dataType: 'text',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Ismail'
      },
      {
        name: 'Çağlayan'
      },
      {
        name: 'Çağatay'
      }
    ]

    columns[0].filterValue = 'ısm'
    let filteredData = applyFilter(columns, data, 'tr-TR')
    expect(filteredData[0].name).toMatch('Ismail')

    columns[0].filterValue = 'çağ'
    filteredData = applyFilter(columns, data, 'tr-TR')
    expect(filteredData[0].name).toMatch('Çağlayan')
    expect(filteredData[1].name).toMatch('Çağatay')
  })

  it('filtering select', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name'
      },
      {
        name: 'gender',
        text: 'Gender',
        dataType: 'select',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Alice',
        gender: 'Female'
      },
      {
        name: 'Sasha',
        gender: 'Female'
      },
      {
        name: 'Brock',
        gender: 'Male'
      }
    ]

    columns[1].filterValue = 'Female'
    let filteredData = applyFilter(columns, data)
    expect(filteredData.length.toString()).toMatch('2')

    columns[1].filterValue = 'Male'
    filteredData = applyFilter(columns, data)
    expect(filteredData.length.toString()).toMatch('1')
  })

  it('filtering boolean', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name'
      },
      {
        name: 'isUserApproved',
        text: 'Is User Approved',
        dataType: 'boolean',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Alice',
        isUserApproved: true
      },
      {
        name: 'Sasha',
        isUserApproved: true
      },
      {
        name: 'Brock',
        isUserApproved: false
      }
    ]

    columns[1].filterValue = true
    let filteredData = applyFilter(columns, data)
    expect(filteredData.length.toString()).toMatch('2')

    columns[1].filterValue = false
    filteredData = applyFilter(columns, data)
    expect(filteredData.length.toString()).toMatch('1')
  })

  it('filtering date', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name'
      },
      {
        name: 'employmentDate',
        text: 'Employment Date',
        dataType: 'date',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Alice',
        employmentDate: '2021-01-01'
      },
      {
        name: 'Sasha',
        employmentDate: '2019-11-07'
      },
      {
        name: 'Brock',
        employmentDate: '2020-10-10'
      }
    ]

    columns[1].filterValue = { date: '2019-11-07' }
    let filteredData = applyFilter(columns, data)
    expect(filteredData[0].name).toMatch('Sasha')
  })

  it('filtering daterange', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name'
      },
      {
        name: 'employmentDate',
        text: 'Employment Date',
        dataType: 'daterange',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Alice',
        employmentDate: '2021-01-01'
      },
      {
        name: 'Sasha',
        employmentDate: '2019-11-07'
      },
      {
        name: 'Brock',
        employmentDate: '2020-10-10'
      }
    ]

    columns[1].filterValue = {
      dateStart: '2020-10-10',
      dateEnd: '2022-01-01'
    }
    let filteredData = applyFilter(columns, data)
    expect(filteredData.length.toString()).toMatch('2')
  })
})

describe('Sorting tests', () => {
  it('sorting test', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name',
        dataType: 'text',
        isSortable: true
      }
    ]
    const data = [
      {
        name: 'Chris'
      },
      {
        name: 'Alice'
      },
      {
        name: 'Bruce'
      }
    ]

    let sorting = { field: 'name', direction: 'asc' }
    let sortedData = applySorting(data, sorting.field, sorting.direction)
    expect(sortedData[0].name).toMatch('Alice')
    expect(sortedData[1].name).toMatch('Bruce')
    expect(sortedData[2].name).toMatch('Chris')

    sorting = { field: 'name', direction: 'desc' }
    sortedData = applySorting(data, sorting.field, sorting.direction)
    expect(sortedData[0].name).toMatch('Chris')
    expect(sortedData[1].name).toMatch('Bruce')
    expect(sortedData[2].name).toMatch('Alice')
  })
})

describe('Pagination tests', () => {
  it('pagination test', () => {
    const columns = [
      {
        name: 'name',
        text: 'Name',
        dataType: 'text',
        isFilterable: true
      }
    ]
    const data = [
      {
        name: 'Chris'
      },
      {
        name: 'Bruce'
      },
      {
        name: 'Alice'
      },
      {
        name: 'Henry'
      }
    ]

    let paginatedData = applyPagination(data, 0, 2)
    expect(paginatedData.length.toString()).toMatch('2')
    expect(paginatedData[0].name).toMatch('Chris')
    expect(paginatedData[1].name).toMatch('Bruce')
  })
})
