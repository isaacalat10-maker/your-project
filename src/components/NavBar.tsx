import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { allPages } from "../pages/allRoutes";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const context = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = allPages.map((page) => ({
    label: page.label,
    path: page.path,
  }));

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 no-underline"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-lg">
              AL
            </span>

            <span className="text-sm font-semibold text-foreground">
              ISAAC ALAT
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium no-underline transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {route.label}

                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-primary to-secondary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Desktop Theme Button */}
            <button
              type="button"
              onClick={context?.toggleTheme}
              className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                border border-border
                                bg-surface
                                text-muted
                                transition
                                hover:bg-surface-hover
                                hover:text-foreground
                            "
              aria-label={
                context?.theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <FontAwesomeIcon
                icon={context?.theme === "dark" ? faSun : faMoon}
              />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Button */}
            <button
              type="button"
              onClick={context?.toggleTheme}
              className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                border border-border
                                bg-surface
                                text-muted
                                transition
                                hover:bg-surface-hover
                                hover:text-foreground
                            "
              aria-label={
                context?.theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <FontAwesomeIcon
                icon={context?.theme === "dark" ? faSun : faMoon}
              />
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-lg
                                border border-border
                                bg-surface
                                text-muted
                                transition
                                hover:bg-surface-hover
                                hover:text-foreground
                            "
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium no-underline transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-surface-hover hover:text-foreground"
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
