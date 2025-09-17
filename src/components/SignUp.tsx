import React, { useState } from "react";
import { Link } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserAuth } from "@/context/AuthContext";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { session, signUpNewUser } = UserAuth();
  console.log(session);

  return (
    <div>
      <form className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign up Today!</h2>
        <p>
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="underline decoration-blue-500 text-blue-400 hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
        <div className="flex flex-col py-4 gap-2">
          {/* <Input type="text" placeholder="Name" /> */}
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
