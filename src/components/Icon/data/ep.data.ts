import {icons as epIcons} from '@iconify-json/ep';

const {prefix, icons} = epIcons;
export default Object.keys(icons).map(item => `${prefix}:${item}`)