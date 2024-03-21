import React from 'react'
import TopHeader from './TestStudent/TopHeader'
import TestSidebar from './TestStudent/TestSidebar'
import StudentFooter from './StudentDashboard/StudentFooter'

const TestStudProfile = () => {

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


                {/* Start::content  */}
                <div className="content">
                    <div className="main-content">

                        {/* Page Header */}
                        <div className="block justify-between page-header md:flex">
                            <div>
                                <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white dark:hover:text-white text-[1.125rem] font-semibold"> Profile</h3>
                            </div>
                        </div>
                        {/* Page Header Close */}


                        {/* Start::row-1 */}
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                                <div className="box overflow-hidden">
                                    <div className="box-body !p-0">
                                        <div className="sm:flex items-start p-6 main-profile-cover">
                                            <div>
                                                <span className="avatar avatar-xxl avatar-rounded online me-4">
                                                    <img src="../assets/images/faces/9.jpg" alt />
                                                </span>
                                            </div>
                                            <div className="flex-grow main-profile-info">
                                                <div className="flex items-center !justify-between">
                                                    <h6 className="font-semibold mb-1 text-white text-[1rem]">Json Taylor</h6>

                                                </div>
                                                <p className="mb-1 !text-white  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
                                                <p className="text-[0.75rem] text-white mb-6 opacity-[0.5]">
                                                    <span className="me-4 inline-flex"><i className="ri-building-line me-1 align-middle" />Georgia</span>
                                                    <span className="inline-flex"><i className="ri-map-pin-line me-1 align-middle" />Washington D.C</span>
                                                </p>
                                                <div className="flex mb-0">
                                                    <button type="button" className="bg-light text-black font-medium py-3 px-5 hover:bg-green hover:border border border-light shadow-md transition-colors duration-200 rounded">
                                                        <i className="me-2 bx bxs-edit align-middle inline-block"></i>Edit Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                                            <div className="mb-6">
                                                {/* <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
                                                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                                                    I am <b className="text-defaulttextcolor">Sonya Taylor,</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
                                                </p> */}
                                            </div>
                                            <div className="mb-0">
                                                <p className="text-[.9375rem] mb-2 font-semibold">Links :</p>
                                                <div className="mb-0">
                                                    <p className="mb-1">
                                                        <a href="javascript:void(0)" className="text-primary"><u>https://www.spruko.com/</u></a>
                                                    </p>
                                                    <p className="mb-0">
                                                        <a href="javascript:void(0)" className="text-primary"><u>https://themeforest.net/user/ spruko/portfolio</u></a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                                            <p className="text-[.9375rem] mb-2 me-6 font-semibold">Contact Information :</p>
                                            <div className="text-[#8c9097] dark:text-white/50">
                                                <p className="mb-2">
                                                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                                        <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50" />
                                                    </span>
                                                    sonyataylor2531@gmail.com
                                                </p>
                                                <p className="mb-2">
                                                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                                        <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50" />
                                                    </span>
                                                    +(555) 555-1234
                                                </p>
                                                <p className="mb-0">
                                                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                                        <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50" />
                                                    </span>
                                                    MIG-1-11, Monroe Street, Georgetown, Washington D.C, USA,20071
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-6 border-b dark:border-defaultborder/10 border-dashed sm:flex items-center">
                                            <p className="text-[.9375rem] mb-2 me-6 font-semibold">Social Networks :</p>
                                            <div className="btn-list mb-0">
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary text-primary me-[.375rem] mb-1">
                                                    <i className="ri-facebook-line font-semibold" />
                                                </button>
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-secondary me-[.375rem] mb-1">
                                                    <i className="ri-twitter-line font-semibold" />
                                                </button>
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning me-[.375rem] mb-1">
                                                    <i className="ri-instagram-line font-semibold" />
                                                </button>
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-success me-[.375rem] mb-1">
                                                    <i className="ri-github-line font-semibold" />
                                                </button>
                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger me-[.375rem] mb-1">
                                                    <i className="ri-youtube-line font-semibold" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6 border-b dark:border-defaultborder/10 border-dashed">
                                            <div className="flex mb-0">
                                                <div className='flex me-6'>
                                                    <button type="button" className="bg-warning text-black font-small py-3 px-5 hover:bg-light hover:border border border-warning transition-colors duration-200 rounded shadow-lg" style={{whiteSpace:'nowrap'}}>
                                                        <i className="me-2 bx bxs-wallet-alt align-middle inline-block"></i>Transaction Details
                                                    </button>
                                                </div>
                                                <div className='flex me-6'>
                                                    <button type="button" className="bg-danger text-black font-small py-3 px-5 hover:bg-light hover:border border border-danger transition-colors duration-200 rounded shadow-lg">
                                                        <i className="me-2 bx bx-exit align-middle inline-block"></i>Exit From LinkUrCodes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
                                <div className="grid grid-cols-12 gap-x-6">
                                    <div className="xl:col-span-12 col-span-12">
                                        <div className="box">
                                            <div className="box-body !p-0">
                                                <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                                                    <nav className="-mb-0.5 sm:flex md:space-x-6 rtl:space-x-reverse pb-2">
                                                        <a className="w-full sm:w-auto flex active hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md py-2 px-4 text-primary text-sm" href="javascript:void(0);" id="activity-tab" data-hs-tab="#activity-tab-pane" aria-controls="activity-tab-pane">
                                                            <i className="ri-gift-line  align-middle inline-block me-1" />Activity
                                                        </a>
                                                        <a className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="javascript:void(0);" id="posts-tab" data-hs-tab="#posts-tab-pane" aria-controls="posts-tab-pane">
                                                            <i className="ri-bill-line me-1 align-middle inline-block" />Posts
                                                        </a>
                                                        <a className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="javascript:void(0);" id="followers-tab" data-hs-tab="#followers-tab-pane" aria-controls="followers-tab-pane">
                                                            <i className="ri-money-dollar-box-line me-1 align-middle inline-block" />Friends
                                                        </a>
                                                        <a className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="javascript:void(0);" id="gallery-tab" data-hs-tab="#gallery-tab-pane" aria-controls="gallery-tab-pane">
                                                            <i className="ri-exchange-box-line me-1 align-middle inline-block" />Gallery
                                                        </a>
                                                    </nav>
                                                    <div>
                                                        <p className="font-semibold mb-2">Account Valid till - <a href="javascript:void(0);" className="text-primary text-[0.75rem]">20/10/2025</a></p>
                                                        {/* <div className="progress progress-xs progress-animate">
                                                            <div className="progress-bar bg-primary w-[60%]" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="!p-4">
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane show active fade !p-0 !border-0" id="activity-tab-pane" role="tabpanel" aria-labelledby="activity-tab" tabIndex={0}>
                                                            <ul className="list-none profile-timeline">
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm bg-primary/10  !text-primary avatar-rounded profile-timeline-avatar">
                                                                            E
                                                                        </span>
                                                                        <p className="mb-2">
                                                                            <b>You</b> Commented on <b>alexander taylor</b> post <a className="text-secondary" href="javascript:void(0);"><u>#beautiful day</u></a>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                                                        </p>
                                                                        <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0">
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-17.jpg" alt />
                                                                            </a>
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-18.jpg" alt />
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                            <img src="../assets/images/faces/11.jpg" alt />
                                                                        </span>
                                                                        <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                                                            <span className="text-default"><b>Json Smith</b> reacted to the post 👍</span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">18,Dec 2022 - 12:16</span>
                                                                        </p>
                                                                        <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus rem rerum excepturi aperiam ipsam temporibus inventore ullam tempora eligendi libero sequi dignissimos cumque, et a sint tenetur consequatur omnis!
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                            <img src="../assets/images/faces/4.jpg" alt />
                                                                        </span>
                                                                        <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                                                            <span className="text-default"><b>Alicia Keys</b> shared a document with <b>you</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">21,Dec 2022 - 15:32</span>
                                                                        </p>
                                                                        <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0 items-center">
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/file-manager/3.png" alt />
                                                                            </a>
                                                                            <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50">432.87KB</span>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm bg-success/10 !text-success avatar-rounded profile-timeline-avatar">
                                                                            P
                                                                        </span>
                                                                        <p className="text-[#8c9097] dark:text-white/50 mb-4">
                                                                            <span className="text-default"><b>You</b> shared a post with 4 people <b>Simon,Sasha, Anagha,Hishen</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">28,Dec 2022 - 18:46</span>
                                                                        </p>
                                                                        <p className="profile-activity-media mb-4">
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-75.jpg" alt />
                                                                            </a>
                                                                        </p>
                                                                        <div>
                                                                            <div className="avatar-list-stacked">
                                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                                    <img src="../assets/images/faces/2.jpg" alt="img" />
                                                                                </span>
                                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                                    <img src="../assets/images/faces/8.jpg" alt="img" />
                                                                                </span>
                                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                                    <img src="../assets/images/faces/2.jpg" alt="img" />
                                                                                </span>
                                                                                <span className="avatar avatar-sm avatar-rounded">
                                                                                    <img src="../assets/images/faces/10.jpg" alt="img" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                            <img src="../assets/images/faces/5.jpg" alt />
                                                                        </span>
                                                                        <p className="text-[#8c9097] dark:text-white/50 mb-1">
                                                                            <span className="text-default"><b>Melissa Blue</b> liked your post <b>travel excites</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">11,Dec 2022 - 11:18</span>
                                                                        </p>
                                                                        <p className="text-[#8c9097] dark:text-white/50">you are already feeling the tense atmosphere of the video playing in the background</p>
                                                                        <p className="profile-activity-media sm:flex mb-0">
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-59.jpg" className="m-1" alt />
                                                                            </a>
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-60.jpg" className="m-1" alt />
                                                                            </a>
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-61.jpg" className="m-1" alt />
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                                                            <img src="../assets/images/media/media-39.jpg" alt />
                                                                        </span>
                                                                        <p className="mb-1">
                                                                            <b>You</b> Commented on <b>Peter Engola</b> post <a className="text-secondary" href="javascript:void(0);"><u>#Mother Nature</u></a>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                                                        </p>
                                                                        <p className="text-[#8c9097] dark:text-white/50">Technology id developing rapidly kepp uo your work 👌</p>
                                                                        <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0">
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-26.jpg" alt />
                                                                            </a>
                                                                            <a aria-label="anchor" href="javascript:void(0);">
                                                                                <img src="../assets/images/media/media-29.jpg" alt />
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="tab-pane fade !p-0 !border-0 hidden !rounded-md" id="posts-tab-pane" role="tabpanel" aria-labelledby="posts-tab" tabIndex={0}>
                                                            <ul className="list-group !rounded-md">
                                                                <li className="list-group-item">
                                                                    <div className="sm:flex items-center leading-none">
                                                                        <div className="me-4">
                                                                            <span className="avatar avatar-md avatar-rounded">
                                                                                <img src="../assets/images/faces/9.jpg" alt />
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex-grow">
                                                                            <div className="flex">
                                                                                <input type="text" className="form-control !rounded-e-none !w-full" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" />
                                                                                <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-emoji-smile" /></button>
                                                                                <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-paperclip" /></button>
                                                                                <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-camera" /></button>
                                                                                <button className="ti-btn bg-primary !mb-0 !rounded-s-none text-white" type="button">Post</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="list-group-item" id="profile-posts-scroll" style={{whiteSpace:"collapse"}}>
                                                                    <div className="grid grid-cols-12 gap-4">
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">24, Dec - 04:32PM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-4">As opposed to using 'Content here 👌</p>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-start">
                                                                                        <div>
                                                                                            <span className="badge bg-primary/10 text-primary me-2">Fashion</span>
                                                                                        </div>
                                                                                        <div>
                                                                                            <div className="hs-dropdown ti-dropdown">
                                                                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                    <i className="ti ti-dots-vertical" />
                                                                                                </button>
                                                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">26, Dec - 12:45PM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Shared pictures with 4 of friends <span>Hiren,Sasha,Biden,Thara</span>.</p>
                                                                                        <div className="flex leading-none justify-between mb-4">
                                                                                            <div>
                                                                                                <a aria-label="anchor" href="javascript:void(0);">
                                                                                                    <span className="avatar avatar-md me-1">
                                                                                                        <img src="../assets/images/media/media-52.jpg" alt />
                                                                                                    </span>
                                                                                                </a>
                                                                                                <a aria-label="anchor" href="javascript:void(0);">
                                                                                                    <span className="avatar avatar-md me-1">
                                                                                                        <img src="../assets/images/media/media-56.jpg" alt />
                                                                                                    </span>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="flex items-start">
                                                                                            <div>
                                                                                                <span className="badge bg-success/10 text-secondary me-2">Nature</span>
                                                                                            </div>
                                                                                            <div>
                                                                                                <div className="hs-dropdown ti-dropdown">
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                        <i className="ti ti-dots-vertical" />
                                                                                                    </button>
                                                                                                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                        <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                        <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                        <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="avatar-list-stacked block mt-4 text-end">
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/2.jpg" alt="img" />
                                                                                            </span>
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/8.jpg" alt="img" />
                                                                                            </span>
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/2.jpg" alt="img" />
                                                                                            </span>
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/10.jpg" alt="img" />
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">29, Dec - 09:53AM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Sharing an article that excites me about nature more than what i thought.</p>
                                                                                        <p className="mb-4 profile-post-link">
                                                                                            <a href="javascript:void(0);" className="text-[0.75rem] text-primary">
                                                                                                <u>https://www.discovery.com/ nature/caring-for-coral</u>
                                                                                            </a>
                                                                                        </p>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-start">
                                                                                        <div>
                                                                                            <span className="badge bg-secondary/10 text-secondary me-2">Travel</span>
                                                                                        </div>
                                                                                        <div className="hs-dropdown ti-dropdown">
                                                                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                <i className="ti ti-dots-vertical" />
                                                                                            </button>
                                                                                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">22, Dec - 11:22PM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Shared pictures with 3 of your friends <span>Maya,Jacob,Amanda</span>.</p>
                                                                                        <div className="flex leading-none justify-between mb-4">
                                                                                            <div>
                                                                                                <a aria-label="anchor" href="javascript:void(0);">
                                                                                                    <span className="avatar avatar-md me-1">
                                                                                                        <img src="../assets/images/media/media-40.jpg" alt className="rounded-md" />
                                                                                                    </span>
                                                                                                </a>
                                                                                                <a aria-label="anchor" href="javascript:void(0);">
                                                                                                    <span className="avatar avatar-md me-1">
                                                                                                        <img src="../assets/images/media/media-45.jpg" alt className="rounded-md" />
                                                                                                    </span>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="flex items-start">
                                                                                            <div>
                                                                                                <span className="badge bg-success/10 text-secondary me-2">Nature</span>
                                                                                            </div>
                                                                                            <div className="hs-dropdown ti-dropdown">
                                                                                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                    <i className="ti ti-dots-vertical" />
                                                                                                </button>
                                                                                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                    <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="avatar-list-stacked block mt-4 text-end">
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/1.jpg" alt="img" />
                                                                                            </span>
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/5.jpg" alt="img" />
                                                                                            </span>
                                                                                            <span className="avatar avatar-xs avatar-rounded">
                                                                                                <img src="../assets/images/faces/16.jpg" alt="img" />
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">18, Dec - 12:28PM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Followed this author for top class themes with best code you can get in the market.</p>
                                                                                        <p className="mb-4 profile-post-link">
                                                                                            <a href="javascript:void(0);" className="text-[0.75rem] text-primary">
                                                                                                <u>https://themeforest.net/user/ spruko/portfolio</u>
                                                                                            </a>
                                                                                        </p>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-start">
                                                                                        <div>
                                                                                            <span className="badge bg-secondary/10 text-secondary me-2">Travel</span>
                                                                                        </div>
                                                                                        <div className="hs-dropdown ti-dropdown">
                                                                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                <i className="ti ti-dots-vertical" />
                                                                                            </button>
                                                                                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                                                                            <div className="rounded border dark:border-defaultborder/10">
                                                                                <div className="p-4 flex items-start flex-wrap">
                                                                                    <div className="me-2">
                                                                                        <span className="avatar avatar-sm avatar-rounded">
                                                                                            <img src="../assets/images/faces/9.jpg" alt />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex-grow">
                                                                                        <p className="mb-1 font-semibold leading-none">You</p>
                                                                                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">02, Dec - 06:32AM</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                                                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-4">There are many variations of passages 👏😍</p>
                                                                                        <div className="flex items-center justify-between md:mb-0 mb-2">
                                                                                            <div>
                                                                                                <div className="btn-list">
                                                                                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                                                                                        Comment
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                                                                                        <i className="ri-thumb-up-line" />
                                                                                                    </button>
                                                                                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                                                                                        <i className="ri-share-line" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-start">
                                                                                        <div>
                                                                                            <span className="badge bg-primary/10 text-primary me-2">Fashion</span>
                                                                                        </div>
                                                                                        <div className="hs-dropdown ti-dropdown">
                                                                                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                                                                                <i className="ti ti-dots-vertical" />
                                                                                            </button>
                                                                                            <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Delete</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Hide</a></li>
                                                                                                <li><a className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="javascript:void(0);">Edit</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <div className="text-center">
                                                                        <button type="button" className="ti-btn ti-btn-primary !font-medium">Show All</button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="tab-pane fade !p-0 !border-0 hidden" id="followers-tab-pane" role="tabpanel" aria-labelledby="followers-tab" tabIndex={0}>
                                                            <div className="grid grid-cols-12 sm:gap-x-6">
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/2.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Samantha May</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">samanthamay2912@gmail.com</p>
                                                                                    <span className="badge bg-info/10 rounded-full text-info">Team Member</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/15.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Andrew Garfield</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">andrewgarfield98@gmail.com</p>
                                                                                    <span className="badge bg-success/10 text-success rounded-full">Team Lead</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/5.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Jessica Cashew</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">jessicacashew143@gmail.com</p>
                                                                                    <span className="badge bg-info/10 rounded-full text-info">Team Member</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body !p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/11.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Simon Cowan</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">jessicacashew143@gmail.com</p>
                                                                                    <span className="badge bg-warning/10 text-warning rounded-full">Team Manager</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/7.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Amanda nunes</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">amandanunes45@gmail.com</p>
                                                                                    <span className="badge bg-info/10 rounded-full text-info">Team Member</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12">
                                                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                                                        <div className="box-body p-6">
                                                                            <div className="text-center">
                                                                                <span className="avatar avatar-xl avatar-rounded">
                                                                                    <img src="../assets/images/faces/12.jpg" alt />
                                                                                </span>
                                                                                <div className="mt-2">
                                                                                    <p className="mb-0 font-semibold">Mahira Hose</p>
                                                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">mahirahose9456@gmail.com</p>
                                                                                    <span className="badge bg-info/10 rounded-full text-info">Team Member</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-footer text-center">
                                                                            <div className="btn-list">
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-12">
                                                                    <div className="text-center !mt-4">
                                                                        <button type="button" className="ti-btn ti-btn-primary !font-medium btn-wave">Show All</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade !p-0 !border-0 hidden" id="gallery-tab-pane" role="tabpanel" aria-labelledby="gallery-tab" tabIndex={0}>
                                                            <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-40.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-40.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-41.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-41.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-42.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-42.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-43.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-43.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-44.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-44.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-45.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-45.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-46.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-46.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-60.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-60.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-26.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-26.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-32.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-32.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-30.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-30.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 col-span-12">
                                                                    <a href="../assets/images/media/media-31.jpg" className="glightbox card" data-gallery="gallery1">
                                                                        <img src="../assets/images/media/media-31.jpg" alt="image" className="rounded-md w-full" />
                                                                    </a>
                                                                </div>
                                                                <div className="col-span-12">
                                                                    <div className="text-center mt-6">
                                                                        <button type="button" className="ti-btn ti-btn-primary !font-medium">Show All</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End::row-1 */}
                    </div>
                </div>
                {/* End::content  */}


                {/* Footer Start */}
                <StudentFooter />
                {/* Footer End */}
            </div>

            {/* Back To Top */}

            <div className="scrollToTop">
                <span className="arrow"><i className="ri-arrow-up-s-fill text-xl" /></span>
            </div>

            <div id="responsive-overlay"></div>

        </div>
    )
}

export default TestStudProfile