using ExileSystem.Classes;
using ExileSystem.Models;
using Microsoft.AspNet.SignalR.Client;
using System;
using System.Threading;
using System.Windows;

namespace ExileSystem
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {   
        public Thread Thread { get; set; }
        public bool Active { get; set; }
        private Settings _settings;
        private LogReader logReader;

        public MainWindow()
        {

            _settings = Settings.Load();
            logReader = new LogReader(_settings.LogPath);

            LogReader.NewMessage += NewMessageDetected;
            SnippingTool.AreaSelected += OnAreaSelectedAsync;

            HubProxy.Initialize();
            LocalPlayer.Initialize();
            InitializeComponent();
        }

        private void NewMessageDetected(object sender, MessageEventArgs args)
        {
            UpdateHandler.HandleUpdateFromMessage(args.Message);
        }
        

        private void ImageUpdate(string bitmapString)
        {
            var imageSource = bitmapString.Base64StringToImagesouce();
            imageSource.Freeze();

            if (WpfImage.Dispatcher.CheckAccess())
            {
                WpfImage.Source = imageSource;
            }
            else
            {
                Action act = () => { WpfImage.Source = imageSource; };
                WpfImage.Dispatcher.BeginInvoke(act);
            }
        }

        private void Update(string message)
        {
            //Dispatcher.Invoke(DispatcherPriority.Normal, (Action)(() => this.Close()));
        }

        private void ClipScreen_Click(object sender, RoutedEventArgs e)
        {
            SnippingTool.Snip();
        }

        private void OnAreaSelectedAsync(object sender, EventArgs e)
        {
            string base64String = SnippingTool.Image.ImageToBase64String();
            HubProxy.BroadcastImage(base64String);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if ((string)startButton.Content == "Start")
            {
                logReader.Start();
                startButton.Content = "Stop";
            }
            else
            {
                startButton.Content = "Start";
                logReader.Stop();
            }
        }
        
        private void Settings_Click(object sender, RoutedEventArgs e)
        {
            var settingsWindow = new SettingsWindow();
            settingsWindow.Closing += SettingsWindow_Closing;
            settingsWindow.Show();
        }

        private void SettingsWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            _settings = Settings.Load();
            logReader = new LogReader(_settings.LogPath);
        }
    }

}

