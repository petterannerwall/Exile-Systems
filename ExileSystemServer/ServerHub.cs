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

        public override Task OnDisconnected(bool stopCalled)
        {
            var userName = ChatClients.SingleOrDefault((c) => c.Value.ID == Context.ConnectionId).Key;
            if (userName != null)
            {
                Clients.Others.ParticipantDisconnection(userName);
                Console.WriteLine($"<> {userName} disconnected");
            }
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            var userName = ChatClients.SingleOrDefault((c) => c.Value.ID == Context.ConnectionId).Key;
            if (userName != null)
            {
                Clients.Others.ParticipantReconnection(userName);
                Console.WriteLine($"== {userName} reconnected");
            }
            return base.OnReconnected();
        }

        public List<Player> Login(string account)
        {
            if (!ChatClients.ContainsKey(account))
            {
                Console.WriteLine($"++ {account} logged in");
                List<Player> users = new List<Player>(ChatClients.Values);
                Player newPlayer = new Player { Name = account, ID = Context.ConnectionId };
                var added = ChatClients.TryAdd(account, newPlayer);
                if (!added) return null;
                Clients.CallerState.UserName = account;
                Clients.Others.ParticipantLogin(newPlayer);
                return users;
            }
            return null;
        }
        

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
