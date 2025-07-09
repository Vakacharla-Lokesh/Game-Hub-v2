import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";

export default function ProfileSection() {
  const team = [
    {
      name: "VAKACHARLA LOKESH",
      role: "Full Stack Developer",
      image: "/assets/images/lokesh_profile.jpg",
      linkedin:
        "https://www.linkedin.com/in/lokesh-vakacharla-00472a250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "#",
      email: "lokeshgpta04@gmail.com",
      college: "Amity University Noida",
      resume: "pdf",
      github: "https://github.com/Vakacharla-Lokesh",
    },
    {
      name: "KHUSHI OMAR",
      role: "Frontend Developer",
      image: "/assets/images/khushi_profile.jpg",
      linkedin: "#",
      instagram: "#",
      email: "khushi@example.com",
      college: "Amity University Noida",
      resume: "pdf",
      github: "",
    },
    // Add more as needed
  ];

  return (
    <section
      className="w-full bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] px-10 py-24 text-white font-[Poppins]"
      id="profile"
    >
      <h2 className="text-5xl font-extrabold text-center mb-24 text-white tracking-widest drop-shadow-2xl">
        ✨ Meet the Creators
      </h2>

      <div className="flex justify-center gap-16 flex-wrap max-w-[1600px] mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="flex bg-white/10 backdrop-blur-lg p-8 rounded-3xl w-full lg:w-[45%] xl:w-[48%] items-center gap-8 shadow-xl hover:shadow-yellow-300/40 transition duration-500"
          >
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white-200 shadow-md"
            />

            {/* Details */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-lg text-white mb-1">{member.role}</p>
              <p className="text-md text-gray-300 mb-4">{member.college}</p>
              <div className="flex gap-6 text-yellow-300 text-2xl">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`mailto:${member.github}`}
                  className="hover:text-white transition"
                >
                  <FaGithub />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-white transition"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
