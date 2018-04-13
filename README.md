# Exile-Systems
Software used to enrich the Path of Exile  gameplay experience. Contains utilities that helps you quick-logout (200ms - 300ms), see other players in your partyes gear and inventory (if authenticated by the poe website) aswell as currencyrates (from poe.ninja) and item price checking (from poeprices.info) aswell as binding various macros, forcing the poe window ontop and forcing a window size and position (useful for window mode play).

## Project structure

### ExileModels
Shared models between the backend API and the depreciated ExileSystem WPF application

### ExileSystem
Depreciated WPF application, is now build with Electron & Angular 5 in ExileSystemApp instead.

###ExileSystemApp
Angular 5 app

###ExileSystemServer
Backend API with SignalR that uses Redis to save data.

#LogoutConsole
Handles the logout functionality since we can't access the Win32API using Node.js
