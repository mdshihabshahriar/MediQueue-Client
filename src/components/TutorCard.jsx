import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ tutor }) => {
  const initials = tutor.tutorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: 300, fontFamily: "sans-serif" }}
      className="rounded-[14px] border border-[#E5E3F8] overflow-hidden bg-white dark:bg-neutral-900"
    >
      <div className="bg-[#EEEDFE] dark:bg-[#26215C] px-5 py-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#AFA9EC] overflow-hidden shrink-0 bg-[#534AB7] flex items-center justify-center text-[#EEEDFE] text-xl font-medium">
          {tutor.photoUrl ? (
            <Image
              src={tutor.photoUrl}
              alt={tutor.tutorName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <h2 className="text-[#3C3489] dark:text-[#CECBF6] font-medium text-base leading-snug m-0">
            {tutor.tutorName}
          </h2>
          <span className="mt-2 inline-block bg-[#534AB7] text-[#EEEDFE] text-[11px] px-3 py-1 rounded-full tracking-wide">
            {tutor.subjects.join(" · ").toUpperCase()}
          </span>
        </div>
      </div>

      <div className="px-5 pt-3 pb-5">
        <div className="text-sm">
          <div className="flex items-center gap-2 py-2.25 border-b border-gray-100 dark:border-neutral-700 text-gray-400">
            <svg width="16" height="16" fill="none" stroke="#7F77DD" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Available:</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">{tutor.availability}</span>
          </div>
          <div className="flex items-center gap-2 py-2.25 text-gray-400">
            <svg width="16" height="16" fill="none" stroke="#7F77DD" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Starts:</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">{tutor.sessionDate}</span>
          </div>
        </div>

        <div className="mt-3 mb-4 bg-[#EEEDFE] dark:bg-[#26215C] rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-[#534AB7] dark:text-[#AFA9EC] text-sm">Session fee</span>
          <div>
            <span className="text-[#3C3489] dark:text-[#CECBF6] text-xl font-medium">৳{tutor.hourlyFee}</span>
            <span className="text-[#7F77DD] text-xs"> / hr</span>
          </div>
        </div>

        <Link href={`/tutors/${tutor._id}`}><button className="btn w-full bg-[#534AB7] hover:bg-[#3C3489] text-[#EEEDFE] py-3 rounded-xl text-sm font-medium">
          Book session
        </button></Link>
      </div>
    </div>
  );
};

export default TutorCard;