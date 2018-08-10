let api = process.env.API_ROOT
export default {
  addPath: api + '/addPath',
  addBanner: api + '/addBanner',
  getPath: api + '/getPath',
  getPathList: api + '/getPathList',
  getBanner: api + '/getBanner',
  getBannerList: api + '/getBannerList',
  getReserve: api + '/getReserve',
  editPath: api + '/editPath',
  deletePath: api + '/deletePath',
  deleteBanner: api + '/deleteBanner',
  deleteReserve: api + '/deleteReserve',
  upload: api + '/upload',
  addStrategy: api + '/addStrategy',
  getStrategy: api + '/getStrategy',
  getStrategyById: api + '/getStrategyById',
  editStrategy: api + '/editStrategy',
  deleteStrategy: api + '/deleteStrategy'
}