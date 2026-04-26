import About from "@/components/About";
import BackgroundMusic from "@/components/BackgroundMusic";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoShowcase from "@/components/VideoShowcase";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <VideoShowcase />
        <About />
        <Work />
        <Footer />
      </main>
      <BackgroundMusic />
    </>
  );
}
