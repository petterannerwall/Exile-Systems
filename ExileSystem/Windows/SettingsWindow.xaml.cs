using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ExileSystem
{
    /// <summary>
    /// Interaction logic for Settings.xaml
    /// </summary>
    public partial class SettingsWindow : Window
    {
        private Settings _settings;

        public SettingsWindow()
        {
            InitializeComponent();

            _settings = Settings.Load();

            pathTextBox.Text = _settings.LogPath;
            accountTextBox.Text = _settings.AccountName;
            characterTextBox.Text = _settings.CharacterName;
        }

        private void saveButton_Click(object sender, RoutedEventArgs e)
        {
            if (File.Exists(pathTextBox.Text))
            {
                _settings.LogPath = pathTextBox.Text.Replace("Client.txt", "").Replace("client.txt", "");
                _settings.AccountName = accountTextBox.Text;
                _settings.CharacterName = characterTextBox.Text;
                _settings.Save();
                this.Close();
            }
            else
            {
                ErrorLabel.Content = "Can't find client.txt in the specified path." + Environment.NewLine + "Make sure it ends with client.txt";
            }
        }
    }
}
