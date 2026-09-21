export const portfolioConfig = {
  name: "Shoaib Junaid Khan",
  role: "Computer Science Undergraduate & Aspiring Software Engineer",
  bio: "I’m pursuing a Bachelor’s degree in Computer Science and Engineering at SRM University–AP, building a foundation in software engineering while turning ideas into practical projects.",
  primaryEmail: "YOUR_PRIMARY_EMAIL",
  alternateEmail: "YOUR_ALTERNATE_EMAIL",
  phone: "YOUR_PHONE_NUMBER",
  github: "YOUR_GITHUB_URL",
  linkedin: "YOUR_LINKEDIN_URL",
  discord: "YOUR_DISCORD_URL",
  instagram: "YOUR_INSTAGRAM_URL",
  resumeUrl: "/assets/resume/Shoaib-Junaid-Khan-Resume.pdf",
  profileImage: "PROFILE_IMAGE_HERE",
  pulseTrust: {
    image: "PULSETRUST_IMAGE_HERE",
    video: "PULSETRUST_VIDEO_HERE",
    github: "PULSETRUST_GITHUB_URL",
    demo: "PULSETRUST_DEMO_URL",
  },
  gameEngine: {
    image: "GAME_ENGINE_IMAGE_HERE",
    github: "GAME_ENGINE_GITHUB_URL",
    demo: "GAME_ENGINE_DEMO_URL",
  },
} as const;

export const isPlaceholder = (value: string) =>
  value.includes("YOUR_") || value.includes("_HERE") || value.includes("_URL");
