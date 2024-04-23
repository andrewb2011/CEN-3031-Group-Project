import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { beforeAll, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import PastDonations from "../pages/PastDonations";
import PastDetailedCardView from "../features/donation/components/PastDetailedCardView";
import * as Auth from '../features/authentication/hooks/useAuth';
import * as Session from '../contexts/SessionContext';
import * as PostContext from "../features/donation/contexts/PostsContext";
import * as PostService from "../features/donation/services/donationPostService";
import * as Messages from "../features/messages/services/MessageService";
import * as UserInfo from "../features/authentication/services/userInfoService"
import MessagesView from "../features/messages/components/MessagesView";
import { sendMessage } from '../features/messages/services/MessageService';
import { SupabaseClient } from '@supabase/supabase-js';
import { act } from 'react-dom/test-utils';


// Basically the feed with some changes plus the messages interface

beforeAll(() => {
    vi.doMock(SupabaseClient);
    
    const spySessionContext = vi.spyOn(Session, "useSessionContext");
    const spyPostContext = vi.spyOn(PostContext, "usePostsContext");
    const spyPostFetchById = vi.spyOn(PostService, "fetchPostById")
    const spyMessagesService = vi.spyOn(Messages, "getTextMessagesByPostId")
    
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
                    posted_by: "user1",
                    claimed_by:  "user3",
                    title: "Subway Donations @ Charles Blvd",
                    description: "The Subway store at Charles Blvd is donating different food items.",
                    claimed_at:  "2024-04-18 15:27:52.224096+00",
                },
                {
                    post_id: "3",
                    created_at: "2024-04-18 15:27:52.224096+00",
                    posted_by: "user1",
                    claimed_by: "user3",
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

    spyMessagesService.mockImplementation((id) => {
        return {
            threadID: `${id}`,
            textMessages: [
                {
                    thread_id: "1",
                    sent_at: "2024-04-17 19:57:29.425+00",
                    sender: "user1",
                    message: "Hey it's Subway. Eat Fresh."
                },
                {
                    thread_id: "1",
                    sent_at: "2024-04-18 19:57:29.425+00",
                    sender: "user2",
                    message: "Oh, hi Subway!"
                }
            ]
        }
    });
});

afterEach(() => {
    window.history.pushState(null, document.title, '/');
});

// ============= Donor Perspective =============

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
        render(<BrowserRouter><PastDonations /></BrowserRouter>);
    
        // Post 1
        expect(screen.queryByText("Wawa Donations @ Lake Mary")).not.toBeNull();
        expect(screen.queryByText("The Wawa store at Lake Mary is donating different food items.")).not.toBeNull();
    
        // Post 2
        expect(screen.queryByText("Subway Donations @ Charles Blvd")).not.toBeNull();
        expect(screen.queryByText("The Subway store at Charles Blvd is donating different food items.")).not.toBeNull();
    
        // Post 3
        expect(screen.queryByText("Walmart Donations @ Monroe District")).not.toBeNull();
        expect(screen.queryByText("The Walmart store at Monroe District is donating different food items.")).not.toBeNull();
    });

    test("\"View More\" buttons open routes by their id", async () => {
        const { container } = render(<BrowserRouter><PastDonations /></BrowserRouter>);
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
    
// ======== DetailedCard/Messages Specific Tests ========

    test("\"View Messsages\" leads to thread route", async () =>{
        render(<BrowserRouter><PastDetailedCardView /></BrowserRouter>);

        await userEvent.click(screen.getByRole("link", {name: "View Messages"}));

        expect(window.location.pathname).toEqual("/messages");
    });

    test("\"X\" button leads to past-donations page (Detailed View)", async () =>{
        render(<BrowserRouter><PastDetailedCardView /></BrowserRouter>);

        await userEvent.click(screen.getByTestId("modalCloseTest"));

        expect(window.location.pathname).toEqual("/past-donations");
    });

    test("Thread messages are loaded", async () =>{
        render(<BrowserRouter><MessagesView /></BrowserRouter>);

        await waitFor(() => {
            expect(screen.getByText("Hey it's Subway. Eat Fresh.")).not.toBeNull();
            expect(screen.getByText("Oh, hi Subway!")).not.toBeNull();
        });
    });

    test("Empty message throws error", async () => {
        expect(async () => { await sendMessage(undefined, "1", "user1")}).rejects.toThrow("You must enter a message to send");
    });

    test("\"Send\" button calls to send a message", async () =>{
        render(<BrowserRouter><MessagesView /></BrowserRouter>);
        vi.spyOn(Messages, "sendMessage").mockImplementation(() => {return});

        await waitFor(async () => {
            await userEvent.click(screen.getByTestId("sendMessageTest"));
            expect(Messages.sendMessage).toHaveBeenCalled();
        });
    });

    test("\"X\" button leads to past-donations page (Messages View)", async () =>{
        render(<BrowserRouter><MessagesView /></BrowserRouter>);

        await waitFor(async () => {
            await userEvent.click(screen.getByTestId("modalCloseTest"));
            expect(window.location.pathname).toEqual("/past-donations");
        });
    });
});