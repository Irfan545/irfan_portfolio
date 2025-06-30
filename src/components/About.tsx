import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[40vh] py-16">
      <div className="bg-[#18171c] rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center max-w-4xl w-full gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-lg">
            <Image
              src="/Images/irfan.png"
              alt="Irfan Mohammed"
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-purple-400 mb-2">About Me</h2>
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">
            Irfan Mohammed
          </h3>
          <div className="text-lg text-gray-300 leading-relaxed space-y-4">
            <p>
              <span className="font-semibold text-purple-400">
                Passionate developer
              </span>{" "}
              who loves building beautiful web experiences.
            </p>
            <p>
              <span className="font-semibold">Frontend developer</span> with{" "}
              <span className="font-semibold text-purple-400">
                2 years of experience
              </span>{" "}
              building clean, responsive, and engaging web interfaces.
            </p>
            <p>
              With the help of{" "}
              <span className="font-semibold text-purple-400">
                AI tools like Cursor
              </span>
              , I’ve expanded my skill set to develop{" "}
              <span className="font-semibold">full-stack applications</span>,
              turning ideas into fully functional products from start to finish.
            </p>
            <p>
              I’m passionate about{" "}
              <span className="font-semibold text-purple-400">
                combining great design with smart development practices
              </span>
              , and I’m always exploring new technologies to stay ahead of the
              curve.
            </p>
            <p>
              I love tackling new challenges, learning from every project, and
              pushing what’s possible with{" "}
              <span className="font-semibold text-purple-400">
                modern web development and AI
              </span>
              .
            </p>
            <p>
              When I’m not coding, you’ll probably find me experimenting with
              new tools, contributing to side projects, or enjoying a good cup
              of coffee.
            </p>
            <p className="italic text-gray-400">
              I’m always excited to connect and collaborate — let’s build
              something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
