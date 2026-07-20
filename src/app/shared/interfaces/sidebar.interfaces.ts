import { Link } from './interfaces';

export interface SidebarUser {
  name: string;
  avatarImage: string;
}

export interface SidebarResponse {
  user: SidebarUser;
  links: Link[];
}
