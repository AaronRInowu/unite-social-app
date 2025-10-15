export const noEditUserAction = ["birth"];
export const editUserOptions = ["names", "location", "birth", "gender", "sex"];
export const editInterestOptions = ["events", "prefereneces"];
export const editPersonOptions = ["vibe", "values"];
export const allEditUserOptions = [
  ...editUserOptions,
  ...editInterestOptions,
  ...editPersonOptions,
  "galleryinfo",
];
export const mapAllEditOptions = [
  {
    title: "Basic Info",
    arr: editUserOptions,
  },
  {
    title: "Interes and activities",
    arr: editInterestOptions,
  },
  {
    title: "Personality",
    arr: editPersonOptions,
  },
];
