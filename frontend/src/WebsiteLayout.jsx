import Website_Navbar from "./components/websitecomponents/Website_Navbar";
import Website_Footer from "./components/websitecomponents/Website_Footer";
const WebsiteLayout = ({ children }) => {
  return (
    <div className="bg-black">
      <Website_Navbar />
      {children}
      <Website_Footer />
    </div>
  );
};



export default WebsiteLayout;