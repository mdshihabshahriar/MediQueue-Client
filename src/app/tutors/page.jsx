import TutorCard from "@/components/TutorCard";

const TutorPage = async () => {
    const res = await fetch('http://localhost:5001/tutors');
    const tutors = await res.json()

    console.log(tutors)

    return (
        <div>
            Tutor
            <div>
                {
                    tutors.map(t => <TutorCard key={t._id} tutor={t}></TutorCard>)
                }
            </div>
        </div>
    );
};

export default TutorPage;