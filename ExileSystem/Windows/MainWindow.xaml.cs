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
        private Settings settings;
        private LogReader logReader;
        private ExternalResources external;
        private bool verifyPending;

        public MainWindow()
        {
            external = new ExternalResources();
            external.GetItemsFromPoE("Umaycry","Big_P");
            
            verifyPending = true;
            settings = Settings.Load();
            
            LogReader.NewMessage += NewMessageDetected;

            HubProxy.Initialize();
            LocalPlayer.Initialize();

            InitializeComponent();
            
            pathTextBox.Text = settings.LogPath;
            channelTextBox.Text = settings.Channel;
            accountTextBox.Text = settings.AccountName;
            characterTextBox.Text = settings.CharacterName;
        }

        private void NewMessageDetected(object sender, MessageEventArgs args)
        {
            messageInfoTextBlock.Dispatcher.Invoke(() =>
            {
                if (args.Message.Type != Message.MessageType.Other && !verifyPending)
                {
                    messageInfoTextBlock.Text = args.Message.Text;
                    UpdateHandler.HandleUpdateFromMessage(args.Message);
                }

                if (verifyPending)
                {
                    if (args.Message.Text == verifyTextBox.Text && args.Message.Player == settings.CharacterName && args.Message.Type == Message.MessageType.Message)
                    {
                        WorkingPanel.Visibility = Visibility.Visible;
                        informationPanel.Visibility = Visibility.Visible;
                        verifyPanel.Visibility = Visibility.Hidden;

                        accountInfoTextBlock.Text = settings.AccountName;
                        characterInfoTextBlock.Text = settings.CharacterName;

                        verifyPending = false;

                        HubProxy.Start();
                        HubProxy.LoginAsync(settings.Channel);
                    }
                }
            });

        }        
                
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            verifyProgress.Visibility = Visibility.Visible;
            errorTextbox.Visibility = Visibility.Hidden;

            settings.LogPath = pathTextBox.Text.Replace("Client.txt", "").Replace("client.txt", "");
            settings.AccountName = accountTextBox.Text;
            settings.CharacterName = characterTextBox.Text;
            settings.Channel = channelTextBox.Text;
            settings.Save();
            
            LocalPlayer.player.Account = settings.AccountName;
            LocalPlayer.player.Channel = settings.Channel;
            LocalPlayer.player.Character = external.GetItemsFromPoE(settings.AccountName, settings.CharacterName);
            
            verifyProgress.Visibility = Visibility.Hidden;
            
            if (LocalPlayer.player.Character == null)
            {
                errorTextbox.Visibility = Visibility.Visible;
                return;
            }

            logReader = new LogReader(settings.LogPath);
            logReader.Start();

            var gameCode = Helpers.GetChannel();
            verifyTextBox.Text = ".verify " + gameCode;

            LoginPanel.Visibility = Visibility.Hidden;
            verifyPanel.Visibility = Visibility.Visible;

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

        private void backFromVerifyButton_Click(object sender, RoutedEventArgs e)
        {
            logReader.Stop();
            LoginPanel.Visibility = Visibility.Visible;
            WorkingPanel.Visibility = Visibility.Hidden;
            informationPanel.Visibility = Visibility.Hidden;
            verifyPanel.Visibility = Visibility.Hidden;
        }
    }

}

