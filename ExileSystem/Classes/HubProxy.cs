using ExileSystem.Models;
using Microsoft.AspNet.SignalR.Client;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;
using ExileModels;

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
                Connection = new HubConnection("http://www.petterannerwall.se:9393/signalr");
                Proxy = Connection.CreateHubProxy("ServerHub");

                Proxy.On("Update", (m) => Update(m));
                Proxy.On("ImageUpdate", (b) => ImageUpdate(b));
                Proxy.On("PlayerUpdate", (p) => PlayerUpdate(p));

                Connection.Start();

                while (Active)
                {
                    Thread.Sleep(10);
                }
            })
            { IsBackground = true };
            Thread.Start();
        }

        private static void PlayerUpdate(object playerJson)
        {
            Player player = JsonConvert.DeserializeObject<Player>(playerJson.ToString());
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
