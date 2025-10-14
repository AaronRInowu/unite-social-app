export interface GendersIdentity {
  id: number;
  title: string;
  /**
   * Emoji or icon representation
   */
  icon?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  parent?: (number | null) | GendersIdentity;
  breadcrumbs?:
    | {
        doc?: (number | null) | GendersIdentity;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}