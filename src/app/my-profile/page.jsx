'use client'

import { authClient } from "@/lib/auth-client"; 
import { Mail, ShieldCheck, ShieldAlert, CalendarDays } from "lucide-react";
import Image from "next/image";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div style={shell}>
        <div style={{ color: "#9A958A", fontSize: 14 }}>Loading profile…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={shell}>
        <div style={{ color: "#9A958A", fontSize: 14 }}>You&apos;re not signed in.</div>
      </div>
    );
  }

  const initials = (user.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div style={shell}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: -64 }}>
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: "50%",
              padding: 4,
              background: "linear-gradient(135deg, #E8A33D, #C9622E)",
            }}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                width={100}
                height={100}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  background: "#fff",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#2E2A26",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {initials}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: "#211E1B",
            }}
          >
            {user?.name}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 8,
              color: "#7A746A",
              fontSize: 13.5,
            }}
          >
            <Mail size={14} />
            {user.email}
          </div>
        </div>

        <div style={{ height: 1, background: "#EEE9E0", margin: "22px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <DetailRow
            icon={
              user.emailVerified ? (
                <ShieldCheck size={16} color="#2F7A4F" />
              ) : (
                <ShieldAlert size={16} color="#B3791E" />
              )
            }
            label="Email status"
            value={user.emailVerified ? "Verified" : "Not verified"}
            tone={user.emailVerified ? "good" : "warn"}
          />
          <DetailRow
            icon={<CalendarDays size={16} color="#8A6A3C" />}
            label="Member since"
            value={formatDate(user.createdAt)}
          />
        </div>
      </div>
    </div>
  );
}

const shell = {
  fontFamily: "'Inter', system-ui, sans-serif",
  minHeight: "100%",
  background: "#F8F6FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
};

const card = {
  background: "#fff",
  width: "100%",
  maxWidth: 380,
  borderRadius: 20,
  padding: "84px 30px 30px",
  boxShadow: "0 16px 50px rgba(40,30,10,0.08)",
  border: "1px solid #F1ECE0",
  position: "relative",
};

function DetailRow({ icon, label, value, tone }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, color: "#6E685D", fontSize: 13.5 }}>
        {icon}
        {label}
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: tone === "good" ? "#2F7A4F" : tone === "warn" ? "#B3791E" : "#211E1B",
          background: tone === "good" ? "#EAF5EE" : tone === "warn" ? "#FBF0DD" : "transparent",
          padding: tone ? "3px 10px" : 0,
          borderRadius: 999,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default ProfilePage;