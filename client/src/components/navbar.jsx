import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";
import Logo from "./logo";
import { Auth } from "../utlis/auth";

export default function Appnavbar() {
    const handleLogout = () => {
        Auth.logout();
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/images/logo.png"
                        width="40"
                        height="40"
                        alt="logo"
                    />
                </Navbar.Brand>

                <Link to="/find">Find people</Link>
                <Link to="/friends">My Friends</Link>
                <Link to="/chat">Chats</Link>

                <Button variant="outline-secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Container>
        </Navbar>
    );
}
