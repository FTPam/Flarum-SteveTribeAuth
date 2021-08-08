import { extend } from 'flarum/common/extend'
import SettingsPage from 'flarum/forum/components/SettingsPage';

app.initializers.add('tpam-disable', () => {
  extend(SettingsPage.prototype, 'accountItems', items => {
    items.remove('changeEmail');
  });
})
