import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileSignature,
  Github,
  ChevronDown,
  Microscope,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import teaser from "@/assets/Teaser_Journey.webp";
import seaLabLogo from "@/assets/SEA_Lab_Logo.png"; // Adjust extension if needed
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";
import columbiaLogo from "@/assets/affiliations/Columbia.webp";
import uwLogo from "@/assets/affiliations/UW.webp";
import GITLogo from "@/assets/affiliations/GIT.webp";
import UMLogo from "@/assets/affiliations/UM.webp";
import teaserVideo from "@/assets/teaser_video.mp4";
import paperPDF from "@/assets/paper.pdf";

const abbrevTitle = "More than Decision Support: Exploring Patients’ Longitudinal Usage of Large Language Models in Real-World Healthcare-Seeking Journeys";

const authors = [
  {
    name: "Yancheng Cao",
    affiliation: "Columbia University",
    webpage: "https://orcid.org/0000-0003-3033-8881",
    corresponding: false,
  },
  {
    name: "Yishu Ji",
    affiliation: "Georgia Institute of Technology",
    webpage: "https://www.yishuji.me/",
    corresponding: false,
  },
  {
    name: "Chris Yue Fu",
    affiliation: "University of Washington",
    webpage: "https://chrisyuefu.com/",
    corresponding: false,
  },
  {
    name: "Sahiti Dharmavaram",
    affiliation: "Columbia University",
    webpage: "https://sahiti.net/",
    corresponding: false,
  },
  {
    name: "Meghan Turchioe",
    affiliation: "Columbia University",
    webpage: "https://orcid.org/0000-0002-6264-6320",
    corresponding: false,
  },
  {
    name: "Natalie C Benda",
    affiliation: "Columbia University",
    webpage: "https://orcid.org/0000-0002-3256-0243",
    corresponding: false,
  },
  {
    name: "Lena Mamykina",
    affiliation: "Columbia University",
    webpage: "https://www.mamykina.com/",
    corresponding: false,
  },
  {
    name: "Yuling Sun",
    affiliation: "University of Michigan",
    webpage: "https://www.yulingsun.net/home.html",
    corresponding: true,
  },
  {
    name: 'Xuhai "Orson" Xu',
    affiliation: "Columbia University",
    webpage: "https://orsonxu.com/",
    corresponding: true,
  },
];


// Get unique affiliations and assign numbers
const uniqueAffiliations: string[] = [];
const affiliationMap: Record<string, number> = {};
authors.forEach(author => {
  if (!affiliationMap[author.affiliation] && author.affiliation) {
    uniqueAffiliations.push(author.affiliation);
    affiliationMap[author.affiliation] = uniqueAffiliations.length;
  }
});

const affiliationLogos: Record<string, string> = {
  "Columbia University": columbiaLogo,
  "University of Washington": uwLogo,
  "Georgia Institute of Technology": GITLogo,
  "University of Michigan": UMLogo,
};

const bibliography = `to appear soon!
`

