import React from 'react'
import {Link} from 'react-router'

class NavLink extends React.Component{
    constructor(props) {
        super();
    }
    render(){
        return <Link {...this.props} activeClassName='active'></Link>
    }
}

export default NavLink

