import BookSessionButton from "@/components/BookSessionButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })

  // console.log(token)

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const tutor = await res.json();

  const initials = tutor.tutorName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
     <div className="max-w-3xl mx-auto px-4 py-6 pb-12">

      <div className="grid md:grid-cols-[220px_1fr] gap-5 items-start">

        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white dark:bg-slate-900">
          <div className="relative w-full overflow-hidden bg-purple-200" style={{ aspectRatio: "2/3" }}>
            {tutor.photoUrl ? (
              <Image
                src={tutor.photoUrl}
                alt={tutor.tutorName}
                className="w-full h-full object-cover object-top"
                width={100}
                height={100}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[60px] font-medium text-purple-400 tracking-tighter">
                  {initials}
                </span>
              </div>
            )}

            <div
              className="absolute bottom-0 left-0 right-0 h-[40%]"
              style={{ background: "linear-gradient(to top, #26215Cdd, transparent)" }}
            />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1">
              {tutor.subjects?.map((s) => (
                <span key={s} className="text-[10px] text-purple-200 border border-purple-300/30 bg-purple-300/15 rounded-full px-2 py-0.5">
                  {s.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="px-3.5 py-3">
            <p className="text-[15px] font-medium text-gray-900">{tutor.tutorName}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{tutor.institution ?? "Experienced Tutor"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 dark:bg-slate-500">
              <span className="text-purple-600 text-sm">📅</span>
              <span className="text-[11px] font-medium text-gray-700 uppercase tracking-wide">Session details</span>
            </div>
            {[
              { icon: "🕐", label: "Availability", value: tutor.availability },
              { icon: "☀️", label: "Mode", value: tutor.teachingMode.join(" · ").toUpperCase() ?? "Flexible" },
              { icon: "📆", label: "Session starts", value: tutor.sessionDate },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-0">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{icon}</span> {label}
                </span>
                <span className="text-xs font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 dark:bg-slate-500">
              <span className="text-purple-600 text-sm">👤</span>
              <span className="text-[11px] font-medium text-gray-700 uppercase tracking-wide">Tutor info</span>
            </div>
            {[
              { icon: "🎓", label: "Experience", value: tutor.experience ?? "5+ years" },
              { icon: "👥", label: "Remaining Slots", value: tutor.totalSlot ?? "120+" },
              { icon: "📍", label: "Location", value: tutor.location ?? "Dhaka" },
              // { icon: "🗣️", label: "Medium", value: tutor.medium ?? "Bangla & English" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-0">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{icon}</span> {label}
                </span>
                <span className="text-xs font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* About */}
          {/* <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-purple-600 text-sm">ℹ️</span>
              <span className="text-[11px] font-medium text-gray-700 uppercase tracking-wide">About</span>
            </div>
            <p className="px-4 py-3.5 text-sm text-gray-500 leading-relaxed">
              {tutor.bio ?? "No bio available for this tutor."}
            </p>
          </div> */}

          <div className="rounded-xl border border-purple-200 bg-purple-50 dark:bg-slate-900 px-4 py-3.5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-purple-500 uppercase tracking-wide">Hourly fee</span>
              <p className="text-[26px] font-medium text-purple-900 leading-none">
                ৳{tutor.hourlyFee}
                <span className="text-[11px] font-normal text-purple-400 ml-1">/ hr</span>
              </p>
            </div>
            <BookSessionButton tutor={tutor} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
