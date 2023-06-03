import React, { useState, useEffect } from 'react';
import { filterProducts, agregarFiltro , removerFiltro} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Accordion({ options, isOpen }) {

  const filtros = useSelector(state => state.filtros)
  const dispatch = useDispatch()
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

  const handleCheckboxChange = (event, item, title) => {
    if (event.target.checked) {

      dispatch(agregarFiltro({ name: title, valor: item }));
      dispatch(filterProducts())
    } else {
      dispatch(filterProducts())
      dispatch(removerFiltro({ name: title, valor: item }));
    }
  };
  
  
  return (
    <div className="mb-4 w-full">
      <div
        className="select-none cursor-pointer flex items-center justify-start w-full  pr-4 bg-none text-black rounded-md"
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
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
                //checked={filtros?.some(filtro => filtro.name === options.title && filtro.valor === item)} 
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
