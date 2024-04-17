import supabase from "../../../config/supabaseClient";

export async function getTextMessagesByPostId(id) {
  const { data, error } = await supabase
    .from("threads")
    .select("*, text_messages:thread_id (*)")
    .eq("post_id", id)
    .single();

  if (error) {
    throw new Error(error.details);
  }

  return { threadID: data.thread_id, textMessages: data.text_messages };
}

export function subscribeToMessageInsertsByThreadId(threadId, eventHandler) {
  const messageSubscription = supabase
    .channel("custom-message-insert-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "text_messages",
        filter: `thread_id=eq.${threadId}`,
      },
      eventHandler
    )
    .subscribe();

  return messageSubscription;
}

export async function onSubmitMessage(text, threadid, username) {
  const { error } = await supabase.from("text_messages").insert({
    thread_id: threadid,
    sent_at: new Date().toISOString(),
    sender: username,
    message: text,
  });

  if (error) throw new Error(error);
  else setTextMessage("");
}
