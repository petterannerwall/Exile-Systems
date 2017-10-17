using System;
using System.IO;
using System.Web.Script.Serialization;

namespace ExileSystem
{
    public class Settings : AppSettings<Settings> 
    {
        public string LogPath = "";
        public string AccountName = "";
        public string CharacterName = "";
    }

    public class AppSettings<T> where T : new()
    {
        public delegate void EventHandler(object sender, EventArgs args);
        public static EventHandler SettingsSaved;
        private const string DefaultFilename = "settings.json";

        public void Save(string fileName = DefaultFilename)
        {
            File.WriteAllText(fileName, (new JavaScriptSerializer()).Serialize(this));
        }

        public static void Save(T pSettings, string fileName = DefaultFilename)
        {
            File.WriteAllText(fileName, (new JavaScriptSerializer()).Serialize(pSettings));

            if (Settings.SettingsSaved != null)
            {
                SettingsSaved(null, new EventArgs());
            }
        }

        public static T Load(string fileName = DefaultFilename)
        {
            T t = new T();
            if (File.Exists(fileName))
                t = (new JavaScriptSerializer()).Deserialize<T>(File.ReadAllText(fileName));
            return t;
        }
    }
}
