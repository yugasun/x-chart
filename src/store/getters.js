import Themes from '@/config/themes';

const getters = {
  colors: state => Themes[state.app.theme],
};

export default getters;
