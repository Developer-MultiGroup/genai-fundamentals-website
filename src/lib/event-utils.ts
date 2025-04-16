import events from "@/data/events";
import { Event } from "@/types";
import { slugify } from "./slugify";

export function getFormattedDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}

export function getLatestEvent(): Event {
  return events[0];
}

export function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date provided.");
  }

  const day = date.getDate();
  const year = date.getFullYear();
  // Using Turkish locale to get a long month name (e.g., "Mart")
  const month = date.toLocaleString("tr-TR", { month: "long" });

  return `${day} ${month} ${year}`;
}

/**
 * Finds the closest session to the current time in GMT+3 timezone
 * @param events Array of events containing sessions
 * @returns The closest session date and time in ISO format, or null if no sessions are found
 */
export function getClosestSession(event: Event): string {
  // Flatten all sessions from all events
  const allSessions = events.flatMap((event) =>
    event.sessions.map((session) => ({
      ...session,
      dateTime: combineDateTime(session.date, session.startTime),
    }))
  );

  // Get current time in GMT+3
  const now = getCurrentTimeInGMT3();

  // Filter sessions to only include future ones
  const futureSessions = allSessions.filter((session) => {
    const sessionTime = new Date(session.dateTime).getTime();
    return sessionTime > now.getTime();
  });

  // Find the session with the closest date to now (among future sessions)
  let closestSession = futureSessions[0];

  let closestDiff = new Date(closestSession.dateTime).getTime() - now.getTime();

  for (let i = 1; i < futureSessions.length; i++) {
    const session = futureSessions[i];
    const sessionTime = new Date(session.dateTime).getTime();
    const diff = sessionTime - now.getTime();

    if (diff < closestDiff) {
      closestDiff = diff;
      closestSession = session;
    }
  }

  return closestSession.dateTime;
}

/**
 * Combines date and time strings into an ISO format string with GMT+3 timezone
 * @param dateStr Date in YYYY-MM-DD format
 * @param timeStr Time in HH:MM format
 * @returns Combined date and time in ISO format with GMT+3 timezone
 */
function combineDateTime(dateStr: string, timeStr: string): string {
  if (!dateStr || dateStr.trim() === "") {
    return "";
  }
  // Parse the date and time
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Create a date object (in local timezone initially)
  const date = new Date(year, month - 1, day, hours, minutes);

  // Adjust to GMT+3
  // First get the raw ISO string
  let isoString = date.toISOString();

  // Replace the timezone part with +03:00 for GMT+3
  // The format will be: YYYY-MM-DDTHH:MM:SS.sssZ
  // We want: YYYY-MM-DDTHH:MM:SS.sss+03:00

  //isoString = isoString.replace("Z", "+03:00");

  return isoString;
}

/**
 * Gets the current time adjusted to GMT+3 timezone
 * @returns The current date and time in GMT+3
 */
function getCurrentTimeInGMT3(): Date {
  const now = new Date();

  // Get the local timezone offset in minutes
  const localOffset = now.getTimezoneOffset();

  // GMT+3 offset is -180 minutes (negative because getTimezoneOffset returns
  // the offset in the opposite direction)
  const gmt3Offset = -180;

  // Calculate the difference in minutes
  const diffMinutes = gmt3Offset - localOffset;

  // Adjust the time
  return new Date(now.getTime() + diffMinutes * 60 * 1000);
}

/**
 * Alternative implementation that returns the closest upcoming session
 * (only sessions in the future, not in the past)
 */
export function getClosestUpcomingSession(events: Event[]): string | null {
  // Flatten all sessions from all events
  const allSessions = events.flatMap((event) =>
    event.sessions.map((session) => ({
      ...session,
      dateTime: combineDateTime(session.date, session.startTime),
    }))
  );

  if (allSessions.length === 0) {
    return null;
  }

  // Get current time in GMT+3
  const now = getCurrentTimeInGMT3();

  // Filter to only include future sessions
  const futureSessions = allSessions.filter(
    (session) => new Date(session.dateTime).getTime() > now.getTime()
  );

  if (futureSessions.length === 0) {
    return null; // No upcoming sessions
  }

  // Sort by date (ascending)
  futureSessions.sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  // Return the first upcoming session (closest to now)
  return futureSessions[0].dateTime;
}
