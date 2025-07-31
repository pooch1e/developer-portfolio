import resume from '../src/assets/docs/JoelKram_2025.pdf';
import { Headshot } from '../src/threejs/Headshot';
export default function ContactPage() {
  return (
    <section className=" space-y-4 px-4 grid-cols-2 gap-1 ml-1 mt-40 text-black text-[11pt] font-['Neue'] tracking-[-0.3px]  mx-auto">
      <div className="mb-4 flex w-50">
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
          I'm a developer with a background in production, customer service, and
          the arts — so I know how to collaborate, adapt, and stick with a
          problem until it's solved. I love building visual experiences, playful
          interfaces, and digital spaces that invite people to explore. I'm
          currently open to freelance and contract work.
        </p>
      </div>
      <div className="flex gap-4 mt-4 ml-1">
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
  );
}
