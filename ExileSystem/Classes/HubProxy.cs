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

    }
}
