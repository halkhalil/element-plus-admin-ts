import {computed} from 'vue'
import {useStore} from "~/store";
import {ThemeEnum} from "~/enums/app";

export function useThemeSetting() {

  const {appStore} = useStore();

  const getThemes = [
    {theme: 'default', color: '#000000'},
    {theme: 'light', color: '#FFFFFF'},
    {theme: 'dusk', color: '#f5222d'},
    {theme: 'volcano', color: '#fa541c'},
    {theme: 'yellow', color: '#fadb14'},
    {theme: 'auroraGreen', color: '#52c41a'},
    {theme: 'pink', color: '#eb2f96'},
    {theme: 'saucePurple', color: '#722ed1'},
  ]

  const getTheme = computed(() => appStore.getTheme)

  async function changeTheme(theme: ThemeEnum) {
    appStore.setProjectConfig({theme: theme})
    document.documentElement.className = theme;
  }

  return {
    getTheme,
    getThemes,
    changeTheme,
  };
}