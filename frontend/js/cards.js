export class FlashCardsCard {
    constructor(id, term, def, isShowingTerm, flipped, matched) {
        this.id = id;
        this.term = term;
        this.definition = def;
        this.isShowingTerm = isShowingTerm;
        this.flipped = flipped;
        this.matched = matched;
    }
}

export class MemoryCard {
    constructor(id, term, def, isShowingTerm, displayText, flipped, matched) {
        this.id = id;
        this.term = term;
        this.definition = def;
        this.isShowingTerm = isShowingTerm;
        this.displayText = displayText;
        this.flipped = flipped;
        this.matched = matched;
    }
}

export class HubCard {
    constructor(id, owner, term, def, labels, image, left, top) {
        this.owner = owner;
        this.term = term;
        this.def = def;
        this.image = image;
        this.labels = labels;
        this.id = id;
        this.moving = false;
        this.left = left;
        this.top = 0;
        this.intersecting = false;
        this.intersectId = null;
        this.zIndex = 100;
    }
}