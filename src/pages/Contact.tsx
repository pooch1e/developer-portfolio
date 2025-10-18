import resume from '../assets/docs/JoelKram_Junior Fullstack Developer.pdf';
import { Headshot } from '../../World/headshot/Headshot.tsx';
export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-700 transition-colors duration-300 ease-linear">
      <section className="max-w-4xl mx-auto px-4 py-8 text-black dark:text-white text-[11pt] font-['Neue'] tracking-[-0.3px]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
          <Headshot />
          <div className="flex gap-4">
            <p>
              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
              ⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⢀⣀⣀⣠⣤⣀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⢠⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇
              ⠀⣠⣶⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠃⠀ ⢸⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀⠀
              ⠀⠀⠀⠀⠉⠛⠿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡄ ⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣦⣤⣤⣄⣀⣀⣤⡿⠃
              ⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            </p>
          </div>
        </div>
        <div className="flex ml-1 w-1/2">
          <p>
            I'm a developer with a background in production, customer service,
            and the arts — so I know how to collaborate, adapt, and stick with a
            problem until it's solved. I love building visual experiences,
            playful interfaces, and digital spaces that invite people to
            explore. I'm currently open to freelance and contract work.
          </p>
        </div>
        <div className="flex gap-4 mt-18 ml-1">
          {' '}
          <p>London</p>
          <p>joelnskram@gmail.com</p>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            View Resume
          </a>
        </div>
      </section>
    </div>
  );
}
