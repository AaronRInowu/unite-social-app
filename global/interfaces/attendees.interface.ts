import { SchedulesEvent } from "./scheduleEvents.interface";
import { User } from "./users.interface";

export interface Attendee {
  id: number;
  user?: (number | null) | User;
  schedule: number | SchedulesEvent;
  status?: ('going' | 'checkin' | 'checkedin') | null;
  updatedAt: string;
  createdAt: string;
}