import {makeAutoObservable} from "mobx";
import {useState} from "react";

class NextStore {

    globalLoad = false;
    load = false;
    viewLoader = true;
    locoScroll = null;
    activeHome = false;
    scrollIsLoaded=false;
    mobileView = false;
    isDesctop = true;
    constructor() {
        makeAutoObservable(this);
    }

    setGlobalLoaded = () => this.globalLoad = true;

    setLoaded = (val) => this.load = val;

    setViewLoader = (val) => this.viewLoader = val;
    setLocoScroll = (val) => this.locoScroll = val;

    setActiveHome = (val) => this.activeHome = val;
    setScrollIsLoaded = (val) => this.scrollIsLoaded = val;
    setMobileView = (val) => this.mobileView = val;
    setIsDesctop = (val) => this.isDesctop = val;
}

export default NextStore;