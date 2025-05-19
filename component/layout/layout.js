import React from 'react';
import Nav from './navbar/navbar.js'
import Sidebar from '../Sidebar/sidebar/Sidebar.js';
import Styles from './layout.module.css'

const Layout = ({children, formName}) => {
  return (
    <div className={Styles.layoutContainer}>
        <Sidebar />
        <div className={Styles.mainContent}>
          <header className={Styles.navbar}>
              <Nav formName={formName}/>
          </header>
          <main className={Styles.main}>{children}</main>
          <footer className={Styles.footer}>
          </footer>
        </div>
    </div>    
  )
}

export default Layout