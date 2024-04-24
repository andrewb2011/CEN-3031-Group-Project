import {render, screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import * as AuthService from "../features/authentication/services/authService";
import { SupabaseClient } from '@supabase/supabase-js';

beforeAll(() => {
    vi.doMock(SupabaseClient);
}
);

test("Valid email and password (fake credentials)", async () =>{
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');

    await userEvent.type(emailInput, "fakeuser@fake.com");
    await userEvent.type(passwordInput, "fakepassword");

    expect(emailInput).toBeValid();
    expect(passwordInput).toBeValid();
});

test("signIn call with valid email and password (fake credentials)", async () =>{
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');
    const spy = vi.spyOn(AuthService, "signIn");

    await userEvent.type(emailInput, "fakeuser@fake.com");
    await userEvent.type(passwordInput, "fakepassword");
    await userEvent.click(screen.getByRole("button", {name: "Login"}));
    
    expect(spy).toHaveBeenCalled();
});

test("Email without @ sign", async () =>{
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');

    await userEvent.type(emailInput, "fakeuser");
    await userEvent.type(passwordInput, "fakepassword");

    expect(emailInput).toBeInvalid();
});

test("Empty email and password input fields", async () =>{
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>);
    const emailInput = container.querySelector('[type="email"]');
    const passwordInput = container.querySelector('[type="password"]');
    const spy = vi.spyOn(AuthService, "signIn");

    await userEvent.type(emailInput, " ");
    await userEvent.type(passwordInput, " ");
    await userEvent.click(screen.getByRole("button", {name : "Login"}));

    expect(spy).not.toHaveBeenCalled();
});

test("Hiding password input field via eye button", async() =>{
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>);

    await userEvent.click(screen.getByTestId("eyeTest"));

    expect(container.querySelector('[type="text"]')).not.toBeUndefined();
});

test("\"Create One\" hyperlink navigates to register", async () =>{
    render(<BrowserRouter><Login /></BrowserRouter>);

    await userEvent.click(screen.getByRole("link", {name: "Create one!"}));

    expect(window.location.pathname).toEqual("/register");
});