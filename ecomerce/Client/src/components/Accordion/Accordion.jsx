import React, { useState, useEffect } from 'react';
import { filterProducts, agregarFiltro , removerFiltro} from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Accordion({ options, isOpen, filtros }) {

  const [checkedItems, setCheckedItems] = useState({});
  const dispatch = useDispatch()
  const [isAccordionOpen, setIsAccordionOpen] = useState(
    JSON.parse(localStorage.getItem(`${options.name}_isOpen`)) || isOpen
  );

  const handleCheckboxChange = (event, item, title) => {
    if (event.target.checked) {
      dispatch(agregarFiltro({ name: title, valor: item }));
      dispatch(filterProducts());
      setCheckedItems(prev => ({ ...prev, [item]: true }));
    } else {
      dispatch(filterProducts());
      dispatch(removerFiltro({ name: title, valor: item }));
      setCheckedItems(prev => ({ ...prev, [item]: false }));
    }
  };

  const toggleAccordion = () => {
    const newState = !isAccordionOpen;
    setIsAccordionOpen(newState);
    localStorage.setItem(`${options.name}_isOpen`, JSON.stringify(newState));
  };

  useEffect(() => {
    setCheckedItems(
      options.items.reduce((acc, item) => ({
        ...acc,
        [item]: filtros.some(filtro => filtro.name === options.name && filtro.valor === item)
      }), {})
    );
  }, [filtros, options.items, options.name]);

  return (
    <div className="mb-4 w-full">
      <div
        className="select-none cursor-pointer flex items-center justify-start w-full  pr-4 bg-none text-black rounded-md"
        onClick={toggleAccordion}
      >
        <svg
          className={`h-4 w-4 ${isAccordionOpen ? 'transform rotate-360' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isAccordionOpen ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
          />
        </svg>
        <h2 className='text-lg ml-3'>{options.title}</h2>
      </div>
      {isAccordionOpen && (
        <div className="ml-12 mt-2 space-y-2  flex flex-col">
          {options.items.map((item, index) => (
            <label className="inline-flex items-center" key={index}>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={checkedItems[item] || false}
                onChange={(event) => handleCheckboxChange(event, item, options.name)}
              />

              <span className="ml-2 text-black">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
