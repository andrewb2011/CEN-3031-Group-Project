import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter} from "react-router-dom";
import { beforeAll, describe, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Feed from "../pages/Feed";
import DonationPostForm from '../features/donation/components/DonationPostForm';
import ActiveDetailedCardView from "../features/donation/components/ActiveDetailedCardView";
import * as Auth from '../features/authentication/hooks/useAuth';
import * as Session from '../contexts/SessionContext';
import * as PostService from "../features/donation/services/donationPostService";
import * as PostContext from "../features/donation/contexts/PostsContext";
import * as UserInfo from "../features/authentication/services/userInfoService";
import { SupabaseClient } from '@supabase/supabase-js';

beforeAll(() => {
    vi.doMock(SupabaseClient);

    const spySessionContext = vi.spyOn(Session, "useSessionContext");
    const spyPostContext = vi.spyOn(PostContext, "usePostsContext");
    const spyPostFetchById = vi.spyOn(PostService, "fetchPostById")

    vi.spyOn(UserInfo, "getUserByUsername").mockImplementation((username) => {return "User2Org"})

    spySessionContext.mockImplementation(() => { return Auth.useAuth()[0] });
    spyPostContext.mockImplementation(() => { 
        return { 
            postsList: [
                {
                    post_id: "1",
                    created_at: "2024-04-17 18:25:55.951047+00",
                    posted_by: "user1",
                    claimed_by: "user2",
                    title: "Wawa Donations @ Lake Mary",
                    description: "The Wawa store at Lake Mary is donating different food items.",
                    claimed_at: "2024-04-18 15:27:52.224096+00",
                },
                {
                    post_id: "2",
                    created_at: "2024-04-17 18:43:23.755646+00",
                    posted_by: "user3",
                    claimed_by:  "user2",
                    title: "Subway Donations @ Charles Blvd",
                    description: "The Subway store at Charles Blvd is donating different food items.",
                    claimed_at:  "2024-04-18 15:27:52.224096+00",
                },
                {
                    post_id: "3",
                    created_at: "2024-04-18 15:27:52.224096+00",
                    posted_by: "user3",
                    claimed_by: "user2",
                    title: "Walmart Donations @ Monroe District",
                    description: "The Walmart store at Monroe District is donating different food items.",
                    claimed_at: "2024-04-18 15:27:52.224096+00",
                }
            ],
            selectedPost: {
                post_id: "1",
                created_at: "2024-04-17 18:25:55.951047+00",
                posted_by: "user1",
                claimed_by: null,
                title: "Wawa Donations @ Lake Mary",
                description: "The Wawa store at Lake Mary is donating different food items.",
                claimed_at: null,
                profiles: {
                    organization_name: "User1Org"
                }
            },
            isLoadingPosts: false,
            fetchActiveDonations: () => { return },
            fetchPastDonations: () => { return },
            fetchPost: () => { return },
            isLoadingSinglePost: false,
            onClosePost: () => { return },
            insertPost: () => { return },
            deletePost: () => { return }
        };
    });

    spyPostFetchById.mockImplementation(() => {
         return {
            post_id: "1",
            created_at: "2024-04-17 18:25:55.951047+00",
            posted_by: "user1",
            claimed_by: null,
            title: "Wawa Donations @ Lake Mary",
            description: "The Wawa store at Lake Mary is donating different food items.",
            claimed_at: null,
            profiles: {
                organization_name: "Example"
            }
        };
    });
});


afterEach(() => {
    window.history.pushState(null, document.title, '/');
})

describe("Donor Perspective Tests", () => {
    beforeAll(() => {
        const spyAuth = vi.spyOn(Auth, "useAuth");

        spyAuth.mockImplementation(() => {
            const mockCurrentSession = {
                session:
                {
                    user: {
                        user_metadata: {
                            id: '-1',
                            email: 'unitester@none.com',
                            role: 'donor',
                            user_name: "user1"
                        }
                    },
                    access_token: 'none',
                    expires_at: 1234567890,
                    refresh_token: 'none',
                    expires_in: 3600
                }
            };
            return [mockCurrentSession, true];
        });
    });

    test("All Donation Post information is rendered, async ()", async () => {
        render(<BrowserRouter><Feed /></BrowserRouter>)

        // Post 1
        expect(screen.queryByText("Wawa Donations @ Lake Mary")).not.toBeNull();
        expect(screen.queryByText("The Wawa store at Lake Mary is donating different food items.")).not.toBeNull();

        // Post 2
        expect(screen.queryByText("Subway Donations @ Charles Blvd")).not.toBeNull();
        expect(screen.queryByText("The Subway store at Charles Blvd is donating different food items.")).not.toBeNull();

        // Post 3
        expect(screen.queryByText("Walmart Donations @ Monroe District")).not.toBeNull();
        expect(screen.queryByText("The Walmart store at Monroe District is donating different food items.")).not.toBeNull();
    })

    test("\"View More\" buttons open routes by their id", async () => {
        const { container } = render(<BrowserRouter><Feed /></BrowserRouter>);
        const link1 = container.querySelector('[href="/1"]');
        const link2 = container.querySelector('[href="/2"]');
        const link3 = container.querySelector('[href="/3"]');

        await userEvent.click(link1);
        expect(window.location.pathname).toEqual("/1");
        await userEvent.click(container.querySelector('[data-icon="circle-xmark"]'));

        await userEvent.click(link2);
        expect(window.location.pathname).toEqual("/2");
        await userEvent.click(container.querySelector('[data-icon="circle-xmark"]'));

        await userEvent.click(link3);
        expect(window.location.pathname).toEqual("/3");
    });

    test("\"View My Posts\" renders only posts by the current user", async () => {
        render(<BrowserRouter><Feed /></BrowserRouter>);

        const checkBox = screen.getByRole("checkbox");
        
        await userEvent.click(checkBox);

        // Post 1 (By user1 - current)
        expect(screen.queryByText("Wawa Donations @ Lake Mary")).not.toBeNull();
        expect(screen.queryByText("The Wawa store at Lake Mary is donating different food items.")).not.toBeNull();

        // Post 2
        expect(screen.queryByText("Subway Donations @ Charles Blvd")).toBeNull();
        expect(screen.queryByText("The Subway store at Charles Blvd is donating different food items.")).toBeNull();

        // Post 3
        expect(screen.queryByText("Walmart Donations @ Monroe District")).toBeNull();
        expect(screen.queryByText("The Wawa store at Monroe District is donating different food items.")).toBeNull();
    });


    test("\"Make a Post\" leads to make-post route", async () =>{
        render(<BrowserRouter><Feed /></BrowserRouter>);

        await userEvent.click(screen.getByRole("link", {name: "Make a Post"}));

        expect(window.location.pathname).toEqual("/make-post");
    });

    // =================== DonationPostForm specific ===================

    test("Donation Post form submitted with valid input fields", async () => {
        const { container } = render(<BrowserRouter><DonationPostForm /></BrowserRouter>);
        const titleInput = container.querySelector('[placeholder="Enter title here"]');
        const descriptionInput = container.querySelector('[placeholder="Enter description here"]');

        vi.spyOn(window, "alert").mockImplementation(() => {return});

        await userEvent.type(titleInput, "This is a test @ Unit Test");
        await userEvent.type(descriptionInput, "Some description for the post.");
        await userEvent.click(screen.getByRole("button", {name: "Submit"}));

        expect(window.alert).not.toHaveBeenCalledWith("You must fill in both fields before submission.");
    });

    test("Donation Post Form submitted with empty input fields", async () => {
        render(<BrowserRouter><DonationPostForm /></BrowserRouter>);

        vi.spyOn(window, "alert").mockImplementation(() => {return});

        await userEvent.click(screen.getByRole("button", {name: "Submit"}));

        expect(window.alert).toHaveBeenCalledWith("You must fill in both fields before submission.");
    });

    test("\"X\" button closes donation posting form", async () =>{
        render(<BrowserRouter><DonationPostForm /></BrowserRouter>);
        
        await userEvent.click(screen.getByTestId("modalCloseTest"));

        expect(window.location.pathname).toEqual("/feed");
        
    });

    test("Claim button not rendered in the donor's perspective", async () =>{
        render(<BrowserRouter><ActiveDetailedCardView /></BrowserRouter>);
        await waitFor(async () => {
            expect(screen.queryByRole("button", {name: "Claim Donation"})).toBeNull();
        });
    });

    test("\"X\" button closes detailed post", async () =>{
        render(<BrowserRouter><ActiveDetailedCardView /></BrowserRouter>);
        await waitFor(async () => {
            await userEvent.click(screen.getByTestId("modalCloseTest"));
            expect(window.location.pathname).toEqual("/feed");
        });
    });
});

describe("Recipient Perspective Tests", () => {
    beforeAll(() => {
        const spyAuth = vi.spyOn(Auth, "useAuth");
        
        spyAuth.mockImplementation(() => {
            const mockCurrentSession = {
                session:
                {
                    user: {
                        user_metadata: {
                            id: '-1',
                            email: 'unitester@none.com',
                            role: 'recipient',
                            user_name: "user2"
                        }
                    },
                    access_token: 'none',
                    expires_at: 1234567890,
                    refresh_token: 'none',
                    expires_in: 3600
                }
            };
            return [mockCurrentSession, true];
        });
    });

    test("Claim button not rendered in the recipient's perspective", async () =>{
        render(<BrowserRouter><ActiveDetailedCardView /></BrowserRouter>);
        await waitFor(async () => {
            expect(screen.queryByRole("button", {name: "Claim Donation"})).not.toBeNull();
        });
    });

    test("\"X\" button closes detailed post", async () =>{
        render(<BrowserRouter><ActiveDetailedCardView /></BrowserRouter>);
        await waitFor(async () => {
            await userEvent.click(screen.getByTestId("modalCloseTest"));
            expect(window.location.pathname).toEqual("/feed");
        });
    });
});