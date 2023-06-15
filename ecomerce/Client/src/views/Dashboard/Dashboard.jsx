import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import AreaChartComponents from '../../components/AreaChart/AreaChartComponent'
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent'
import { useDispatch } from 'react-redux'
import { getAllProducts, getAllUsers } from '../../redux/actions'


export default function Dashboard() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState(0)
    const [products, setProducts] = useState(0)
    const [incomes, setIncomes] = useState(0)

    const dataCards = [
        {name: "Visitas totales", number: '$1000k', stat: "+ 0,43%", icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>  }, 
        {name: "Ganancias totales", number: `$ ${incomes}`, stat: "+ 5,00%", icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /> </svg>     }, 
        {name: "Productos totales", number: products, stat: "+ 0,43%", icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />  </svg>}, 
        {name: "Usuarios totales", number: users, stat: "+ 0,95%", icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> </svg> }, 
    ]

    useEffect(() => {
        dispatch(getAllUsers())
        .then(res => {
            let purchasesTotal = 0
            let usersPurchases = res.payload.filter(user => user.UserOrders.length != 0)
            usersPurchases.map(user => {
                user.UserOrders.map(order => purchasesTotal = Number(purchasesTotal) + Number(order.total))
            })
            setIncomes(purchasesTotal)

            let count = 0
            res.payload.map(user => count+= 1)
            setUsers(count)
        })
    }, [])

    useEffect(() => {
        dispatch(getAllProducts())
        .then(res => {
            let count = 0
            res.payload.map(product => count+= 1)
            setProducts(count)
        })
    }, [])

    return (
        <div className='w-full h-auto mt-40'>
            <div className='flex md:flex-row flex-col w-full justify-between align-center px-14'>
                { dataCards.map((info, index)=>  (
                    <DashboardCard name={info.name} stat={info.stat} number={info.number} icon={info.icon} key={index} />
                )) }
            </div>
            <div className='flex md:flex-row flex-col w-full px-14 mt-8'>
                <div className='flex flex-col w-3/4 h-auto bg-white mr-8 pt-14'>
                    <AreaChartComponents/>
                </div>
                <div className='flex flex-col w-1/4 h-96 bg-white justify-center items-center'>
                    <BarChartComponent/>
                </div>
                    
            </div>
        </div>
    )
}
