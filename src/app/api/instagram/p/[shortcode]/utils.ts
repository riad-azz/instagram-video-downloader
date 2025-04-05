import { RequestConfigType } from "@/types/request-config";
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";

import querystring from "querystring";

function generateRequestBody(shortcode: string) {
  return querystring.stringify({
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "b",
    __hs: "20183.HYP:instagram_web_pkg.2.1...0",
    dpr: "3",
    __ccg: "GOOD",
    __rev: "1021613311",
    __s: "hm5eih:ztapmw:x0losd",
    __hsi: "7489787314313612244",
    __dyn:
      "7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJw5ux609vCwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2swtUd8-U2zxe2GewGw9a361qw8Xxm16wa-0oa2-azo7u3C2u2J0bS1LwTwKG1pg2fwxyo6O1FwlA3a3zhA6bwIxe6V8aUuwm8jwhU3cyVrDyo",
    __csr:
      "goMJ6MT9Z48KVkIBBvRfqKOkinBtG-FfLaRgG-lZ9Qji9XGexh7VozjHRKq5J6KVqjQdGl2pAFmvK5GWGXyk8h9GA-m6V5yF4UWagnJzazAbZ5osXuFkVeGCHG8GF4l5yp9oOezpo88PAlZ1Pxa5bxGQ7o9VrFbg-8wwxp1G2acxacGVQ00jyoE0ijonyXwfwEnwWwkA2m0dLw3tE1I80hCg8UeU4Ohox0clAhAtsM0iCA9wap4DwhS1fxW0fLhpRB51m13xC3e0h2t2H801HQw1bu02j-",
    __comet_req: "7",
    lsd: "AVrqPT0gJDo",
    jazoest: "2946",
    __spin_r: "1021613311",
    __spin_b: "trunk",
    __spin_t: "1743852001",
    __crn: "comet.igweb.PolarisPostRoute",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
    variables: JSON.stringify({
      shortcode: shortcode,
      fetch_tagged_user_count: null,
      hoisted_comment_id: null,
      hoisted_reply_id: null,
    }),
    server_timestamps: true,
    doc_id: "8845758582119845",
  });
}

export type GetInstagramPostRequest = {
  shortcode: string;
};

export type GetInstagramPostResponse = IG_GraphQLResponseDto;

export function getInstagramPostGraphQL(
  data: GetInstagramPostRequest,
  requestConfig?: RequestConfigType
) {
  const requestUrl = new URL("https://www.instagram.com/graphql/query");

  return fetch(requestUrl, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-FB-Friendly-Name": "PolarisPostActionLoadPostQueryQuery",
      "X-BLOKS-VERSION-ID":
        "0d99de0d13662a50e0958bcb112dd651f70dea02e1859073ab25f8f2a477de96",
      "X-CSRFToken": "uy8OpI1kndx4oUHjlHaUfu",
      "X-IG-App-ID": "1217981644879628",
      "X-FB-LSD": "AVrqPT0gJDo",
      "X-ASBD-ID": "359341",
      "Sec-GPC": "1",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: `https://www.instagram.com/p/${data.shortcode}/`,
    body: generateRequestBody(data.shortcode),
    method: "POST",
    mode: "cors",
    ...requestConfig,
  });
}
