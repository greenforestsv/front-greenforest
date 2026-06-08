export interface defaultList {
  name: string
  image: string
}

export interface Portals {
  title: string
  icon: string
  style?: string
  description: string
  itemsAdvantage?: string[]
  link: {title: string, route: string, loginRequired: boolean}
}
