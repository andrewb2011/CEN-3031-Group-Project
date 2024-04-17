import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import { useEffect, useState } from "react";
import { useSessionContext } from "../../../contexts/SessionContext";
import { usePostsContext } from "../../donation/contexts/PostsContext";
import { getUserByUsername } from "../../authentication/services/userInfoService";
import MessagesList from "./MessagesList";
import {
  getTextMessagesByPostId,
  subscribeToMessageInsertsByThreadId,
} from "../services/MessageService";
import Spinner from "../../../components/ui/Spinner";

function MessagesView() {
  const navigate = useNavigate();
  const { id } = useParams(); //This is the post-id of the selected post. Use this to get the thread from supabase
  const {
    session: { user },
  } = useSessionContext();
  const { selectedPost, fetchPost, isLoadingSinglePost, onClosePost } =
    usePostsContext();
  const [otherPersonUsername, setOtherPersonUsername] = useState("");
  const [otherPersonOrgName, setOtherPersonOrgName] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingOtherPersonData, setIsLoadingOtherPersonData] =
    useState(true);
  const [messagesList, setMessagesList] = useState([]);
  const [threadId, setThreadId] = useState("");
  let formattedMessageList;

  if (messagesList.length > 0) {
    formattedMessageList = messagesList.map((message) => {
      let msg = { ...message };
      const sentDate = new Date(message.sent_at);
      msg.date = sentDate.toLocaleDateString("en-US");
      msg.time = sentDate
        .toTimeString()
        .slice(0, sentDate.toTimeString().indexOf(" "));
      msg.key = "" + msg.thread_id + msg.date + msg.time;
      return msg;
    });
  }

  //If user is reloading or loading from this page, selectedPost will be null so fetch this data
  useEffect(function () {
    if (selectedPost === null) {
      fetchPost(id);
    }
  }, []);

  //Get the organization name for the other person (not the person who is currently active)
  useEffect(
    function () {
      async function fetchUserData() {
        //Need selectedPost to execute the rest of the logic
        if (selectedPost === null) return;

        try {
          //if current user.user_name equals claimed_by, then get the organization name from the selectedPost.profiles
          if (user.user_metadata.user_name === selectedPost.claimed_by) {
            setOtherPersonUsername(selectedPost.posted_by);
            setOtherPersonOrgName(selectedPost.profiles.organization_name);
          } else {
            //else current user.user_name equals posted_by, then fetch the organization name for the claimed_by user
            //need to run query to get the recipient's organization name
            setIsLoadingOtherPersonData(true);
            const { organization_name } = await getUserByUsername(
              selectedPost.claimed_by
            );
            setOtherPersonUsername(selectedPost.claimed_by);
            setOtherPersonOrgName(organization_name);
          }
        } catch (error) {
          alert(error);
          console.error(error);
        } finally {
          setIsLoadingOtherPersonData(false);
        }
      }
      fetchUserData();
    },
    [selectedPost, user]
  );

  useEffect(
    function () {
      //Fetch all the text messages that are associated with the thread_id of the current selectedPost
      async function getTextMessages() {
        try {
          setIsLoadingMessages(true);
          const data = await getTextMessagesByPostId(id);
          setThreadId(data.threadID);
          setMessagesList(data.textMessages);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingMessages(false);
        }
      }

      getTextMessages();
    },
    [id]
  );

  //subscribe to insert events related to the thread
  useEffect(
    function () {
      let messageSubscription;
      function messageEventHandler(event) {
        console.log(event);
        setMessagesList((list) => [...list, event.new]);
      }

      if (threadId.length > 0) {
        messageSubscription = subscribeToMessageInsertsByThreadId(
          threadId,
          messageEventHandler
        );
      }
      return () => messageSubscription?.unsubscribe();
    },

    [threadId]
  );

  if (isLoadingMessages || isLoadingOtherPersonData || isLoadingSinglePost)
    return <Spinner />;

  return (
    <Modal
      onClose={() => {
        navigate("/past-donations");
        onClosePost();
      }}
      onClickBackButton={() => navigate(`/past-donations/${id}`)}
    >
      <h2 className="ml-4">{otherPersonUsername}</h2>
      <h3 className="ml-6">{otherPersonOrgName}</h3>
      <div className="p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange max-h-[300px] overflow-y-auto">
        {messagesList.length === 0 ? (
          <p>Start the conversation by sending a message 😊</p>
        ) : (
          <MessagesList messages={formattedMessageList} />
        )}
      </div>
      <div>
        <textarea
          type="text"
          placeholder="Enter message here"
          className="w-full p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange"
        ></textarea>
      </div>
    </Modal>
  );
}

export default MessagesView;
