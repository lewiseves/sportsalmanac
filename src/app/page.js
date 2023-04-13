'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ['latin'] })

export default function Page() {

  const [event, setEvent] = useState([]);

  const [courses_times, setCourseTimes] = useState();

  useEffect(() => {
    async function fetchEvents() {
      await fetch('/api/getEvents')
        .then((res) => res.json())
        .then((data) => {
          setEvent(data.GB);
          const courses = (Object.keys(event));

          const todays_events = [];

          courses.forEach((course) => {
            const times = (Object.keys(event[course]));
            //create a json item with course and times
            const course_times = {
              course: course,
              times: times
            }
            //push the json item to the courses_times array
            todays_events.push(course_times);
          })

          setCourseTimes(todays_events);
        });
    }
    fetchEvents();
  }, [event]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="">
          <h1 className='text-xl font-bold'>Sports Almanac v3.1</h1>
        </div>
      </div>
      <div className="mt-4 lg:mt-0 font-mono text-lg">
        <h1>TODAYS RACES</h1>
      </div>
      <div id='events' className='flex min-h-screen flex-col items-center p-24 min-w-full'>
        <table className='bg-white w-full max-w-5xl'>
          <thead>
            <tr className='border-2 border-black'>
              <th className=' border border-black'>Course</th>
              <th className=''>Times</th>
            </tr>
          </thead>
          <tbody>
            {!courses_times && <tr><td>Loading...</td></tr>}
            {courses_times && courses_times.map((item) => (
              <tr key={item.course} className='border-2 border-black'>
                <td key={item.course} className=' border border-black'>{item.course.replace(/[[\]]/g, '')}</td>
                {item.times.map((time) => (
                  <Link href={{
                    pathname: item.course + time.replace(/[^\d.-]+/g, ''),
                    query: { course: item.course, off: time },
                  }} key={time}>
                    <td key={time} className='pl-16'>{time}</td></Link>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
