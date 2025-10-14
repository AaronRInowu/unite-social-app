export interface EventsType {
  id: number;
  title: string;
  /**
   * Emoji or icon representation
   */
  icon?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}