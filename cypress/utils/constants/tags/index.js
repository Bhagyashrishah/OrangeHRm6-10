const BASE_TAGS = require('./type');
const FEATURE_TAGS = require('./feature');
const PROGRESS_TAGS = require('./progress');

const TAGS = {
  ...BASE_TAGS,
  ...FEATURE_TAGS,
  ...PROGRESS_TAGS,
};

export default TAGS;
