
import { ASSETS_URL } from '../constants';

export interface WorkflowStep {
  title: string;
  description: string;
  imageUrl?: string;
}

const SPA_BASE = `${ASSETS_URL}/spa`;

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    title: "HTML Tree Extraction",
    description: "Scrape the DOM structure of Single Page Applications to extract HTML, CSS, and static content.",
    imageUrl: `${SPA_BASE}/1.png`
  },
  {
    title: "Contextual Analysis",
    description: "Identify the title, accent colors, and a full list of routes that needs specification to be generated in the next step.",
    imageUrl: `${SPA_BASE}/2.png`
  },
  {
    title: "Specification Generation",
    description: "Produces a highly detailed document for each route, creating a structured outline for the contents of each section of each page.",
    imageUrl: `${SPA_BASE}/3.png`
  },
  {
    title: "Asset Normalization",
    description: "Cleans up messy asset names and paths into a consistent, organized structure for the new environment.",
    imageUrl: `${SPA_BASE}/4.png`
  },
  {
    title: "Rebuild in Google AI Studio",
    description: "Upload the documents into a new project, and generate the website based on the specifications",
    imageUrl: `${SPA_BASE}/5.png`
  }
];

export const WORKFLOW_HIGHLIGHTS = [
  "Enables full migration of medium‑sized websites in a single day.",
  "Above 95% route coverage.",
  "Renames and reorganizes routing for improved clarity.",
  "Unifies the assets folder and standardizes asset naming to improve the efficiency of future modifications."
];

export const CODE_EXAMPLES = [
  {
    filename: "main.txt",
    content: `PROJECT NAME:
Williams Kingdom | 威廉王國英語教室

DESCRIPTION:
A bilingual English learning center website for children and parents, providing information on courses, teachers, resources, and contact details.

WEBSITE ICON: 
/assets/new/path/icon.png

THEME COLORS:
yellow
indigo

ROUTES:
"/" - archive/williamseducationhk.com/index.html
"/about" - archive/williamseducationhk.com/about-us-eng-2/index.html
"/about/teachers" - archive/williamseducationhk.com/meeting-our-teachers/index.html
"/courses/jolly-phonics" - archive/williamseducationhk.com/jolly-phonics-2/index.html
"/courses/little-williams-learners" - archive/williamseducationhk.com/little-williams-learners/index.html
...`
  }, 
  {
    filename: "pages/about-teachers.txt",
    content: `ROUTE:
"/about/teachers"

PAGE NAME:
Meet Our Teachers

PAGE STRUCTURE:
1. Header & Intro
Text | Title | MEET
Text | Title | OUR TEACHERS
Text | Paragraph | 我們的英語老師，不僅是一般的外籍老師，他們都是經過威廉精心挑選。具備多年教學經驗及專業教學資格，一致地實踐我們的教學理念。

2. Teacher roster (each entry = Name, Role, Image, Short bio)
Image | Portrait | /assets/teachers/will_v3.png 768x871
Text | Name | MR WILL
Text | Role | HEAD TEACHER
Text | Bio | United Kingdom · University of Lancaster · TEFL certified

Image | Portrait | /assets/teachers/daniel.jpg 768x926
Text | Name | MR DANIEL
Text | Role | HEAD TEACHER
Text | Bio | United Kingdom · University of Cardiff · CELTA certified

Image | Portrait | /assets/teachers/luke.png 682x786
Text | Name | MR LUKE
Text | Role | HEAD TEACHER
Text | Bio | Australia · University of Technology, Sydney · CELTA certified

Image | Portrait | /assets/teachers/jamie.png 768x828
Text | Name | MR JAMIE
Text | Role | HEAD TEACHER
Text | Bio | United Kingdom · City of Liverpool College

Image | Portrait | /assets/teachers/rhea.png 768x929
Text | Name | MS RHEA
Text | Role | HEAD TEACHER
Text | Bio | English Early Childhood Language and Jolly Phonics
...`
  }, 
  {
    filename: "pages/contact.txt",
    content: `ROUTE:
"/contact"

PAGE NAME:
CONTACT US / CONTACT 聯絡我們

PAGE STRUCTURE:
1. Header & Navigation
...

2. Page Titles
Text | Small title | REGULAR COURSE
Text | Title | CONTACT US
Text | Title (ZH) | 聯絡我們

3. Intro / Hero
Image | Hero background | /assets/contact/hero-bg.jpg (2022/01 William-English-081.jpg)
Text | Intro note | Use WhatsApp links or phone numbers below to contact centres, or view the map embeds for directions.

4. Sheung Shui Centre / 上水
Text | Title | Sheung Shui Centre / 上水
Text | Telephone | +852 2366 6821
Text | Whatsapp | +852 9307 8625
Text | Address EN | 36A Ng Uk Tsuen, Sheung Shui, N.T.
Text | Address ZH | 上水吳屋村36A地下
Text | School reg | 學校註冊號碼: 610690
Image | Sheung Shui photo | /assets/contact/sheung-shui-1.jpg (768x512)
Button | WhatsApp | https://api.whatsapp.com/send?phone=85293078625
Embed | Google Maps iframe | https://maps.google.com/maps?q=威廉王國英語教室 - 上水 (Williams Kingdom English Education Centre)

5. Lung Fung Centre / 龍豐
Text | Title | Lung Fung Centre / 龍豐
Text | Telephone | +852 5115 3148 / 2576 3821
Text | Whatsapp | +852 5115 3148 / 2576 3821
Text | Address EN | Shop 9, Level 2, Lung Sum Avenue, Sheung Shui, N.T.
Text | Address ZH | 上水龍豐花園2樓9號舖
Image | Lung Fung photo | /assets/contact/lung-fung-1.jpg (768x512)
Button | WhatsApp | https://api.whatsapp.com/send?phone=85251153148
Embed | Google Maps iframe | https://maps.google.com/maps?q=威廉王國英語教室 - 龍豐 (Williams Kingdom English Education Centre)
...`
  }, 
];

export const PROJECT_LINKS = {
  before: "https://williamseducationhk.com/contact-us/",
  after: "https://ilmn25.github.io/260206/#/contact"
};
