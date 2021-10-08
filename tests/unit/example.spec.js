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
})
