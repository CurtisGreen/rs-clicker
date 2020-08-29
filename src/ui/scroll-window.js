export class ScrollWindow extends Phaser.Scene {
    name = "";
    // Input data
    format = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        numColumns: 0,
        padding: 0,
        objects: [],
    };

    listHeight = 0;
    listDelta = 30;
    curDirection = 0;

    // Images
    scrollHeader;
    scrollFooter;
    scrollBackground;
    scrollButton;

    constructor(data) {
        super("scroll-window" + data.name);

        this.name = "scroll-window" + data.name;
        this.format.x = data.x;
        this.format.y = data.y;
        this.format.width = data.width;
        this.format.height = data.height;
        this.format.numColumns = data.numColumns;
        this.format.padding = data.padding;
    }

    addObject(object) {
        this.format.objects.push(object);
    }

    // Objects passed in need the setX, setY, setVisible functions available
    addObjects(data) {
        data.forEach((obj) => {
            this.format.objects.push(obj);
        });
    }

    refresh() {
        let data = this.format;
        // Destroy previous scroll bar if it exists
        if (this.scrollHeader != undefined) {
            this.input.removeListener("wheel");
            this.scrollHeader.destroy();
            this.scrollFooter.destroy();
            this.scrollBackground.destroy();
            this.scrollButton.destroy();
        }
        if (this.timer != undefined) {
            this.timer.remove();
        }

        // Add scroll bar images
        this.scrollHeader = this.add
            .image(data.width, 0, "scroll-header")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();
        let scrollHeaderHeight = this.scrollHeader.displayHeight;

        this.scrollFooter = this.add
            .image(data.width, data.height - scrollHeaderHeight, "scroll-footer")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();

        this.scrollBackground = this.add
            .image(data.width, scrollHeaderHeight, "scroll-background")
            .setDepth(3)
            .setOrigin(0, 0);

        this.scrollButton = this.add
            .image(data.width, scrollHeaderHeight, "scroll-button")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();

        // Set default scaling based on height input, may change below based on list height
        this.scrollButton.displayHeight =
            data.height - this.scrollHeader.displayHeight * 2;
        this.scrollBackground.displayHeight =
            data.height - this.scrollHeader.displayHeight * 2;

        // Create scroll bar if needed
        if (data.objects.length > 0) {
            // Position objects
            let xInit = 30,
                yInit = 0,
                row = 0,
                column = 0;
            let xDiff = (data.width - 20) / data.numColumns;
            let yDiff = data.padding + data.objects[0].displayHeight;

            for (let i = 0; i < data.objects.length; i++) {
                data.objects[i].setX(xInit + xDiff * column);
                data.objects[i].setY(yInit + yDiff * row);
                data.objects[i].setVisible(true);
                column++;

                // Go to next row
                if (column >= data.numColumns) {
                    column = 0;
                    row++;
                }
            }

            // Stretch scroll button depending on # objects
            let lastObj = data.objects[data.objects.length - 1];
            this.listHeight = lastObj.y + lastObj.displayHeight;

            // Check if scrolling needed
            if (this.listHeight > data.height) {
                // Scale the button image and background down
                this.scrollButton.scaleY = data.height / this.listHeight;
                this.scrollBackground.displayHeight =
                    data.height - this.scrollHeader.displayHeight * 2;

                // Make scroll button evenly divisible so it will fit properly at the top/bottom
                let remainingListDist = this.listHeight - data.height;
                let remainingScrollBarDist =
                    this.scrollBackground.displayHeight - this.scrollButton.displayHeight;

                // Get closest delta that can divide evenly into the remaining list length
                let defaultScrollDist = lastObj.displayHeight / 2;
                let roundedDelta = Math.floor(remainingListDist / defaultScrollDist);
                this.listDelta = remainingListDist / roundedDelta;

                // Move scroll button & objects
                this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                    this.curDirection = deltaY > 0 ? 1 : -1;
                    this.scroll();
                });

                // Setup timer to check if scrollheader/footer is being held
                this.timer = this.time.addEvent({
                    delay: 100, // ms
                    callback: () => {
                        this.scroll();
                    },
                    loop: true,
                    paused: true,
                });

                this.scrollHeader.on("pointerdown", () => {
                    this.curDirection = -1;
                    this.scroll();
                    this.timer.paused = false;
                });
                this.scrollHeader.on("pointerup", () => {
                    this.timer.paused = true;
                    this.timer.elapsed = 0;
                });

                this.scrollFooter.on("pointerdown", () => {
                    this.curDirection = 1;
                    this.scroll();
                    this.timer.paused = false;
                });
                this.scrollFooter.on("pointerup", () => {
                    this.timer.paused = true;
                    this.timer.elapsed = 0;
                });

                this.input.setDraggable(this.scrollButton);
                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    let drag = dragY - this.scrollButton.y;
                    if (Math.abs(drag) > 5) {
                        this.curDirection = drag > 0 ? 1 : -1;
                        this.scroll();
                    }
                });
            }

            // Constrain view
            this.cameras.main.setViewport(
                data.x,
                data.y,
                data.width + xInit,
                data.height
            );
        }
    }

    scroll(deltaY = 0) {
        if (this.listHeight > this.format.height) {
            // Setup default scroll distance
            if (deltaY == 0) {
                deltaY = this.listDelta * this.curDirection;
            }

            let remainingListDist = this.listHeight - this.format.height;
            let remainingScrollBarDist =
                this.scrollBackground.displayHeight - this.scrollButton.displayHeight;

            // Scale scroll bar delta
            let scrollBarDelta = deltaY * (remainingScrollBarDist / remainingListDist);

            // Check top/bottom bounds
            let scrollButtonHeight = this.scrollButton.displayHeight;
            let scrollHeaderHeight = this.scrollHeader.displayHeight;
            let upperBound = this.scrollButton.y + scrollBarDelta;
            let lowerBound = Math.floor(
                this.scrollButton.y + scrollButtonHeight + scrollBarDelta
            );

            if (
                (scrollBarDelta < 0 && upperBound >= scrollHeaderHeight) ||
                (scrollBarDelta > 0 && lowerBound <= this.scrollFooter.y)
            ) {
                // Scroll objects
                this.scrollButton.y += scrollBarDelta;
                this.format.objects.forEach((object) => {
                    object.setY(object.y - deltaY);
                });
            }
        }
    }

    clearObjects() {
        this.format.objects = [];
    }

    clear() {
        this.format = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            numColumns: 0,
            padding: 0,
            objects: [],
        };
    }

    scrollToBottom() {
        let remainingListDist = this.listHeight - this.format.height;
        this.scroll(remainingListDist);
    }

    setVisible(isVisible) {
        this.format.objects.forEach((obj) => {
            obj.setVisible(isVisible);
        });
        if (this.scrollButton != undefined) {
            this.scrollHeader.visible = isVisible;
            this.scrollFooter.visible = isVisible;
            this.scrollBackground.visible = isVisible;
            this.scrollButton.visible = isVisible;
        }
    }
}
