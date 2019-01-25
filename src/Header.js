import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './Header.css';

const Header = () => (
    <nav className="navbar navbar-default">
        <div className="container">
            <div className="navbar-header">
                <Link to="/"></Link>
            </div>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-right">
                <li>
                    <Link to="/about" className="Regular">關於政龍</Link>
                </li>
                <li>
                    <Link to="/product" className="Regular">產品介紹</Link>
                </li>
                <li>
                    <Link to="/success" className="Regular">成功案例</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;