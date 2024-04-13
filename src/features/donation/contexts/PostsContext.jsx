import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPostById,
  getAllPosts,
  retrieveClaimedDonations,
} from "../services/donationPostService";

//1. create context
const DetailedCardContext = createContext();

export function PostsProvider({ children }) {
  const [postsList, setPostsList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingSinglePost, setIsLoadingSinglePost] = useState(true);

  function onClosePost() {
    setSelectedPost(null);
  }

  async function fetchActiveDonations() {
    try {
      setIsLoadingPosts(true);
      setPostsList(await getAllPosts());
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function fetchPastDonations(user) {
    try {
      setIsLoadingPosts(true);
      setPostsList(await retrieveClaimedDonations(user));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function fetchPost(id) {
    try {
      setIsLoadingSinglePost(true);
      const post = await fetchPostById(id);
      setSelectedPost(post);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingSinglePost(false);
    }
  }

  function insertPost(post) {
    setPostsList((state) => [...state, post]);
  }

  function deletePost(id) {
    setPostsList((state) =>
      state.filter((post) => {
        if (post.post_id !== id) return post;
      })
    );
  }

  return (
    //2. Provide context to children
    <DetailedCardContext.Provider
      value={{
        postsList,
        selectedPost,
        isLoadingPosts,
        fetchActiveDonations,
        fetchPastDonations,
        fetchPost,
        isLoadingSinglePost,
        onClosePost,
        insertPost,
        deletePost,
      }}
    >
      {children}
    </DetailedCardContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(DetailedCardContext);
  if (!context)
    throw new Error("Attempted to use PostsContext outside of served area");
  return context;
}
