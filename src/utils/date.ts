const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

export const fillZero = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};

export const formatISO = (iso?: string) => {
  if (!iso) return "";

  const now = new Date();
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();

  if (diff < MINUTE) {
    return "Just now";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)} minutes ago`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)} hours ago`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)} days ago`;
  }

  const year = date.getFullYear();
  const month = fillZero(date.getMonth() + 1, 2);
  const day = fillZero(date.getDate(), 2);

  if (diff < YEAR) {
    return `${month}-${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

export const formatBirth = (str: string) => {
  const date = new Date(str).toISOString().split("T")[0].split("-");
  const formatBirth = date[0].slice(2) + ". " + date[1] + ". " + date[2];
  return formatBirth;
};
