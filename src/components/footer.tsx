import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="mx-auto px-6 sm:px-12 py-8 lg:py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Smart Tools. Built with{" "}
              <span className="text-destructive">❤️</span> by{" "}
              <Link
                href="https://www.linkedin.com/in/praveenskg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
              >
                Praveen Singh
              </Link>
            </p>
            <p className="text-xs text-muted-foreground/70 text-center md:text-left">
              Professional calculator suite for modern workflows
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/Praveenskg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="GitHub Profile"
            >
              <FaGithub className="text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/praveenskg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://twitter.com/its_praveen_s"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
