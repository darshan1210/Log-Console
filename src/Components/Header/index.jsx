import React from 'react'
import SITE_image from '../../Assets/Images/SITE.png'
import Log_console_image from '../../Assets/Images/log_Console.png'
import { ChatIcon } from '../../Assets/SVGs'
import { NavDropdown } from 'react-bootstrap'

function Header() {
    return (
        <div className='header'>
            <div className='header-left'>
                <img onClick={() => window.location.reload()} className='SiteLogo' src={SITE_image} height={40} width={100} alt="SITE image" />
                <img className='ConsoleLogo' src={Log_console_image} height={60} width={150} alt="Log console image" />
            </div>
            <div className='header-right'>
                <span>
                    <ChatIcon />
                </span>
                <span className='H_line'></span>
                <span>
                    <NavDropdown
                        id="nav-dropdown-dark"
                        title="Anthesi Web"
                        menuVariant="light"
                    >
                        <NavDropdown.Item >Profile</NavDropdown.Item>
                        <NavDropdown.Item >
                            Action
                        </NavDropdown.Item>
                        <NavDropdown.Item >Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item >
                            Log out
                        </NavDropdown.Item>
                    </NavDropdown>
                </span>
            </div>
        </div>
    )
}

export default Header