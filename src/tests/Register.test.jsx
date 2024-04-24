import {render, screen, fireEvent, getByRole} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Register from "../pages/Register";
import * as AuthService from "../features/authentication/services/authService";
import { SupabaseClient } from '@supabase/supabase-js';

beforeAll(() => {
    vi.doMock(SupabaseClient);
}
);

test("Empty input fields, no call to signUp", async () =>{
    render(<BrowserRouter><Register /></BrowserRouter>);

    const spy = vi.spyOn(AuthService, "signUp");

    await userEvent.click(screen.getByRole("button", {name: "Create"}));

    expect(spy).not.toBeCalled();
})

test("Hiding password input via eye button", async() =>{
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>);

    await userEvent.click(screen.getByTestId("eyeTest"));

    expect(container.querySelector('[type="text"]')).not.toBeUndefined();
})

test("Email without @ sign", async () =>{
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');
    const spy = vi.spyOn(AuthService, "signUp");

    await userEvent.type(emailInput, "fakeuser");
    await userEvent.type(passwordInput, "fakepassword");

    expect(emailInput).toBeInvalid();
    expect(spy).not.toBeCalled();
})

test("Valid email and password (fake credentials), no organization", async () =>{
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');
    const spy = vi.spyOn(AuthService, "signUp");

    await userEvent.type(emailInput, "fakeuser@fake.com");
    await userEvent.type(passwordInput, "fakepassword");
    await userEvent.click(screen.getByRole("button", {name: "Create"}));
    
    expect(spy).not.toBeCalled();
})

test("\"Sign in\" hyperlink navigates to Login", async () =>{
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>);
    const link = container.querySelector('[href="/login"]');

    await userEvent.click(link);

    expect(window.location.pathname).toEqual("/login");
})