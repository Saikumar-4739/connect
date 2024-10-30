import AppLayout from "app-layout/app-layout";
import Home from "app-layout/home-page";
import NotFound from "app-layout/not-found";
import SettingsPage from "components/pages/setting-page/settings-page";
import BotPage from "components/pages/side-nav-pages/bot-page";
import CalendarPage from "components/pages/side-nav-pages/calendar-page";
import ChatPage from "components/pages/side-nav-pages/chat-page";
import CommunityPage from "components/pages/side-nav-pages/community-page";
import { ThemeProvider } from "components/pages/theme-change";
import { Route, Routes} from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <Routes>
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/bot" element={<BotPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} /> {/* Fallback route */}
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
