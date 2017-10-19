using ExileSystem.Classes;
using ExileSystem.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace ExileSystem
{
    public class LogReader
    {
        private List<string> lastLines;
        private string clientLogPath;
        private FileSystemWatcher fileWatcher;
        private Timer fileTimer;
        public delegate void MessageEventHandler(object sender, MessageEventArgs args);
        public static MessageEventHandler NewMessage;

        public LogReader(string path)
        {
            clientLogPath = path;
            fileWatcher = new FileSystemWatcher();
            fileWatcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.LastAccess | NotifyFilters.Size;
            fileWatcher.Path = path;
            fileWatcher.Filter = "Client.txt";
            //fileWatcher.Changed += _fileWatcher_Changed;
            fileWatcher.EnableRaisingEvents = true;

            fileTimer = new Timer(250);
            fileTimer.Elapsed += _fileTimer_Elapsed;
        }

        public void Start()
        {
            fileTimer.Start();
        }

        public void Stop()
        {
            fileTimer.Stop();
        }

        private void _fileTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            checkForUpdates();
        }

        private void _fileWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            checkForUpdates();
        }

        public void DebugMessage(string message)
        {
            checkForUpdates(message);
        }

        private void checkForUpdates(string debug = null)
        {
            fileTimer.Stop();

            var reverseReader = new ReverseLineReader(clientLogPath + "\\client.txt");
            var lines = reverseReader.Take(10).ToList();

            if (lastLines == null)
            {
                lastLines = lines;
            }
            else
            {
                var newLines = lines.Except(lastLines).ToList();
                lastLines = lines;

                foreach (var line in newLines)
                {
                    Message message = new Message(line);
                    NewMessage(null, new MessageEventArgs(message));
                }
            }

            fileTimer.Start();

        }
    }
}
