import TutorCard from "@/components/TutorCard";
import { auth } from "@/lib/auth";
import { GraduationCap } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

const TutorPage = async () => {
  const {token} = await auth.api.getToken({
      headers: await headers()
  })
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const tutors = await res.json();

  // console.log(tutors);

  return (
    <div>
      <section className="bg-[#F8F6FF] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
              <GraduationCap className="text-primary" size={40} />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
                Find Your Perfect Tutor
              </h1>

              <p className="mt-3 text-slate-500 dark:text-slate-300">
                Browse verified tutors and book sessions that fit your schedule.
              </p>
            </div>
          </div>

          <Image
            src="/assets/book.png"
            alt="book image"
            width={72}
            height={72}
            className="hidden lg:block w-72"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search tutors..."
            className="input input-bordered col-span-2"
          />

          <input type="date" className="input input-bordered" />

          <input type="date" className="input input-bordered" />

          <button className="btn bg-primary text-white">Filter</button>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-4">
          {tutors.map((t) => (
            <TutorCard key={t._id} tutor={t}></TutorCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
