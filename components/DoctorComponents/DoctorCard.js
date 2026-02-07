import React from 'react'
import Link from 'next/link';
import { FaUser, FaAngleRight, FaMapMarkerAlt } from 'react-icons/fa';
import { formatDistance } from '@lib/locationUtils';

export default function DoctorCard(props) {
  // If a `doctor` object is provided (used by `DoctorFinder`), render a responsive card.
  if (props.doctor) {
    const doctor = props.doctor;
    const name = doctor.name || 'Unknown Doctor';
    const speciality = doctor.speciality || 'General';
    const email = doctor.email || '';
    const uid = doctor.uid || doctor.id || '';
    const address = doctor.address || '';
    const distance = doctor.distance;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 group hover:shadow-lg transition">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
            <FaUser className="text-blue-500" size={28} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{speciality}</p>
            {address && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1 truncate">
                <FaMapMarkerAlt /> <span className="truncate">{address}</span>
              </p>
            )}
            {distance !== undefined && distance !== null && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{formatDistance(distance)}</p>
            )}
          </div>

          <div className="ml-4 flex items-center">
            <Link href={`/doctor/${uid}`} className="inline-flex items-center px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition">
              View Profile <FaAngleRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise we assume legacy table usage (admin page) and render table cells so existing layouts remain intact.
  const name = props.name || 'Unknown';
  const speciality = props.speciality || 'General';
  const email = props.email || '';
  const uid = props.uid || '';
  const userRole = props.userRole || 'Doctor';

  return (
    <>
      <td className="px-2 py-3">
        <div className="flex items-center text-sm">
          <div className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-100 rounded-full">
            <FaUser className="text-blue-500" size={20} />
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{speciality}</p>
          </div>
        </div>
      </td>
      <td><p className={`${userRole === 'Admin' ? 'text-green-500' : 'text-blue-500'}`}>{userRole}</p></td>
      <td className="px-4 py-3 text-sm">{uid}</td>
      <td className="px-4 py-3 text-xs">
        <span className="px-2 py-1 font-semibold leading-tight rounded-full text-gray-600 dark:text-gray-400">{email}</span>
      </td>
      <td className="pl-4">View</td>
      <td><FaAngleRight size={22} /></td>
    </>
  );
}

