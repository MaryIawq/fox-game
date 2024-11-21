class FallingItemsService {
    generateFallingItems = (items) => {
        const itemsImages = [
            "cheese.png",
            "donuts.png",
            "diamond.png",
            "banana.png",
            "burger.png",
            "popcorn.png",
        ];
        const randomItem =
            itemsImages[Math.floor(Math.random() * itemsImages.length)];
        const itemsContainer = window.innerWidth - 110;
        const randomX = Math.random() * itemsContainer;
        items.push({
            positionX: randomX,
            positionY: -50,
            image: `items/${randomItem}`,
            caught: false,
        });
    };

    removeItem = (itemsList, itemToRemove) => {
        const grassBlockHeight = 55;
        if (itemToRemove.positionY + 45 >= window.innerHeight - grassBlockHeight) {
            itemsList.splice(itemsList.indexOf(itemToRemove), 1);
        }
    };
}

export const fallingItemsService = new FallingItemsService();