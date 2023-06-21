import React from 'react'
import { BarChart,XAxis, YAxis, Tooltip, Legend, Bar , CartesianGrid, ResponsiveContainer} from 'recharts'

const data = [
    {
      "name": "L",
      "pv": 1000
    },
    {
      "name": "M",
      "pv": 200,
    },
    {
      "name": "W",
      "pv": 0,
    },
    {
      "name": "J",
      "pv": 0,
    },
    {
      "name": "V",
      "pv": 0,
    },
    {
      "name": "S",
      "pv": 0,
    },
    {
      "name": "D",
      "pv": 0,
    }
  ]
export default function BarChartComponent() {
  return (

    <div style={{ width: '100%' }}>
        <div className='flex flex-row w-full mx-10 mb-8'>
            <div className='flex flex-row w-auto justify-start items-center mr-6 mt-6'>
                <h1 className='text-lg text-[#6384E7]' >Ingresos</h1>
            </div>
        </div>
        <div style={{ width: '90%', height: 280 }}>
            <ResponsiveContainer >
                <BarChart data={data}>
                    <defs>
                        <linearGradient id="weekleRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6384E7" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6384E7" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3" vertical= {false} className='bg-white' />
                    <XAxis dataKey="name" tick={{fontSize: 12}} className='text-black' />
                    <Tooltip/>
                    <YAxis tick={{fontSize: 12}} className='text-black' />
                    <Bar dataKey="pv" fill="#31B5FF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
