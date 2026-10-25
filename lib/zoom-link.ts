/** Only turn an actual Zoom meeting URL in a case message into an external link. */
export function zoomMeetingUrlFromMessage(body: string): string | null {
  for (const token of body.match(/https:\/\/\S+/g) ?? []) {
    const candidate = token.replace(/[),.;!?]+$/, "");
    try {
      const url = new URL(candidate);
      if (url.protocol !== "https:" || url.username || url.password) continue;
      if (url.hostname !== "zoom.us" && !url.hostname.endsWith(".zoom.us")) continue;
      if (!/^\/(?:j\/\d{9,12}|my\/[a-z0-9._-]+)\/?$/i.test(url.pathname)) continue;
      const meetingId = url.pathname.match(/^\/j\/(\d{9,12})\/?$/i)?.[1];
      if (meetingId && /^0+$/.test(meetingId)) continue;
      return url.href;
    } catch { /* Ignore malformed text. */ }
  }
  return null;
}
