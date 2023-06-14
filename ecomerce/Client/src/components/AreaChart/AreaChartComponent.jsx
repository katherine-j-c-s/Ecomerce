import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, Legend  } from 'recharts';

const data = [
    { month: 'Ene', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Feb', TotalRevenue: 40, TotalSales: 60 },
    { month: 'Mar', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Abr', TotalRevenue: 40, TotalSales: 60 },
    { month: 'May', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Jun', TotalRevenue: 40, TotalSales: 60 },
    { month: 'Jul', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Aug', TotalRevenue: 40, TotalSales: 60 },
    { month: 'Sep', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Oct', TotalRevenue: 40, TotalSales: 60 },
    { month: 'Nov', TotalRevenue: 10, TotalSales: 30 },
    { month: 'Dec', TotalRevenue: 40, TotalSales: 60 }
];

export default function AreaChartComponents() {
  return (
    <div >
        <div className='flex flex-row w-full mx-10 mb-8'>
            <div className='flex flex-row w-auto justify-start items-center mr-6'>
                <div className='w-4 h-4 bg-[#6384E7] rounded-full mr-2' ></div>
                <h1 className='text-lg text-[#6384E7]' >Ganancias totales</h1>
            </div>
            <div className='flex flex-row w-auto justify-start items-center'>
                <div className='w-4 h-4 bg-[#83CBEE] rounded-full mr-2' ></div>
                <h1 className='text-lg text-[#83CBEE]' >Ventas totales</h1>
            </div>
        </div>
        <ResponsiveContainer width="100%" height="80%" >  
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorTotalRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6384E7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6384E7" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTotalSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#83CBEE" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#83CBEE" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2" vertical= {false}  fill="#fff"/>
                <XAxis dataKey="month" tick={{fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)'}} />
                <YAxis type="number" domain={[0, 100]} tick={{fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)'}} />
                <Tooltip />
                <Area type="linear" dataKey="TotalRevenue" stackId="1" stroke="#6384E7"  dot={{ stroke: '#6384E7', strokeWidth: 3 }} fill="url(#colorTotalRevenue)" />
                <Area type="linear" dataKey="TotalSales" stackId="2" stroke="#83CBEE" dot={{  stroke: '#83CBEE', strokeWidth: 3 }} fill="url(#colorTotalSales)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
