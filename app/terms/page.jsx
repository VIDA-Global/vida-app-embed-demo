export const metadata = {
  title: "Terms of Service - Alma AI",
};

import LoggedOutHeader from "../components/LoggedOutHeader";

export default function Terms() {
  return (
    <>
      <LoggedOutHeader />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">These Terms of Service ("Terms") govern your use of the Alma AI demo application (the "Service"). By accessing or using the Service you agree to be bound by these Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
        <p className="mb-4">You may use the Service only for lawful purposes and in accordance with these Terms. We reserve the right to suspend or terminate your access for any reason at any time.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Accounts</h2>
        <p className="mb-4">When you create an account you must provide accurate information. You are responsible for safeguarding the password that you use to access the Service and for any activities under your account.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
        <p className="mb-4">We may terminate or suspend your account immediately without prior notice or liability for any reason whatsoever.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
        <p className="mb-4">The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. Your use of the Service is at your sole risk.</p>
      </div>
    </>
  );
}
