import { Attendee } from "./attendees.interface";
import { Connection } from "./connections.interface";
import { ConnectionType } from "./connectionTypes.interface";
import { CoreValue } from "./coreValues.interface";
import { EventsType } from "./eventTypes.interface";
import { GendersIdentity } from "./genders.interface";
import { PromptAnswer } from "./promptAnswer.interface";
import { Sexuality } from "./sexuality.interface";
import { Tile } from "./tiles.interface";
import { Vibe } from "./vibes.interface";

export interface User {
  id: number;
  firstName?: string | null;
  images?:
    | {
        image?: (number | null) | UsersMedia;
        id?: string | null;
      }[]
    | null;
  countryCode: 'mx' | 'us' | 'ca' | 'de' | 'cn' | 'uk' | 'fr' | 'au' | 'in' | 'es' | 'it';
  lastName?: string | null;
  birthDate?: string | null;
  userPreferences?: (number | null) | UserPreference;
  tiles?: (number | Tile)[] | null;
  skipOnboarding?: boolean | null;
  lastOnboardingStep?: number | null;
  isOnboardingCompleted?: boolean | null;
  emailVerified?: boolean | null;
  phone: string;
  phoneVerified?: boolean | null;
  events?: (number | Event)[] | null;
  connections?: {
    docs?: (number | Connection)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  attendees?: (number | Attendee)[] | null;
  answers?: {
    docs?: (number | PromptAnswer)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  roles?: ('admin' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  email?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}

export interface UsersMedia {
  id: number;
  alt?: string | null;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xlarge?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

export interface UserPreference {
  id: number;
  /**
   * Gender identity from the Genders Identities collection
   */
  gender?: (number | null) | GendersIdentity;
  /**
   * Sexuality from the Sexualities collection
   */
  sexuality?: (number | null) | Sexuality;
  /**
   * Vibes from the Vibes collection
   */
  vibes?: (number | Vibe)[] | null;
  /**
   * Core values from the Core Values collection
   */
  coreValues?: (number | CoreValue)[] | null;
  /**
   * Connection types from the Connection Types collection
   */
  connectionTypes?: (number | ConnectionType)[] | null;
  /**
   * Event types from the Events Types collection
   */
  events?: (number | EventsType)[] | null;
  updatedAt: string;
  createdAt: string;
}