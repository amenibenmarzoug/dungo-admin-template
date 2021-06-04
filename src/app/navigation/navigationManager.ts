import { FuseNavigation } from '@fuse/types';

export const navigationManager: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'manager-dashboard',
                        title: 'Dungos',
                        type: 'item',
                        url: '/apps/dashboards/manager-dashboard'
                    },


                ],
            },
        ],
    }
]