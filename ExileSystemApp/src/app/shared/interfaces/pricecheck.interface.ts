export interface PriceCheck {
    name: string;
    rarity: string;
    properties: Array<PriceCheckProperty>
}

export interface PriceCheckProperty {
    message: string;
    currency: string;
}
