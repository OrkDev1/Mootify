import { createClient } from "@supabase/supabase-js";
import OneSignal from "onesignal-cordova-plugin";
//Password K8tBfODKlSqOUyKj
//Token sbp_e17f25c79ed1ad01db8ac0f51b06ea46d6fb3b83
export const CreateDatabaseClient = () => {
  return createClient(
    "https://duanqznzrlesngohyrci.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1YW5xem56cmxlc25nb2h5cmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM1OTQsImV4cCI6MjA1MzgyOTU5NH0.2kaAvDYminYseGP9lIxuN11wwWRcbgpe3wMn1FEtwPM"
  );
};

export const refreshMood = async (client, userId) => {
  const { data, error } = await client.from("users").select("*").eq("id", userId).single();
  console.log(data);
  if (data.update == 1) {
    await client.from("users").update({ update: 0 }).eq("id", userId);
    return { status: true, mood: data.mood, message: data.message };
  } else {
    return { status: false };
  }
};

export const getUserFriends = async (client, userId) => {
  const { data, error } = await client.from("users").select("*").eq("id", userId).single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  const friendPromises = data.friends.map(async (friendId) => {
    const { data, error } = await client.from("users").select("*").eq("id", friendId).single();
    return error ? null : { username: data.username, id: data.id };
  });

  const friendList = await Promise.all(friendPromises);
  return friendList;
};

export const UpdateDatabseValue = async (client, id, mood, message) => {
  await client.from("users").upsert({ id: id, mood: mood, message: message, update: 1 }).select();
};

export const AddFriend = async (client, id, friend) => {
  const { data: friendExists, error: friendError } = await client.from("users").select("id").eq("id", friend);

  if (friendError || !friendExists) {
    return { status: "error", message: "Incorrect Mooty ID" };
  }

  const { data: user, error: userError } = await client.from("users").select("friends").eq("id", id);
  if (userError || !user) {
    return { status: "error", message: "User Not Found" };
  }

  const currentFriends = user[0].friends || [];
  if (currentFriends.includes(friend)) {
    return { status: "error", message: "Mooty Already Exists" };
  }
  console.log(friend);
  const updatedFriends = [...currentFriends, friend];
  console.log(updatedFriends);

  const { data, error } = await client.from("users").update({ friends: updatedFriends }).eq("id", id);
  if (error) {
    return { status: "error", message: "Error Adding Mooty" };
  } else {
    return { status: "success", message: "Mooty Added" };
  }
};

export const RegisterUser = async (client, email, password, username) => {
  var signalID = null;
  if (typeof window !== "undefined" && "OneSignal" in window) {
    signalID = await OneSignal.User.pushSubscription.getIdAsync();
  } else {
    signalID = "WEB";
  }
  const { data, error } = await client.auth.signUp({ email, password });
  const { data: userData, error: userError } = await client.from("users").update({ onesignal_id: signalID }).eq("id", data.user.id.slice(0, 8));
  if (error || userError) {
    return { status: "error", message: error.message };
  } else {
    console.log(data.user.id.slice(0, 8), username);
    const { data: userData, error: userError } = await client
      .from("users")
      .upsert({ id: data.user.id.slice(0, 8), username: username, mood: 0 })
      .select();
    console.log(userData, userError);
    return { status: "success", user: { id: data.user.id.slice(0, 8), username: username, email: email, mood: 0 } };
  }
};

export const LoginUser = async (client, email, password) => {
  var signalID = null;
  if (typeof window !== "undefined" && "OneSignal" in window) {
    signalID = await OneSignal.User.pushSubscription.getIdAsync();
  } else {
    signalID = "WEB";
  }
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  const { data: userData, error: userError } = await client.from("users").update({ onesignal_id: signalID }).eq("id", data.user.id.slice(0, 8));
  const { data: user, error: errorUser } = await client.from("users").select("username").eq("id", data.user.id.slice(0, 8)).single();
  if (error || userError) {
    return { status: "error", message: error.message };
  } else {
    return { status: "success", message: data, username: user.username };
  }
};
