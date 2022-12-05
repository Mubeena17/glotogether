/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor } from "@testing-library/react";
import Otherprofile from "./otherprofile";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// res.json({
//     status: true,
//     response: response,
//     isAccepted: response.accepted,
//     amIsender: req.session.user_id === response.sender_id ? true : false,
// });

test("renders send request button when response false (friendshipState) ", async () => {
    //given
    fetch.mockResponses(
        [
            JSON.stringify({
                self: false,
                user: {
                    id: 3,
                    firstname: "",
                    lastname: "",
                    profileurl: "",
                },
            }),
            { status: 200 },
        ],
        [
            JSON.stringify({
                status: false,
                isAccepted: false,
                amIsender: false,
            }),
            { status: 200 },
        ]
    );

    let id = "3";
    //when
    const { container, getByText, queryByText } = render(
        <MemoryRouter initialEntries={["/otherprofile/3"]}>
            <Routes>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </MemoryRouter>
    );

    //then
    await waitFor(() => {
        expect(getByText(/Send/)).toBeInTheDocument();
        expect(queryByText(/Accept/)).not.toBeInTheDocument();
        expect(queryByText(/Decline/)).not.toBeInTheDocument();
        expect(queryByText(/Cancel/)).not.toBeInTheDocument();
        expect(queryByText(/Unfriend/)).not.toBeInTheDocument();
    });
});

test("renders Cancel request button when status true and amIsender true ) ", async () => {
    //given
    fetch.mockResponses(
        [
            JSON.stringify({
                self: false,
                user: {
                    id: 3,
                    firstname: "",
                    lastname: "",
                    profileurl: "",
                },
            }),
            { status: 200 },
        ],
        [
            JSON.stringify({
                status: true,
                isAccepted: false,
                amIsender: true,
            }),
            { status: 200 },
        ]
    );

    let id = "3";
    //when
    const { container, getByText, queryByText } = render(
        <MemoryRouter initialEntries={["/otherprofile/3"]}>
            <Routes>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </MemoryRouter>
    );

    //then
    await waitFor(() => {
        expect(getByText(/Cancel/)).toBeInTheDocument();
        expect(queryByText(/Accept/)).not.toBeInTheDocument();
        expect(queryByText(/Decline/)).not.toBeInTheDocument();
        expect(queryByText(/Send/)).not.toBeInTheDocument();
        expect(queryByText(/Unfriend/)).not.toBeInTheDocument();
    });
});

test("renders unfriend request button when status true and isAccepted true ) ", async () => {
    //given
    fetch.mockResponses(
        [
            JSON.stringify({
                self: false,
                user: {
                    id: 3,
                    firstname: "",
                    lastname: "",
                    profileurl: "",
                },
            }),
            { status: 200 },
        ],
        [
            JSON.stringify({
                status: true,
                isAccepted: true,
                amIsender: true,
            }),
            { status: 200 },
        ]
    );

    let id = "3";
    //when
    const { container, getByText, queryByText } = render(
        <MemoryRouter initialEntries={["/otherprofile/3"]}>
            <Routes>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </MemoryRouter>
    );

    //then
    await waitFor(() => {
        expect(getByText(/Unfriend/)).toBeInTheDocument();
        expect(queryByText(/Accept/)).not.toBeInTheDocument();
        expect(queryByText(/Decline/)).not.toBeInTheDocument();
        expect(queryByText(/Send/)).not.toBeInTheDocument();
        expect(queryByText(/Cancel/)).not.toBeInTheDocument();
    });
});

test("renders Cancel request button when status true and amIsender true ) ", async () => {
    //given
    fetch.mockResponses(
        [
            JSON.stringify({
                self: false,
                user: {
                    id: 3,
                    firstname: "",
                    lastname: "",
                    profileurl: "",
                },
            }),
            { status: 200 },
        ],
        [
            JSON.stringify({
                status: true,
                isAccepted: false,
                amIsender: true,
            }),
            { status: 200 },
        ]
    );

    let id = "3";
    //when
    const { container, getByText, queryByText } = render(
        <MemoryRouter initialEntries={["/otherprofile/3"]}>
            <Routes>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </MemoryRouter>
    );

    //then
    await waitFor(() => {
        expect(getByText(/Cancel/)).toBeInTheDocument();
        expect(queryByText(/Accept/)).not.toBeInTheDocument();
        expect(queryByText(/Decline/)).not.toBeInTheDocument();
        expect(queryByText(/Send/)).not.toBeInTheDocument();
        expect(queryByText(/Unfriend/)).not.toBeInTheDocument();
    });
});

test("renders Accept / decline request button when status true and amIsender false ) ", async () => {
    //given
    fetch.mockResponses(
        [
            JSON.stringify({
                self: false,
                user: {
                    id: 3,
                    firstname: "",
                    lastname: "",
                    profileurl: "",
                },
            }),
            { status: 200 },
        ],
        [
            JSON.stringify({
                status: true,
                isAccepted: false,
                amIsender: false,
            }),
            { status: 200 },
        ]
    );

    let id = "3";
    //when
    const { container, getByText, queryByText } = render(
        <MemoryRouter initialEntries={["/otherprofile/3"]}>
            <Routes>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </MemoryRouter>
    );

    //then
    await waitFor(() => {
        expect(getByText(/Accept/)).toBeInTheDocument();
        expect(queryByText(/Decline/)).toBeInTheDocument();
        expect(queryByText(/Send/)).not.toBeInTheDocument();
        expect(queryByText(/Unfriend/)).not.toBeInTheDocument();
        expect(queryByText(/Cancel/)).not.toBeInTheDocument();
    });
});
