import Select from './Select';

const languageOptions = [
  { label: 'C++', value: 'cpp' },
  { label: 'CSS', value: 'css' },
  { label: 'Go', value: 'go' },
  { label: 'HTML', value: 'html' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
];

type LanguageSelectProps = {
  value: string;
};

export default function LanguageSelect({ value }: LanguageSelectProps) {
  return (
    <Select
      name="language"
      label="Language"
      value={value}
      options={languageOptions}
      selectedComponent={LanguageOption}
      optionComponent={LanguageOption}
      anchorAlignment={{ horizontal: 'right' }}
    />
  );
}

const icons: Record<string, JSX.Element> = {
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/javascript.svg.
  javascript: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill="#F1DD3F"
        d="M11.4 10h2.7v7.6c0 3.4-1.6 4.6-4.3 4.6-.6 0-1.5-.1-2-.3l.3-2.2c.4.2.9.3 1.4.3 1.1 0 1.9-.5 1.9-2.4V10zm5.1 9.2c.7.4 1.9.8 3 .8 1.3 0 1.9-.5 1.9-1.3s-.6-1.2-2-1.7c-2-.7-3.3-1.8-3.3-3.6 0-2.1 1.7-3.6 4.6-3.6 1.4 0 2.4.3 3.1.6l-.6 2.2c-.5-.2-1.3-.6-2.5-.6s-1.8.5-1.8 1.2c0 .8.7 1.1 2.2 1.7 2.1.8 3.1 1.9 3.1 3.6 0 2-1.6 3.7-4.9 3.7-1.4 0-2.7-.4-3.4-.7l.6-2.3z"
      />
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/html.svg
  html: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill="#EF7623"
        d="M8 15l6-5.6V12l-4.5 4 4.5 4v2.6L8 17v-2zm16 2.1l-6 5.6V20l4.6-4-4.6-4V9.3l6 5.6v2.2z"
      />
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/css.svg.
  css: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill="#529BBA"
        d="M10.3 23.3l.8-4H8.6v-2.1h3l.5-2.5H9.5v-2.1h3.1l.8-3.9h2.8l-.8 3.9h2.8l.8-3.9h2.8l-.8 3.9h2.5v2.1h-2.9l-.6 2.5h2.6v2.1h-3l-.8 4H16l.8-4H14l-.8 4h-2.9zm6.9-6.1l.5-2.5h-2.8l-.5 2.5h2.8z"
      />
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/java.svg.
  java: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 20 20">
      <path
        fill="#E11E23"
        d="M6 0a6 6 0 106 6 6 6 0 00-6-6zm2.14 6.8a2.16 2.16 0 01-2.29 2.41 2.5 2.5 0 01-2-.87l.73-.92a1.52 1.52 0 001.23.59c.66 0 1.06-.42 1.06-1.32V2.8h1.26z"
      />
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/python.svg.
  python: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill="#356EA1"
        d="M15.6 15.5h-2c-1.4 0-2.3.9-2.3 2.3v1.8c0 .2-.1.3-.3.3h-.9c-.9 0-1.6-.4-2-1.2-.3-.6-.5-1.2-.5-1.8-.1-1.1-.1-2.2.3-3.3.3-.9.9-1.6 1.9-1.8h5.8c.1 0 .3 0 .3-.1v-.5s-.2-.1-.3-.1h-3.4c-.3 0-.4-.1-.4-.4V9.4c0-.7.3-1.2.9-1.4.5-.2 1-.4 1.5-.5 1.2-.2 2.4-.2 3.6.1.5.1 1 .3 1.4.6.4.4.7.8.6 1.4v3.6c0 1.4-.8 2.2-2.2 2.2-.7.1-1.4.1-2 .1zm-2.8-6c0 .4.3.8.8.8.4 0 .8-.4.8-.8s-.4-.7-.8-.8c-.5 0-.8.4-.8.8zm3.6 7h2c1.4 0 2.3-.9 2.3-2.3v-1.8c0-.2.1-.3.3-.3h.9c.9 0 1.6.4 2 1.2.3.6.5 1.2.5 1.8.1 1.1.1 2.2-.3 3.3-.3.9-.9 1.6-1.9 1.8h-5.8c-.1 0-.3 0-.3.1v.5s.2.1.3.1h3.4c.3 0 .4.1.4.4v1.3c0 .7-.3 1.2-.9 1.4-.5.2-1 .4-1.5.5-1.2.2-2.4.2-3.6-.1-.5-.1-1-.3-1.4-.6-.4-.4-.7-.8-.6-1.4v-3.6c0-1.4.8-2.2 2.2-2.2.7-.1 1.4-.1 2-.1zm2.8 6c0-.4-.3-.8-.8-.8-.4 0-.8.4-.8.8s.4.7.8.8c.5 0 .8-.4.8-.8z"
      />
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/go2.svg.
  go: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254.5 225" id="Layer_1">
      <path
        d="M20.2 103.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6zm-15.1 9.2c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6zm24.2 9.2c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z"
        fill="#00ACD7"
      />
      <g transform="translate(-20 2)">
        <path
          d="M153.1 99.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z"
          fill="#00ACD7"
        />
        <path
          id="path80"
          d="M186.2 154.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z"
          fill="#00ACD7"
        />
      </g>
    </svg>
  ),
  // Modified from https://github.com/jesseweed/seti-ui/blob/master/icons/cpp.svg.
  cpp: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        fill="#529BBA"
        d="M8.3 15.5c0-1.3.2-2.4.6-3.4.4-1 .9-1.8 1.6-2.5.7-.7 1.5-1.2 2.4-1.6s1.9-.5 2.9-.5 1.9.2 2.7.6c.8.4 1.5.9 2 1.4L18.3 12c-.4-.3-.7-.6-1.1-.7s-.8-.3-1.4-.3c-.5 0-.9.1-1.3.3-.4.2-.8.5-1.1.9s-.5.8-.7 1.4c-.2.6-.3 1.2-.3 1.9 0 1.5.3 2.6 1 3.3.7.8 1.5 1.2 2.6 1.2.5 0 1-.1 1.4-.3.4-.2.8-.5 1.1-.9l2.2 2.5c-.7.8-1.4 1.3-2.2 1.7-.8.4-1.7.6-2.7.6s-2-.2-2.9-.5-1.7-.8-2.4-1.5-1.1-1.7-1.5-2.7c-.5-1-.7-2.1-.7-3.4z"
      />
      <path
        fill="#529BBA"
        d="M18.2 12.9h-1.4v1.7h-1.6V16h1.6v1.8h1.4V16h1.6v-1.4h-1.6v-1.7zm6 1.6v-2h-1.7v2h-1.9v1.7h1.9v2.1h1.7v-2.1h1.9v-1.7h-1.9z"
      />
    </svg>
  ),
};

type LanguageOptionProps = {
  label: string;
  value: string;
};

function LanguageOption({ label, value }: LanguageOptionProps) {
  return (
    <div className="language-option">
      {icons[value]}
      <span>{label}</span>
    </div>
  );
}
