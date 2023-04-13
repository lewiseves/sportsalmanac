'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Event({ params, searchParams, www }) {

    const [runners, setRunners] = useState([]);

    useEffect(() => {
        fetch('/api/getEvents')
            .then((res) => res.json())
            .then((data) => {
                setRunners(data.GB[searchParams.course][searchParams.off].runners);
            });
    }, [searchParams]);

    const fetchRaceInfo = (searchParams) => {
        console.log(runners)

    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex">
                <div className="">
                    <h1 className='text-xl font-bold'>Sports Almanac v3.1</h1>
                </div>
            </div>
            <div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex justify-between">
                <h1 className='text-xl mt-4'>{searchParams.course} - {searchParams.off}</h1>
                <button className='float-right right-0 text-xl border-2 border-black ml-12 mt-3 self-end px-4'>Fetch Latest Odds</button>
            </div>
            <div className="mt-4 lg:mt-0 font-mono text-lg">
            </div>
            <div id='events' className='flex min-h-screen flex-col items-center p-24 min-w-full'>
                <table className='bg-white w-full max-w-5xl font-mono text-center'>
                    <thead>
                        <tr className='border-2 border-black'>
                            <th className='border border-black'>Name</th>
                            <th className='border border-black'>Form</th>
                            <th className='border border-black'>Weight</th>
                            <th className='border border-black'>or</th>
                            <th className='border border-black'>rpr</th>
                            <th className='border border-black'>sire</th>
                            <th className='border border-black'>odds</th>
                        </tr>
                    </thead>
                    <tbody>
                        {runners.map((runner) => (
                            <tr key={runner.name}>
                                <td className='border border-black'>{runner.name}</td>
                                <td className='border border-black'>{runner.form}</td>
                                <td className='border border-black'>{runner.lbs}</td>
                                <td className='border border-black'>{runner.ofr}</td>
                                <td className='border border-black'>{runner.rpr}</td>
                                <td className='border border-black'>{runner.sire}</td>
                                <td className='border border-black'>{runner.odds}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}