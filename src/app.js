import React, { useEffect, useState } from 'react'
import { api } from './api'
import './scss/app.scss'
import { SmartDropdown } from './SmartDropdown'

export function App () {
  const [isAdmin, setIsAdmin] = useState(false)
  const [countriesRepo, setCountriesRepo] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const fetchCountries = () => {
    api.get('/listcountries')
      .then(response => {
        if (response.data) {
          setCountriesRepo(response.data)
          setCountries(response.data)
        }
      })
  }

  const addCountry = (name) => {
    api.post('/add', {
      name
    }).then(response => {
      if (response.data) {
        setSelectedCountry(response.data)
        countriesRepo.push(response.data)
        setCountriesRepo(countriesRepo)
        setCountries([response.data])
      }
    })
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const onCountrySearch = (value) => {
    value = value.trim()
    if (value) {
      const filteredCountries = countriesRepo.filter(country => country.name.search(new RegExp(value, 'ig')) > -1)
      setCountries(filteredCountries)
    } else {
      setCountries(countriesRepo)
    }
  }

  const onCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 text-center my-3 '>
          <h2>Country Dropdown</h2>
        </div>
      </div>
      <div className='row form-group'>
        <div className='col-md-3'>
          <label className='control-label'>
            Is Admin
          </label>
        </div>
        <div className='col-md-9'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='checkbox'
              name='prev'
              id='prev-is-admin'
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className='row form-group'>
        <div className='col-md-3'>
          <label className='control-label'>
            Choose Country
          </label>
        </div>
        <div className='col-md-9'>
          <SmartDropdown
            items={countries}
            onSearch={onCountrySearch}
            onSelect={onCountrySelect}
            limit={3}
            canAdd={isAdmin}
            onAdd={addCountry}
          />
          {
            selectedCountry &&
              <div className='mt-1'>
                <span className='badge badge-primary'>{selectedCountry.name}</span>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
