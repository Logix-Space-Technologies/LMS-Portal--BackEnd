import React from 'react'

const StudentFooter = () => {
    return (
        <footer className="footer mt-auto xl:ps-[15rem]  font-normal font-inter bg-white text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center">
            <div className="container">
                <span className="text-gray dark:text-defaulttextcolor/50"> Copyright © 2024 <span id="year" /><a href="javascript:void(0);" className="text-defaulttextcolor font-semibold dark:text-defaulttextcolor">LinkUrCodes</a>.
                    <a href="javascript:void(0);">
                    </a> All
                    rights
                    reserved
                </span>
            </div>
        </footer>
    )
}

export default StudentFooter