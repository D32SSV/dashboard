"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import ProfileCard from "@/app/components/reusable/profile/ProfileCard";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfileData, updateCallbackUrl } from "../actions/profileData";
import { useRouter } from "next/navigation";
import Loader from "../components/reusable/Loader";
import InputCard from "../components/reusable/profile/InputCard";
import { InputCardContainer } from "../components/reusable/profile/InputCardContainer";
import { ResetPasswordInput } from "../components/reusable/profile/ResetPasswordInput";

interface ProfileData {
  api: string;
  callbackUrl?: string;
}

const dataMap = {
  apiKey: "Api Key",
  callbackUrl: "Callback Url",
  merchantId: "Merchant Id",
  password: "Password",
} as const;

const Page = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    api: "",
    callbackUrl: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
    const getData = async () => {
      const data = await getProfileData(token);
      setProfileData(data);
      return data;
    };
    try {
      setIsLoading(true);
      getData();
    } catch (error) {
      setError("Something went wrong while getting profile data");
    } finally {
      setIsLoading(false);
    }
  }, [token, router]);

  if (error) {
    return (
      <ProtectedRoute>
        <div className="p-4 text-red-600 font-bold">{error}</div>
      </ProtectedRoute>
    );
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="w-full h-[80vh] flex items-center justify-center flex-col gap-4">
          <Loader />
          <p>Loading... Please wait</p>
        </div>
      </ProtectedRoute>
    );
  }

  const handleUpdateCallbackUrl = async (callbackUrl: string) => {
    const response = await updateCallbackUrl(token, callbackUrl);
    return response;
  };

  return (
    <ProtectedRoute>
      <div className="lg:mx-48 lg:px-24">
      <div className="p-4 flex flex-col flex-wrap gap-4 md:gap-8 md:flex-row mt-8 items-center justify-center">
        {Object.entries(profileData).map(([key, value], index) => (
          <ProfileCard
            title={dataMap[key as keyof typeof dataMap]}
            data={value}
            key={index}
          />
        ))}
      </div>
      <hr className="my-8 mx-2 rounded-2xl border-t-8 border-t-sky-600"/>
      <div className="p-4 flex flex-col gap-4 md:gap-8 md:flex-col items-center justify-center">
        {Object.entries(dataMap)
          .filter(([key, value]) => key === "callbackUrl")
          .map(([key, value], index) => (
            <InputCardContainer
              key={index}
              title={"Update " + value}
              isPassword={key === "password"}
              submitHandler={handleUpdateCallbackUrl}
            />
          ))}
        <ResetPasswordInput />
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
