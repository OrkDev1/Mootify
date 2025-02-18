import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import * as OneSignal from 'https://cdn.skypack.dev/@onesignal/node-onesignal'

const _OnesignalAppId_ = Deno.env.get('ONESIGNAL_APP_ID')!
const _OnesignalUserAuthKey_ = Deno.env.get('USER_AUTH_KEY')!
const _OnesignalRestApiKey_ = Deno.env.get('ONESIGNAL_REST_API_KEY')!
const configuration = OneSignal.createConfiguration({
  userKey: _OnesignalUserAuthKey_,
  appKey: _OnesignalRestApiKey_,
})

const onesignal = new OneSignal.DefaultApi(configuration)

serve(async (req) => {
  try {
    const { record } = await req.json()
    console.log(record.onesignal_id);
    
    // Build OneSignal notification object
    const notification = new OneSignal.Notification()
    notification.app_id = _OnesignalAppId_
    notification.include_external_user_ids = [record.onesignal_id]
    notification.contents = {
      en: `Received Mood: $${record.mood}!`,
    }
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        Authorization: `Basic ${_OnesignalRestApiKey_}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: _OnesignalAppId_,
        headings: { en: "Mood Update" },
        contents: { en: "You got a new mood update 😏😎" },
        data: {mood:record.mood,message:record.message},
        include_subscription_ids:[record.onesignal_id]
      }),
    });

    const result = await response.json();
    console.log(result);

    return new Response(
      JSON.stringify({ onesignalResponse: result }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.error('Failed to create OneSignal notification', err)
    return new Response('Server error.', {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
