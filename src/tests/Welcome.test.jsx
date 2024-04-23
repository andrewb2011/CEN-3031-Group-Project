import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import Welcome from "../pages/Welcome";
import { SupabaseClient } from '@supabase/supabase-js';

beforeAll(() => {
    vi.doMock(SupabaseClient);
}
);

test("\"Get Started\" button navigates to Login", async () =>{
    render(<BrowserRouter><Welcome /></BrowserRouter>);

    await userEvent.click(screen.getByRole("button", {name: "Get Started"}));

    expect(window.location.pathname).toEqual("/login");
})