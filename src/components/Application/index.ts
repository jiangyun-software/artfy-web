import { withInstall } from '/@/utils';

import appProvider from './src/AppProvider.vue';
import appLocalePicker from './src/AppLocalePicker.vue';

export { useAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
export const AppLocalePicker = withInstall(appLocalePicker);
