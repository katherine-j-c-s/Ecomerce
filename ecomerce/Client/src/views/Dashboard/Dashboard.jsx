import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import AreaChartComponents from '../../components/AreaChart/AreaChartComponent'
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent'
import { useDispatch } from 'react-redux'
import { getAllProducts, getAllUsers, getAppVisits } from '../../redux/actions'


export default function Dashboard() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [incomes, setIncomes] = useState([])
    const [visits, setVisits] = useState([])

    const currentMonth = Number(new Date().toISOString().split('-')[1])
    const lastMonth = currentMonth - 1

    const productsPercentage = () => {
        let currentMonthProducts = products?.filter(product => (Number(product.createdAt?.split('-')[1])) === currentMonth)
        let lastMonthProducts = products?.filter(product => (Number(product.createdAt?.split('-')[1])) === lastMonth)

        if (lastMonthProducts.length === 0) {
            return 0;
        }
    
        return (currentMonthProducts.length / lastMonthProducts.length) * 100
    }

    const usersPercentage = () => {
        let currentMonthUsers = users?.filter(product => (Number(product.createdAt?.split('-')[1])) === currentMonth)
        let lastMonthUsers = users?.filter(product => (Number(product.createdAt?.split('-')[1])) === lastMonth)
        if (lastMonthUsers.length === 0) {
            return 0;
        }
    
        return (currentMonthUsers.length / lastMonthUsers.length) * 100
    }

    const visitsPercentage = () => {
        let currentMonthVisits = users?.filter(product => (Number(product.createdAt?.split('-')[1])) === currentMonth)
        let lastMonthVisits = users?.filter(product => (Number(product.createdAt?.split('-')[1])) === lastMonth)

        if (lastMonthVisits.length === 0) {
            return 0;
        }
    
        return (currentMonthVisits.length / lastMonthVisits.length) * 100
    }

    const incomesPercentage = () => {
        let currentMothIncomes = 0
        users?.map(user => {
            for(let order in user.UserOrders) {
                if(Number(order.createdAt?.split('-')[1]) === currentMonth) currentMothIncomes = Number(currentMothIncomes) + order.total
            }
        })

        let lastMothIncomes = 0
        users?.map(user => {
            for(let order in user.UserOrders) {
                if(Number(order.createdAt?.split('-')[1]) === lastMonth) lastMothIncomes = Number(lastMothIncomes) + order.total
            }
        })
        if (lastMothIncomes === 0) {
            return 0;
        }
    
        return (currentMothIncomes / lastMothIncomes) * 100
    }

    let totalIncomes = 0
    users.map(user => {
        user.UserOrders?.map(order => totalIncomes = Number(totalIncomes) + Number(order.total))
    })

    const dataCards = [
        {name: "Visitas totales", number: visits.length, stat: `+ ${visitsPercentage() || 0}%`, icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>  }, 
        {name: "Ganancias totales", number: `$ ${totalIncomes}`, stat: `+ ${incomesPercentage() || 0}%`, icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /> </svg>     }, 
        {name: "Productos totales", number: products.length, stat: `+ ${productsPercentage() || 0}%`, icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />  </svg>}, 
        {name: "Usuarios totales", number: users.length, stat: `+ ${usersPercentage() || 0}%`, icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> </svg> }, 
    ]

    useEffect(() => {
        dispatch(getAllUsers())
        .then(res => {
            return setUsers(res.payload)
            // let purchasesTotal = 0
            // let usersPurchases = res.payload.filter(user => user.UserOrders.length != 0)
            // usersPurchases.map(user => {
            //     user.UserOrders.map(order => purchasesTotal = Number(purchasesTotal) + Number(order.total))
            // })
            // setIncomes(purchasesTotal)

            // let count = 0
            // res.payload.map(user => count += 1)
            // setUsers(res.payload)
        })
    }, [])

    useEffect(() => {
        dispatch(getAllProducts())
        .then(res => {
            setProducts(res.payload)
            // let count = 0
            // res.payload.map(product => count+= 1)
            // setProducts(count)
        })
    }, [])

    useEffect(() => {
        dispatch(getAppVisits())
        .then(res => {
            setVisits(res.payload)
            // let count = 0
            // res.payload.map(product => count+= 1)
            // setVisits(count)
        })
    }, [])

     // Obtener datos de ganancias totales en un mes
    const getMonthlyIncomes = (month) => {
        let totalIncomes = 0;
        users.forEach((user) => {
        user.UserOrders.forEach((order) => {
            const orderMonth = Number(order.createdAt.split('-')[1]);
            if (orderMonth === month) {
            totalIncomes += Number(order.total);
            }
        });
        });
        return totalIncomes;
    };
    //Obtener datos de ventas todales
    const getMonthlySales = (month) => {
        let totalSales = 0;
        users.forEach((user) => {
          user.UserOrders.forEach((order) => {
            const orderMonth = Number(order.createdAt.split('-')[1]);
            if (orderMonth === month) {
              totalSales += 1;
            }
          });
        });
        return totalSales;
      };
    const monthNames = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    // Crear el array de datos para el componente AreaChartComponents
    const data = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const totalRevenue = getMonthlyIncomes(month);
        const totalSales = getMonthlySales(month)
        return { month: monthNames[index], TotalRevenue: totalRevenue, TotalSales: totalSales };
    });


    return (
        <div className='w-full h-auto md:mt-40 mt-20'>
            <div className='flex md:flex-row flex-col w-full justify-between align-center px-14'>
                { dataCards.map((info, index)=>  (
                    <DashboardCard name={info.name} stat={info.stat} number={info.number} icon={info.icon} key={index} />
                )) }
            </div>
            <div className='flex md:flex-row flex-col w-full px-14 mt-8'>
                <div className='flex flex-col md:w-3/4  w-full  md:h-auto h-auto bg-white dark:bg-transparent dark:border dark:border-dashed dark:rounded-xl md:mr-8  pt-14'>
                    <AreaChartComponents data={data}/>
                </div>
                <div className='flex flex-col  md:w-1/4 w-full h-96 bg-white justify-center items-center md:mt-0 mt-12 dark:bg-transparent dark:border dark:border-dashed dark:rounded-xl'>
                    <BarChartComponent/>
                </div>
                    
            </div>
        </div>
    )
}
