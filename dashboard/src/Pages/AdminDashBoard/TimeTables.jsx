import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const TimeTables = () => {
    const [section, setSection] = useState("");
    const section_names = [
        "CSE2A",
        "IT2B",
        "ECE3C",
        "ME1A",
        "CE4D",
    ];

    return (
        <div className='border-2 rounded border-gray-300 p-5'>
            <h1 className='font-semibold text-2xl'>TimeTable Management </h1>
            <p className='text-gray-500'>manage  class schedules, assign teachers and classrooms</p>

            <div className=' relative flex w-[30%] mt-5'>
                <div>
                    <label className='text-[20px] ml-1'>section:</label>
                </div>
                <div className=' border-0 p-1 pl-2 w-full  rounded bg-gray-200'>
                    <select className='appearance-none outline-0 w-full cursor-pointer' value={section} onChange={(e) => setSection(e.target.value)}>
                        <option value="">Select year</option>
                        {section_names.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute z-4 text-gray-600 right-2 top-2 cursor-pointer w-4 h-4" />

                </div>
            </div>
            <div>
                
            </div>



        </div>
    )
}

export default TimeTables