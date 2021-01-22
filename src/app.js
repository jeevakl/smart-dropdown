import React, { useState } from 'react'
import { addCountry, api, fetchCountries } from './api'
import './scss/app.scss'
import { SmartDropdown } from './SmartDropdown'

export function App () {
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)

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
            fetch={fetchCountries}
            formatter={country => country.name}
            filter={(country, search) => country.name.search(new RegExp(search, 'ig')) > -1}
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
