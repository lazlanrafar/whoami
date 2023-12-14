export const siteConfig = {
  title: "Whoami",
  description: "Whoami is a simple web app to show your identity.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://whoami.lazlanrafar.com"
      : "http://localhost:3000",
  author: "Latoe",
  links: {
    github: "https://github.com/lazlanrafar/whoami",
    source_code: "https://github.com/lazlanrafar/whoami",
    saweria: "https://saweria.co/lazlanrafar",
  },
};
