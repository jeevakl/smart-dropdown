import React, { useEffect, useRef, useState } from 'react'

export function SmartDropdown (props) {
  const { fetch, formatter, filter, onSelect, limit, canAdd, onAdd } = props

  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
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
    const search = searchInput.current.value.trim()
    setSearch(search)
  }

  const getFilteredItems = () => {
    return search ? items.filter(item => filter(item, search)) : items
  }

  const onItemSelect = (item) => {
    onSelect(item)
    close()
  }

  const onItemAdd = () => {
    onAdd(searchInput.current.value.trim())
      .then(item => {
        items.push(item)
        setItems(items)
        onItemSelect(item)
      })
  }

  useEffect(() => {
    fetch()
      .then(setItems)
  }, [])

  useEffect(() => {
    const closeListener = () => {
      close()
    }
    window.addEventListener('click', closeListener, false)
    return () => {
      window.removeEventListener('click', closeListener, false)
    }
  }, [])

  const filteredItems = getFilteredItems()

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
            {filteredItems &&
              filteredItems.length > 0 &&
              filteredItems.slice(0, itemsLimit).map((item, index) =>
                <li
                  key={index}
                  className='list-group-item'
                  onClick={() => { onItemSelect(item) }}
                >
                  {formatter(item)}
                </li>
              )}
            {filteredItems.length > itemsLimit &&
              <li
                className='list-group-item text-primary'
                onClick={() => { setItemsLimit(filteredItems.length) }}
              >
                {filteredItems.length - itemsLimit} more...
              </li>}
            {(!filteredItems.length || !filteredItems) &&
              <li className='list-group-item'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-danger'>{search} not found.</span>
                  {
                    search && canAdd &&
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
