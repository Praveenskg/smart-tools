import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm ">
      <div className="absolute top-0 h-[0.5px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8  max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
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
            <p className="text-xs text-muted-foreground/70">
              Professional calculator suite for modern workflows
            </p>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <Link
              href="https://github.com/Praveenskg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="GitHub Profile"
            >
              <FaGithub className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/praveenskg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://twitter.com/its_praveen_s"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
