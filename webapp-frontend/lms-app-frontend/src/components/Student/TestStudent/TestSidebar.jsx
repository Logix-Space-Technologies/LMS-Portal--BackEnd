import React from 'react'
import TestNavbar from './TestNavbar'

const TestSidebar = () => {
    return (

        <div>
            <aside className="app-sidebar" id="sidebar">
                {/* Start::main-sidebar-header */}
                <div className="main-sidebar-header">
                    <a href="index.html" className="header-logo">
                        <img
                            src="../assets/images/brand-logos/desktop-logo.png"
                            alt="logo"
                            className="desktop-logo"
                        />
                        <img
                            src="../assets/images/brand-logos/toggle-logo.png"
                            alt="logo"
                            className="toggle-logo"
                        />
                        <img
                            src="../assets/images/brand-logos/desktop-dark.png"
                            alt="logo"
                            className="desktop-dark"
                        />
                        <img
                            src="../assets/images/brand-logos/toggle-dark.png"
                            alt="logo"
                            className="toggle-dark"
                        />
                        <img
                            src="../assets/images/brand-logos/desktop-white.png"
                            alt="logo"
                            className="desktop-white"
                        />
                        <img
                            src="../assets/images/brand-logos/toggle-white.png"
                            alt="logo"
                            className="toggle-white"
                        />
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