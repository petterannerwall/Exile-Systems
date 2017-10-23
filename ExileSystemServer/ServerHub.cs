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

        public ServerHub()
        {
            serverRepository = new ServerRepository();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {

            return base.OnReconnected();
        }

        public void Login(string channel, Player player)
        {
            Groups.Add(Context.ConnectionId, channel);
            UpdatePlayer(channel, player);
        }

        public void RegisterSpectator(string channel)
        {
            Groups.Add(Context.ConnectionId, channel);
        }

        public void UpdatePlayer(string channel, Player player)
        {
            if (player.Character != null)
            {
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
