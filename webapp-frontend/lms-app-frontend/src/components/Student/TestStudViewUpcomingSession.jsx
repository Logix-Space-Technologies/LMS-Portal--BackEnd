import React from 'react'
import TopHeader from './TestStudent/TopHeader'
import TestSidebar from './TestStudent/TestSidebar'
import StudentFooter from './StudentDashboard/StudentFooter'

const TestStudViewUpcomingSession = () => {
    return (
        <div>

            {/* Loader */}
            <div id="loader">
                <img src="../assets/images/media/loader.svg" alt />
            </div>
            {/* Loader */}

            <div className="page">


                {/* Start::Header */}
                <TopHeader />
                {/* End::Header */}

                {/* Start::app-sidebar */}
                <TestSidebar />
                {/* End::app-sidebar */}

                {/*APP-CONTENT START*/}
                <div className="content">
                    <div className="main-content">
                        <br />
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-body p-4">
                                        <div className="md:flex items-center justify-between flex-wrap gap-4">
                                            <div className="grid grid-cols-12 gap-2 md:w-[30%]">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <h5><b>View Upcoming Session</b></h5>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* First Card */}
                        <div className="flex mb-6">
                            <div className="w-2 bg-blue-500 rounded-l-xl" />
                            <div className="flex-grow bg-white rounded-r-xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg text-blue-600 font-semibold">Node.js Day One</h2>
                                </div>
                                <p className="text-sm text-gray-600">Backend Development</p>
                                <p className="text-sm text-gray-600 mt-1">Date: 5/02/2024</p>
                                <p className="text-sm text-gray-600">Time: 11:30</p>
                                <p className="text-sm text-gray-600">Type: Online Mode</p>
                                <div className="flex gap-4 mt-4">
                                    <a href="https://meet.google.com/ddd-addada" className="text-white bg-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Meeting Link</a>
                                    <a href="#" className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Tasks</a>
                                    <a href="#" className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold">Attendance</a>
                                </div>
                            </div>
                        </div>

                        {/* Start:: row-3 */}
                        <div className="grid grid-cols-12 gap-6">

                            {/* End:: row-3 */}
                        </div>
                    </div>
                    {/*APP-CONTENT CLOSE*/}


                    {/* Footer Start */}
                    <StudentFooter />
                    {/* Footer End */}


                </div >



            </div>
        </div>

    )
}

export default TestStudViewUpcomingSession