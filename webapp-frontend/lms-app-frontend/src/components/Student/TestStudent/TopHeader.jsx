import React from 'react'

const TopHeader = () => {
    return (

        <div>
            <header className="app-header">
                <nav className="main-header !h-[3.75rem]" aria-label="Global">
                    <div className="main-header-container ps-[0.725rem] pe-[1rem] ">
                        <div className="header-content-left">
                            {/* Start::header-element */}
                            <div className="header-element">
                                <div className="horizontal-logo">
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
                            </div>
                            {/* End::header-element */}
                            {/* Start::header-element */}
                            <div className="header-element md:px-[0.325rem] !items-center">
                                {/* Start::header-link */}
                                <a
                                    aria-label="Hide Sidebar"
                                    className="sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center"
                                    href="javascript:void(0);"
                                >
                                    <span />
                                </a>
                                {/* End::header-link */}
                            </div>
                            {/* End::header-element */}
                        </div>
                        <div className="header-content-right">

                            {/*Header Notifictaion */}
                            <div className="header-element py-[1rem] md:px-[0.65rem] px-2 notifications-dropdown header-notification hs-dropdown ti-dropdown !hidden md:!block [--placement:bottom-left]">
                                <button
                                    id="dropdown-notification"
                                    type="button"
                                    className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
                                >
                                    <i className="bx bx-bell header-link-icon  text-[1.125rem]" />
                                    <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0  -me-[0.6rem]">
                                        <span className="animate-slow-ping absolute inline-flex -top-[2px] -start-[2px] h-full w-full rounded-full bg-secondary/40 opacity-75" />
                                        <span
                                            className="relative inline-flex justify-center items-center rounded-full  h-[14.7px] w-[14px] bg-secondary text-[0.625rem] text-white"
                                            id="notification-icon-badge"
                                        >
                                            5
                                        </span>
                                    </span>
                                </button>
                                <div
                                    className="main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder hidden !m-0"
                                    aria-labelledby="dropdown-notification"
                                >
                                    <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                                        <p className="mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold dark:text-[#8c9097] dark:text-white/50">
                                            Notifications
                                        </p>
                                        <span
                                            className="text-[0.75em] py-[0.25rem/2] px-[0.45rem] font-[600] rounded-sm bg-secondary/10 text-secondary"
                                            id="notifiation-data"
                                        >
                                            5 Unread
                                        </span>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <ul
                                        className="list-none !m-0 !p-0 end-0"
                                        id="header-notification-scroll"
                                    >
                                        <li className="ti-dropdown-item dropdown-item ">
                                            <div className="flex items-start">
                                                <div className="pe-2">
                                                    <span className="inline-flex text-primary justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem] !bg-primary/10 !rounded-[50%]">
                                                        <i className="ti ti-gift text-[1.125rem]" />
                                                    </span>
                                                </div>
                                                <div className="grow flex items-center justify-between">
                                                    <div>
                                                        <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem] font-semibold">
                                                            <a href="notifications.html">
                                                                Your Order Has Been Shipped
                                                            </a>
                                                        </p>
                                                        <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                                            Order No: 123456 Has Shipped To Your Delivery
                                                            Address
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <a
                                                            aria-label="anchor"
                                                            href="javascript:void(0);"
                                                            className="min-w-fit text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1"
                                                        >
                                                            <i className="ti ti-x text-[1rem]" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="p-4 empty-header-item1 border-t mt-2">
                                        <div className="grid">
                                            <a
                                                href="notifications.html"
                                                className="ti-btn ti-btn-primary-full !m-0 w-full p-2"
                                            >
                                                View All
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-[3rem] empty-item1 hidden">
                                        <div className="text-center">
                                            <span className="!h-[4rem]  !w-[4rem] avatar !leading-[4rem] !rounded-full !bg-secondary/10 !text-secondary">
                                                <i className="ri-notification-off-line text-[2rem]  " />
                                            </span>
                                            <h6 className="font-semibold mt-3 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[1rem]">
                                                No New Notifications
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Header Notifictaion */}
                            {/* Related Apps */}
                            <div className="header-element header-apps dark:text-[#8c9097] dark:text-white/50 py-[1rem] md:px-[0.65rem] px-2 hs-dropdown ti-dropdown md:!block !hidden [--placement:bottom-left]">
                                <button
                                    aria-label="button"
                                    id="dropdown-apps"
                                    type="button"
                                    className="hs-dropdown-toggle ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none text-xs"
                                >
                                    <i className="bx bx-grid-alt header-link-icon text-[1.125rem]" />
                                </button>
                                <div
                                    className="main-header-dropdown !-mt-3 hs-dropdown-menu ti-dropdown-menu !w-[22rem] border-0 border-defaultborder   hidden"
                                    aria-labelledby="dropdown-apps"
                                >
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="mb-0 text-defaulttextcolor text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">
                                                Related Websites
                                            </p>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider mb-0" />
                                    <div
                                        className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10 main-header-shortcuts p-2"
                                        id="header-shortcut-scroll"
                                    >
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="">
                                                <a
                                                    href="https://github.com/"
                                                    target='_blank'
                                                    className="p-4 items-center related-app block text-center rounded-sm shadow-lg hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <div>
                                                        <i className="!h-[1.75rem] !w-[1.75rem] text-2xl text-dark flex justify-center items-center mx-auto bx bxl-github" />
                                                        <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                            GitHub
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="https://www.linkurcodes.com/"
                                                    target='_blank'
                                                    className="p-4 items-center related-app block text-center rounded-sm shadow-lg hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../favicon.ico"
                                                        alt="linkUrCodes"
                                                        className="leading-[1.75] text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        LinkUrCodes
                                                    </div>
                                                </a>
                                            </div>
                                            {/* <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/microsoft-word.png"
                                                        alt="miscrodoftword"
                                                        className="leading-none
               text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        MS Word
                                                    </div>
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="p-4 first:pt-0 border-t">
                                    </div>
                                </div>
                            </div>
                            {/*End Related Apps */}

                            {/* Header Profile */}
                            <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center ti-dropdown [--placement:bottom-left]">
                                <button
                                    id="dropdown-profile"
                                    type="button"
                                    className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent "
                                >
                                    <img
                                        className="inline-block rounded-full "
                                        src="../assets/images/faces/9.jpg"
                                        width={32}
                                        height={32}
                                        alt="Image Description"
                                    />
                                </button>
                                <div className="md:block hidden dropdown-profile">
                                    <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">
                                        Json Taylor
                                    </p>
                                    <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">
                                        Web Designer
                                    </span>
                                </div>
                                <div
                                    className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                                    aria-labelledby="dropdown-profile"
                                >
                                    <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                                        <li>
                                            <a
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex"
                                                href="profile.html"
                                            >
                                                <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]" />
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
                                                href="todo.html"
                                            >
                                                <i className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]" />
                                                Task Manager
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
                                                href="mail-settings.html"
                                            >
                                                <i className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]" />
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex"
                                                href="sign-in-cover.html"
                                            >
                                                <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]" />
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End Header Profile */}
                            {/* Switcher Icon */}

                            {/* Switcher Icon */}
                            {/* End::header-element */}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default TopHeader