﻿using ExileModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileSystem.Models
{
    public class MessageEventArgs
    {        public MessageEventArgs(Message message)
        {
            Message = message;
        }

        public Message Message { get; }

    }

    public class ChannelUpdateEventArgs
    {
        public ChannelUpdateEventArgs(Channel channel)
        {
            Channel = channel;
        }

        public Channel Channel { get; }

    }
}
