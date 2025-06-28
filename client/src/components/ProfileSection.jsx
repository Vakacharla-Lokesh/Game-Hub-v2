export default function ProfileSection() {
  const team = [
    { name: 'Aadvik Bharadwaj', role: 'Frontend Dev', link: '#' },
    { name: 'Khushi Omar', role: 'UI/UX Designer', link: '#' },
    // Add more team members
  ];

  return (
    <section className="bg-black py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Meet the Creators</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {team.map((member, i) => (
          <div key={i} className="bg-yellow-400 p-4 rounded-xl text-black w-64 shadow-md">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p>{member.role}</p>
            <a href={member.link} className="text-blue-600 underline">Profile</a>
          </div>
        ))}
      </div>
    </section>
  );
}
