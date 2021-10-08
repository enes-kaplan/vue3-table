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
    const filteredData = applyFilter(columns, data)
    expect(filteredData[0].name).toMatch('Chris')

    columns[0].filterValue = 'ce'
    const filteredData2 = applyFilter(columns, data)
    expect(filteredData2[0].name).toMatch('Bruce')
    expect(filteredData2[1].name).toMatch('Alice')
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
    const filteredData = applyFilter(columns, data, 'tr-TR')
    expect(filteredData[0].name).toMatch('Ismail')

    columns[0].filterValue = 'çağ'
    const filteredData2 = applyFilter(columns, data, 'tr-TR')
    expect(filteredData2[0].name).toMatch('Çağlayan')
    expect(filteredData2[1].name).toMatch('Çağatay')
  })
})
