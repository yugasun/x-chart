import Themes from '@/config/themes';
import { State } from '@/types/interfaces';

const getters = {
  colors: (state: State) : object => Themes[state.app.theme],
};

export default getters;
