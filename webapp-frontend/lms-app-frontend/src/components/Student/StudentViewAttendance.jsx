import React from 'react'

const StudentViewAttendance = () => {
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="p-6 overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Session Name</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Date</p>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <p className="block antialiased font-sans text-sm text-black font-bold leading-none opacity-70">Status</p>
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Java Script</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Date</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="w-max">
                                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md" style={{ opacity: 1 }}>
                                            <span className>present</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
}

export default StudentViewAttendance