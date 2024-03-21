import React, { useState } from 'react'

const menuItems = [
    { name: 'Home', path: '#', icon: 'bx bx-home side-menu__icon' },

    {
        name: 'Session',
        path: '#', icon: 'bx bxs-book-alt side-menu__icon',
        subItems: [{ name: 'Upcoming Sessions', path: '#' }, { name: 'Session Details', path: '#' }]
    },

    { name: 'Task', path: '#', icon: 'bx bx-task side-menu__icon' },

    {
        name: 'Batch Officials',
        path: '#', icon: 'bx bx-group side-menu__icon',
        subItems: [{ name: 'Batch In-Charge', path: '#' }, { name: 'Community Managers', path: '#' }]
    },

    { name: 'College Details', path: '#', icon: 'bx bxs-school side-menu__icon' },

    { name: 'Notification', path: '#', icon: 'bx bxs-bell side-menu__icon' },
    
    { name: 'Materials', path: '#', icon: 'bx bx-file side-menu__icon' }

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
                        {/* <span className="category-name">Main</span> */}
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

                                    {item.subItems && (openSubmenu === index ? <i className="fe fe-chevron-down side-menu__angle" /> : <i className="fe fe-chevron-right side-menu__angle" />)}

                                    {/* <i className="fe fe-chevron-right side-menu__angle" /> */}
                                </a>
                                {/* <ul className="slide-menu child1"> */}
                                {item.subItems && (
                                    <div className={`pl-4 ${openSubmenu === index ? 'block' : 'hidden'}`}>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <div>
                                                {/* <i className="bx bx-home side-menu__icon" /> */}
                                                <br />

                                                <div className="side-menu__label">
                                                    <li className="text-white block py-1.5 px-5 rounded transition duration-200 hover:bg-white-700">
                                                        <i className="bx bxs-checkbox side-menu__icon" />
                                                        <a href={subItem.path} key={subIndex}>
                                                            {subItem.name}
                                                        </a>
                                                    </li>
                                                </div>

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