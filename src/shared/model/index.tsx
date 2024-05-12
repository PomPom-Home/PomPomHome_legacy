export const WIDGET_KEYS = {
  SITE_LINK: 'siteLink',
  MEMO: 'memo',
  TODO: 'todo',
  MINI_WEB: 'miniWeb',
};

export type SiteLinkItemType = {
  linkSeq: number;
  linkTitle: string;
  linkURL: string;
};

export type SiteLinkType = {
  tabSeq: number;
  tabTitle: string;
  linkList: SiteLinkItemType[];
};
