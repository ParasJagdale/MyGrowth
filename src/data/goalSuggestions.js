function getLocalLogo(fileName) {
  return `${import.meta.env.BASE_URL}logos/${fileName}`;
}

export const certificationProviderSuggestions = [
  {
    name: "OpenAI",
    logoUrl: getLocalLogo("openai.svg"),
  },
  {
    name: "Google",
    logoUrl: "https://cdn.simpleicons.org/google/4285F4",
  },
  {
    name: "Anthropic",
    logoUrl: "https://cdn.simpleicons.org/anthropic/191919",
  },
  {
    name: "Microsoft",
    logoUrl: getLocalLogo("microsoft.svg"),
  },
  {
    name: "GitHub",
    logoUrl: "https://cdn.simpleicons.org/github/181717",
  },
];

export const skillSuggestions = [
  {
    name: "React",
    logoUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "Python",
    logoUrl: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    name: "AWS",
    logoUrl: getLocalLogo("aws.svg"),
  },
  {
    name: "Docker",
    logoUrl: "https://cdn.simpleicons.org/docker/2496ED",
  },
  {
    name: "TypeScript",
    logoUrl: "https://cdn.simpleicons.org/typescript/3178C6",
  },
];
