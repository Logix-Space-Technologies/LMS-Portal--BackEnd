import React from 'react'
import TopHeader from './TestStudent/TopHeader'
import TestSidebar from './TestStudent/TestSidebar'
import StudentFooter from './StudentDashboard/StudentFooter'

const TestTaskView = () => {
    return (
        <div>
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
                    <br></br>
                    {/* Start::content  */}
                    <div className="content">
                        <div className="main-content">

                            {/* Start:: row-1 */}
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="box">
                                        <div className="box-body p-4">
                                            <div className="md:flex items-center justify-between flex-wrap gap-4">
                                                <div className="grid grid-cols-12 gap-2 md:w-[30%]">
                                                    <div className="xl:col-span-5 col-span-12">
                                                        <h5><b>View Tasks</b></h5>

                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End:: row-1 */}

                            {/* Start::row-2 */}
                            <div className="ynex-kanban-board text-defaulttextcolor dark:text-defaulttextcolor/70 text-defaultsize">
                                <div className="kanban-tasks-type in-progress">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="block font-semibold text-[.9375rem]">ON GOING - 25</span>
                                        </div>
                                    </div>
                                    <div className="kanban-tasks" id="inprogress-tasks">
                                        <div id="inprogress-tasks-draggable" data-view-btn="inprogress-tasks">
                                            <div className="box kanban-tasks todo">
                                                <div className="box-body !p-0">
                                                    <div className="p-4 kanban-board-head">
                                                        <div
                                                            className="flex text-[#8c9097] dark:text-white/50 justify-between mb-1 text-[.75rem] font-semibold">
                                                            <div className="inline-flex"><i
                                                                className="ri-time-line me-1 align-middle" />Created -
                                                                02 Jun</div>
                                                            <div>5 days left</div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="task-badges"><span className="badge bg-light text-default">#SPK
                                                                -
                                                                13</span><span className="ms-1 badge bg-primary/10 text-primary">UI
                                                                    Design</span><span
                                                                        className="ms-1 badge bg-danger/10 text-danger">Development</span></div>
                                                            <div
                                                                className="hs-dropdown ti-dropdown ltr:[--placement:bottom-right] rtl:[--placement:bottom-left]">
                                                                <a aria-label="anchor" href="javascript:void(0);"
                                                                    className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"
                                                                    aria-expanded="false">
                                                                    <i className="fe fe-more-vertical" />
                                                                </a>
                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-eye-line me-1 align-middle" />View</a></li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-delete-bin-line me-1 align-middle" />Delete</a>
                                                                    </li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-edit-line me-1 align-middle" />Edit</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="kanban-content mt-2">
                                                            <h6 className="font-semibold mb-1 text-[.9375rem]">Create Calendar &amp; Mail
                                                                pages.
                                                            </h6>
                                                            <div className="kanban-task-description">Lorem ipsum dolor sit amet consectetur
                                                                adipisicing elit. Nulla soluta </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 border-t dark:border-defaultborder/10 border-dashed">
                                                        <div className="flex items-center justify-between">
                                                            <div className="inline-flex items-center">
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center me-2 text-primary">
                                                                    <span className="me-1"><i
                                                                        className="ri-thumb-up-fill align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">05</span>
                                                                </a>
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center text-[#8c9097] dark:text-white/50">
                                                                    <span className="me-1"><i
                                                                        className="ri-message-2-line align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">13</span>
                                                                </a>
                                                            </div>
                                                            <div className="avatar-list-stacked">
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/13.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/6.jpg" alt="img" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid me-4 mt-4">
                                        <button type="button" className="ti-btn ti-btn-primary">View More</button>
                                    </div>
                                </div>
                                <div className="kanban-tasks-type inreview">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="block font-semibold text-[.9375rem]">IN REVIEW - 02</span>
                                        </div>
                                    </div>
                                    <div className="kanban-tasks" id="inreview-tasks">
                                        <div id="inreview-tasks-draggable" data-view-btn="inreview-tasks">
                                            <div className="box kanban-tasks interview">
                                                <div className="box-body !p-0">
                                                    <div className="p-4 kanban-board-head">
                                                        <div
                                                            className="flex text-[#8c9097] dark:text-white/50 justify-between mb-1 text-[.75rem] font-semibold">
                                                            <div className="inline-flex"><i
                                                                className="ri-time-line me-1 align-middle" />Created -
                                                                05 Jun</div>
                                                            <div>14 days left</div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="task-badges"><span className="badge bg-light text-default">#SPK
                                                                -
                                                                15</span><span
                                                                    className="ms-1 badge bg-purple/10 text-purple">Review</span>
                                                            </div>
                                                            <div
                                                                className="hs-dropdown ti-dropdown ltr:[--placement:bottom-right] rtl:[--placement:bottom-left]">
                                                                <a aria-label="anchor" href="javascript:void(0);"
                                                                    className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"
                                                                    aria-expanded="false">
                                                                    <i className="fe fe-more-vertical" />
                                                                </a>
                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-eye-line me-1 align-middle" />View</a></li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-delete-bin-line me-1 align-middle" />Delete</a>
                                                                    </li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-edit-line me-1 align-middle" />Edit</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="kanban-content mt-2">
                                                            <div className="task-image mt-2">
                                                                <img src="../assets/images/media/media-43.jpg"
                                                                    className="img-fluid rounded kanban-image" alt />
                                                            </div>
                                                            <h6 className="font-semibold mb-0 mt-2">Design Architecture strategy.</h6>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 border-t dark:border-defaultborder/10 border-dashed">
                                                        <div className="flex items-center justify-between">
                                                            <div className="inline-flex items-center">
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center me-2 text-primary">
                                                                    <span className="me-1"><i
                                                                        className="ri-thumb-up-fill align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">09</span>
                                                                </a>
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center text-[#8c9097] dark:text-white/50">
                                                                    <span className="me-1"><i
                                                                        className="ri-message-2-line align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">35</span>
                                                                </a>
                                                            </div>
                                                            <div className="avatar-list-stacked">
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/3.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/5.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/7.jpg" alt="img" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid me-4 mt-4">
                                        <button type="button" className="ti-btn ti-btn-primary">View More</button>
                                    </div>
                                </div>
                                <div className="kanban-tasks-type completed">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="block font-semibold text-[.9375rem]">COMPLETED - 36</span>
                                        </div>
                                    </div>
                                    <div className="kanban-tasks" id="completed-tasks">
                                        <div id="completed-tasks-draggable" data-view-btn="completed-tasks">
                                            <div className="box kanban-tasks completed">
                                                <div className="box-body !p-0">
                                                    <div className="p-4 kanban-board-head">
                                                        <div
                                                            className="flex text-[#8c9097] dark:text-white/50 justify-between mb-1 text-[.75rem] font-semibold">
                                                            <div className="inline-flex"><i
                                                                className="ri-time-line me-1 align-middle" />Created -
                                                                10 Jun</div>
                                                            <div className="text-success"><i
                                                                className="ri-check-fill me-1 align-middle" />Done
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="task-badges"><span className="badge bg-light text-default">#SPK
                                                                -
                                                                10</span><span
                                                                    className="ms-1 badge bg-info/10 text-info">Development</span></div>
                                                            <div
                                                                className="hs-dropdown ti-dropdown ltr:[--placement:bottom-right] rtl:[--placement:bottom-left]">
                                                                <a aria-label="anchor" href="javascript:void(0);"
                                                                    className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"
                                                                    aria-expanded="false">
                                                                    <i className="fe fe-more-vertical" />
                                                                </a>
                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-eye-line me-1 align-middle" />View</a></li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-delete-bin-line me-1 align-middle" />Delete</a>
                                                                    </li>
                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium !inline-flex"
                                                                        href="javascript:void(0);"><i
                                                                            className="ri-edit-line me-1 align-middle" />Edit</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="kanban-content mt-2">
                                                            <h6 className="font-semibold mb-1 text-[.9375rem]">React JS new version update.
                                                            </h6>
                                                            <div className="kanban-task-description">Lorem ipsum dolor sit amet consectetur
                                                                adipisicing elit. Nulla soluta </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 border-t dark:border-defaultborder/10 border-dashed">
                                                        <div className="flex items-center justify-between">
                                                            <div className="inline-flex items-center">
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center me-2 text-primary">
                                                                    <span className="me-1"><i
                                                                        className="ri-thumb-up-fill align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">22</span>
                                                                </a>
                                                                <a href="javascript:void(0);"
                                                                    className="inline-flex items-center text-[#8c9097] dark:text-white/50">
                                                                    <span className="me-1"><i
                                                                        className="ri-message-2-line align-middle font-normal" /></span><span
                                                                            className="font-semibold text-[.75rem]">12</span>
                                                                </a>
                                                            </div>
                                                            <div className="avatar-list-stacked">
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/10.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/11.jpg" alt="img" />
                                                                </span>
                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                    <img src="../assets/images/faces/1.jpg" alt="img" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid me-4 mt-4">
                                        <button type="button" className="ti-btn ti-btn-primary">View More</button>
                                    </div>
                                </div>
                            </div>
                            {/*End::row-2 */}
                        </div>
                    </div>
                    {/* End::content  */}

                    {/* ========== Search Modal ========== */}
                    <div id="search-modal" className="hs-overlay ti-modal hidden mt-[1.75rem]">
                        <div className="ti-modal-box">
                            <div className="ti-modal-content !border !border-defaultborder dark:!border-defaultborder/10 !rounded-[0.5rem]">
                                <div className="ti-modal-body">
                                    <div className="input-group border-[2px] border-primary rounded-[0.25rem] w-full flex">
                                        <a aria-label="anchor" href="javascript:void(0);" className="input-group-text flex items-center bg-light border-e-[#dee2e6] !py-[0.375rem] !px-[0.75rem] !rounded-none !text-[0.875rem]" id="Search-Grid"><i className="fe fe-search header-link-icon text-[0.875rem]" /></a>
                                        <input type="search" className="form-control border-0 px-2 !text-[0.8rem] w-full focus:ring-transparent" placeholder="Search" aria-label="Username" />
                                        <a aria-label="anchor" href="javascript:void(0);" className="flex items-center input-group-text bg-light !py-[0.375rem] !px-[0.75rem]" id="voice-search"><i className="fe fe-mic header-link-icon" /></a>
                                        <div className="hs-dropdown ti-dropdown">
                                            <a aria-label="anchor" href="javascript:void(0);" className="flex items-center hs-dropdown-toggle ti-dropdown-toggle btn btn-light btn-icon !bg-light !py-[0.375rem] !rounded-none !px-[0.75rem] text-[0.95rem] h-[2.413rem] w-[2.313rem]">
                                                <i className="fe fe-more-vertical" />
                                            </a>
                                            <ul className="absolute hs-dropdown-menu ti-dropdown-menu !-mt-2 !p-0 hidden">
                                                <li><a className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium" href="javascript:void(0);">Action</a></li>
                                                <li><a className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium" href="javascript:void(0);">Another action</a></li>
                                                <li><a className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium" href="javascript:void(0);">Something else here</a></li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li><a className="ti-dropdown-item flex text-defaulttextcolor dark:text-defaulttextcolor/70 !py-[0.5rem] !px-[0.9375rem] !text-[0.8125rem] font-medium" href="javascript:void(0);">Separated link</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <p className="font-normal  text-[#8c9097] dark:text-white/50 text-[0.813rem] dark:text-gray-200 mb-2">Are You Looking For...</p>
                                        <span className="search-tags text-[0.75rem] !py-[0rem] !px-[0.55rem] dark:border-defaultborder/10"><i className="fe fe-user me-2" />People<a href="javascript:void(0)" className="tag-addon header-remove-btn"><span className="sr-only">Remove badge</span><i className="fe fe-x" /></a></span>
                                        <span className="search-tags text-[0.75rem] !py-[0rem] !px-[0.55rem] dark:border-defaultborder/10"><i className="fe fe-file-text me-2" />Pages<a href="javascript:void(0)" className="tag-addon header-remove-btn"><span className="sr-only">Remove badge</span><i className="fe fe-x" /></a></span>
                                        <span className="search-tags text-[0.75rem] !py-[0rem] !px-[0.55rem] dark:border-defaultborder/10"><i className="fe fe-align-left me-2" />Articles<a href="javascript:void(0)" className="tag-addon header-remove-btn"><span className="sr-only">Remove badge</span><i className="fe fe-x" /></a></span>
                                        <span className="search-tags text-[0.75rem] !py-[0rem] !px-[0.55rem] dark:border-defaultborder/10"><i className="fe fe-server me-2" />Tags<a href="javascript:void(0)" className="tag-addon header-remove-btn"><span className="sr-only">Remove badge</span><i className="fe fe-x" /></a></span>
                                    </div>
                                    <div className="my-[1.5rem]">
                                        <p className="font-normal  text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-2">Recent Search :</p>
                                        <div id="dismiss-alert" role="alert" className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-2 !text-[0.8125rem] alert">
                                            <a href="notifications.html"><span>Notifications</span></a>
                                            <a aria-label="anchor" className="ms-auto leading-none" href="javascript:void(0);" data-hs-remove-element="#dismiss-alert"><i className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50" /></a>
                                        </div>
                                        <div id="dismiss-alert1" role="alert" className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-2 !text-[0.8125rem] alert">
                                            <a href="alerts.html"><span>Alerts</span></a>
                                            <a aria-label="anchor" className="ms-auto leading-none" href="javascript:void(0);" data-hs-remove-element="#dismiss-alert"><i className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50" /></a>
                                        </div>
                                        <div id="dismiss-alert2" role="alert" className="!p-2 border dark:border-defaultborder/10 rounded-[0.3125rem] flex items-center text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 !text-[0.8125rem] alert">
                                            <a href="mail.html"><span>Mail</span></a>
                                            <a aria-label="anchor" className="ms-auto lh-1" href="javascript:void(0);" data-hs-remove-element="#dismiss-alert"><i className="fe fe-x !text-[0.8125rem] text-[#8c9097] dark:text-white/50" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="ti-modal-footer !py-[1rem] !px-[1.25rem]">
                                    <div className="inline-flex rounded-md  shadow-sm">
                                        <button type="button" className="ti-btn-group !px-[0.75rem] !py-[0.45rem]  rounded-s-[0.25rem] !rounded-e-none ti-btn-primary !text-[0.75rem] dark:border-white/10">
                                            Search
                                        </button>
                                        <button type="button" className="ti-btn-group  ti-btn-primary-full rounded-e-[0.25rem] dark:border-white/10 !text-[0.75rem] !rounded-s-none !px-[0.75rem] !py-[0.45rem]">
                                            Clear Recents
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ========== END Search Modal ========== */}
                    {/* Footer Start */}
                    <StudentFooter />
                    {/* Footer End */}
                </div>
                {/* Back To Top */}
                <div className="scrollToTop">
                    <span className="arrow"><i className="ri-arrow-up-s-fill text-xl" /></span>
                </div>
                <div id="responsive-overlay" />
            </div>
        </div>
    )
}

export default TestTaskView