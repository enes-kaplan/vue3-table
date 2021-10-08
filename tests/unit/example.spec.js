// import { shallowMount } from '@vue/test-utils'
import { applyFilter } from '../../src/helpers/filtering.js'

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
        dataType: 'boolean',
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

    columns[1].filterValue = '2019-11-07'
    let filteredData = applyFilter(columns, data)
    expect(filteredData[0].name).toMatch('Sasha')
  })
})
