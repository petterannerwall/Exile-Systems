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
        private static ConcurrentDictionary<string, Player> ConnectedPlayers = new ConcurrentDictionary<string, Player>();

        public override Task OnDisconnected(bool stopCalled)
        {
            var accountName = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId).Value.Account;
            if (accountName != null)
            {
                Console.WriteLine($"<> {accountName} disconnected");
            }
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            var accountName = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId).Value.Account;
            if (accountName != null)
            {
                Console.WriteLine($"== {accountName} reconnected");
            }
            return base.OnReconnected();
        }

        public List<Player> Login(string room, Player player)
        {
            if (!ConnectedPlayers.ContainsKey(player.Account))
            {
                Console.WriteLine($"++ {player.Account} connected");
                List<Player> users = new List<Player>(ConnectedPlayers.Values);
                player.ConnectionID = Context.ConnectionId;
                var added = ConnectedPlayers.TryAdd(room, player);
                if (!added) return null;
                return users;
            }
            return null;
        }
        
        public void UpdatePlayer(Player player)
        {
            ConnectedPlayers.AddOrUpdate(player.Account, player);
            Console.WriteLine("Updated Account: " + player.Account + " and Character: " + player.Character);
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
        
    }
    static class ExtensionMethods
    {
        // Either Add or overwrite
        public static void AddOrUpdate<K, V>(this ConcurrentDictionary<K, V> dictionary, K key, V value)
        {
            dictionary.AddOrUpdate(key, value, (oldkey, oldvalue) => value);
        }
    }
}
