using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using ExileModels;

namespace ExileSystemServer
{
    public class ServerHub : Hub
    {
        private ServerRepository serverRepository;
        private static ConcurrentDictionary<string, Player> ConnectedPlayers = new ConcurrentDictionary<string, Player>();

        public ServerHub()
        {
            serverRepository = new ServerRepository();
        }

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

        public List<Player> Login(string channel, Player player)
        {
            List<Player> users = new List<Player>();

            if (!ConnectedPlayers.ContainsKey(player.Account))
            {
                Console.WriteLine($"++ {player.Account} connected with character: {player.Character.Name} in {player.Character.League} League");
                users = new List<Player>(ConnectedPlayers.Values);
                player.ConnectionID = Context.ConnectionId;
                var added = ConnectedPlayers.TryAdd(Context.ConnectionId, player);
                if (!added) return null;
            }

            serverRepository.UppdateOrAddPlayer(channel, player);

            return users;
        }
                
        public void UpdatePlayer(string channel, Player player)
        {
            ConnectedPlayers.AddOrUpdate(Context.ConnectionId, player);
            serverRepository.UppdateOrAddPlayer(channel, player);
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

}
