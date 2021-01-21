import React, { useEffect, useRef, useState } from 'react'

export function SmartDropdown (props) {
  const { items, onSearch, onSelect, limit, canAdd, onAdd } = props

  const [isOpen, setIsOpen] = useState(false)
  const [itemsLimit, setItemsLimit] = useState(limit || 2)

  const searchInput = useRef()

  const open = function () {
    setIsOpen(true)
    searchInput.current.focus()
  }

  const close = function () {
    setIsOpen(false)
    setItemsLimit(limit || 2)
  }

  const onSearchInputChange = () => {
    onSearch(searchInput.current.value.trim())
  }

  const onItemSelect = (item) => {
    onSelect(item)
    close()
  }

  const onItemAdd = () => {
    onAdd(searchInput.current.value.trim())
    close()
  }

  useEffect(() => {
    const closeListener = () => {
      close()
    }
    window.addEventListener('click', closeListener, false)
    return () => {
      window.removeEventListener('click', closeListener, false)
    }
  }, [])

  return (
    <div
      className='dropdown'
      onClick={e => e.stopPropagation()}
    >
      <div className='input-group'>
        <input
          className='form-control'
          ref={searchInput}
          onClick={open}
          onChange={onSearchInputChange}
        />
        <div className='input-group-append' onClick={open}>
          <span className='input-group-text'>
            <i className='fa fa-arrow-down' />
          </span>
        </div>
      </div>
      {
        isOpen &&
          <ul className='dropdown-items list-group'>
            {items &&
              items.length > 0 &&
              items.slice(0, itemsLimit).map((item, index) =>
                <li
                  key={index}
                  className='list-group-item'
                  onClick={() => { onItemSelect(item) }}
                >
                  {item.name}
                </li>
              )}
            {items.length > itemsLimit &&
              <li
                className='list-group-item text-primary'
                onClick={() => { setItemsLimit(items.length) }}
              >
                {items.length - itemsLimit} more...
              </li>}
            {(!items.length || !items) &&
              <li className='list-group-item'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-danger'>{searchInput.current.value} not found.</span>
                  {
                    searchInput.current.value.trim() && canAdd &&
                      <button
                        className='btn btn-primary'
                        onClick={onItemAdd}
                      >
                        Add & Select
                      </button>
                  }
                </div>
              </li>}
          </ul>
      }
    </div>
  )
}
