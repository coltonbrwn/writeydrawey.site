import * as apiProxy from '../../lib/api-proxy';

export default (req, res) => {
  console.log(req)
  apiProxy.updateState(req, res);
}
