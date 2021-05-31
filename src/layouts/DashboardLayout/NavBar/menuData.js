import {
    BarChart as BarChartIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    List as ListIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    Settings as SettingsIcon,
    Lock as LockIcon,
    AlertCircle as AlertCircleIcon
} from 'react-feather'


export const navItems = [
    {
        _id: 1,
        grupo: 'Sistema',
        icon: UsersIcon,
        items: [
            {
                href: '/app/customers',
                icon: ListIcon,
                title: 'Customers'
            },
            {
                href: '/app/products',
                icon: ShoppingBagIcon,
                title: 'Products'
            }
        ],
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        _id: 2,
        grupo: 'Ajustes',
        icon: SettingsIcon,
        items: [
            {
                href: '/app/account',
                icon: UserIcon,
                title: 'Account'
            },
            {
                href: '/app/settings',
                icon: SettingsIcon,
                title: 'Settings'
            },
            {
                href: '/app/usuarios',
                icon: UsersIcon,
                title: 'Usuarios',
            }
        ],
        allowedRoles: ['superadmin', 'admin', 'editor']

    },
    {
        _id: 3,
        grupo: 'Otras',
        icon: AlertCircleIcon,
        items: [
            {
                href: '/login',
                icon: LockIcon,
                title: 'Login'
            },
            {
                href: '/register',
                icon: UserPlusIcon,
                title: 'Register'
            },
            {
                href: '/404',
                icon: AlertCircleIcon,
                title: 'Error'
            }
        ],
        allowedRoles: ['superadmin', 'admin', 'editor']

    }

]


export const botonesItems = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/customers',
        icon: ListIcon,
        title: 'Customers',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/usuarios',
        icon: UsersIcon,
        title: 'Usuarios',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/login',
        icon: LockIcon,
        title: 'Login',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/register',
        icon: UserPlusIcon,
        title: 'Register',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/404',
        icon: AlertCircleIcon,
        title: 'Error',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    }
]