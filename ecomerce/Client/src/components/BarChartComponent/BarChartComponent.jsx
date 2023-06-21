import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/actions';

export default function BarChartComponent() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => {
      setUsers(res.payload);
    });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const currentDate = new Date();
      const lastSevenDays = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const day = date.getDate();
        const totalIncomes = getTotalIncomesByDay(day);
        lastSevenDays.push({ name: getDayName(date), pv: totalIncomes });
      }
      setData(lastSevenDays);
    }
  }, [users]);

  const getTotalIncomesByDay = (day) => {
    let totalIncomes = 0;
    users.forEach((user) => {
      user.UserOrders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const orderDay = orderDate.getDate();
        if (orderDay === day) {
          totalIncomes += Number(order.total);
        }
      });
    });
    return totalIncomes;
  };

  const getDayName = (date) => {
    const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    return days[date.getDay()];
  };

  return (
    <div style={{ width: '100%' }}>
      <div className='flex flex-row w-full mx-10 mb-8'>
        <div className='flex flex-row w-auto justify-start items-center mr-6 mt-6'>
          <h1 className='text-lg text-[#6384E7]'>Ingresos diarios</h1>
        </div>
      </div>
      <div style={{ width: '90%', height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3' vertical={false} className='bg-white' />
            <XAxis dataKey='name' tick={{ fontSize: 12 }} className='text-black' />
            <Tooltip />
            <YAxis tick={{ fontSize: 12 }} className='text-black' />
            <Bar dataKey='pv' fill='#31B5FF' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
