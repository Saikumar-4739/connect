// App.tsx
import React from 'react';
import LoginPage from './components/login-page';
// import { Route, Routes } from 'react-router-dom';
// import AppLayout from './components/app-layout/app-layout';
// import CommunityPage from './components/side-nav-pages/community-page';
// import ChatPage from './components/side-nav-pages/chat-page';
// import CalendarPage from './components/side-nav-pages/calendar-page';
// import BotPage from './components/side-nav-pages/bot-page';
// import SettingsPage from './components/setting-page/settings-page';
// import { ThemeProvider } from './components/theme-change/theme-context';

const App: React.FC = () => {
  return (
    // <ThemeProvider>
    // <AppLayout>
    //   <Routes>
    //     <Route path="/community" element={<CommunityPage />} />
    //     <Route path="/chat" element={<ChatPage />} />
    //     <Route path="/calendar" element={<CalendarPage />} />
    //     <Route path="/bot" element={<BotPage />} />
    //     <Route path="/settings" element={<SettingsPage />} />
    //     <Route path="/" element={<ChatPage />} />
    //   </Routes>
    // </AppLayout>
    // </ThemeProvider>

    <div>
      <LoginPage/>
    </div>
  );
};

export default App;
