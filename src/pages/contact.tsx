import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faPaperPlane,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { allCredentials } from "../constant";

export const ContactPage = () => {
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
const submitController = useRef<AbortController | null>(null);
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Abort any previous request that is still running
    submitController.current?.abort();

    const controller = new AbortController();
    submitController.current = controller;

    setIsSending(true);
    setSent(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        // Read the response as text first
        const responseText = await response.text();

        // Convert to JSON only if there is actually a response
        let result: {
            message?: string;
            error?: string;
        } = {};

        if (responseText) {
            try {
                result = JSON.parse(responseText);
            } catch {
                console.error("Server returned:", responseText);

                throw new Error(
                    "The server returned an invalid response."
                );
            }
        }

        if (!response.ok) {
            throw new Error(
                result.message ||
                result.error ||
                "Something went wrong."
            );
        }

        setSent(true);
        form.reset();

    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
            return;
        }

        console.error("Contact form error:", err);

        setError(
            err instanceof Error
                ? err.message
                : "Failed to send message."
        );

    } finally {
        if (submitController.current === controller) {
            submitController.current = null;
            setIsSending(false);
        }
    }
};

useEffect(() => {
    return () => {
        submitController.current?.abort();
    };
}, []);
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Get In Touch
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                        Let's talk
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text-secondary md:text-base">
                        Have a project, opportunity, or just want to talk
                        about websites? I'd be happy to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-14 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Left Side */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Connect with me
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                            Whether you have a project in mind, want to
                            collaborate, or simply want to connect, feel free
                            to reach out.
                        </p>

                        {/* Email */}
                        <a
                            href={`mailto:${allCredentials['gmail']}`}
                            className="mt-7 flex items-center gap-4 rounded-xl border border-border bg-surface p-4 text-text-secondary no-underline transition hover:bg-surface-hover hover:text-foreground"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>

                            <div>
                                <p className="text-xs text-muted">
                                    Email
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    {allCredentials['gmail']}
                                </p>
                            </div>
                        </a>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>

                            <div>
                                <p className="text-xs text-muted">
                                    Location
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    Nigeria
                                </p>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="mt-8">
                            <p className="text-sm font-semibold text-foreground">
                                Find me online
                            </p>

                            <div className="mt-4 flex gap-3">

                                <a
                                    href={allCredentials['github']}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition hover:bg-surface-hover hover:text-foreground"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-foreground">
                                Send a message
                            </h2>

                            <p className="mt-1 text-sm text-muted">
                                Fill out the form and I'll get back to you.
                            </p>
                        </div>

                        {/* Success */}
                        {sent && (
                            <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
                                <FontAwesomeIcon icon={faCheck} />
                                <span>
                                    Message sent successfully. Thank you!
                                </span>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-foreground"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    className="
                                        w-full
                                        rounded-xl
                                        border border-border
                                        bg-background
                                        px-4 py-3
                                        text-sm
                                        text-foreground
                                        outline-none
                                        placeholder:text-muted
                                        transition
                                        focus:border-primary
                                    "
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-foreground"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="
                                        w-full
                                        rounded-xl
                                        border border-border
                                        bg-background
                                        px-4 py-3
                                        text-sm
                                        text-foreground
                                        outline-none
                                        placeholder:text-muted
                                        transition
                                        focus:border-primary
                                    "
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-foreground"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="What's this about?"
                                    className="
                                        w-full
                                        rounded-xl
                                        border border-border
                                        bg-background
                                        px-4 py-3
                                        text-sm
                                        text-foreground
                                        outline-none
                                        placeholder:text-muted
                                        transition
                                        focus:border-primary
                                    "
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-foreground"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    placeholder="Tell me a little about your project..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border border-border
                                        bg-background
                                        px-4 py-3
                                        text-sm
                                        text-foreground
                                        outline-none
                                        placeholder:text-muted
                                        transition
                                        focus:border-primary
                                    "
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSending}
                                className="
                                    inline-flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-primary
                                    px-5 py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:opacity-90
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />

                                {isSending
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="border-t border-border py-14">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <p className="text-lg font-medium leading-8 text-foreground">
                        "Building websites and learning how systems work."
                    </p>

                    <p className="mt-3 text-sm text-muted">
                        — ISAAC ALAT
                    </p>
                </div>
            </section>
        </div>
    );
};