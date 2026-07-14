export interface MenuResponse {
  /* TODO: agregar ícono */
  relative_route: string;
  name: string;
  childrens?: Child[];
}

interface Child {
  relative_route: string;
  name: string;
}
