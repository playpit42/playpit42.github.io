
class FrontNavigator {
    frame = document.getElementById("iframe");
    placeHolder = document.getElementById("placeHolder");
    isPlayPitRunning = false;
    isManagerRunning = false
    playGroundUrl = "http://localhost:8081";
    managerUrl = "http://localhost:8082";
    opts = {
        method: 'GET',
        headers: {}
    };

    async runCheck() {
        this.isPlayPitRunning = await this.checkPlayPitHealth()
        if (!this.isPlayPitRunning) {
            this.isManagerRunning = await this.checkManagerHealth()
            if (this.isManagerRunning) {
                this.setManagerToFrame();
                this.showFrame()
                setTimeout(this.runCheck.bind(this), 1000)
            } else {
                this.showPlaseHolder();
                setTimeout(this.runCheck.bind(this), 1000)
            }
        } else {
            this.setPlayPitToFrame()
            this.showFrame()
            setTimeout(this.runCheck.bind(this), 1000)
        }
    }

    async checkPlayPitHealth() {
        try {
            await fetch(`${this.playGroundUrl}/_info`, this.opts)
            return true
        } catch (error) {
            return false
        }
    }


    async checkManagerHealth() {
        try {
            await fetch(`${this.managerUrl}/_info`, this.opts)
            return true
        } catch (error) {
            return false
        }
    }

    setManagerToFrame() {
        if (this.frame.src !== this.managerUrl + '/') {
            this.frame.setAttribute("src", this.managerUrl);
        }
    }

    setPlayPitToFrame() {
        if (this.frame.src !== this.playGroundUrl + '/') {
            this.frame.setAttribute("src", this.playGroundUrl);
        }

    }

    showFrame() {
        if (this.frame.classList.contains("hidden")) {
            this.frame.classList.remove("hidden")
            this.placeHolder.classList.add("hidden")
        }

    }

    showPlaseHolder() {
        if (this.placeHolder.classList.contains("hidden")) {
            this.placeHolder.classList.remove("hidden")
            this.frame.classList.add("hidden")
        }
    }
}

let frontNavigator = new FrontNavigator()
frontNavigator.runCheck()
