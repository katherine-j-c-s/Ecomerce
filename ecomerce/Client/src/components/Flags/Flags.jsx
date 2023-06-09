import React, { useState, useEffect } from 'react';
import argentinaIcon from '../../assets/flags/argentina.png';
import brazilIcon from '../../assets/flags/brasil.png';
import chileIcon from '../../assets/flags/chile.png';
import colombiaIcon from '../../assets/flags/colombia.png';
import mexicoIcon from '../../assets/flags/mexico.png';
import peruIcon from '../../assets/flags/peru.png';
import uruguayIcon from '../../assets/flags/uruguay.png';

export default function CountrySelect({onSelect, errors}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const countryOptions = [
    { value: 'ARS', codigoPais:'+54' , label: 'Argentina', flag: argentinaIcon },
    { value: 'BRL', codigoPais:'+55' , label: 'Brazil',    flag: brazilIcon },
    { value: 'CLP', codigoPais:'+56' , label: 'Chile',     flag: chileIcon },
    { value: 'MXN', codigoPais:'+52' , label: 'Mexico',    flag: mexicoIcon },
    { value: 'COP', codigoPais:'+57' , label: 'Colombia',  flag: colombiaIcon },
    { value: 'PEN', codigoPais:'+51' , label: 'Peru',      flag: peruIcon },
    { value: 'UYU', codigoPais:'+598' , label: 'Uruguay',   flag: uruguayIcon },
  ];

  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    setIsOpen(false);
    onSelect(option)
  };
  useEffect(() => {
    const savedPayForm = localStorage.getItem('payForm');
    if (savedPayForm) {
      const { currency_id, locality } = JSON.parse(savedPayForm);
      const savedCountry = countryOptions.find(
        country => country.value === currency_id && country.label === locality
      );
      if (savedCountry) {
        handleCountryChange(savedCountry);
      }
    }
  }, []);
  return (
    <div className="flex flex-col justify-center w-full relative mb-6 text-start md:mr-2 md:ml-2">
      <div>
        <button 
          type="button" 
          className="p-2 pl-10 text-black-400 inline-flex  justify-start items-center w-full rounded-md border border-cyan-500 shadow-sm px-4 h-10 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCountry ? <img src={selectedCountry?.flag} alt={selectedCountry?.label} className='w-4 h-4 mr-3' /> : null}
          {selectedCountry ? selectedCountry.label : "Seleccionar país"}
          
        </button>
        <span className={errors.locality?.length > 0 ? 'flex flex-block text-red-600 text-xs left-2 -bottom-4 absolute' : 'flex flex-none'}>{errors.locality}</span>

      </div>
      {isOpen && (
        <div className="absolute right-0 top-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-cyan-500 ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {countryOptions.map((country) => (
              <div
                key={country.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
                onClick={() => handleCountryChange(country)}
              >
                <img src={country.flag} alt={country.label} className="inline-block mr-3 w-4 w/6"/> {country.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
