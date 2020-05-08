import * as apiProxy from '../../lib/api-proxy';

export default (req, res) => {
  apiProxy.getState(req, res);
}
