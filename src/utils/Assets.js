export default function assetsURL(str) {
  const _str = `https://fm-api.falconconsulting.fr/images/userprofileimages/${String(str).substring(58)}`;
  return _str;
}
