import React from 'react'
import TopHeader from './TestStudent/TopHeader'
import TestSidebar from './TestStudent/TestSidebar'
import StudentFooter from './StudentDashboard/StudentFooter'

const TestStudInput = () => {
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

                        {/* Page Header */}
                        <div className="block justify-between page-header md:flex">
                            <div>
                                <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white dark:hover:text-white text-[1.125rem] font-semibold">Inputs</h3>
                            </div>
                            <ol className="flex items-center whitespace-nowrap min-w-0">
                                <li className="text-[0.813rem] ps-[0.5rem]">
                                    <a className="flex items-center text-primary hover:text-primary dark:text-primary truncate" href="javascript:void(0);">
                                        Form Elements
                                        <i className="ti ti-chevrons-right flex-shrink-0 text-[#8c9097] dark:text-white/50 px-[0.5rem] overflow-visible rtl:rotate-180" />
                                    </a>
                                </li>
                                <li className="text-[0.813rem] text-defaulttextcolor font-semibold hover:text-primary dark:text-[#8c9097] dark:text-white/50 " aria-current="page">
                                    Inputs
                                </li>
                            </ol>
                        </div>
                        {/* Page Header Close */}


                        {/* Start:: row-1 */}
                        <div className="grid grid-cols-12 gap-6 text-defaultsize">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header justify-between">
                                        <div className="box-title">
                                            Input Types
                                        </div>
                                        <div className="prism-toggle">
                                            <button type="button" className="ti-btn !py-1 !px-2 ti-btn-primary !text-[0.75rem] !font-medium">Show Code<i className="ri-code-line ms-2 inline-block align-middle" /></button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="grid grid-cols-12 sm:gap-6">
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <p className="mb-2 text-muted">Basic Input:</p>
                                                <input type="text" className="form-control" id="input" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-label" className="form-label">Form Input With Label</label>
                                                <input type="text" className="form-control" id="input-label" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-placeholder" className="form-label">Form Input With Placeholder</label>
                                                <input type="text" className="form-control" id="input-placeholder" placeholder="Placeholder" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-text" className="form-label">Type Text</label>
                                                <input type="text" className="form-control" id="input-text" placeholder="Text" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-number" className="form-label">Type Number</label>
                                                <input type="number" className="form-control" id="input-number" placeholder="Number" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-password" className="form-label">Type Password</label>
                                                <input type="password" className="form-control" id="input-password" placeholder="Password" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-email" className="form-label">Type Email</label>
                                                <input type="email" className="form-control" id="input-email" placeholder="Email@xyz.com" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-tel" className="form-label">Type Tel</label>
                                                <input type="tel" className="form-control" id="input-tel" placeholder="+1100-2031-1233" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-date" className="form-label">Type Date</label>
                                                <input type="date" className="form-control" id="input-date" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-week" className="form-label">Type Week</label>
                                                <input type="week" className="form-control" id="input-week" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-month" className="form-label">Type Month</label>
                                                <input type="month" className="form-control" id="input-month" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-time" className="form-label">Type Time</label>
                                                <input type="time" className="form-control" id="input-time" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-datetime-local" className="form-label">Type datetime-local</label>
                                                <input type="datetime-local" className="form-control" id="input-datetime-local" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-search" className="form-label">Type Search</label>
                                                <input type="search" className="form-control" id="input-search" placeholder="Search" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-submit" className="form-label">Type Submit</label>
                                                <input type="submit" className="form-control ti-btn" id="input-submit" defaultValue="Submit" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-reset" className="form-label">Type Reset</label>
                                                <input type="reset" className="form-control ti-btn" id="input-reset" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-button" className="form-label">Type Button</label>
                                                <input type="button" className="form-control ti-btn !text-white !bg-primary" id="input-button" defaultValue="Button" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <div className="grid grid-cols-12 gap-6">
                                                    <div className="xl:col-span-3 col-span-12 flex flex-col ">
                                                        <label className="form-label">Type Color</label>
                                                        <input className="form-control form-input-color !rounded-md" type="color" defaultValue="#136bd0" />
                                                    </div>
                                                    <div className="xl:col-span-5 col-span-12">
                                                        <div className="form-check">
                                                            <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                                                            <input className="form-check-input ms-2" type="checkbox" defaultValue defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <div className="form-check">
                                                            <p className="mb-4 px-0 text-muted">Type Radio</p>
                                                            <input className="form-check-input ms-2" type="radio" defaultChecked />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <div>
                                                    <label htmlFor="file-input" className="sr-only">Type file</label>
                                                    <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10
                                           file:border-0
                                          file:bg-gray-200 file:me-4
                                          file:py-3 file:px-4
                                          dark:file:bg-black/20 dark:file:text-white/50" />
                                                </div>
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label className="form-label">Type Url</label>
                                                <input className="form-control" type="url" name="website" placeholder="http://example.com" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-disabled" className="form-label">Type Disabled</label>
                                                <input type="text" id="input-disabled" className="form-control" placeholder="Disabled input" disabled />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-readonlytext" className="form-label">Input Readonly Text</label>
                                                <input type="text" readOnly className="form-control-plaintext" id="input-readonlytext" defaultValue="email@example.com" />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="disabled-readonlytext" className="form-label">Disabled Readonly Input</label>
                                                <input className="form-control" type="text" defaultValue="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readOnly />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label className="form-label">Type Readonly Input</label>
                                                <input className="form-control" type="text" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="text-area" className="form-label">Textarea</label>
                                                <textarea className="form-control" id="text-area" rows={1} defaultValue={""} />
                                            </div>
                                            <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                                <label htmlFor="input-DataList" className="form-label">Datalist example</label>
                                                <input className="form-control" type="text" list="datalistOptions" id="input-DataList" placeholder="Type to search..." />
                                                <datalist id="datalistOptions">
                                                    <option value="San Francisco">
                                                    </option>
                                                    <option value="New York">
                                                    </option>
                                                    <option value="Seattle">
                                                    </option>
                                                    <option value="Los Angeles">
                                                    </option>
                                                    <option value="Chicago">
                                                    </option>
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-footer hidden border-t-0">
                                        {/* Prism Code */}
                                        <pre className="language-html">
                                            <code className="language-html">
                                                <div>
                                                    &lt;div class="grid grid-cols-12 sm:gap-6"&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;p class="mb-2 text-muted"&gt;Basic Input:&lt;/p&gt;
                                                    &lt;input type="text" class="form-control" id="input"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-label" class="form-label"&gt;Form Input With Label&lt;/label&gt;
                                                    &lt;input type="text" class="form-control" id="input-label"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-placeholder" class="form-label"&gt;Form Input With Placeholder&lt;/label&gt;
                                                    &lt;input type="text" class="form-control" id="input-placeholder" placeholder="Placeholder"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-text" class="form-label"&gt;Type Text&lt;/label&gt;
                                                    &lt;input type="text" class="form-control" id="input-text" placeholder="Text"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-number" class="form-label"&gt;Type Number&lt;/label&gt;
                                                    &lt;input type="number" class="form-control" id="input-number" placeholder="Number"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-password" class="form-label"&gt;Type Password&lt;/label&gt;
                                                    &lt;input type="password" class="form-control" id="input-password" placeholder="Password"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-email" class="form-label"&gt;Type Email&lt;/label&gt;
                                                    &lt;input type="email" class="form-control" id="input-email" placeholder="Email@xyz.com"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-tel" class="form-label"&gt;Type Tel&lt;/label&gt;
                                                    &lt;input type="tel" class="form-control" id="input-tel" placeholder="+1100-2031-1233"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-date" class="form-label"&gt;Type Date&lt;/label&gt;
                                                    &lt;input type="date" class="form-control" id="input-date"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-week" class="form-label"&gt;Type Week&lt;/label&gt;
                                                    &lt;input type="week" class="form-control" id="input-week"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-month" class="form-label"&gt;Type Month&lt;/label&gt;
                                                    &lt;input type="month" class="form-control" id="input-month"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-time" class="form-label"&gt;Type Time&lt;/label&gt;
                                                    &lt;input type="time" class="form-control" id="input-time"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-datetime-local" class="form-label"&gt;Type datetime-local&lt;/label&gt;
                                                    &lt;input type="datetime-local" class="form-control" id="input-datetime-local"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-search" class="form-label"&gt;Type Search&lt;/label&gt;
                                                    &lt;input type="search" class="form-control" id="input-search" placeholder="Search"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-submit" class="form-label"&gt;Type Submit&lt;/label&gt;
                                                    &lt;input type="submit" class="form-control ti-btn" id="input-submit" value="Submit"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-reset" class="form-label"&gt;Type Reset&lt;/label&gt;
                                                    &lt;input type="reset" class="form-control ti-btn" id="input-reset"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-button" class="form-label"&gt;Type Button&lt;/label&gt;
                                                    &lt;input type="button" class="form-control ti-btn !text-white !bg-primary" id="input-button"  value="Button"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;div class="grid grid-cols-12 gap-6"&gt;
                                                    &lt;div class="xl:col-span-3 col-span-12 flex flex-col "&gt;
                                                    &lt;label class="form-label"&gt;Type Color&lt;/label&gt;
                                                    &lt;input class="form-control form-input-color !rounded-md" type="color" value="#136bd0"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-5 col-span-12"&gt;
                                                    &lt;div class="form-check"&gt;
                                                    &lt;p class="mb-3 px-0 text-muted"&gt;Type Checkbox&lt;/p&gt;
                                                    &lt;input class="form-check-input ms-2" type="checkbox" value="" checked&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 col-span-12"&gt;
                                                    &lt;div class="form-check"&gt;
                                                    &lt;p class="mb-4 px-0 text-muted"&gt;Type Radio&lt;/p&gt;
                                                    &lt;input class="form-check-input ms-2" type="radio" checked&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;div&gt;
                                                    &lt;label for="file-input" class="sr-only"&gt;Type file&lt;/label&gt;
                                                    &lt;input type="file" name="file-input" id="file-input" class="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10
                                                    file:bg-transparent file:border-0
                                                    file:bg-gray-200 file:me-4
                                                    file:py-3 file:px-4
                                                    dark:file:bg-black/20 dark:file:text-white/50"&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label class="form-label"&gt;Type Url&lt;/label&gt;
                                                    &lt;input class="form-control" type="url"  name="website" placeholder="http://example.com"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-disabled" class="form-label"&gt;Type Disabled&lt;/label&gt;
                                                    &lt;input type="text" id="input-disabled" class="form-control" placeholder="Disabled input" disabled&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-readonlytext" class="form-label"&gt;Input Readonly Text&lt;/label&gt;
                                                    &lt;input type="text" readonly class="form-control-plaintext" id="input-readonlytext" value="email@example.com"&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="disabled-readonlytext" class="form-label"&gt;Disabled Readonly Input&lt;/label&gt;
                                                    &lt;input class="form-control" type="text" value="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readonly&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label class="form-label"&gt;Type Readonly Input&lt;/label&gt;
                                                    &lt;input class="form-control" type="text" value="Readonly input here..." aria-label="readonly input example" readonly&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="text-area" class="form-label"&gt;Textarea&lt;/label&gt;
                                                    &lt;textarea class="form-control" id="text-area" rows="1"&gt;&lt;/textarea&gt;
                                                    &lt;/div&gt;
                                                    &lt;div class="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12"&gt;
                                                    &lt;label for="input-DataList" class="form-label"&gt;Datalist example&lt;/label&gt;
                                                    &lt;input class="form-control" type="text" list="datalistOptions" id="input-DataList" placeholder="Type to search..."&gt;
                                                    &lt;datalist id="datalistOptions"&gt;
                                                    &lt;option value="San Francisco"&gt;
                                                    &lt;/option&gt;
                                                    &lt;option value="New York"&gt;
                                                    &lt;/option&gt;
                                                    &lt;option value="Seattle"&gt;
                                                    &lt;/option&gt;
                                                    &lt;option value="Los Angeles"&gt;
                                                    &lt;/option&gt;
                                                    &lt;option value="Chicago"&gt;
                                                    &lt;/option&gt;
                                                    &lt;/datalist&gt;
                                                    &lt;/div&gt;
                                                    &lt;/div&gt;
                                                </div>
                                            </code>
                                        </pre>
                                        {/* Prism Code */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End:: row-1 */}




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

                {/* Back To Top*/}
                < div className="scrollToTop" >
                    <span className="arrow"><i className="ri-arrow-up-s-fill text-xl" /></span>
                </div >


                <div id="responsive-overlay"></div>

            </div >
        </div>
    )
}

export default TestStudInput