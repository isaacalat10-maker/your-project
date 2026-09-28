import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faEnvelope,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* About Hero */}
            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-6">

                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">

                        {/* Content */}
                        <div>
                            <p className="text-sm font-semibold text-primary">
                                About Me
                            </p>

                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                A Bit About Me
                            </h1>

                            <div className="mt-5 max-w-2xl space-y-4 text-sm leading-6 text-text-secondary">
                                <p>
                                    Hi, I’m Isaac, a passionate web developer who enjoys creating modern,
                                    responsive, and user-friendly websites. I love turning ideas into 
                                    functional digital experiences and solving problems through technology.

                                </p>

                                <p>
                                    I’m constantly learning and improving my skills in web development, 
                                    exploring new technologies, and working on projects that challenge me to grow. 
                                    My goal is to create websites that not only look great but also provide a 
                                    smooth and enjoyable experience for users.

                                </p>
                            </div>

                            {/* Info Cards */}
                            <div className="mt-7 grid gap-3 sm:grid-cols-3">

                                {/* Location */}
                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted">
                                                Location
                                            </p>

                                            <p className="mt-1 text-xs font-medium text-foreground">
                                                Nigeria
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted">
                                                Email
                                            </p>

                                            <p className="mt-1 truncate text-xs font-medium text-foreground">
                                                isaacalat10@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <FontAwesomeIcon
                                                icon={faCircleCheck}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted">
                                                Availability
                                            </p>

                                            <p className="mt-1 text-xs font-medium text-foreground">
                                                Open to opportunities
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portrait */}
                        <div className="mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
                            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                                <img
                                    src="V.png"
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className="pb-20">
                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                            My Journey
                        </h2>

                        <p className="mt-1 text-sm text-text-secondary">
                            Education & Experience
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">

                        {/* Vertical line */}
                        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

                        <div className="space-y-8">

                            {/* Education */}
                            <div className="relative grid grid-cols-[16px_100px_1fr] gap-4 md:grid-cols-[16px_120px_1fr] md:gap-6">

                                <div className="relative z-10 mt-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />

                                <p className="pt-0 text-xs font-medium text-text-secondary md:text-sm">
                                    2025 - 2026
                                </p>

                                <div>
                                    <h3 className="text-sm font-semibold text-foreground md:text-base">
                                        Certified in HTML and CSS
                                    </h3>

                                    <p className="mt-1 text-xs text-text-secondary md:text-sm">
                                        Chyfley Comprehensive College.
                                    </p>
                                </div>
                            </div>

                            {/* Full-stack */}
                            <div className="relative grid grid-cols-[16px_100px_1fr] gap-4 md:grid-cols-[16px_120px_1fr] md:gap-6">

                                <div className="relative z-10 mt-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />

                                <p className="pt-0 text-xs font-medium text-text-secondary md:text-sm">
                                    2025 – Present
                                </p>

                                <div>
                                    <h3 className="text-sm font-semibold text-foreground md:text-base">
                                        Web Developer (Personal
                                        Projects)
                                    </h3>

                                    <p className="mt-1 max-w-xl text-xs leading-5 text-text-secondary md:text-sm">
                                        Building real-world applications and
                                        consistently learning new technologies.
                                    </p>
                                </div>
                            </div>

                            {/* AI / Data Retrieval */}
                            <div className="relative grid grid-cols-[16px_100px_1fr] gap-4 md:grid-cols-[16px_120px_1fr] md:gap-6">

                                <div className="relative z-10 mt-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />

                                <p className="pt-0 text-xs font-medium text-text-secondary md:text-sm">
                                    2025 – Present
                                </p>

                                <div>
                                    <h3 className="text-sm font-semibold text-foreground md:text-base">
                                        IT/Cloud Engineering
                                    </h3>

                                    <p className="mt-1 max-w-xl text-xs leading-5 text-text-secondary md:text-sm">
                                        Developing the skills to design, manage, 
                                        and secure modern cloud technologies.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};