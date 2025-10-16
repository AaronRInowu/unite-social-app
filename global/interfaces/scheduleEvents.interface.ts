import { Attendee } from "./attendees.interface";
export type SupportedTimezones =
    | 'Pacific/Midway'
    | 'Pacific/Niue'
    | 'Pacific/Honolulu'
    | 'Pacific/Rarotonga'
    | 'America/Anchorage'
    | 'Pacific/Gambier'
    | 'America/Los_Angeles'
    | 'America/Tijuana'
    | 'America/Denver'
    | 'America/Phoenix'
    | 'America/Chicago'
    | 'America/Guatemala'
    | 'America/New_York'
    | 'America/Bogota'
    | 'America/Caracas'
    | 'America/Santiago'
    | 'America/Buenos_Aires'
    | 'America/Sao_Paulo'
    | 'Atlantic/South_Georgia'
    | 'Atlantic/Azores'
    | 'Atlantic/Cape_Verde'
    | 'Europe/London'
    | 'Europe/Berlin'
    | 'Africa/Lagos'
    | 'Europe/Athens'
    | 'Africa/Cairo'
    | 'Europe/Moscow'
    | 'Asia/Riyadh'
    | 'Asia/Dubai'
    | 'Asia/Baku'
    | 'Asia/Karachi'
    | 'Asia/Tashkent'
    | 'Asia/Calcutta'
    | 'Asia/Dhaka'
    | 'Asia/Almaty'
    | 'Asia/Jakarta'
    | 'Asia/Bangkok'
    | 'Asia/Shanghai'
    | 'Asia/Singapore'
    | 'Asia/Tokyo'
    | 'Asia/Seoul'
    | 'Australia/Brisbane'
    | 'Australia/Sydney'
    | 'Pacific/Guam'
    | 'Pacific/Noumea'
    | 'Pacific/Auckland'
    | 'Pacific/Fiji';


export interface SchedulesEvent {
    id: number;
    startDate?: string | null;
    startDate_tz?: SupportedTimezones;
    endDate?: string | null;
    capacity: number;
    address: string;
    host: string;
    url?: string | null;
    url_web?: string | null;
    description: string;
    isActive?: boolean | null;
    event?: (number | null) | Event;
    attendees?: {
        docs?: (number | Attendee)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    updatedAt: string;
    createdAt: string;
}