export default function PubPage() {
  // Handler to open dropdown in a new tab (for Explore)
  const base = import.meta.env.BASE_URL || "/";
  const handleExplore = (route: string) => {
    // Ensure base ends with a slash and route does not start with one
    const normalizedBase = base.endsWith("/") ? base : base + "/";
    const normalizedRoute = route.startsWith("/") ? route.slice(1) : route;
    const url = normalizedBase + "#/" + normalizedRoute;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyBib = () => {
    navigator.clipboard.writeText(bibliography);
    toast.success("Copied!", {
      // description: "BibTeX citation copied to clipboard.",
      // action: {
      //   label: "Undo",
      //   onClick: () => {}, // No undo logic needed, but matches reference usage
      // },
      duration: 1500,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 space-y-8 overflow-y-auto">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center shadow-none bg-transparent border-none">
        {/* Title and Authors */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-[rgb(91,158,230)] drop-shadow-[0_2px_4px_rgba(91,158,230,0.4)]">
          {abbrevTitle}
        </h1>
        <div className="text-base text-muted-foreground mb-1 text-center font-normal flex flex-wrap justify-center gap-x-1">
          {authors.map((author, idx) => (
            <div
              key={author.name}
              className="flex items-center whitespace-nowrap"
            >
              {author.webpage ? (
                <a
                  href={author.webpage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(197,148,3)] underline font-semibold"
                >
                  {author.name}
                </a>
              ) : (
                <span className="text-[rgb(197,148,3)] font-semibold">{author.name}</span>
              )}
              {/* Superscript for affiliation number(s) */}
              {author.affiliation && (
                <sup>
                  {affiliationMap[author.affiliation]}
                  {author.corresponding ? "*" : ""}
                </sup>
              )}
              {!author.affiliation && author.corresponding ? <sup>*</sup> : null}
              {idx < authors.length - 1 && <span>,</span>}
            </div>
          ))}
        </div>
        {/* Affiliation legend */}
        <div className="text-sm text-muted-foreground mb-2 text-center flex flex-wrap justify-center gap-x-4">
          {uniqueAffiliations.map((aff, i) => (
            <span key={aff} className="inline-flex items-center">
              <sup>{i + 1}</sup>
              <span className="inline-flex items-center">
                <img
                  src={affiliationLogos[aff] || ""}
                  alt={`${aff} logo`}
                  className="w-[30px] h-[30px]mr-1"
                  style={{ objectFit: "contain" }}
                />
                {aff}
              </span>
            </span>
          ))}
        </div>
        <div className="text-sm text-muted-foreground mb-2 text-center">
          <sup>*</sup>Mark corresponding authors
        </div>
        <div className="flex flex-row flex-wrap gap-4 mb-4 w-full justify-center max-w-xl mx-auto">
          <Button asChild variant="outline">
            <a
              href={paperPDF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center"
            >
              <FileText className="w-4 h-4" />
              PDF
            </a>
          </Button>
        </div>


        {/* Introduction Section */}
        <section className="w-full mb-6">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-xl mb-4 rounded-lg overflow-hidden flex justify-center">
              <img
                src={teaser}
                alt="Teaser for MIND project"
                className="w-full h-auto"
              />
            </div>
          </div>
          <p className="text leading-[1.5] text-justify break-words">
            Large language models (LLMs) have been increasingly adopted to 
            support patients' healthcare-seeking in recent years. While prior 
            patient-centered studies have examined the capabilities and 
            experience of LLM-based tools in specific health-related tasks 
            such as information-seeking, diagnosis, or decision-supporting, 
            the inherently longitudinal nature of healthcare in real-world 
            practice has been underexplored. This paper presents a four-week 
            diary study with 25 patients to examine LLMs' roles across 
            healthcare-seeking trajectories. Our analysis reveals that 
            patients integrate LLMs not just as simple decision-support 
            tools, but as dynamic companions that scaffold their journey 
            across behavioral, informational, emotional, and cognitive 
            levels. Meanwhile, patients actively assign diverse 
            socio-technical meanings to LLMs, altering the traditional 
            dynamics of agency, trust, and power in patient-provider 
            relationships. Drawing from these findings, we conceptualize 
            future LLMs as a longitudinal boundary companion that continuously 
            mediates between patients and clinicians throughout longitudinal 
            healthcare-seeking trajectories.
          </p>
        </section>

        {/* Video Section */}
        <section className="w-full mb-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Video Teaser</h2>
          <Separator className="mb-4" />
          <div className="w-full aspect-video max-w-xl mb-4 rounded-lg overflow-hidden bg-black mx-auto">
            {/* Replace the src with your actual video link */}
            <video
                  src={teaserVideo}
                  controls       // 显示播放/暂停进度条
                  className="w-full h-full object-cover"
                  poster={teaser} // 在视频加载前，显示你之前换好的 teaser 图片作为封面
                  playsInline
                >
            </video>
          </div>
          {/* Reserved space for talk video link */}
        </section>

        {/* Pipeline Section */}
        {/* <section className="w-full mb-6">
          <h2 className="text-2xl font-semibold mb-2">Computation Pipeline</h2>
          <Separator className="mb-4" />
          <p className="leading-relaxed text-justify break-words">
            MIND's computation pipeline consists of several modules: data ingestion, preprocessing, feature extraction, narrative generation, and visualization. Each module is designed to be extensible and interpretable, allowing for integration of new data types and analytic methods.
          </p>
          <p className="mt-4 leading-relaxed text-justify break-words">
            The pipeline ensures that raw clinical and behavioral data are transformed into actionable insights, presented in a narrative format that is accessible and clinically relevant.
          </p>
          <div className="w-full flex justify-center mb-6 mt-6">
            <div className="w-full max-w-2xl bg-gray-100 rounded-lg flex items-center justify-center h-64">
              <span className="text-gray-400">[Pipeline diagram coming soon]</span>
            </div>
          </div>
        </section> */}

        {/* Bibliography Section */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold mb-2">BibTeX</h2>
          <Separator className="mb-4" />
          <div className="relative">
            <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono relative whitespace-pre-line leading-relaxed break-words">
              <code style={{ wordBreak: "break-all", whiteSpace: "pre-line" }}>
                {bibliography}
              </code>
              <Toaster />
              <Button
                size="default"
                variant="outline"
                onClick={handleCopyBib}
                className="absolute top-2 right-2 px-2 py-1 text-xs flex items-center gap-1"
                aria-label="Copy citation"
              >
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </pre>
          </div>
        </section>

        <footer className="w-full mt-5 flex justify-between items-center py-6">
          <a
            href="https://sea-lab.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm hover:underline"
          >
            © SEA Lab 2026
          </a>
          <img
            src={seaLabLogo}
            alt="SEA Lab Logo"
            className="h-16"
            style={{ display: "inline-block" }}
          />
        </footer>
      </div>
    </div>
  );
}
