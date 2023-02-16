class ResponsiveNav {
    constructor(options) {
      this.state = options.state;
      this.nav = options.nav;
      this.checkpoint = options.checkpoint;
      this.navContent = `${options.nav} *`;
      this.tuggleBtn = options.tuggleBtn;
      this.tuggleBtnContent = `${options.tuggleBtn} *`;
      this.navLink = options.navLink;
      this.navLinkContent = `${options.navLink} *`;
  
      this.$nav = $(this.nav);
  
      this._eddClickEvents();
      this._addResizeEvent();
    }
    _addResizeEvent() {
      window.addEventListener("resize", () => {
        if (window.innerWidth > this.checkpoint) {
          this._cleare();
        }
      });
    }
    _eddClickEvents() {
      document.addEventListener("click", (e) => {
        if (window.innerWidth > this.checkpoint) {
          return;
        }
  
        if ($(e.target).is(`${this.tuggleBtn}, ${this.tuggleBtnContent}`)) {
          this._toggleNav(true);
        } else if ($(e.target).is(`${this.navLink}, ${this.navLinkContent}`)) {
          this._toggleNav(false);
        } else if ($(e.target).is(`${this.nav}, ${this.navContent}`)) {
          return;
        }
      });
    }
    _cleare() {
      this._toggleNav(false);
    }
    _toggleNav(ifNavClosed) {
      if (ifNavClosed || this.$nav.hasClass(this.state)) {
        this.$nav.toggleClass(this.state);
      }
    }
  }
  
  class ChangeNavIfWindowScroll {
    constructor(options) {
      this.options = options;
      this.nav = document.querySelector(this.options.nav);
      this.state = this.options.state;
      this.heightActivateState = this.options.heightActivateState;
  
      this._startToggleState();
    }
    _startToggleState() {
      $(window).on("scroll", () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const classList = this.nav.classList;
  
        if (scrolled > this.heightActivateState) {
          if (!classList.contains(this.state)) classList.add(this.state);
        } else {
          if (classList.contains(this.state)) classList.remove(this.state);
        }
      });
    }
  }
  
  class ScrollToAnchor {
    constructor(options) {
      this.nav = options.nav;
      this.topPosition = options.topPosition;
      this.animationTime = options.animationTime;
  
      this._scrollToEventsListener();
    }
  
    _scrollToEventsListener() {
      document.querySelectorAll(`${this.nav} a[href^="#"]`).forEach((el) => {
        el.addEventListener("click", (event) => {
          console.log(event);
          window.scrollTo(0, 0);
        });
      });
    }
  }
  
  // if HTML DOM is ready
  window.onload = function () {
    // options for responsiveNav
    const navOptions = {
      nav: ".main-nav", // DOM elemrnt (class or id)
      tuggleBtn: ".tuggle-btn", // DOM elemrnt (class or id)
      tuggleContent: ".tuggle-content", // DOM elemrnt (class or id)
      navLink: ".nav-link", // DOM elemrnt (class or id)
      state: "open", // Which (class or id) use to change 'nav' of page if will be the size to screen is less checkpoint.
      checkpoint: 860 // Size for screen width when we use mobile menu.
    };
  
    const responsiveNav = new ResponsiveNav(navOptions); // created new responsiveNav.
  
    // options for changeNavIfWindowScroll
    const changeNavIfWindowScrollOptions = {
      nav: ".main-nav", // DOM elemrnt (class or id)
      state: "active", // Which (class or id) use to change 'nav' of page if will be the scroll.
      heightActivateState: 150 // How many pixels will scroll page when we use the new state for nav.
    };
  
    // created new changeNavIfWindowScroll.
    const changeNavIfWindowScroll = new ChangeNavIfWindowScroll(
      changeNavIfWindowScrollOptions
    );
  
    // otptions for ScrollToAnchor
    const scrollToAnchorOptions = {
      nav: ".main-nav", // DOM elemrnt (class or id)
      topPosition: 100, // how many px to top position stop animation scroll (px)
      animationTime: 1000 // animation scroll time (ms)
    };
  
    // create new ScrollToAnchor
    const scrollToAnchor = new ScrollToAnchor(scrollToAnchorOptions);
  };
  