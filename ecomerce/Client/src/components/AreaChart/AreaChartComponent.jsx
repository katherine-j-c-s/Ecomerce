import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, Legend  } from 'recharts';

/*const data = [
    { month: 'Ene', TotalRevenue: 50, TotalSales: 30 },
    { month: 'Feb', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Mar', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Abr', TotalRevenue: 80, TotalSales: 10 },
    { month: 'May', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Jun', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Jul', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Aug', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Sep', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Oct', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Nov', TotalRevenue: 0, TotalSales: 0 },
    { month: 'Dec', TotalRevenue: 0, TotalSales: 0 }
];*/

export default function AreaChartComponents({data}) {
  return (
    <div >
        <div className='flex md:flex-row flex-col w-full mx-10 mb-8'>
            <div className='flex flex-row w-auto justify-start items-center mr-6'>
                <div className='w-4 h-4 bg-[#6384E7] rounded-full mr-2' ></div>
                <h1 className='md:text-lg text-sm text-[#6384E7]' >Ganancias totales</h1>
            </div>
            <div className='flex flex-row w-auto justify-start items-center'>
                <div className='w-4 h-4 bg-[#83CBEE] rounded-full mr-2' ></div>
                <h1 className='md:text-lg text-sm text-[#83CBEE]' >Ventas totales</h1>
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
                <CartesianGrid strokeDasharray="2" vertical= {false} className='bg-white'/>
                <XAxis dataKey="month"  tick={{fontSize: 12}} className='text-black' />
                <YAxis type="number" domain={[0, 100]} tick={{fontSize: 12}} className='text-black' />
                <Tooltip />
                <Area type="linear" dataKey="TotalRevenue" stackId="1" stroke="#6384E7"  dot={{ stroke: '#6384E7', strokeWidth: 3 }} fill="url(#colorTotalRevenue)" />
                <Area type="linear" dataKey="TotalSales" stackId="2" stroke="#83CBEE" dot={{  stroke: '#83CBEE', strokeWidth: 3 }} fill="url(#colorTotalSales)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
