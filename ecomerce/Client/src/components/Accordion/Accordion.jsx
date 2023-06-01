import React, { useState } from 'react';

export default function Accordion({ options, isOpen }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

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
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-black">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
