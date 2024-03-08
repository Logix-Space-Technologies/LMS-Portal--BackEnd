import React, { useState } from 'react'

const menuItems = [
    { name: 'Home', path: '#', icon: 'bx bx-home side-menu__icon' },

    {
        name: 'Dashboard',
        path: '#', icon: 'bx bx-file side-menu__icon',
        subItems: [{ name: 'Overview', path: '#' }, { name: 'Analytics', path: '#' }]
    },

    { name: 'Task', path: '#', icon: 'bx bx-task side-menu__icon' },
    { name: 'Batch-in-Charge', path: '#', icon: 'bx bx-group side-menu__icon' },

    {
        name: 'Students',
        path: '#', icon: 'bx bx-male-female side-menu__icon',
        subItems: [{ name: 'View All', path: '#' }, { name: 'Analytics', path: '#' }]
    },


    { name: 'Services', path: '#', icon: 'bx bx-file side-menu__icon' }

];

const TestNavbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSubmenu = (index) => {
        if (openSubmenu === index) {
            setOpenSubmenu(null);
        } else {
            setOpenSubmenu(index);
        }
    };

    return (

        <div>
            <nav className="main-menu-container nav nav-pills flex-column sub-open">
                <div className="slide-left" id="slide-left">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#7b8191"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                    </svg>
                </div>
                <ul className="main-menu">
                    {/* Start::slide__category */}
                    <li className="slide__category">
                        <span className="category-name">Main</span>
                    </li>
                    {/* End::slide__category */}
                    {/* Start::slide */}
                    <button className="p-4 lg:hidden" onClick={toggleSidebar}>
                        Menu
                    </button>

                    {menuItems.map((item, index) => (
                        <div key={index}>

                            <li className="slide has-sub">



                                <a onClick={() => toggleSubmenu(index)}
                                    className="side-menu__item ">
                                    <i className={item.icon} />
                                    <span className="side-menu__label">
                                        {item.name}

                                    </span>

                                    {item.subItems && <span className='w-full text-left py-2.5 px-4 '>{openSubmenu === index ? <i className="fe fe-chevron-down side-menu__angle" /> : <i className="fe fe-chevron-right side-menu__angle" />}</span>}

                                    {/* <i className="fe fe-chevron-right side-menu__angle" /> */}
                                </a>
                                {/* <ul className="slide-menu child1"> */}
                                {item.subItems && (
                                    <div className={`pl-4 ${openSubmenu === index ? 'block' : 'hidden'}`}>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <div>
                                                {/* <i className="bx bx-home side-menu__icon" /> */}
                                                <br />

                                                <span className="side-menu__label">

                                                    {/* {subItem.name}    */}
                                                    <a href={subItem.path} key={subIndex} className="text-white  block py-2.5 px-4 rounded transition duration-200 hover:bg-white-700">
                                                        {subItem.name}
                                                    </a>

                                                </span>
                                            </div>

                                            // <a href={subItem.path} key={subIndex} className="text-white  block py-2.5 px-4 rounded transition duration-200 hover:bg-white-700">
                                            //   {subItem.name}
                                            // </a>
                                        ))}
                                    </div>
                                )}

                                {/* {item.subItems && (
                <div className={`pl-4 ${openSubmenu === index ? 'block' : 'hidden'}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li className="slide side-menu__label1" >
  <a href={subItem.path} key={subIndex} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                      {subItem.name}
                    </a>                  </li>
                  
                  ))}
                </div>
              )} */}

                                {/* </ul> */}


                            </li>


                        </div>
                    ))}

                </ul>


            </nav>
        </div>

    )
}

export default TestNavbar