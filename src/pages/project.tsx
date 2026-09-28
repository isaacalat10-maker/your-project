import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faLaptopCode,
    faMobileScreenButton,
    faSchool,
} from "@fortawesome/free-solid-svg-icons";

type ProjectCategory = "All" | "Web" | "Mobile";

interface Project {
    title: string;
    category: Exclude<ProjectCategory, "All">;
    type: string;
    description: string;
    technologies: string[];
    icon: typeof faLaptopCode;
    mediaType: "video" | "image";
    mediaSrc: string;
    poster?: string;
}

const projects: Project[] = [
    {
        title: "Whatapp Platform",
        category: "Web",
        type: "Full-stack",
        description:
            "An offline-first Whatapp platform with chat management, real-time privacy, chat stability",
        technologies: [
            "NestJS",
            "React",
        ],
        icon: faLaptopCode,
        mediaType: "video",
        mediaSrc: "/projects/isaac.mp4",
        poster: "/projects/isaac.png",
    },
    {
        title: "School Management Portal",
        category: "Web",
        type: "Web Developing",
        description:
            "A school management system with a parent portal for student results, academic records and school administration.",
        technologies: ["Laravel", "Inertia", "React", "MySQL"],
        icon: faSchool,
        mediaType: "video",
        mediaSrc: "/projects/your-project.mp4",
        poster: "/projects/your-project.png",
    },
    {
        title: "Teacher Exam Processing App",
        category: "Mobile",
        type: "Android",
        description:
            "A teacher-focused Android application designed for offline-first exam processing and synchronization within a school environment.",
        technologies: ["Kotlin", "MVVM", "Room", "RPC"],
        icon: faMobileScreenButton,
        mediaType: "image",
        mediaSrc: "/projects/teacher-exam-app.png",
    },
];

const filters: ProjectCategory[] = ["All", "Web", "Mobile"];

export const ProjectPage = () => {
    const [activeFilter, setActiveFilter] =
        useState<ProjectCategory>("All");

    const filteredProjects =
        activeFilter === "All"
            ? projects
            : projects.filter(
                  (project) => project.category === activeFilter
              );

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        My Work
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                        Projects
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary md:text-base">
                        A collection of applications and systems I've built
                        while exploring different areas of web development.
                    </p>
                </div>
            </section>

            {/* Project Listing */}
            <section className="py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    rounded-full border px-4 py-2 text-sm
                                    font-medium transition
                                    ${
                                        activeFilter === filter
                                            ? "border-primary bg-primary text-white"
                                            : "border-border bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
                                    }
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Cards */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <article
                                key={project.title}
                                className="
                                    group flex flex-col overflow-hidden
                                    rounded-2xl border border-border
                                    bg-surface transition duration-200
                                    hover:-translate-y-1
                                "
                            >
                                {/* Media Preview */}
                                <div className="overflow-hidden bg-background">
                                    {project.mediaType === "video" ? (
                                        <video
                                            className="aspect-video w-full object-cover"
                                            controls
                                            preload="metadata"
                                            poster={project.poster}
                                        >
                                            <source
                                                src={project.mediaSrc}
                                                type="video/mp4"
                                            />
                                            Your browser does not support
                                            video playback.
                                        </video>
                                    ) : (
                                        <img
                                            src={project.mediaSrc}
                                            alt={`${project.title} preview`}
                                            className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                        {project.category}
                                    </p>

                                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                                        {project.title}
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.technologies.map(
                                            (technology) => (
                                                <span
                                                    key={technology}
                                                    className="
                                                        rounded-full border
                                                        border-border bg-background
                                                        px-3 py-1 text-xs text-muted
                                                    "
                                                >
                                                    {technology}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    {/* Details Link */}
                                    <div className="mt-auto border-t border-border pt-5">
                                        <Link
                                            to="/contact"
                                            className="
                                                inline-flex items-center gap-2
                                                text-sm font-medium
                                                text-primary no-underline
                                                transition hover:opacity-80
                                            "
                                        >
                                            Request more details
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
