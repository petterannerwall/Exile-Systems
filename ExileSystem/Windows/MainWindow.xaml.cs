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
        private ExternalResources external;

        public MainWindow()
        {
            external = new ExternalResources();
            external.GetCharactersFromPoE("Umaycry");
            

            _settings = Settings.Load();
            
            LogReader.NewMessage += NewMessageDetected;

            HubProxy.Initialize();
            LocalPlayer.Initialize();

            InitializeComponent();
            
            pathTextBox.Text = _settings.LogPath;
            channelTextBox.Text = _settings.Channel;
            accountTextBox.Text = _settings.AccountName;
            characterTextBox.Text = _settings.CharacterName;
        }

        private void NewMessageDetected(object sender, MessageEventArgs args)
        {
            

            messageInfoTextBlock.Dispatcher.Invoke(() =>
            {

                if (args.Message.Type != Message.MessageType.Other)
                {
                    messageInfoTextBlock.Text = args.Message.Text;
                }

            });

            UpdateHandler.HandleUpdateFromMessage(args.Message);
        }        
                
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            _settings.LogPath = pathTextBox.Text.Replace("Client.txt", "").Replace("client.txt", "");
            _settings.AccountName = accountTextBox.Text;
            _settings.CharacterName = characterTextBox.Text;
            _settings.Channel = channelTextBox.Text;
            _settings.Save();

            LoginPanel.Visibility = Visibility.Hidden;
            WorkingPanel.Visibility = Visibility.Visible;
            informationPanel.Visibility = Visibility.Visible;

            accountInfoTextBlock.Text = _settings.AccountName;
            characterInfoTextBlock.Text = _settings.CharacterName;
                       
            LocalPlayer.player.Account = _settings.AccountName;
            LocalPlayer.player.Character = _settings.CharacterName;

            HubProxy.Start();
            HubProxy.LoginAsync(_settings.Channel);

            logReader = new LogReader(_settings.LogPath);
            logReader.Start();

        }
        
        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            HubProxy.Stop();
            logReader.Stop();
            Application.Current.Shutdown();
        }

        private void StopButton_Click(object sender, RoutedEventArgs e)
        {
            HubProxy.Stop();
            logReader.Stop();
            LoginPanel.Visibility = Visibility.Visible;
            WorkingPanel.Visibility = Visibility.Hidden;
            informationPanel.Visibility = Visibility.Hidden;
        }
    }

}

