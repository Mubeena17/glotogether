/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor } from "@testing-library/react";
import Bioeditor from "./bioeditor";
import "@testing-library/jest-dom";

test("renders Add button when there is no bio", () => {
    //given
    const bio = undefined;

    //when
    const { container, getByText } = render(<Bioeditor bio={bio} />);

    //then
    expect(getByText("Add your bio now")).toBeInTheDocument();
});

test("renders Edit button when there is bio", () => {
    //given
    const bio = "blogger, coder, something";

    //when
    const { container, getByText } = render(<Bioeditor bio={bio} />);

    //then
    expect(getByText("Edit")).toBeInTheDocument();
});

test("renders textarea and save button when edit button clicked", () => {
    //given
    const bio = "blogger, coder, something";

    //when
    const { container, getByText } = render(<Bioeditor bio={bio} />);
    fireEvent.click(getByText("Edit"));

    //then
    expect(container.querySelector("textarea")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
});

test("renders textarea and save button when add button clicked", () => {
    //given
    const bio = undefined;

    //when
    const { container, getByText } = render(<Bioeditor bio={bio} />);
    fireEvent.click(getByText(/Add/));

    //then
    expect(container.querySelector("textarea")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
});

test("Should make http request on clicking save button", async () => {
    fetch.mockResolvedValueOnce({
        status: 200,
        async json() {
            return {
                success: true,
                message: "bio updated",
            };
        },
    });

    //given
    const bio = undefined;
    const bioUpdated = jest.fn();
    const { container, getByText } = render(
        <Bioeditor bio={bio} bioUpdated={bioUpdated} />
    );
    fireEvent.click(getByText(/Add/));

    //when
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "Updated Bio" },
    });
    fireEvent.click(getByText("Save"));

    //then
    await waitFor(() => {
        expect(bioUpdated).toHaveBeenCalledWith("Updated Bio");
        expect(container.querySelector("textarea")).not.toBeInTheDocument();
    });
});
