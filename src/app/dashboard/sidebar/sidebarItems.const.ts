interface SidebarItem {
  rol: string;
  items: Item[];
}

interface Item {
  title: string,
  icon?: string,
  link?: string[],
  children?: SidebarItem[]
  hidden?: boolean
}

export const sidebarItems: Array<SidebarItem> = [
  {
    rol : 'ROLE_SERVICE_BOSS',
    items : [
      {
        title: 'solicitudes',
        icon: 'pi pi-book',
        link: ['/dashboard']
      },
      {
        title: 'usuarios',
        icon: 'pi pi-users',
        link: ['/dashboard']
      },
      {
        title: 'tickets',
        icon: 'pi pi-ticket',
        link: ['/dashboard']
      },
    ]
  },
  {
    rol: 'ROLE_EMPLOYEE',
    items: [
      {
        title: 'solicitudes',
        icon: 'pi pi-book',
        link: ['/dashboard']
      }
    ]
  },
  {
    rol: 'ROLE_SERVICE_EMPLOYEE',
    items: [
      {
        title: 'tickets',
        icon: 'pi-ticket',
        link: ['/dashboard']
      }
    ]
  },
  {
    rol: 'ROLE_DEPENDENCE_BOSS',
    items: [
      {
        title: 'solicitudes',
        icon: 'pi pi-book',
        link: ['/dashboard']
      }
    ]
  }
]
