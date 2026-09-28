import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-background text-foreground">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-foreground">
                        ISAAC ALAT
                    </p>

                    <p className="mt-1 text-xs text-muted">
                        Building websites and learning how systems work.
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <a
                        href="https://github.com/isaacalat10-maker"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted transition hover:text-foreground"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>

                  
                    <span className="text-xs text-muted">
                        © {new Date().getFullYear()} ISAAC ALAT
                    </span>
                </div>
            </div>
        </footer>
    );
};

