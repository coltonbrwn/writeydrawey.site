import * as apiProxy from '../../lib/api-proxy';

export default (req, res) => {
  apiProxy.updateState(req, res);
}
