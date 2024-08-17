import Dashboard from "../../components/generic-components/icons/Dashboard";
import PersonalIcon from "../../components/generic-components/icons/PersonalIcon";

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/admin/products",
        name: "Products",
        icon: Dashboard,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/admin/users",
        name: "Users",
        icon: PersonalIcon,
        isOnMenu: true,
        label: null,
        // children: [
        //     {
        //         path: "/dashboard/personal/monitoring",
        //         name: "Monitoring",
        //         icon: EmptyIcon,
        //         isOnMenu: true,
        //         applyWhitePath: false,
        //         label: null,
        //     },
        //     {
        //         path: "/dashboard/personal/clocking",
        //         name: "Clocking",
        //         icon: EmptyIcon,
        //         isOnMenu: true,
        //         applyWhitePath: false,
        //         label: null,
        //     },
        //     {
        //         path: "/dashboard/personal/holidays",
        //         name: "Holidays",
        //         icon: EmptyIcon,
        //         isOnMenu: true,
        //         applyWhitePath: false,
        //         label: null,
        //     },
        // ],
    },
    {
        path: "/admin/orders",
        name: "Orders",
        icon: PersonalIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/admin/brands",
        name: "Brands",
        icon: PersonalIcon,
        isOnMenu: true,
        label: null,
    
    },
    {
        path: "/admin/categories",
        name: "Categories",
        icon: PersonalIcon,
        isOnMenu: true,
        label: null,
    },
];