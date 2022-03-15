export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('~/views/core/exception/404.vue');

export const LAYOUT = () => import('~/layouts/index.vue');

export const IFRAME = () => import('~/layouts/iframe/index.vue');

export const CONTENT = () => import('~/layouts/page/index.vue');
