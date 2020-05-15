import React from "react";
import { Button } from "antd";
import { removeToken } from "../utils/auth";
import { Link } from 'react-router-dom';
class Home extends React.Component {
    logout = () => {
        removeToken();
        return <Link to="/login"></Link>;
    }

    render() {
        return (
            <div>
                <h1> Home </h1>
                <Link to="/login">
                    <Button onClick={this.logout}>LogOut</Button>
                </Link>
            </div>
        );
    }
}

export default Home;