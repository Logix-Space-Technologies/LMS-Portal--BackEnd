import React from 'react'
import TestNavbar from './TestNavbar'

const TestSidebar = () => {
    return (

        <div>
            <aside className="app-sidebar" id="sidebar">
                {/* Start::main-sidebar-header */}
                <div className="main-sidebar-header" style={{ backgroundColor: '#C8F4F9' }}>
                    <a href="index.html" className="header-logo">
                        {/* <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="desktop-logo"
                        /> */}
                        {/* <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="toggle-logo"
                        /> */}
                        {/* <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="desktop-dark"
                        /> */}
                        {/* <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="toggle-dark"
                        /> */}
                        <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="desktop-white"
                        />
                        {/* <img
                            src="https://www.linkurcodes.com/images/logo.png"
                            alt="logo"
                            className="toggle-white"
                        /> */}
                    </a>
                </div>
                {/* End::main-sidebar-header */}
                {/* Start::main-sidebar */}
                <div className="main-sidebar" id="sidebar-scroll">
                    {/* Start::nav */}
                    <TestNavbar />
                    {/* End::nav */}
                </div>
                {/* End::main-sidebar */}
            </aside>
        </div>
    )
}

export default TestSidebar