import {
  DraftingCompass,
  HandHelping,
  Blocks,
  Wrench,
  Code,
  Braces,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export const navItems = [
  { name: "Services", link: "#services" },
  { name: "Skills", link: "#skills" },
  { name: "Works", link: "#works" },
  { name: "Contact", link: "#contact" },
];

export const services = [
  {
    ico: <Code />,
    title: "AI & Machine Learning Development",
    description:
      "Develop intelligent applications using Python, TensorFlow, and scikit-learn — including image classification, NLP, and predictive models tailored to real-world problems.",
  },
  {
    ico: <Braces />,
    title: "Full-Stack Web Development",
    description:
      "Develop robust and scalable web applications using modern frameworks like React, Next.js, and Node.js. Focus on creating responsive, user-friendly interfaces with strong backend integration.",
  },
  {
    ico: <Blocks />,
    title: "AI-Powered Automation",
    description:
      "Implement intelligent workflow automation using tools such as N8N and custom Python scripts. Streamline business operations through AI-based decision-making and data processing pipelines.",
  },
  {
    ico: <HandHelping />,
    title: "Data Science & Model Optimization",
    description:
      "Perform data preprocessing, feature engineering, and model evaluation using libraries like TensorFlow, scikit-learn, and pandas. Optimize performance and interpret models with Explainable AI (LIME, SHAP).",
  },
  {
    ico: <DraftingCompass />,
    title: "System Optimizatoin & APIs",
    description:
      "Integrate third-party systems, REST APIs, and automation pipelines." +
      " Enable your product to connect with CRMs, payment gateways, and AI services efficiently to ensure reliability and scalability.",
  },
  {
    ico: <Wrench />,
    title: "System Integration and Maintenance ",
    description:
      "Monitor performance and troubleshoot issues promptly. " +
      "Regularly update code and technologies for security and compatibility",
  }
];

export const works = [
  {
    title: "MUST Multilingual Hate Speech Detection System",
    description:
      "A transformer-based model detecting hate speech in Urdu, Roman Urdu, and English texts. Fine-tuned BERT and XLM RoBERTa models to capture linguistic and contextual nuances for precise hate, offensive,and neutral classification.",
    className: "md:col-span-1",
    image: "/images/works/must-dashboard.jpg",
    images: [
      "/images/works/must-flagged.png", // 1. Wide landscape (Flagged Content)
      "/images/works/must-sidebar.png", // 2. Tall portrait (Sidebar)
      "/images/works/must-reports.png", // 3. Wide landscape (Reports & Audits)
    ],
    link: "https://mustdashboard.vercel.app/"
  },
  {
    title: "Game of Stones",
    description:
      "A digital platform showcasing investment opportunities in Gilgit Baltistan's mining sector. Features 3D virtual tours of our mineral assets from our partnered company.",
    className: "md:col-span-1",
    image: "/images/works/gos.jpg",
    images: [
      "/images/works/gos-1.png", // 1. Game of Stones 3D rocks (Landscape)
      "/images/works/gos-2.png", // 2. Explore the mines map (Landscape)
      "/images/works/gos-3.png", // 3. The Game of Stones Archive (Landscape)
      "/images/works/gos-4.png", // 4. Zircon Mines field photos (Portrait)
    ],
    link: "https://gameofstones.pk/"
  },
  {
    title: "TheNest-Camp Management System",
    description: "A comprehensive camp management system featuring web and mobile interfaces for efficient scheduling, meal tracking, and activity management.",
    className: "md:col-span-1",
    image: "/images/works/thenest.png",
    link: "https://drive.google.com/drive/folders/1zKuvclKsyEmrHAwSKMqsxDo-utZOzC0U?usp=sharing"
  },
  {
    title: "Mine Explorer- The Game of Stones",
    description:
      "AI-powered automation for geological report insights and real-time chatbot assistance for investors and visitors.",
    className: "md:col-span-1",
    image: "/images/works/gos.jpg",
    link: "https://gbmining.vercel.app/"
  },
  {
    title: "Aqua Guage",
    description:
      "Implemented using machine learning models to predict city rainfall",
    className: "md:col-span-1",
    image: "/images/works/work3.png",
    link: "/"
  },
  {
    title: "NLP Chatbot",
    description:
      "n AI chatbot using advanced NLP for accurate intent recognition, context-aware conversations, and natural language responses.",
    className: "md:col-span-1",
    image: "/images/works/work6.png",
    link: "/"
  },
  {
    title: "Tourism Information Portal",
    description:
      " a scalable portal with real-time booking, reviews, and ratings to enhance transparency and trust.",
    className: "md:col-span-1",
    image: "/images/works/work5.png",
    link: "/"
  },
];

export const certifications = [
  {
    title: "Generative AI Tools and Applications",
    issuer: "Edureka",
    link: "https://coursera.org/verify/BU4PQBY55P5X"
  },
  {
    title: "Generative AI for Workflow Automation",
    issuer: "Edureka",
    link: "https://coursera.org/verify/V5XKMOFJWN8J"
  },
  {
    title: "Generative AI and Prompt Engineering Essentials",
    issuer: "Edureka",
    link: "https://coursera.org/verify/LN02CPNCQF14"
  },
  {
    title: "Cyber Security - Application of AI",
    issuer: "Macquarie University",
    link: "https://coursera.org/verify/F4VFB10FYSBK"
  },
  {
    title: "Foundations of Project Management",
    issuer: "Coursera",
    link: "https://coursera.org/verify/YISBFYYADEVC"
  },
  {
    title: "Project Initiation: Starting a Successful Project",
    issuer: "Coursera",
    link: "https://coursera.org/verify/080H0DQWYFYP"
  },
  {
    title: "Project Planning: Putting It All Together",
    issuer: "Coursera",
    link: "https://coursera.org/verify/RPH58OJCJ5S0"
  },
  {
    title: "Project Execution: Running the Project",
    issuer: "Coursera",
    link: "https://coursera.org/verify/4ZRAA6KCPYME"
  },
  {
    title: "Agile Project Management",
    issuer: "Coursera",
    link: "https://coursera.org/verify/GR3KR6Z165H6"
  },
  {
    title: "Capstone: Applying Project Management in the Real World",
    issuer: "Coursera",
    link: "https://coursera.org/verify/LT52EUPZFWPB"
  }
];

export const socialMedia = [
  {
    id: 1,
    img: <FaLinkedinIn />,
    href: "http://www.linkedin.com/in/zain-abbas1",
  },
  {
    id: 2,
    img: <FaGithub />,
    href: "https://github.com/abbaszaynn",
  },
  {
    id: 3,
    img: <FaInstagram />,
    href: "https://www.instagram.com/abbas__zayn?igsh=MWVqb2V0ZjI1cHRucA==",
  },
];

export const skills = [
  { name: "AI/ML", description: "", percentage: 94 },
  { name: "Systems Architecture", description: "", percentage: 91 },
  { name: "Web Development", description: "", percentage: 89 },
  { name: "Cloud & DevOps", description: "", percentage: 92 },
];

export const skillsIcons = [
  "typescript",
  "javascript",
  "tensorflow",
  "opencv",
  "react",
  "numpy",
  "pandas",
  "html5",
  "css3",
  "nodedotjs",
  "matplotlib",
  "seaborn",
  "huggingface",
  "jupyter",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "kaggle",
  "cypress",
  "docker",
  "git",
  "scikit-learn",
  "github",
  "gitlab",
  "visualstudiocode",
  "pytorch",
  "mongodb",
  "figma",
  "python",
  "nextdotjs",
  "linux",
  "bash",
  "heroku",
  "azure",
  "aws",
  "googlecloud",
  "netlify",
  "n8n",
  "supabase",
  "keras",
  "fastapi",
  "flask",
  "postman",
  "rabbitmq",
  "apachekafka",
  "prometheus",
  "grafana",
  "kubernetes",
  "terraform",
  "ansible",
  "jenkins"
];
