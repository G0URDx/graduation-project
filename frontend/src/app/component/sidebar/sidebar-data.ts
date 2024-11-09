export const sidebarData = [
    {
        routeLink: '/auth/signin',
        icon: 'fa-solid fa-right-to-bracket',
        label: 'Signin',
        ngIf: '!isLogged',
    },
    {
        routeLink: '/auth/signup',
        icon: 'fa-solid fa-user-plus',
        label: 'Signup',
        ngIf: '!isLogged',
    },
    {
        routeLink: '',
        icon: 'fa-solid fa-user-plus',
        label: 'Quit',
        ngIf: 'isLogged',
    },
    // {
    //     routeLink: 'products',
    //     icon: 'fal fa-box-open',
    //     label: 'Products'
    // },
    // {
    //     routeLink: 'statistics',
    //     icon: 'fal fa-chart-bar',
    //     label: 'Statistics'
    // },
    // {
    //     routeLink: 'coupens',
    //     icon: 'fal fa-tags',
    //     label: 'Coupens'
    // },
    // {
    //     routeLink: 'pages',
    //     icon: 'fal fa-file',
    //     label: 'Pages'
    // },
    // {
    //     routeLink: 'media',
    //     icon: 'fal fa-camera',
    //     label: 'Media'
    // },
    // {
    //     routeLink: 'settings',
    //     icon: 'fal fa-cog',
    //     label: 'Settings'
    // },
];