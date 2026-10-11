import { Link } from "react-router";
import { Band, PageBody } from "../components/common/Band";

export default function NotFound() {
  return (
    <>
      <Band eyebrow="404" title="Page not found" tagline="That page doesn't exist. Use the sidebar or head back to the dashboard." />
      <PageBody>
        <Link
          to="/dashboard"
          className="inline-flex w-fit items-center rounded-[10px] bg-primary px-4 py-2.5 text-[0.9rem] font-semibold text-primary-ink no-underline hover:brightness-110"
        >
          Back to dashboard
        </Link>
      </PageBody>
    </>
  );
}
