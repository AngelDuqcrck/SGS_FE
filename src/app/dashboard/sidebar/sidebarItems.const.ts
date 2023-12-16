export interface SidebarItem {
  rol: string;
  items: Item[];
}

export interface Item {
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
        link: ['service-boss/requests-boss-service']
      },
      {
        title: 'usuarios',
        icon: 'pi pi-users',
        link: ['service-boss/users']
      },
      {
        title: 'tickets',
        icon: 'pi pi-ticket',
        link: ['service-boss/tickets']
      },
    ]
  },
  {
    rol: 'ROLE_EMPLOYEE',
    items: [
      {
        title: 'solicitudes',
        icon: 'pi pi-book',
        link: ['requests']
      }
    ]
  },
  {
    rol: 'ROLE_SERVICE_EMPLOYEE',
    items: [
      {
        title: 'tickets',
        icon: 'pi-ticket',
        link: ['service-employee/tickets']
      }
    ]
  },
  {
    rol: 'ROLE_DEPENDENCE_BOSS',
    items: [
      {
        title: 'solicitudes',
        icon: 'pi pi-book',
        link: ['/backlog/boss']
      }
    ]
  }
]
