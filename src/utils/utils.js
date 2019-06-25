import { IMAGE_SIZES } from '../constants/songConstant';

export function getImageUrl(str, size = null) {
  if (!str) {
    return 'src/images/post_album.png';
  }

  str = str.replace('http:' , '');

  switch(size) {
  case IMAGE_SIZES.LARGE:
    return str.replace('large', IMAGE_SIZES.LARGE);
  default:
    return str;
  }
}