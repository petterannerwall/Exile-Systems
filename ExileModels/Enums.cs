using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExileModels
{
    public enum InventoryId
    {
        Helm,
        Amulet,
        Weapon,
        Weapon2,
        Offhand,
        Offhand2,
        BodyArmour,
        Belt,
        Ring,
        Ring2,
        Gloves,
        Boots,
        Flask            
    }

    public enum MessageType
    {
        Message,
        SelfEnteringArea,
        OtherJoinArea,
        OtherLeaveArea,
        GuildInformation,
        TradeMessage,
        Other,
        Verify,
        Whois
    }
}


