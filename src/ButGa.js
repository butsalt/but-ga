import getSystemInfo from '@/utils/getSystemInfo';
import genClientId from '@/utils/genClientId';
import genNonce from '@/utils/genNonce';
import storage from '@/utils/storage';
import assembleParams from '@/utils/assembleParams';

export default class ButGa {
  static version = VERSION

  systemInfo = getSystemInfo();

  constructor(info) {
    const me = this;

    const baseInfo = me.baseInfo = {
      v: 1,
      tid: info.trackingId,
      uid: info.userId
    };

    let clientId = storage.get('ga:clientId');
    if (!clientId) {
      clientId = genClientId();
      storage.set('ga:clientId', clientId);
    }
    baseInfo.cid = clientId;
  }

  event(info) {
    const me = this;

    return me.send(
      'event',
      {
        ec: info.category,
        ea: info.action,
        el: info.label,
        ev: info.value,
        ni: info.nonInteraction === true
      }
    );
  }

  pageview(info={}) {
    const me = this;

    return me.send(
      'pageview',
      {
        dl: info.location || global.location.href,
        dh: info.host,
        dp: info.page,
        dt: info.title
      }
    );
  }

  send(type, paramMap) {
    const me = this;

    const paramStr = assembleParams(
      {
        _t: genNonce(),
        t: type,
        ...me.baseInfo,
        ...me.systemInfo,
        ...paramMap
      }
    );

    const xhr = new XMLHttpRequest();

    const url = 'https://www.google-analytics.com/collect?' + paramStr;
    xhr.open(
      'GET',
      url,
      true
    );

    xhr.send(null);

    return url;
  }
}