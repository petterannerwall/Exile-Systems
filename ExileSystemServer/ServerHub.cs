using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using ExileSystemServer.Models;
using System.Drawing;

namespace ExileSystemServer
{
    public class ServerHub : Hub
    {
        private static ConcurrentDictionary<string, Player> ChatClients = new ConcurrentDictionary<string, Player>();

        public void Broadcast(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                Console.WriteLine("Broadcasting Message: " + message);
                Clients.All.Update(message);
            }
        }

        public void BroadcastImage(byte[] bitmap)
        {
            Console.WriteLine("Broadcasting Bitmap");
            Clients.All.ImageUpdate(bitmap);
        }

        public void Unicast(string recepient, string message)
        {
            var sender = Clients.CallerState.UserName;
            if (!string.IsNullOrEmpty(sender) && recepient != sender &&
                !string.IsNullOrEmpty(message) && ChatClients.ContainsKey(recepient))
            {
                Player client = new Player();
                ChatClients.TryGetValue(recepient, out client);
                Clients.Client(client.ID).UnicastMessage(sender, message);
            }
        }
    }
}
