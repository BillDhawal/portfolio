import About from "@/components/About";
import BackgroundMusic from "@/components/BackgroundMusic";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoShowcase from "@/components/VideoShowcase";
import Work from "@/components/Work";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <VideoShowcase />
        <About />
        <Work />
        <Experience />
        <Writing />
        <Footer />
      </main>
      <BackgroundMusic />
    </>
  );
}
