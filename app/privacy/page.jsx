export const metadata = {
  title: "Privacy Policy - Alma AI",
};

import LoggedOutHeader from "../components/LoggedOutHeader";

export default function Privacy() {
  return (
    <>
      <LoggedOutHeader />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">This Privacy Policy describes how we collect, use, and disclose information when you use the Service.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">We may collect personal information you provide when creating an account or otherwise interacting with the Service.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Information</h2>
        <p className="mb-4">We use the information we collect to operate and maintain the Service, respond to inquiries, and improve our offerings.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Sharing of Information</h2>
        <p className="mb-4">We do not sell your personal information. We may share information with service providers who assist us in delivering the Service.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
      </div>
    </>
  );
}
