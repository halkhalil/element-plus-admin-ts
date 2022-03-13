export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('~/views/core/exception/404.vue');

/**
 * @description: common layout
 */
export const LAYOUT = () => import('~/layouts/index.vue');

export const CONTENT = () => import('~/layouts/page/index.vue');

export const IFRAME = () => import('~/views/core/iframe/index.vue');
