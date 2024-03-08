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
                            <div className="header-element py-[1rem] md:px-[0.65rem] px-2 header-search">
                                <button
                                    aria-label="button"
                                    type="button"
                                    data-hs-overlay="#search-modal"
                                    className="inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                                >
                                    <i className="bx bx-search-alt-2 header-link-icon" />
                                </button>
                            </div>
                            {/* start header country */}

                            {/* end header country */}
                            {/* light and dark theme */}
                            <div className="header-element header-theme-mode hidden !items-center sm:block !py-[1rem] md:!px-[0.65rem] px-2">

                                <a
                                    aria-label="anchor"
                                    className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                                    href="javascript:void(0);"
                                    data-hs-theme-click-value="light"
                                >
                                    <i className="bx bx-sun header-link-icon" />
                                </a>
                            </div>
                            {/* End light and dark theme */}
                            {/* Header Cart item */}
                            <div className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 [--placement:bottom-left]">
                                <button
                                    id="dropdown-cart"
                                    type="button"
                                    className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
                                >
                                    <i className="bx bx-cart header-link-icon" />
                                    <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                                        <span
                                            className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-primary text-white justify-center items-center"
                                            id="cart-icon-badge"
                                        >
                                            5
                                        </span>
                                    </span>
                                </button>
                                <div
                                    className="main-header-dropdown bg-white !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu w-[22rem] border-0 border-defaultborder hidden"
                                    aria-labelledby="dropdown-cart"
                                >
                                    <div className="ti-dropdown-header !bg-transparent flex justify-between items-center !m-0 !p-4">
                                        <p className="text-defaulttextcolor  !text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">
                                            Cart Items
                                        </p>
                                        <a
                                            href="javascript:void(0)"
                                            className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-success/10 text-success text-[0.75em] "
                                            id="cart-data"
                                        >
                                            5 Items
                                        </a>
                                    </div>
                                    <div>
                                        <hr className="dropdown-divider dark:border-white/10" />
                                    </div>
                                    <ul className="list-none mb-0" id="header-cart-items-scroll">
                                        <li className="ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder ">
                                            <div className="flex items-start cart-dropdown-item">
                                                <img
                                                    src="../assets/images/ecommerce/jpg/1.jpg"
                                                    alt="img"
                                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3"
                                                />
                                                <div className="grow">
                                                    <div className="flex items-start justify-between mb-0">
                                                        <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                                            <a href="cart.html">SomeThing Phone</a>
                                                        </div>
                                                        <div className="inline-flex">
                                                            <span className="text-black mb-1 dark:text-white !font-medium">
                                                                $1,299.00
                                                            </span>
                                                            <a
                                                                aria-label="anchor"
                                                                href="javascript:void(0);"
                                                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="min-w-fit flex  items-start justify-between">
                                                        <ul className="header-product-item dark:text-white/50 flex">
                                                            <li>Metallic Blue</li>
                                                            <li>6gb Ram</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder">
                                            <div className="flex items-start cart-dropdown-item">
                                                <img
                                                    src="../assets/images/ecommerce/jpg/3.jpg"
                                                    alt="img"
                                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-[50%] br-5 me-3"
                                                />
                                                <div className="grow">
                                                    <div className="flex items-start justify-between mb-0">
                                                        <div className="mb-0 text-[0.8125rem] text-[#232323] dark:text-[#8c9097] dark:text-white/50 font-semibold">
                                                            <a href="cart.html">Stop Watch</a>
                                                        </div>
                                                        <div className="inline-flex">
                                                            <span className="text-black dark:text-white !font-medium mb-1">
                                                                $179.29
                                                            </span>
                                                            <a
                                                                aria-label="anchor"
                                                                href="javascript:void(0);"
                                                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="min-w-fit flex items-start justify-between">
                                                        <ul className="header-product-item">
                                                            <li>Analog</li>
                                                            <li>
                                                                <span className="font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pink/10 text-pink text-[0.625rem]">
                                                                    Free shipping
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder">
                                            <div className="flex items-start cart-dropdown-item">
                                                <img
                                                    src="../assets/images/ecommerce/jpg/5.jpg"
                                                    alt="img"
                                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-[50%] br-5 me-3"
                                                />
                                                <div className="grow">
                                                    <div className="flex items-start justify-between mb-0">
                                                        <div className="mb-0 text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                                            <a href="cart.html">Photo Frame</a>
                                                        </div>
                                                        <div className="inline-flex">
                                                            <span className="text-black !font-medium mb-1 dark:text-white">
                                                                $29.00
                                                            </span>
                                                            <a
                                                                aria-label="anchor"
                                                                href="javascript:void(0);"
                                                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="min-w-fit flex items-start justify-between">
                                                        <ul className="header-product-item flex">
                                                            <li>Decorative</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder">
                                            <div className="flex items-start cart-dropdown-item">
                                                <img
                                                    src="../assets/images/ecommerce/jpg/4.jpg"
                                                    alt="img"
                                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-[50%] br-5 me-3"
                                                />
                                                <div className="grow">
                                                    <div className="flex items-start justify-between mb-0">
                                                        <div className="mb-0 text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                                            <a href="cart.html">Kikon Camera</a>
                                                        </div>
                                                        <div className="inline-flex">
                                                            <span className="text-black !font-medium mb-1 dark:text-white">
                                                                $4,999.00
                                                            </span>
                                                            <a
                                                                aria-label="anchor"
                                                                href="javascript:void(0);"
                                                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="min-w-fit flex items-start justify-between">
                                                        <ul className="header-product-item flex">
                                                            <li>Black</li>
                                                            <li>50MM</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-dropdown-item">
                                            <div className="flex items-start cart-dropdown-item">
                                                <img
                                                    src="../assets/images/ecommerce/jpg/6.jpg"
                                                    alt="img"
                                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-[50%] br-5 me-3"
                                                />
                                                <div className="grow">
                                                    <div className="flex items-start justify-between mb-0">
                                                        <div className="mb-0 text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                                            <a href="cart.html">Canvas Shoes</a>
                                                        </div>
                                                        <div className="inline-flex">
                                                            <span className="text-black !font-medium mb-1 dark:text-white">
                                                                $129.00
                                                            </span>
                                                            <a
                                                                aria-label="anchor"
                                                                href="javascript:void(0);"
                                                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start justify-between">
                                                        <ul className="header-product-item flex">
                                                            <li>Gray</li>
                                                            <li>Sports</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="p-3 empty-header-item border-t">
                                        <div className="grid">
                                            <a
                                                href="checkout.html"
                                                className="w-full ti-btn ti-btn-primary-full p-2"
                                            >
                                                Proceed to checkout
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-[3rem] empty-item hidden">
                                        <div className="text-center">
                                            <span className="!w-[4rem] !h-[4rem] !leading-[4rem] rounded-[50%] avatar bg-warning/10 !text-warning">
                                                <i className="ri-shopping-cart-2-line text-[2rem]" />
                                            </span>
                                            <h6 className="font-bold mb-1 mt-3 text-[1rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                Your Cart is Empty
                                            </h6>
                                            <span className="mb-3 !font-normal text-[0.8125rem] block text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                Add some items to make me happy :)
                                            </span>
                                            <a
                                                href="products.html"
                                                className="ti-btn ti-btn-primary btn-wave ti-btn-wave btn-sm m-1 !text-[0.75rem] !py-[0.25rem] !px-[0.5rem]"
                                                data-abc="true"
                                            >
                                                continue shopping <i className="bi bi-arrow-right ms-1" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Header cart item  */}
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
                                        <li className="ti-dropdown-item dropdown-item !flex-none">
                                            <div className="flex items-start">
                                                <div className="pe-2">
                                                    <span className="inline-flex text-secondary justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem]  bg-secondary/10 rounded-[50%]">
                                                        <i className="ti ti-discount-2 text-[1.125rem]" />
                                                    </span>
                                                </div>
                                                <div className="grow flex items-center justify-between">
                                                    <div>
                                                        <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem]  font-semibold">
                                                            <a href="notifications.html">Discount Available</a>
                                                        </p>
                                                        <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                                            Discount Available On Selected Products
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <a
                                                            aria-label="anchor"
                                                            href="javascript:void(0);"
                                                            className="min-w-fit  text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1"
                                                        >
                                                            <i className="ti ti-x text-[1rem]" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-dropdown-item dropdown-item">
                                            <div className="flex items-start">
                                                <div className="pe-2">
                                                    <span className="inline-flex text-pink justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem]  bg-pink/10 rounded-[50%]">
                                                        <i className="ti ti-user-check text-[1.125rem]" />
                                                    </span>
                                                </div>
                                                <div className="grow flex items-center justify-between">
                                                    <div>
                                                        <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem]  font-semibold">
                                                            <a href="notifications.html">
                                                                Account Has Been Verified
                                                            </a>
                                                        </p>
                                                        <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                                            Your Account Has Been Verified Sucessfully
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
                                        <li className="ti-dropdown-item dropdown-item">
                                            <div className="flex items-start">
                                                <div className="pe-2">
                                                    <span className="inline-flex text-warning justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem]  bg-warning/10 rounded-[50%]">
                                                        <i className="ti ti-circle-check text-[1.125rem]" />
                                                    </span>
                                                </div>
                                                <div className="grow flex items-center justify-between">
                                                    <div>
                                                        <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50  text-[0.8125rem]  font-semibold">
                                                            <a href="notifications.html">
                                                                Order Placed{" "}
                                                                <span className="text-warning">ID: #1116773</span>
                                                            </a>
                                                        </p>
                                                        <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                                            Order Placed Successfully
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
                                        <li className="ti-dropdown-item dropdown-item">
                                            <div className="flex items-start">
                                                <div className="pe-2">
                                                    <span className="inline-flex text-success justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem]  bg-success/10 rounded-[50%]">
                                                        <i className="ti ti-clock text-[1.125rem]" />
                                                    </span>
                                                </div>
                                                <div className="grow flex items-center justify-between">
                                                    <div>
                                                        <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50  text-[0.8125rem]  font-semibold">
                                                            <a href="notifications.html">
                                                                Order Delayed{" "}
                                                                <span className="text-success">ID: 7731116</span>
                                                            </a>
                                                        </p>
                                                        <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                                            Order Delayed Unfortunately
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
                                                Related Apps
                                            </p>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider mb-0" />
                                    <div
                                        className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10 main-header-shortcuts p-2"
                                        id="header-shortcut-scroll"
                                    >
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <div>
                                                        <img
                                                            src="../assets/images/apps/figma.png"
                                                            alt="figma"
                                                            className="!h-[1.75rem] !w-[1.75rem] text-2xl avatar text-primary flex justify-center items-center mx-auto"
                                                        />
                                                        <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                            Figma
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/microsoft-powerpoint.png"
                                                        alt="miscrosoft"
                                                        className="leading-[1.75] text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Power Point
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
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
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/calender.png"
                                                        alt="calander"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Calendar
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/sketch.png"
                                                        alt="apps"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Sketch
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/google-docs.png"
                                                        alt="docs"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Docs
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/google.png"
                                                        alt="google"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Google
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/translate.png"
                                                        alt="translate"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Translate
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="p-4 items-center related-app block text-center rounded-sm hover:bg-gray-50 dark:hover:bg-black/20"
                                                >
                                                    <img
                                                        src="../assets/images/apps/google-sheets.png"
                                                        alt="sheets"
                                                        className="leading-none text-2xl !h-[1.75rem] !w-[1.75rem] align-middle flex justify-center mx-auto"
                                                    />
                                                    <div className="text-[0.75rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                                        Sheets
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 first:pt-0 border-t">
                                        <a
                                            className="w-full ti-btn ti-btn-primary-full p-2 !m-0"
                                            href="javascript:void(0);"
                                        >
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/*End Related Apps */}
                            {/* Fullscreen */}

                            {/* End Full screen */}
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
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex"
                                                href="mail.html"
                                            >
                                                <i className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]" />
                                                Inbox{" "}
                                                <span className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">
                                                    25
                                                </span>
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
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex "
                                                href="javascript:void(0);"
                                            >
                                                <i className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]" />
                                                Bal: $7,12,950
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex"
                                                href="chat.html"
                                            >
                                                <i className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]" />
                                                Support
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