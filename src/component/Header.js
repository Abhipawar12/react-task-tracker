import React from "react";
import PropTypes from 'prop-types'
import { Button } from "./Button";
import { useLocation } from "react-router-dom";
const Header = ({ title, onAdd, showAdd }) => {
 const location = useLocation();
 return (
 <header className='header'>
 <h1>{title}</h1>
 {location.pathname === '/' && (
 <Button onClick={onAdd} color={showAdd ? 'blue' : 'green'} text={showAdd ? 'Close' : 'Add'} />
 )}
 </header>
 )
}
const headingStyle = {
 color: 'darkcyan',
 backgroundColor: 'lightblue',
 textAlign: 'center'
}
Header.defaultProps = {
 title: 'Abhishek',
}
Header.propTypes = {
 title: PropTypes.string.isRequired,
}
export default Header;