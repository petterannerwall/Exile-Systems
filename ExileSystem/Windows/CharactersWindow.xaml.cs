using ExileSystem.Classes;
using System;
using System.Collections.Generic;
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
using ExileSystem.Models;

namespace ExileSystem.Windows
{
    /// <summary>
    /// Interaction logic for CharactersWindow.xaml
    /// </summary>
    public partial class CharactersWindow : Window
    {
        public CharactersWindow()
        {
            InitializeComponent();

            HubProxy.ChannelUpdated += ChannelUpdateDetected;

            //var list = new List<TestPlayer>()
            //{
            //    new TestPlayer()
            //    {
            //        Character = "BigP_Mirrored",
            //        Area = "The Submerged Passage"
            //    },
            //    new TestPlayer()
            //    {
            //        Character = "CojL______",
            //        Area = "Battle-Scarred Hideout"
            //    },
            //    new TestPlayer()
            //    {
            //        Character = "Puttzz",
            //        Area = "Highgate"
            //    },
            //    new TestPlayer()
            //    {
            //        Character = "Bemeron",
            //        Area = "The City of Sarn"
            //    }
            //};

            //characterList.ItemsSource = list;
        }

        private void ChannelUpdateDetected(object sender, ChannelUpdateEventArgs args)
        {
            characterList.Dispatcher.Invoke(() =>
            {

                
                //var tempList = new List<string>();

                //foreach (var item in args.Channel.Players.Last().Character.Items)
                //{
                //    tempList.Add(item.InventoryId);
                //}

                characterList.ItemsSource = args.Channel.Players;


            });
        }
    }
    
}
