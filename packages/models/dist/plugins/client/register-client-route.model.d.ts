export interface RegisterClientRouteOptions {
    route: string;
    parentRoute?: '/' | '/my-account';
    menuItem?: {
        label?: string;
    };
    title?: string;
    onMount(options: {
        rootEl: HTMLElement;
    }): void;
}
//# sourceMappingURL=register-client-route.model.d.ts.map