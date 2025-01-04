(window.webpackJsonp = window.webpackJsonp || []).push([[9], {
    147: function(n, t, e) {
        "use strict";
        class i extends HTMLElement {
            static get observedAttributes() {
                return ["label"]
            }
            constructor() {
                super();
                this.attachShadow({
                    mode: "open"
                }).innerHTML = '\n      <style>\n        :host {\n          --button-color: transparent;\n          --button-color-hover: #e2e2e2;\n          --font-color: #000000;\n          --font-size: 1em;\n          --icon-size: 24px;\n          --button-padding: 0 8px 0 8px;\n          --button-padding-circle: 8px;\n          --border-radius: 2px;\n          display: block;\n          width: fit-content;\n        }\n        \n        button {\n          border: none;\n          border-radius: var(--border-radius);\n          min-height: 36px;\n          padding: var(--button-padding);\n          font-size: var(--font-size);\n          color: var(--font-color);\n          background-color: var(--button-color);\n          cursor: pointer;\n          outline: none;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          position: relative;\n          overflow: hidden;\n        }\n        \n        button:hover {\n          transition: background-color 0.3s ease-out;\n          background-color: var(--button-color-hover);\n        }\n        \n        #label {\n          display: inline-block;\n          position: relative;\n          margin-right: 8px;\n          margin-left: 8px;\n        }\n        \n        :host([label]) button {\n          min-width: 88px;\n        }\n        \n        :host([raised]) {\n          --button-color: #e2e2e2;\n        }\n        \n        :host([raised]) button {\n          background-color: var(--button-color);\n          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;\n        }\n        \n        :host([disabled]) {\n          cursor: not-allowed;\n        }\n        \n        :host([disabled]) button {\n          opacity: 0.5;\n          pointer-events: none;\n        }\n        \n        :host([active]) .ripple {\n          animation-name: ripple;\n          animation-duration: 0.4s;\n          animation-timing-function: ease-out;\n          background-color: #808080;\n          border-radius: 50%;\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n        }\n        \n        :host([circle]) button {\n          border-radius: 50%;\n          --button-padding: var(--button-padding-circle);\n        }\n        \n        ::slotted([slot="left-icon"]) {\n            float: left;\n            font-size: var(--icon-size) !important;\n        }\n        \n        ::slotted([slot="toggle-icon"]) {\n            float: left;\n            font-size: var(--icon-size) !important;\n        }\n        \n        slot[name="toggle-icon"] {\n            display: none;\n        }\n        \n        :host([toggled]) slot[name="left-icon"] {\n          display: none;\n        }\n        \n        :host([toggled]) slot[name="toggle-icon"] {\n          display: block;\n        }\n        \n        ::slotted([slot="right-icon"]) {\n            float: right;\n            font-size: var(--icon-size) !important;\n        }\n        \n        ::slotted([slot="file-input"]) {\n          position: absolute;\n          top: 0;\n          left: 0;\n          bottom: 0;\n          right: 0;\n          opacity: 0;\n          z-index: 9;\n        }\n        \n        @keyframes ripple {\n          from {\n            width: 0;\n            height: 0;\n            opacity: 0.8;\n          }\n          to {\n            width: 100px;\n            height: 100px;\n            opacity: 0.1;\n          }                \n        }\n      </style>\n      \n      <button type="button">\n        <div class="ripple"></div>\n        <slot name="file-input"></slot>\n        <slot name="left-icon"></slot>\n        <slot name="toggle-icon"></slot>\n        <span id="label"></span>\n        <slot name="right-icon"></slot>\n      </button>\n  ',
                this.button = this.shadowRoot.querySelector("button"),
                this.label = this.shadowRoot.querySelector("#label"),
                this.ripple = this.shadowRoot.querySelector(".ripple")
            }
            connectedCallback() {
                this.hasAttribute("label") ? this.label.textContent = this.getAttribute("label") : this.label.style.display = "none";
                const n = this.shadowRoot.querySelector('slot[name="left-icon"]')
                  , t = this.shadowRoot.querySelector('slot[name="toggle-icon"]');
                this.hasToggleIcon = n.assignedNodes().length && t.assignedNodes().length,
                this.toggled = !1,
                this.button.addEventListener("click", ()=>{
                    this.active = !0,
                    this.toggled = !this.toggled
                }
                ),
                this.ripple.addEventListener("animationend", ()=>{
                    this.active = !1
                }
                )
            }
            attributeChangedCallback(n) {
                "label" === n && (this.hasAttribute("label") ? this.label.textContent = this.getAttribute("label") : this.label.style.display = "none")
            }
            get toggled() {
                return this.hasAttribute("toggled")
            }
            set toggled(n) {
                this.hasToggleIcon && (n ? this.setAttribute("toggled", "") : this.removeAttribute("toggled"))
            }
            get disabled() {
                return this.hasAttribute("disabled")
            }
            set disabled(n) {
                this.button.disabled = n,
                n ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
            }
            get active() {
                return this.hasAttribute("active")
            }
            set active(n) {
                n ? this.setAttribute("active", "") : this.removeAttribute("active")
            }
        }
        customElements.get("material-button") || customElements.define("material-button", i)
    },
    148: function(n, t, e) {
        "use strict";
        class i extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({
                    mode: "open"
                }).innerHTML = '\n            <style>\n                :host {\n                    --app-bar-background: #999999;\n                    --app-bar-font-color: #000000;\n                    --app-bar-font-size: 24px;\n                    --app-bar-padding: 15px;\n                    --app-bar-box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);\n                    z-index: 999;\n                    display: block;\n                }\n             \n                #container {\n                    display: grid;\n                    grid-template-columns: 1fr 1fr 1fr;\n                    height: 100%;\n                    padding: var(--app-bar-padding);\n                    box-sizing: border-box;\n                    background: var(--app-bar-background);\n                    color: var(--app-bar-font-color);\n                    /*box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;*/\n                    box-shadow: var(--app-bar-box-shadow);\n                }\n                \n                #label {\n                    font-size: var(--app-bar-font-size);\n                    display: inline-block;\n                    padding: 0 0 0 12px;\n                    grid-column: 2 / 3;\n                }\n                \n                ::slotted([slot="left-content"]),\n                ::slotted([slot="right-content"]) {\n                    cursor: pointer;\n                    color: inherit;\n                    display: block;\n                    padding-top: 1px;\n                    padding-bottom: 1px;\n                    font-size: var(--app-bar-font-size) !important; \n                }\n                ::slotted([slot="left-content"]) {\n                    margin-right: 10px;\n                }\n                ::slotted([slot="right-content"]) {\n                    margin-left: 10px;\n                }\n                .left-content {\n                    display: flex;\n                    justify-content: flex-start;\n                    align-items: center;\n                }\n                .left-content {\n                    grid-column: 1 / 2;\n                }\n                .right-content {\n                    grid-column: 3 / 4;\n                    display: flex;\n                    justify-content: flex-end;\n                    align-items: center;\n                    position: static;\n                }\n            </style>\n            \n            <div id="container">\n                <div class="left-content">\n                    <slot name="left-content"></slot>\n                    <span id="label"></span>\n                </div>\n                \n                <div class="right-content">\n                    <slot name="right-content"></slot>\n                </div>\n            </div>\n        '
            }
            connectedCallback() {
                this.container = this.shadowRoot.querySelector("#container"),
                this.label = this.shadowRoot.querySelector("#label"),
                this.hasAttribute("label") && (this.label.textContent = this.getAttribute("label")),
                this.setupEventHandlers()
            }
            handleIconClick(n) {
                const t = n.composedPath().find(n=>n.assignedSlot)
                  , e = t ? t.assignedSlot.name : null;
                this.dispatchEvent(new CustomEvent("app-bar-click",{
                    detail: {
                        target: t,
                        slot: e
                    }
                }))
            }
            setupEventHandlers() {
                this.shadowRoot.querySelectorAll('[name$="content"]').forEach(n=>{
                    n.addEventListener("click", this.handleIconClick.bind(this))
                }
                )
            }
        }
        customElements.get("material-app-bar") || customElements.define("material-app-bar", i)
    },
    153: function(n, t, e) {
        "use strict";
        class i extends HTMLElement {
            static get observedAttributes() {
                return ["value", "name", "label", "readonly", "minLength", "maxLength", "pattern"]
            }
            constructor() {
                super();
                this.attachShadow({
                    mode: "open"
                }).innerHTML = '\n            <style>\n                :host {\n                    --active-color: #337ab7;\n                    --font-color: #000000;\n                    --error-color: #ff0000;\n                    --margin: 2.25rem 0 2.25rem 0;\n                }\n                :host([invalid]) {\n                    --active-color: var(--error-color);\n                }\n                :host([invalid]) #bar,\n                :host([invalid]) #bar::before{\n                    left: 0;\n                    width: 100%;\n                }\n                :host([invalid]) .error {\n                    display: block;\n                }\n               \n                #container {\n                    width: 100%;\n                    position: relative;\n                    display: block;\n                    background: transparent;\n                    margin:  var(--margin);\n                }\n                input {\n                    width: 100%;\n                    height: 1.9rem;\n                    padding: 0.125rem 0.125rem 0.0625rem;\n                    font-size: 1rem;\n                    border: none;\n                    border-bottom: 1px solid #999999;\n                    outline: none;\n                    box-sizing: border-box;\n                    display: block;\n                    color: var(--font-color);\n                    background: none;\n                    line-height: 1.9;\n                    color: transparent;\n                    transition: all 0.28s ease;\n                }\n                #bar {\n                    display: block;\n                    position: relative;\n                    bottom: 0;\n                    border-bottom: 0.0625rem solid #999999;\n                    width: 0;\n                    left: 50%;\n                    transition: left 0.25s ease-out, width 0.25s ease-out;\n                }\n                #bar::before {\n                    content: \'\';\n                    height: 0.125rem;\n                    width: 0;\n                    left: 50%;\n                    bottom: -0.0625rem;\n                    position: absolute;\n                    background: var(--active-color);\n                    -webkit-transition: left 0.28s ease, width 0.28s ease;\n                    transition: left 0.28s ease, width 0.28s ease;\n                    z-index: 2;\n                }\n                \n                input:focus,\n                input:valid,\n                input:invalid[required] {\n                    color: var(--font-color);\n                }\n                \n                input:invalid {\n                    color: var(--error-color);\n                    box-shadow: none;\n                }\n                \n                input:focus ~ #bar {\n                    left: 0;\n                    width: 100%;\n                }\n                label {\n                    position: absolute;\n                    top: 0.25rem;\n                    left: 2px;\n                    z-index: 1;\n                    font-size: 1rem;\n                    color: #b3b3b3;\n                    pointer-events: none;\n                    padding-left: 0.125rem;\n                    font-weight: normal;\n                    transition: all 0.28s ease;\n                    \n                }\n                input:focus + label,\n                input:valid + label,\n                input.invalid + label {\n                    font-size: 0.8rem;\n                    color: gray;\n                    top: -1rem;\n                    left: 0;\n                }\n                \n                input.invalid + label {\n                    color: var(--error-color)\n                }\n                \n                input:focus + label {\n                    color: var(--active-color);\n                }\n                \n                input:focus ~ #bar::before {\n                    width: 100%;\n                    left: 0;\n                }\n                .error {\n                    display: none;\n                    position: absolute;\n                    font-size: 0.9rem;\n                    line-height: 1rem;\n                    color: var(--error-color);\n                    padding-top: 8px;\n                }\n                :host([invalid]) .error {\n                    display: block;\n                }\n            </style>\n            \n            <div id="container">\n                <input type="text" required>\n                <label></label>\n                <span id="bar"></span>\n                <div class="error"></div>\n            </div>\n        ',
                this.input = this.shadowRoot.querySelector("input"),
                this.label = this.shadowRoot.querySelector("label"),
                this.error = this.shadowRoot.querySelector(".error"),
                this.pristine = !0,
                this.errorMap = {
                    valueMissing: "required",
                    typeMismatch: "type",
                    pattern: "pattern",
                    tooShort: "short",
                    tooLong: "long"
                },
                this.allowedTypes = ["text", "number", "email", "password", "tel", "url"]
            }
            connectedCallback() {
                this.hasAttribute("value") && (this.input.value = this.getAttribute("value")),
                this.hasAttribute("name") && (this.input.name = this.getAttribute("name")),
                this.hasAttribute("pattern") && (this.input.pattern = this.getAttribute("pattern")),
                this.hasAttribute("maxLength") && (this.input.maxLength = this.getAttribute("maxLength")),
                this.hasAttribute("minLength") && (this.input.minLength = this.getAttribute("minLength")),
                this.hasAttribute("type") && this.allowedTypes.includes(this.getAttribute("type")) && (this.input.type = this.getAttribute("type")),
                this.hasAttribute("readonly") ? (this.input.addEventListener("keydown", n=>n.preventDefault()),
                this.input.addEventListener("focus", n=>{
                    n.preventDefault(),
                    this.input.blur()
                }
                )) : (this.input.addEventListener("keyup", this.handleKeyUp.bind(this)),
                this.input.addEventListener("blur", this.handleBlur.bind(this)))
            }
            attributeChangedCallback(n, t, e) {
                "value" !== n && "name" !== n || (this.input[n] = e),
                "label" === n && (this.label.textContent = e)
            }
            handleKeyUp() {
                this.pristine = !1,
                this.input.validity.valid && (this.removeAttribute("invalid"),
                this.input.classList.remove("invalid")),
                this.dispatchEvent(new CustomEvent("change",{
                    detail: {
                        value: this.input.value
                    }
                }))
            }
            handleBlur() {
                for (const n in this.input.validity)
                    !this.pristine && this.input.validity[n] && this.hasAttribute("error-" + this.errorMap[n]) && (this.error.textContent = this.getAttribute("error-" + this.errorMap[n]),
                    this.setAttribute("invalid", ""),
                    this.input.classList.add("invalid"))
            }
            isValid() {
                return this.input.validity.valid
            }
            get value() {
                return this.input.value
            }
            set value(n) {
                this.input.value = n
            }
        }
        customElements.get("material-textfield") || customElements.define("material-textfield", i)
    },
    172: function(n, t, e) {
        "use strict";
        e.r(t),
        e.d(t, "template", (function() {
            return i
        }
        ));
        e(148),
        e(153),
        e(147);
        const i = '\n<div class="view next-screen">\n  <material-app-bar>\n    <a class="back" slot="left-content">\n      <i class="material-icons">keyboard_backspace</i>\n    </a>\n    <a slot="right-content">\n      <i class="material-icons">wifi_off</i>\n    </a>\n  </material-app-bar>\n  \n  <div class="content">\n    <h2>What is a PWA?</h2>\n  \n    <p>\n      A Progressive Web App (PWA) is basically just a website with some added features, which enable it to provide an \n      app-like user-experience.\n    </p>\n    \n    <p>\n      This means it can work practically just like a native iOS or Android app. It can be installed to the home screen \n      of your mobile device, work offline and receive push notifications, among other things. \n    </p>\n    \n    <p>\n      A well-designed PWA is indistinguishable from a native app, but it also offers some strong added benefits:\n    </p>\n    \n    <ul>\n      <li>\n        It\'s  just a website! You don\'t need to build separate apps anymore. If you have a website, you can easily \n        turn it into and iOS and Android app as well!\n      </li>\n      <li>\n        A PWA is much smaller than a native app. Your users no longer need to install tens of megabytes of code\n      </li>\n      <li>\n        No need to get your app into the App Store or Play Store. Just share the link to your website and users can \n        install it as an app\n      </li>\n      <li>\n        There\'s no need to get users to install updates anymore. When you release a new version of your app, all your \n        users automatically get the new version\n      </li>\n      <li>\n        By default, PWAs are served over HTTPS and are therefore safe and secure\n      </li>\n      <li>\n        PWAs are lightweight and offer high performance\n      </li>\n      <li>\n        Especially on Android, a PWA can almost do anything a native app can\n      </li>\n    </ul>\n    \n    <h3>Need help?</h3>\n    <p>\n      Do you want to develop a PWA but you need help? Contact me!\n    </p>\n    <p>\n      As an experienced developer and trainer, I can help you implement a PWA or run a workshop for your team.\n    </p>\n    \n    <p>\n      Please fill out the form below and I\'ll get back to you as soon as possible:\n    </p>\n    \n    <form id="contact-form">\n      <material-textfield type="text" label="Name" id="name"></material-textfield>\n      <material-textfield\n        type="email"\n        label="Email"\n        id="email"\n        error-required="Please enter a valid email address"\n        error-type="Please enter a valid email address"></material-textfield>\n      <textarea name="message" id="message" rows="12" required></textarea>\n\n      <material-textfield type="text" label="Anti-spam: 2+5=" id="challenge"></material-textfield>\n\n      <div class="flex">\n        <material-button id="send-button" label="Send" raised></material-button>\n        <p id="result"></p>\n      </div>\n    </form>\n\n\n  </div>\n</div>\n'
    }
}]);
