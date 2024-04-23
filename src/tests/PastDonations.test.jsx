import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { beforeAll, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
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

// Basically involves the feed with some changes plus the messages interface
// Since the feed loads posts the same way as this page, we do not use test it agaib

beforeAll(() => {
    vi.doMock(SupabaseClient);
    
    // Spy on all functions that are used in the PastDonations page
    const spySessionContext = vi.spyOn(Session, "useSessionContext");
    const spyPostContext = vi.spyOn(PostContext, "usePostsContext");
    const spyPostFetchById = vi.spyOn(PostService, "fetchPostById")
    const spyMessagesService = vi.spyOn(Messages, "getTextMessagesByPostId")
    
    vi.spyOn(UserInfo, "getUserByUsername").mockImplementation((username) => {return "User2Org"})

    // The session mocked is the first entry in the useAuth array returned
    spySessionContext.mockImplementation(() => { return Auth.useAuth()[0] });
    // We only care about the profiles section for the PostContext
    spyPostContext.mockImplementation(() => { 
        return { 
            selectedPost: {
                profiles: {
                    organization_name: "ExampleOrganization"
                }
            },
            onClosePost: () => { return },
        };
    });

    spyPostFetchById.mockImplementation(() => {
         return {};
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
