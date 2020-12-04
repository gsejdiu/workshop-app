import React from 'react';
import Logo from "../assets/logo.png"
import { NavLink } from "react-router-dom"
import '../App.css';
import { withStyles } from "@material-ui/styles"
import Chip from '@material-ui/core/Chip';


const styles = {
    nav_link: {
        color: "#666666",
        cursor: "pointer",
        textDecoration: "none"
    },
    activ_navlink:{
        color:'#111111'
    },
    root: {
        color: "inherit",
        cursor: "inherit"
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { classes} = this.props
        return (
            <div className="App">
                <header className="App-header">
                    <img src={Logo} alt="logo" />
                    <p>
                        Workshop project!
                    </p>
                </header>
                <NavLink className={classes.nav_link} activeClassName={classes.activ_navlink} to="/mode">
                    <Chip classes={{root:classes.root}} label="Mode" variant="outlined" />
                </NavLink>
                <NavLink className={classes.nav_link} activeClassName={classes.activ_navlink} to="/news">
                    <Chip classes={{root:classes.root}} label="News" variant="outlined" />
                </NavLink>
                <NavLink className={classes.nav_link} activeClassName={classes.activ_navlink} to="/liebe">
                    <Chip classes={{root:classes.root}} label="Liebe" variant="outlined" />
                </NavLink>
            </div>
        )
    }
}

export default withStyles(styles)(Header)