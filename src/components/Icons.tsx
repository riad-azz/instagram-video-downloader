export interface IconSize {
  size?: number;
}

const Menu = ({ size = 24 }: IconSize) => {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const Download = ({ size = 16 }: IconSize) => {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      aria-label="download icon"
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
  );
};

const Spinner = ({ size = 20 }: IconSize) => {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      role="status"
      className="inline animate-spin text-gray-200"
      viewBox="0 0 100 101"
      fill=""
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="#1C64F2"
      />
    </svg>
  );
};

const Moon = ({ size = 20 }: IconSize) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  );
};

const Sun = ({ size = 20 }: IconSize) => {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const Theme = ({ size = 20 }: IconSize) => {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            id="ic_fluent_dark_theme_24_regular"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

const Github = ({ size = 24 }: IconSize) => {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

const Logo = ({ size = 20 }: IconSize) => {
  return (
    <svg
      aria-hidden="true"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="rounded bg-gray-800 text-white dark:bg-white dark:text-gray-800"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M2220 4239 c-63 -4 -155 -14 -203 -23 -377 -71 -767 -318 -902 -571
-50 -95 -27 -132 78 -122 49 4 96 23 266 106 301 146 433 182 716 196 285 14
477 -38 600 -160 97 -98 135 -204 135 -378 0 -230 -65 -391 -217 -540 l-50
-48 -76 26 c-116 39 -245 31 -348 -21 -55 -27 -77 -58 -86 -119 -8 -61 17
-123 70 -173 45 -40 129 -85 184 -96 30 -7 32 -11 47 -79 25 -117 43 -228 76
-487 60 -471 106 -620 222 -726 226 -204 695 -87 1040 260 132 133 236 307
260 432 14 75 3 180 -22 222 -38 61 -53 52 -274 -166 -296 -291 -363 -342
-452 -342 -104 0 -157 104 -269 529 -31 118 -71 256 -90 307 -19 50 -35 96
-35 101 0 6 29 22 64 37 149 64 340 214 443 350 62 82 128 222 155 332 18 74
22 118 22 259 1 186 -14 267 -70 378 -180 355 -664 550 -1284 516z"
        />
        <path
          d="M1995 3551 c-102 -25 -212 -130 -303 -289 -184 -320 -397 -930 -496
-1418 -93 -456 -84 -812 23 -926 32 -35 45 -41 87 -45 67 -7 148 15 276 75
127 60 176 101 214 184 l29 63 5 420 6 420 32 140 c18 77 59 244 92 370 148
562 189 952 106 1007 -13 9 -30 9 -71 -1z"
        />
      </g>
    </svg>
  );
};

export const Icons = {
  logo: Logo,
  menu: Menu,
  download: Download,
  loading: Spinner,
  darkMode: Moon,
  lightMode: Sun,
  themeMode: Theme,
  github: Github,
};
