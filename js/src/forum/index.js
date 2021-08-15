import { extend,override  } from 'flarum/common/extend'
import ChangeEmailModal from 'flarum/forum/components/ChangeEmailModal';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

app.initializers.add('tpam-disable', () => {

  const regex = new RegExp('^[0-9a-zA-Z_-].+@my.swjtu.edu\\.cn$');
  //移除已经完成验证的同学的验证按钮
  extend(SettingsPage.prototype, 'accountItems', items => {
    if(regex.test(app.session.user.email())){
      items.remove('changeEmail');
    }
  });
  //添加获取入服权限的按钮
  extend(SettingsPage.prototype, 'accountItems', items => {
    items.add('getSTPermission',
      <Button className="Button" onclick={() => getSTPermission()}>
        获取SteveTribe入服许可
      </Button>
    );
  });
  //要求更改邮件必须更改为西南交通大学邮件
  override(ChangeEmailModal.prototype, 'onsubmit', function (original, e) {
    if(!regex.test(this.email())) {
      e.preventDefault();
      window.alert('请使用@my.swjtu.edu.cn进行认证');
      return;
    }
    return original(e);
  });

  function getSTPermission() {
    if(!regex.test(app.session.user.email())){
      window.alert('请先完成交大邮箱认证');
      return;
    }
    app.session.user.save({is_swjtuer: 1})
  }
})
