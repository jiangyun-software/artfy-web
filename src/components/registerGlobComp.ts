import type { App } from 'vue';
import {
  // Need
  Input,
  Layout,
  Button as AntButton,
} from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(AntButton).use(Layout);
}
