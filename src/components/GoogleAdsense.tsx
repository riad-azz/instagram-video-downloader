import { googlePublicKey } from "@/configs/google";
const GoogleAdsense = () => {
  if (!googlePublicKey) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googlePublicKey}`}
      crossOrigin="anonymous"
    ></script>
  );
};

export default GoogleAdsense;
