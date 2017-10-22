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
            var player = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId);

            if (player.Value != null)
            {
                var channel = player.Value.Channel;


                Groups.Remove(Context.ConnectionId, channel);

                var accountName = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId).Value.Account;
                if (accountName != null)
                {
                    Console.WriteLine($"<> {accountName} disconnected");
                }
            }
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            var channel = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId).Value.Channel;

            Groups.Add(Context.ConnectionId, channel);

            var accountName = ConnectedPlayers.SingleOrDefault((c) => c.Value.ConnectionID == Context.ConnectionId).Value.Account;
            if (accountName != null)
            {
                Console.WriteLine($"== {accountName} reconnected");
            }
            return base.OnReconnected();
        }

        public List<Player> Login(string channel, Player player)
        {
            Groups.Add(Context.ConnectionId, channel);
            List<Player> users = new List<Player>();

            if (!ConnectedPlayers.ContainsKey(player.Account))
            {
                Console.WriteLine($"++ {player.Account} connected with character: {player.Character.Name} in {player.Character.League} League");
                users = new List<Player>(ConnectedPlayers.Values);
                player.ConnectionID = Context.ConnectionId;
                var added = ConnectedPlayers.TryAdd(Context.ConnectionId, player);
                if (!added) return null;
            }

            serverRepository.UpdateOrAddPlayer(channel, player);
            Clients.All.PlayerUpdate(player);
            return users;
        }

        public void RegisterSpectator(string channel)
        {
            Groups.Add(Context.ConnectionId, channel);
            ConnectedPlayers.TryAdd(Context.ConnectionId, new Player() { Channel = channel });
        }

        public void UpdatePlayer(string channel, Player player)
        {
            if (player.Character != null)
            {
                ConnectedPlayers.AddOrUpdate(Context.ConnectionId, player);
                var channelObject = serverRepository.UpdateOrAddPlayer(channel, player);
                Console.WriteLine("Updated Account: " + player.Account + " and Character: " + player.Character.Name);
                Clients.All.ChannelUpdate(channelObject);
            }
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
