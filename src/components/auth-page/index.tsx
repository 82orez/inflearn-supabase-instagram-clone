"use client";

import { useState } from "react";
import Signup from "@/components/auth-page/signup";
import Signin from "@/components/auth-page/signin";

export default function AuthPage() {
  const [view, setView] = useState("signup");

  return <main>{view === "signup" ? <Signup setView={setView} /> : <Signin setView={setView} />}</main>;
}
