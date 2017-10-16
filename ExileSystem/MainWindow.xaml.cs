using Microsoft.AspNet.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace ExileSystem
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private IHubProxy Proxy;
        private HubConnection Connection;
        private string Host = "http://localhost:8080/signalchat";
        public Thread Thread { get; set; }
        public bool Active { get; set; }

        public MainWindow()
        {
            InitializeComponent();


            SnippingTool.AreaSelected += OnAreaSelectedAsync;

        }

        private void WindowLoaded(object sender, RoutedEventArgs e)
        {
            Active = true;
            Thread = new Thread(() =>
            {
                Connection = new HubConnection(Host);
                Proxy = Connection.CreateHubProxy("ServerHub");

                Proxy.On("Update", (m) => Update(m));
                Proxy.On("ImageUpdate", (b) => ImageUpdate(b));

                Connection.Start();

                while (Active)
                {
                    Thread.Sleep(10);
                }
            })
            { IsBackground = true };
            Thread.Start();

        }

        private void ImageUpdate(string bitmapString)
        {
            bitmapString.Base64StringToImage().Save(@"C:\Temp\test.jpg");            
        }

        private void Update(string message)
        {
            //Dispatcher.Invoke(DispatcherPriority.Normal, (Action)(() => this.Close()));
        }

        private void ClipScreen_Click(object sender, RoutedEventArgs e)
        {
            SnippingTool.Snip();
        }

        private async void OnAreaSelectedAsync(object sender, EventArgs e)
        {
            string base64string = SnippingTool.Image.ImageToBase64String();
            await Proxy.Invoke("BroadcastImage", base64string);
            
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Proxy.Invoke("Broadcast", "Debug Message");
        }
        



    }

}

