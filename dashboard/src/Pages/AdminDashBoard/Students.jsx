import { Edit, Search, Trash2 } from 'lucide-react'
import React from 'react'
import { student_list } from '../../assets/Studentdata'
import { useNavigate } from 'react-router-dom'

const Students = ({ setshowAddStudent }) => {

    return (
        <div className=' border-2 mt-3 rounded p-6 border-gray-300'>
            <h1 className='font-semibold text-2xl'>Student Management </h1>
            <p className='text-gray-500'>Manage students profiles, enrollment, and academic information</p>
            <div className='flex justify-between'>
                <div className='border-0 rounded w-68 flex p-3 mt-4 items-center bg-gray-200'>
                    <Search className='h-5 w-5 text-gray-500' />
                    <input type="text" name="search" placeholder='Search students...' className='ml-2 border-0 focus:outline-none' />
                </div>
                <div className='border-0 rounded w-50 flex justify-center mt-4 bg-blue-950 text-white cursor-pointer'>
                    <button type="button" className='font-semibold cursor-pointer' onClick={() => setshowAddStudent(true)} >+Add Student</button>
                </div>
            </div>
            <div className='border-2 border-gray-300 mt-15 p-4 rounded'>
                <div className='grid grid-cols-[0.65fr_1fr_1.05fr_1fr_1fr_1fr_0.4fr] border-b-2 border-gray-400 p-2 ml-3 font-semibold text-[18px]'>
                    <p>Name</p>
                    <p>Roll Number</p>
                    <p>Branch</p>
                    <p>Year</p>
                    <p>Section</p>
                    <p>Email</p>
                    <p>Action</p>
                </div>
                {student_list.map((item, index) => (
                    <div key={index} className='grid grid-cols-[0.65fr_0.9fr_1.1fr_1fr_0.75fr_1.1fr_0.2fr_0.2fr] border-b text-gray-500 border-gray-300 m-4  pb-2'>
                        <p>{item.name}</p>
                        <p>{item.rollNumber}</p>
                        <p>{item.branch}</p>
                        <p>{item.year}</p>
                        <p>{item.section}</p>
                        <p>{item.email}</p>
                        <Edit className='cursor-pointer' />
                        <Trash2 className='cursor-pointer' />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Students