import { Event } from "@/types";

const events: Event[] = [
  {
    speakers: [
      {
        fullName: "Daron Yöndem",
        title: "Tech Lead for Application Innovation, Microsoft",
        company: "Microsoft",
        linkedin: "https://www.linkedin.com/in/daronyondem/",
        twitter: "https://x.com/daronyondem",
      },
      {
        fullName: "Kardel Rüveyda Çetin ",
        title: "Software Development Lead",
        // phrase:
        //   "Konuşma yaptığım en ilgi çekici topluluk, herkese tavsiye ederim!",
        company: "Doğuş Teknoloji",
        linkedin: "https://www.linkedin.com/in/kardelruveydacetin/",
        twitter: "https://x.com/kardelanite",
      },
      {
        fullName: "Bilge Yücel ",
        title: "DevRel Engineer",
        company: "Deepset",
        linkedin: "https://www.linkedin.com/in/bilge-yucel/",
      },
      {
        fullName: "Fatih Kadir Akın",
        title: "DevRel Manager",
        company: "Teknasyon",
        twitter: "https://x.com/fkadev",
        linkedin: "https://www.linkedin.com/in/fatihkadirakin",
      },
      {
        fullName: "Şeyma Sarıgil",
        title: "Senior Software Engineer",
        company: "Softtech",
        linkedin: "https://www.linkedin.com/in/seymasa/",
      },
      {
        fullName: "Tolga Kurtuluş ",
        title: "Revenue Management R&D Specialist",
        company: "Turkish Airlines",
        linkedin: "https://www.linkedin.com/in/tolgakurtulus/",
      },
      {
        fullName: "Göker Güner",
        title: "AI Platform Engineer",
        company: "Codeway",
        linkedin: "https://www.linkedin.com/in/gokerguner/",
        twitter: "https://x.com/gokerguner",
      },
      {
        fullName: "Emrah Mete",
        title: "Senior Cloud Solution Architect - AI and Data Analytics",
        company: "Microsoft",
        linkedin: "https://www.linkedin.com/in/emrahmete/",
        twitter: "https://x.com/emrahmete",
      },
      {
        fullName: "Selin Çıldam",
        title: "Data Scientist",
        company: "Pazarama",
        linkedin: "https://www.linkedin.com/in/selincildam/"
      },
      {
        fullName: "Enes Fehmi Manan",
        title: "Risk Analytics & Data Science Intern",
        company: "Fibabanka",
        linkedin: "https://www.linkedin.com/in/enesfehmimanan/",
        twitter: "https://x.com/enesfehmimanan"
      },
    ],
    sessions: [
      {
        topic: "Kick-Off",
        date: "2025-03-03",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Serkan Alc",
        url: "https://www.youtube.com/watch?v=B-tTRvuMvH8&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=6&pp=iAQB"
      },
      {
        topic: "What Are the Basic GenAI Consepts?",
        date: "2025-03-05",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Kardel Rüveyda Çetin",
        url: "https://www.youtube.com/watch?v=B-tTRvuMvH8&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=6&pp=iAQB"
      },
      {
        topic: "Basic LLM Invoke From Gemini API",
        date: "2025-03-08",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Kardel Rüveyda Çetin",
        url: "https://www.youtube.com/watch?v=oWlaMUcOWYM&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=5&pp=iAQB"
      },
      {
        topic: "Fantastic Prompts and Where To Find Them?",
        date: "2025-03-12",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Göker Güner",
        url: "https://www.youtube.com/watch?v=jZbjJo8YxQg&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=4&pp=iAQB"
      },
      {
        topic: "Prompt Engineering Methods",
        date: "2025-03-15",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Daron Yöndem",
        url: "https://www.youtube.com/watch?v=-lLNMt_JU_4&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=3&pp=iAQB"
      },
      {
        topic: "Prompt Engineering Fundamentals",
        date: "2025-03-16",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Fatih Kadir Akın",
      },
      {
        topic: "Gemini API details",
        date: "2025-03-19",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Tolga Kurtuluş",
      },
      {
        topic: "Basic Chatbot Deployment & Final Project Details",
        date: "2025-03-21",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Enes Fehmi Manan",
      },
      {
        topic: "LLM Parameters",
        date: "2025-03-22",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Tolga Kurtuluş",
        url: "https://www.youtube.com/watch?v=yRraDgrZees&list=PLQvJkakaBRKcEf3tq169jkNvoyiQN2XzN&index=2&pp=iAQB"
      },
      {
        topic: "Advanced RAG",
        date: "2025-03-26",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Bilge Yücel",
      },
      {
        topic: "Optimization Areas for RAG Applications",
        date: "2025-03-28",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Emrah Mete",
      },
      {
        topic: "Advanced RAG Notebook",
        date: "2025-03-29",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Bilge Yücel",
      },
      {
        topic: "What is an agent? LLM agent examples",
        date: "2025-04-02",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Şeyma Sarıgil",
      },
      {
        topic: "Comparing Agent Frameworks & Different agent notebook example",
        date: "2025-04-05",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Şeyma Sarıgil",
      },
      {
        topic: "What is Fine Tuning",
        date: "2025-04-09",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Selin Çıldam",
      },
      {
        topic: "Fine Tuning with Google AI Studio",
        date: "2025-04-12",
        startTime: "20:30",
        endTime: "22:00",
        speakerName: "Selin Çıldam",
      },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "microsoft",
      },
      {
        tier: "",
        sponsorSlug: "turkish-airlines",
      },
      {
        tier: "",
        sponsorSlug: "dogus-teknoloji",
      },
      {
        tier: "",
        sponsorSlug: "fibabanka",
      },
      {
        tier: "",
        sponsorSlug: "teknasyon",
      },
      {
        tier: "",
        sponsorSlug: "codeway",
      },
      {
        tier: "",
        sponsorSlug: "pazarama",
      },
      {
        tier: "",
        sponsorSlug: "deepset",
      },
      {
        tier: "",
        sponsorSlug: "softtech",
      },
    ],
  },
];

export default events;
