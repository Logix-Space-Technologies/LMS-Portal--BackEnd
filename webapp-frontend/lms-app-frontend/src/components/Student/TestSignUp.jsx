import React from 'react'

const TestSignUp = () => {
    return (
        <div>
            {/* <!-- ========== Switcher  ========== --> */}
            <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
                <div className="ti-offcanvas-header z-10 relative">
                    <h5 className="ti-offcanvas-title">
                        Switcher
                    </h5>
                    <button type="button" className="ti-btn flex-shrink-0 p-0  transition-none text-defaulttextcolor dark:text-defaulttextcolor/70 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white  dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-switcher">
                        <span className="sr-only">Close modal</span>
                        <i className="ri-close-circle-line leading-none text-lg" />
                    </button>
                </div>
                <div className="ti-offcanvas-body !p-0 !border-b dark:border-white/10 z-10 relative !h-auto">
                    <div className="flex rtl:space-x-reverse" aria-label="Tabs" role="tablist">
                        <button type="button" className="hs-tab-active:bg-success/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent text-defaultsize border-0 hs-tab-active:text-success dark:hs-tab-active:bg-success/20 dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-success -mb-px bg-white font-semibold text-center  text-defaulttextcolor dark:text-defaulttextcolor/70 rounded-none hover:text-gray-700 dark:bg-bodybg dark:border-white/10  active" id="switcher-item-1" data-hs-tab="#switcher-1" aria-controls="switcher-1" role="tab">
                            Theme Style
                        </button>
                        <button type="button" className="hs-tab-active:bg-success/20 w-full !py-2 !px-4 hs-tab-active:border-b-transparent text-defaultsize border-0 hs-tab-active:text-success dark:hs-tab-active:bg-success/20 dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-success -mb-px  bg-white font-semibold text-center  text-defaulttextcolor dark:text-defaulttextcolor/70 rounded-none hover:text-gray-700 dark:bg-bodybg dark:border-white/10  dark:hover:text-gray-300" id="switcher-item-2" data-hs-tab="#switcher-2" aria-controls="switcher-2" role="tab">
                            Theme Colors
                        </button>
                    </div>
                </div>
                <div className="ti-offcanvas-body" id="switcher-body">
                    <div id="switcher-1" role="tabpanel" aria-labelledby="switcher-item-1" className>
                        <div className>
                            <p className="switcher-style-head">Theme Color Mode:</p>
                            <div className="grid grid-cols-3 switcher-style">
                                <div className="flex items-center">
                                    <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme" defaultChecked />
                                    <label htmlFor="switcher-light-theme" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Light</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme" />
                                    <label htmlFor="switcher-dark-theme" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Dark</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Directions:</p>
                            <div className="grid grid-cols-3  switcher-style">
                                <div className="flex items-center">
                                    <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr" defaultChecked />
                                    <label htmlFor="switcher-ltr" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">LTR</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl" />
                                    <label htmlFor="switcher-rtl" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">RTL</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Navigation Styles:</p>
                            <div className="grid grid-cols-3  switcher-style">
                                <div className="flex items-center">
                                    <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-vertical" defaultChecked />
                                    <label htmlFor="switcher-vertical" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Vertical</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" name="navigation-style" className="ti-form-radio" id="switcher-horizontal" />
                                    <label htmlFor="switcher-horizontal" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Horizontal</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Navigation Menu Style:</p>
                            <div className="grid grid-cols-2 gap-2 switcher-style">
                                <div className="flex">
                                    <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-click" defaultChecked />
                                    <label htmlFor="switcher-menu-click" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Menu
                                        Click</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-menu-hover" />
                                    <label htmlFor="switcher-menu-hover" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Menu
                                        Hover</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-click" />
                                    <label htmlFor="switcher-icon-click" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Icon
                                        Click</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="navigation-data-menu-styles" className="ti-form-radio" id="switcher-icon-hover" />
                                    <label htmlFor="switcher-icon-hover" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Icon
                                        Hover</label>
                                </div>
                            </div>
                            <div className="px-4 text-secondary text-xs"><b className="me-2">Note:</b>Works same for both Vertical and
                                Horizontal
                            </div>
                        </div>
                        <div className=" sidemenu-layout-styles">
                            <p className="switcher-style-head">Sidemenu Layout Syles:</p>
                            <div className="grid grid-cols-2 gap-2 switcher-style">
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-default-menu" defaultChecked />
                                    <label htmlFor="switcher-default-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Default
                                        Menu</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-closed-menu" />
                                    <label htmlFor="switcher-closed-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">
                                        Closed
                                        Menu</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icontext-menu" />
                                    <label htmlFor="switcher-icontext-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Icon
                                        Text</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-icon-overlay" />
                                    <label htmlFor="switcher-icon-overlay" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Icon
                                        Overlay</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-detached" />
                                    <label htmlFor="switcher-detached" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold ">Detached</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="sidemenu-layout-styles" className="ti-form-radio" id="switcher-double-menu" />
                                    <label htmlFor="switcher-double-menu" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Double
                                        Menu</label>
                                </div>
                            </div>
                            <div className="px-4 text-secondary text-xs"><b className="me-2">Note:</b>Navigation menu styles won't work
                                here.</div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Page Styles:</p>
                            <div className="grid grid-cols-3  switcher-style">
                                <div className="flex">
                                    <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-regular" defaultChecked />
                                    <label htmlFor="switcher-regular" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Regular</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-classic" />
                                    <label htmlFor="switcher-classic" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Classic</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="data-page-styles" className="ti-form-radio" id="switcher-modern" />
                                    <label htmlFor="switcher-modern" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold"> Modern</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Layout Width Styles:</p>
                            <div className="grid grid-cols-3 switcher-style">
                                <div className="flex">
                                    <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-full-width" defaultChecked />
                                    <label htmlFor="switcher-full-width" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">FullWidth</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="layout-width" className="ti-form-radio" id="switcher-boxed" />
                                    <label htmlFor="switcher-boxed" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Boxed</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Menu Positions:</p>
                            <div className="grid grid-cols-3  switcher-style">
                                <div className="flex">
                                    <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-fixed" defaultChecked />
                                    <label htmlFor="switcher-menu-fixed" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Fixed</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="data-menu-positions" className="ti-form-radio" id="switcher-menu-scroll" />
                                    <label htmlFor="switcher-menu-scroll" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Scrollable </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="switcher-style-head">Header Positions:</p>
                            <div className="grid grid-cols-3 switcher-style">
                                <div className="flex">
                                    <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-fixed" defaultChecked />
                                    <label htmlFor="switcher-header-fixed" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">
                                        Fixed</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="data-header-positions" className="ti-form-radio" id="switcher-header-scroll" />
                                    <label htmlFor="switcher-header-scroll" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Scrollable
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className>
                            <p className="switcher-style-head">Loader:</p>
                            <div className="grid grid-cols-3 switcher-style">
                                <div className="flex">
                                    <input type="radio" name="page-loader" className="ti-form-radio" id="switcher-loader-enable" defaultChecked />
                                    <label htmlFor="switcher-loader-enable" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">
                                        Enable</label>
                                </div>
                                <div className="flex">
                                    <input type="radio" name="page-loader" className="ti-form-radio" id="switcher-loader-disable" />
                                    <label htmlFor="switcher-loader-disable" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Disable
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="switcher-2" className="hidden" role="tabpanel" aria-labelledby="switcher-item-2">
                        <div className="theme-colors">
                            <p className="switcher-style-head">Menu Colors:</p>
                            <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-white" type="radio" name="menu-colors" id="switcher-menu-light" defaultChecked />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Light Menu
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="menu-colors" id="switcher-menu-dark" defaultChecked />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Dark Menu
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="menu-colors" id="switcher-menu-primary" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Color Menu
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="menu-colors" id="switcher-menu-gradient" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Gradient Menu
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio" name="menu-colors" id="switcher-menu-transparent" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Transparent Menu
                                    </span>
                                </div>
                            </div>
                            <div className="px-4 text-[#8c9097] dark:text-white/50 text-[.6875rem]"><b className="me-2">Note:</b>If you want to change color Menu
                                dynamically
                                change from below Theme Primary color picker.</div>
                        </div>
                        <div className="theme-colors">
                            <p className="switcher-style-head">Header Colors:</p>
                            <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-white !border" type="radio" name="header-colors" id="switcher-header-light" defaultChecked />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Light Header
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-dark" type="radio" name="header-colors" id="switcher-header-dark" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Dark Header
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-primary" type="radio" name="header-colors" id="switcher-header-primary" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Color Header
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-gradient" type="radio" name="header-colors" id="switcher-header-gradient" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Gradient Header
                                    </span>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip ti-form-radio switch-select ">
                                    <input className="hs-tooltip-toggle ti-form-radio color-input color-transparent" type="radio" name="header-colors" id="switcher-header-transparent" />
                                    <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black" role="tooltip">
                                        Transparent Header
                                    </span>
                                </div>
                            </div>
                            <div className="px-4 text-[#8c9097] dark:text-white/50 text-[.6875rem]"><b className="me-2">Note:</b>If you want to change color
                                Header dynamically
                                change from below Theme Primary color picker.</div>
                        </div>
                        <div className="theme-colors">
                            <p className="switcher-style-head">Theme Primary:</p>
                            <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary" id="switcher-primary" defaultChecked />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary" id="switcher-primary1" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary" id="switcher-primary2" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary" id="switcher-primary3" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary" id="switcher-primary4" />
                                </div>
                                <div className="ti-form-radio switch-select ps-0 mt-1 color-primary-light">
                                    <div className="theme-container-primary" />
                                    <div className="pickr-container-primary" />
                                </div>
                            </div>
                        </div>
                        <div className="theme-colors">
                            <p className="switcher-style-head">Theme Background:</p>
                            <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-bg-1" type="radio" name="theme-background" id="switcher-background" defaultChecked />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-bg-2" type="radio" name="theme-background" id="switcher-background1" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-bg-3" type="radio" name="theme-background" id="switcher-background2" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-bg-4" type="radio" name="theme-background" id="switcher-background3" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio color-input color-bg-5" type="radio" name="theme-background" id="switcher-background4" />
                                </div>
                                <div className="ti-form-radio switch-select ps-0 mt-1 color-bg-transparent">
                                    <div className="theme-container-background hidden" />
                                    <div className="pickr-container-background" />
                                </div>
                            </div>
                        </div>
                        <div className="menu-image theme-colors">
                            <p className="switcher-style-head">Menu With Background Image:</p>
                            <div className="flex switcher-style space-x-3 rtl:space-x-reverse flex-wrap gap-3">
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio bgimage-input bg-img1" type="radio" name="theme-images" id="switcher-bg-img" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio bgimage-input bg-img2" type="radio" name="theme-images" id="switcher-bg-img1" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio bgimage-input bg-img3" type="radio" name="theme-images" id="switcher-bg-img2" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio bgimage-input bg-img4" type="radio" name="theme-images" id="switcher-bg-img3" />
                                </div>
                                <div className="ti-form-radio switch-select">
                                    <input className="ti-form-radio bgimage-input bg-img5" type="radio" name="theme-images" id="switcher-bg-img4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ti-offcanvas-footer sm:flex justify-between">
                    <a href="javascript:void(0);" id="reset-all" className="w-full ti-btn ti-btn-danger-full m-1">Reset</a>
                </div>
            </div>

            {/* <!-- ========== END Switcher  ========== --> */}

            {/* <!-- Loader --> */}
            <div id="loader">
                <img src="../assets/images/media/loader.svg" alt />
            </div>

            {/* <!-- Loader --> */}

            <div className="grid grid-cols-12 authentication mx-0 text-defaulttextcolor text-defaultsize">
                <div className="xxl:col-span-7 xl:col-span-7 lg:col-span-12 col-span-12">
                    <div className="flex justify-center items-center h-full">
                        <div className="p-[3rem]">
                            <div className="mb-4">
                                <a aria-label="anchor" href="index.html">
                                    <img src="../assets/images/brand-logos/desktop-logo.png" alt className="authentication-brand desktop-logo" />
                                    <img src="../assets/images/brand-logos/desktop-dark.png" alt className="authentication-brand desktop-dark" />
                                </a>
                            </div>
                            <p className="h5 font-semibold mb-2">Sign Up</p>
                            <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal">Welcome &amp; Join us by creating a free account !</p>
                            <div className="btn-list">
                                <button aria-label="button" type="button" className="ti-btn ti-btn-lg ti-btn-light !font-medium me-[0.365rem] dark:border-defaultborder/10"><svg className="google-svg" xmlns="http://www.w3.org/2000/svg" width={2443} height={2500} preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>Sign In with google</button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]"><i className="ri-facebook-fill" /></button>
                                <button aria-label="button" type="button" className="ti-btn ti-btn-icon ti-btn-light"><i className="ri-twitter-fill" /></button>
                            </div>
                            <div className="text-center my-[3rem] authentication-barrier">
                                <span>OR</span>
                            </div>
                            <div className="grid grid-cols-12 gap-y-4">
                                <div className="xl:col-span-12 col-span-12 mt-0">
                                    <label htmlFor="signup-firstname" className="form-label text-default">First Name</label>
                                    <input type="text" className="form-control form-control-lg w-full !rounded-md" id="signup-firstname" placeholder="first name" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="signup-lastname" className="form-label text-default">Last Name</label>
                                    <input type="text" className="form-control form-control-lg w-full !rounded-md" id="signup-lastname" placeholder="last name" />
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <label htmlFor="signup-password" className="form-label text-default">Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control form-control-lg !rounded-e-none" id="signup-password" placeholder="password" />
                                        <button aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" onclick="createpassword('signup-password',this)" type="button" id="button-addon2"><i className="ri-eye-off-line align-middle" /></button>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12 mb-4">
                                    <label htmlFor="signup-confirmpassword" className="form-label text-default">Confirm Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control form-control-lg !rounded-e-none" id="signup-confirmpassword" placeholder="confirm password" />
                                        <button aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" onclick="createpassword('signup-confirmpassword',this)" type="button" id="button-addon21"><i className="ri-eye-off-line align-middle" /></button>
                                    </div>
                                    <div className="form-check mt-4 flex !ps-0 ">
                                        <input className="form-check-input align-middle" type="checkbox" defaultValue id="defaultCheck1" />
                                        <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal " htmlFor="defaultCheck1">
                                            By creating a account you agree to our <a href="terms.html" className="text-success"><u>&nbsp;Terms &amp; Conditions</u></a>&nbsp; and&nbsp; <a className="text-success"><u>Privacy Policy</u></a>
                                        </label>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12 grid mt-2">
                                    <button type="button" className="ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10">Create Account</button>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Already have an account? <a href="sign-in-cover.html" className="text-primary">Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-12 xl:block hidden px-0">
                    <div className="authentication-cover">
                        <div className="aunthentication-cover-content rounded">
                            <div className="swiper keyboard-control">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="text-white text-center p-[3rem] flex items-center justify-center">
                                            <div>
                                                <div className="mb-[3rem]">
                                                    <img src="../assets/images/authentication/2.png" className="authentication-image" alt />
                                                </div>
                                                <h6 className="font-semibold text-[1rem]">Sign Up</h6>
                                                <p className="font-normal text-[.875rem] opacity-[0.7]"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at ratione.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="text-white text-center p-[3rem] flex items-center justify-center">
                                            <div>
                                                <div className="mb-[3rem]">
                                                    <img src="../assets/images/authentication/3.png" className="authentication-image" alt />
                                                </div>
                                                <h6 className="font-semibold text-[1rem]">Sign Up</h6>
                                                <p className="font-normal text-[.875rem] opacity-[0.7]"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at ratione.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="text-white text-center p-[3rem] flex items-center justify-center">
                                            <div>
                                                <div className="mb-[3rem]">
                                                    <img src="../assets/images/authentication/2.png" className="authentication-image" alt />
                                                </div>
                                                <h6 className="font-semibold text-[1rem]">Sign Up</h6>
                                                <p className="font-normal text-[.875rem] opacity-[0.7]"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at ratione.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-button-next" />
                                <div className="swiper-button-prev" />
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestSignUp