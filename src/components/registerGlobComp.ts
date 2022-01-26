import Icon from '~/components/Icon'
import {App} from "vue";

const compList = [Icon];

export function registerGlobComp(app: App<Element>) {
  compList.forEach(item => {
    app.component(item.name, item)
  })
}