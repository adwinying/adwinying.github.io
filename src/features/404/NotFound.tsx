import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "@/components/Link";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="container mx-auto flex-grow px-4 py-10 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 font-light">
            <span className="block text-8xl">404!</span>
            <span className="block text-2xl">[Page Not Found]</span>
          </h2>

          <p>
            The page you&apos;re looking for could not be found.{" "}
            <br className="hidden sm:block" />
            Perhaps you would like to go back to the{" "}
            <Link href="/">main page</Link>?
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
