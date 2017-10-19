using ExileModels;
using ExileSystem.Models;
using Microsoft.AspNet.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExileSystem.Classes
{
    public static class HubProxy
    {
        private static IHubProxy Proxy;
        private static HubConnection Connection;
        private static bool Active;
        private static Thread Thread;
        private static Settings settings;
        
        public static void Initialize()
        {
            Active = true;
            Thread = new Thread(() =>
            {
                Connection = new HubConnection("http://localhost:9393/signalr");
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

        public static void Stop()
        {
            Connection.Stop(new TimeSpan(0));
        }

        public static void Start()
        {

            settings = Settings.Load();
            Connection.Start();
        }

        private static void ImageUpdate(object b)
        {
            throw new NotImplementedException();
        }

        private static void Update(object m)
        {
            throw new NotImplementedException();
        }

        public static void BroadcastImage(string base64string)
        {
            Proxy.Invoke("BroadcastImage", base64string);
        }

        public static async Task LoginAsync(string channel)
        {
            await Connection.Start();
            await Proxy.Invoke("Login", channel, LocalPlayer.player);
        }

        public static void UpdatePlayer(Player player)
        {
            Proxy.Invoke("UpdatePlayer", settings.Channel, player);
        }

    }
}
