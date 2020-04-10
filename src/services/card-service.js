const cardApiUrl = 'https://api.elderscrollslegends.io/v1/cards';

export default {
    getPage: async (page, searchName) => {
        const params = [
            "pageSize=20",
            `page=${page && page > 0 ? page : 0}`
        ];

        if (searchName && searchName.length > 0) {
            params.push(`name=${searchName}`);
        }

        const response = await fetch(`${cardApiUrl}?${params.join("&")}`)
            .then((response) => {
                return response.json();
            });

        return response && response.cards ? {
            cards: response.cards.map(card => {
                return {
                    id: card.id,
                    image: card.imageUrl,
                    name: card.name,
                    text: card.text,
                    set: card.set.name,
                    type: card.type
                };
            }),
            total: response._totalCount
        } : { cards: [], total: 0 };
    }
}
