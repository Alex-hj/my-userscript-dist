// ==UserScript==
// @name         AI验证码自动识别填充
// @namespace    https://github.com/Alex-hj/my-userscript-dist
// @version      1.5.0
// @author       Alex
// @description  自动识别网页上的验证码并填充到输入框中，点击识别图标触发识别。
// @license      Apache-2.0
// @icon         https://raw.githubusercontent.com/Alex-hj/my-userscript-dist/main/logo.png
// @homepageURL  https://github.com/Alex-hj/my-userscript-dist
// @supportURL   https://github.com/Alex-hj/my-userscript-dist/issues
// @downloadURL  https://raw.githubusercontent.com/Alex-hj/my-userscript-dist/main/CAPTCHA-automatic-recognition.user.js
// @updateURL    https://raw.githubusercontent.com/Alex-hj/my-userscript-dist/main/CAPTCHA-automatic-recognition.user.js
// @match        *://*/*
// @require      https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(` .captcha-recognition-container{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol!important;font-size:14px!important;line-height:1.5!important;color:#333!important;box-sizing:border-box!important}.captcha-recognition-container *,.captcha-recognition-container *:before,.captcha-recognition-container *:after{box-sizing:border-box!important;font-family:inherit!important}.captcha-recognition-container input,.captcha-recognition-container textarea,.captcha-recognition-container select,.captcha-recognition-container button{font-family:inherit!important;font-size:inherit!important;line-height:inherit!important}.captcha-recognition-icon{display:inline-block!important;width:20px!important;height:20px!important;vertical-align:middle!important;margin-left:5px!important;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>')!important;background-size:contain!important;cursor:pointer!important;position:relative!important;z-index:999!important;opacity:.7!important;transition:opacity .2s!important}.captcha-recognition-icon:hover{opacity:1!important}.input-group-append{position:relative!important}.input-group-append .captcha-recognition-icon{position:absolute!important;left:100%!important}.captcha-recognition-loading{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>')!important;animation:captcha-spin 1s linear infinite!important}@keyframes captcha-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.captcha-recognition-success{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>')!important}.captcha-recognition-error{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>')!important}body.captcha-settings-open{overflow:hidden!important}.captcha-settings-overlay{position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;background-color:#00000080!important;z-index:2147483646!important}.captcha-settings-modal{position:fixed!important;top:0!important;right:0!important;width:100%!important;max-width:400px!important;height:100vh!important;padding-bottom:60px!important;background-color:#fff!important;z-index:2147483647!important;text-align:left!important;box-shadow:-2px 0 10px #0000001a!important;transform:translate(100%)!important;transition:transform .3s linear!important}.captcha-settings-modal.show{transform:translate(0)!important}.captcha-settings-content{background-color:transparent!important;color:#333!important;padding:20px 15px 20px 20px!important;width:100%!important;height:100%!important;overflow-y:scroll!important;box-shadow:none!important;display:flex!important;flex-direction:column!important}.captcha-settings-content::-webkit-scrollbar,.settings-card::-webkit-scrollbar,.domain-textarea::-webkit-scrollbar,.captcha-settings-content textarea::-webkit-scrollbar{width:4px!important;height:8px!important}.captcha-settings-content::-webkit-scrollbar-track,.settings-card::-webkit-scrollbar-track,.domain-textarea::-webkit-scrollbar-track,.captcha-settings-content textarea::-webkit-scrollbar-track{background:#f1f1f1!important;border-radius:4px!important}.captcha-settings-content::-webkit-scrollbar-thumb,.settings-card::-webkit-scrollbar-thumb,.domain-textarea::-webkit-scrollbar-thumb,.captcha-settings-content textarea::-webkit-scrollbar-thumb{background:#ccc!important;border-radius:4px!important}.captcha-settings-content h3{margin-top:0!important;color:#333!important;font-size:18px!important;margin-bottom:16px!important;text-align:center!important;font-weight:700!important}.captcha-settings-content h3 span{font-size:14px!important}.captcha-settings-buttons{display:flex!important;justify-content:flex-end!important;margin-top:20px!important;gap:10px!important;position:absolute!important;background:#fff!important;width:100%;bottom:0!important;left:0!important;z-index:10!important;padding:10px 15px;box-shadow:1px 2px 5px #0000001a}.captcha-settings-buttons button{padding:8px 16px!important;border:none!important;border-radius:4px!important;cursor:pointer!important;font-size:14px!important;transition:background-color .2s!important}.captcha-settings-buttons button:first-child{background-color:#1a73e8!important;color:#fff!important}.captcha-settings-buttons button:first-child:hover{background-color:#1557b0!important}.captcha-settings-buttons button:last-child{background-color:#f1f1f1!important;color:#333!important}.captcha-settings-buttons button:last-child:hover{background-color:#e4e4e4!important}.dev-settings-button{width:50px!important;height:50px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:fixed!important;bottom:20px!important;right:20px!important;background-color:#fff!important;color:#fff!important;border-radius:50%!important;cursor:pointer!important;z-index:9999!important;font-size:14px!important;box-shadow:0 2px 5px #0003!important;transition:background-color .2s!important}.dev-settings-button svg{color:#1557b0}.dev-settings-button:hover{opacity:.9}.settings-nav{display:flex!important;border-bottom:1px solid #eee!important;margin-bottom:20px!important;padding-bottom:2px!important}.settings-nav::-webkit-scrollbar{display:none!important}.settings-nav-item{padding:10px 15px!important;cursor:pointer!important;font-size:14px!important;color:#666!important;position:relative!important;transition:all .3s!important;-webkit-user-select:none!important;user-select:none!important;white-space:nowrap!important}.settings-nav-item:hover,.settings-nav-item.active{color:#1a73e8!important}.settings-nav-item.active:after{content:""!important;position:absolute!important;bottom:-2px!important;left:0!important;width:100%!important;height:2px!important;background-color:#1a73e8!important;border-radius:2px!important}.settings-content{flex:1!important;position:relative!important}.settings-content-tab{animation:captcha-fadeIn .3s ease!important;width:100%!important}@keyframes captcha-fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.settings-card{background-color:#f9f9f9!important;border-radius:8px!important;padding:15px!important;margin-bottom:15px!important;border:1px solid #eee!important;box-shadow:0 2px 4px #0000000d!important;height:100%!important;display:flex!important;flex-direction:column!important;overflow-y:auto!important}.settings-card-title{font-weight:700!important;margin-bottom:12px!important;color:#333!important;font-size:15px!important;display:flex!important;align-items:center!important;justify-content:space-between!important}.settings-card-title .api-type{color:#1a73e8!important}@media (max-width: 768px){.settings-nav-item{padding:10px!important}}.captcha-settings-item{margin-bottom:12px!important;display:flex!important;flex-direction:column}.captcha-settings-item label{display:block!important;margin-bottom:4px!important;color:#555!important;font-size:14px!important}.captcha-settings-item input[type=text],.captcha-settings-item select,.captcha-settings-item textarea{width:100%!important;padding:0 8px!important;border:1px solid #ddd!important;background:none!important;border-radius:4px!important;font-size:14px!important;box-sizing:border-box!important;background:#fff!important;color:#333!important;margin:0!important}.captcha-settings-item input[type=text],.captcha-settings-item select{height:33px!important}.captcha-settings-item textarea{resize:vertical!important;min-height:80px!important}.captcha-settings-item small{font-size:12px!important;color:#777!important;display:block!important;margin-top:4px!important;word-break:break-all!important}.captcha-settings-item small.field-error{color:#ff4d4f!important}.textarea-with-button{position:relative!important;display:flex!important;flex-direction:column!important}.use-default-prompt{position:absolute!important;top:5px!important;right:5px!important;background-color:#f1f1f1!important;border:1px solid #ddd!important;border-radius:4px!important;padding:4px 8px!important;font-size:12px!important;cursor:pointer!important;color:#333!important;transition:background-color .2s!important}.use-default-prompt:hover{background-color:#e4e4e4!important}.input-with-button{position:relative!important;display:flex!important;align-items:center!important}.input-with-button input{flex:1!important}.advanced-settings-warning{font-size:12px!important;color:#ff4d4f!important;margin-bottom:10px!important;font-weight:700!important;padding:8px!important;background-color:#fff2f0!important;border-radius:4px!important;border:1px solid #ffccc7!important}.tutorial-link{font-size:12px!important;color:#1890ff!important;margin-left:8px!important;text-decoration:none!important;font-weight:400!important}.tutorial-link:hover{text-decoration:underline!important}.custom-selectors{display:flex!important;flex-direction:column!important;gap:8px!important}.selector-item{display:flex!important;align-items:center!important;gap:8px!important}.selector-item input{flex:1!important}.remove-selector{background-color:#ff4d4f!important;color:#fff!important;border:none!important;border-radius:50%!important;width:24px!important;height:24px!important;font-size:16px!important;line-height:1!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important}.add-selector{margin-top:8px!important;background-color:#1890ff!important;color:#fff!important;border:none!important;border-radius:4px!important;padding:4px 12px!important;font-size:14px!important;cursor:pointer!important;align-self:flex-start!important}.add-selector:hover{background-color:#40a9ff!important}.remove-selector:hover{background-color:#ff7875!important}.domain-textarea{width:100%!important;border:1px solid #ddd!important;border-radius:4px!important;padding:8px!important;resize:vertical!important;font-family:monospace!important;font-size:14px!important}.rules-management{display:flex!important;flex-direction:column!important;gap:10px!important}.rules-url-input{display:flex!important;flex-direction:column!important;gap:5px!important}.rules-url-input input{width:100%!important;padding:8px!important;border:1px solid #ddd!important;border-radius:4px!important;font-size:14px!important}.rules-url-input small{color:#666!important;font-size:12px!important}.test-api-button{background-color:#1a73e8!important;color:#fff!important;border:none!important;border-radius:4px!important;padding:8px 12px!important;font-size:14px!important;cursor:pointer!important;transition:background-color .2s,color .2s!important;min-width:80px!important;display:flex!important;justify-content:center!important;align-items:center!important;height:33px!important;margin-left:10px!important}.test-api-button:hover{background-color:#1557b0!important}.test-api-button.test-loading{background-color:#f1f1f1!important;color:#666!important;position:relative!important}.test-api-button.test-loading:after{content:""!important;position:absolute!important;width:12px!important;height:12px!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%);border:2px solid #666!important;border-radius:50%!important;border-top-color:transparent!important;animation:captcha-spin-transform 1s linear infinite!important}@keyframes captcha-spin-transform{0%{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}.test-api-button.test-success{background-color:#4caf50!important;color:#fff!important}.test-api-button.test-error{background-color:#f44336!important;color:#fff!important}.reload-rules-button{display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:6px 12px!important;height:34px!important;font-size:14px!important;border-radius:4px!important;border:1px solid #ddd!important;background-color:#f7f7f7!important;cursor:pointer!important;transition:all .3s!important;min-width:120px!important}.reload-rules-button:hover{background-color:#e7e7e7!important}.reload-rules-button.test-loading{background-color:#f5f5f5!important;position:relative!important;color:transparent!important}.reload-rules-button.test-loading:after{content:""!important;width:16px!important;height:16px!important;border:2px solid #666!important;border-top-color:transparent!important;border-radius:50%!important;position:absolute!important;left:50%!important;top:50%!important;margin-left:-8px!important;margin-top:-8px!important;animation:captcha-spin 1s linear infinite!important}.reload-rules-button.test-success{background-color:#eaf7ea!important;border-color:#c3e6c3!important;color:#2a862a!important}.reload-rules-button.test-error{background-color:#fce7e7!important;border-color:#f5c2c2!important;color:#d63030!important}#captcha-toast-container{position:fixed!important;top:20px!important;right:20px!important;z-index:9999!important;display:flex!important;flex-direction:column!important;gap:10px!important;pointer-events:none!important;text-align:left!important}.captcha-toast{width:280px!important;padding:12px 16px!important;border-radius:4px!important;box-shadow:0 4px 12px #00000026!important;color:#fff!important;font-size:14px!important;opacity:0!important;transform:translateY(-20px)!important;transition:all .3s ease!important;pointer-events:auto!important;word-break:break-word!important;text-align:left!important}.captcha-toast-show{opacity:1!important;transform:translateY(0)!important}.captcha-toast-hide{opacity:0!important;transform:translateY(-20px)!important}.captcha-toast-info{background-color:#1a73e8!important}.captcha-toast-success{background-color:#4caf50!important}.captcha-toast-error{background-color:#f44336!important}img[style="z-index: 2; position: absolute; bottom: -11px; left: 206px; width: 88px; height: 40px;"]+.captcha-recognition-icon{position:absolute!important;left:270px!important}.authcode.co>a:nth-child(2)>#authImage+.captcha-recognition-icon{display:none!important}#yzCode{position:relative}#yzCode>.captcha-recognition-icon{position:absolute!important;right:0!important}.code-plane .img-code+.captcha-recognition-icon{position:absolute!important} `);

(function (vue) {
  'use strict';

  const STORAGE_KEYS = {
    SETTINGS: "captchaSettings",
    RULES: "captchaRules",
    LAST_CONFIG_UPDATE: "lastConfigUpdate"
  };
  const PUBLISH_REPO = "Alex-hj/my-userscript-dist";
  const DEFAULT_RULES_URL = `https://raw.githubusercontent.com/${PUBLISH_REPO}/main/rules.json`;
  const TUTORIAL_URL = `https://github.com/${PUBLISH_REPO}/blob/main/advanced-settings.md`;
  const ICON_CLASS = {
    BASE: "captcha-recognition-icon",
    LOADING: "captcha-recognition-loading",
    SUCCESS: "captcha-recognition-success",
    ERROR: "captcha-recognition-error"
  };
  const TIMING = {
    /** 定时扫描页面验证码的间隔 */
    POLL_INTERVAL: 500,
    /** DOM 变化后等待图片加载完成再自动识别 */
    AUTO_RECOGNIZE_DELAY: 500,
    /** 页面加载完成后延迟初始化,确保验证码图片已渲染 */
    INIT_DELAY: 1e3,
    /** 识别图标成功/失败状态的持续时间 */
    ICON_RESULT_DURATION: 2e3,
    /** 设置面板中测试按钮状态的复位时间 */
    STATUS_RESET_DELAY: 3e3
  };
  function relocateIconWhenReady(targetSelector, placeIcon) {
    const observer = new MutationObserver(() => {
      const target = document.querySelector(targetSelector);
      const icon = target && document.querySelector(`.${ICON_CLASS.BASE}`);
      if (!icon) {
        return;
      }
      icon.parentNode.removeChild(icon);
      placeIcon(icon, target);
      observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  function applyNportalNtut() {
    relocateIconWhenReady(".authcode.co", (icon, target) => target.appendChild(icon));
  }
  function applyLuogu() {
    const style = document.createElement("style");
    style.textContent = `
    .l-form-layout .img .${ICON_CLASS.BASE} {
      display: none !important;
    }
  `;
    document.head.appendChild(style);
    relocateIconWhenReady(
      ".l-form-layout .img",
      (icon, target) => target.parentNode.insertBefore(icon, target.nextSibling)
    );
  }
  const SITE_HANDLERS = {
    "nportal.ntut.edu.tw": applyNportalNtut,
    "www.luogu.com.cn": applyLuogu
  };
  function applySiteCompat() {
    try {
      const handler = SITE_HANDLERS[window.location.host];
      if (handler) {
        handler();
      }
    } catch (error) {
      console.error("验证码识别插件创建阶段出错：", error);
    }
  }
  function isRendered(element) {
    if (!element.isConnected) {
      return false;
    }
    const rect = element.getClientRects()[0];
    if (!rect || rect.width === 0 || rect.height === 0) {
      return false;
    }
    return window.getComputedStyle(element).visibility !== "hidden";
  }
  function isCaptchaCandidate(element) {
    const isSupported = element.tagName === "CANVAS" || element.tagName === "IMG" && !!element.src;
    return isSupported && isRendered(element);
  }
  class CaptchaFinder {
    /**
     * @param {object} deps
     * @param {import("./SelectorResolver.js").SelectorResolver} deps.resolver
     * @param {import("./InputFieldFinder.js").InputFieldFinder} deps.inputFinder
     */
    constructor({ resolver, inputFinder }) {
      this.resolver = resolver;
      this.inputFinder = inputFinder;
    }
    /** 页面上所有验证码元素;同一元素被多个选择器命中时只保留一次(按首次命中的顺序) */
    findElements() {
      const elements = /* @__PURE__ */ new Set();
      for (const selector of this.resolver.captchaSelectors()) {
        if (selector && selector.trim()) {
          this._query(selector).forEach((element) => elements.add(element));
        }
      }
      return [...elements];
    }
    /** 为验证码元素查找输入框 */
    findInputField(element) {
      return this.inputFinder.find(element);
    }
    /** 验证码元素及其输入框 */
    locate(element) {
      return { element, inputField: this.findInputField(element) };
    }
    /** @returns {Array<{element: HTMLElement, inputField: HTMLInputElement|null}>} */
    findAll() {
      return this.findElements().map((element) => this.locate(element));
    }
    /** 元素命中的第一个验证码选择器,仅用于日志排查“为什么把它当成验证码” */
    matchedSelector(element) {
      return this.resolver.captchaSelectors().find((selector) => this._matches(element, selector));
    }
    _matches(element, selector) {
      try {
        return element.matches(selector);
      } catch (error) {
        return false;
      }
    }
    _query(selector) {
      try {
        return [...document.querySelectorAll(selector)].filter(isCaptchaCandidate);
      } catch (error) {
        console.error(`选择器 '${selector}' 执行出错:`, error);
        return [];
      }
    }
  }
  class CaptchaProcessor {
    /**
     * @param {object} deps
     * @param {object} deps.settings - 响应式设置对象
     * @param {import("../utils/DomainBlocklist.js").DomainBlocklist} deps.blocklist
     * @param {import("../image/ImageConverter.js").ImageConverter} deps.converter
     * @param {import("../image/CanvasOptimizer.js").CanvasOptimizer} deps.optimizer
     * @param {import("./CaptchaRecognizer.js").CaptchaRecognizer} deps.recognizer
     * @param {import("./CaptchaFinder.js").CaptchaFinder} deps.finder
     * @param {import("./RecognitionIconManager.js").RecognitionIconManager} deps.icons
     * @param {import("../core/ClipboardService.js").ClipboardService} deps.clipboard
     * @param {import("../core/ToastService.js").ToastService} deps.toast
     */
    constructor(deps) {
      Object.assign(this, deps);
    }
    /**
     * @param {HTMLElement} element - 验证码元素(img / canvas)
     * @param {HTMLInputElement|null} inputField - 输入框,为空时会再查找一次
     * @param {HTMLElement} icon - 识别图标
     * @param {object} [converted] - 已经转换好的图片结果,提供时跳过转换
     */
    async process(element, inputField, icon, converted) {
      if (this.blocklist.isCurrentDomainBlocked()) {
        this.toast.show("当前网站已设置为不启用验证码识别功能", "info");
        return;
      }
      try {
        console.log("[验证码识别] 目标元素:", element, "命中选择器:", this.finder.matchedSelector(element));
        this.icons.setLoading(icon);
        const image = converted || this._convert(element);
        if (!image.success) {
          this._reportConversionFailure(image.message, icon);
          return;
        }
        const text = await this.recognizer.recognize(image.data);
        if (!text) {
          console.error("验证码识别结果为空");
          this.icons.showResult(icon, false);
          return;
        }
        await this._deliver(text, element, inputField);
        this.icons.showResult(icon, true);
      } catch (error) {
        console.error("验证码识别处理失败：", error);
        this.icons.showResult(icon, false);
        this.toast.show("处理验证码失败：" + (error.message || "未知错误"), "error");
      }
    }
    /** canvas 先做图像优化,优化失败时回退为普通转换 */
    _convert(element) {
      if (element.tagName === "CANVAS") {
        const optimized = this.optimizer.optimize(element);
        if (optimized.success) {
          return optimized;
        }
      }
      return this.converter.toBase64(element);
    }
    _reportConversionFailure(message, icon) {
      console.error("验证码转换失败：", message);
      this.toast.show(message, "error");
      this.icons.showResult(icon, false);
    }
    /** 把识别结果交付给用户:填入输入框,并按设置复制到剪贴板 */
    async _deliver(text, element, inputField) {
      const field = inputField || this.finder.findInputField(element);
      if (!field) {
        console.warn("仍未找到验证码输入框");
        this.toast.show(`验证码已识别：${text}，但未找到输入框`, "warning");
        await this._copyIfEnabled(text, `已将验证码复制到剪贴板：${text}`);
        return;
      }
      this._fill(field, text);
      const copied = await this._copyIfEnabled(text, "已将验证码复制到剪贴板");
      if (!copied) {
        this.toast.show(`验证码已识别：${text}`, "success");
      }
    }
    /** 填入并触发 input/change 事件,保证前端表单联动 */
    _fill(field, text) {
      field.value = text;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
    /**
     * 开启“自动复制到剪贴板”时复制并提示
     * @param {string} apiSuccessMessage - 使用 Clipboard API 成功时的提示
     * @returns {Promise<boolean>} 是否执行了复制
     */
    async _copyIfEnabled(text, apiSuccessMessage) {
      if (!this.settings.copyToClipboard) {
        return false;
      }
      const method = await this.clipboard.copy(text);
      const message = method === "api" ? apiSuccessMessage : `验证码已识别：${text} (已复制到剪贴板)`;
      this.toast.show(message, "success");
      return true;
    }
  }
  class CaptchaRecognizer {
    /**
     * @param {object} deps
     * @param {import("../providers/ProviderRegistry.js").ProviderRegistry} deps.registry
     * @param {import("./CaptchaTextCleaner.js").CaptchaTextCleaner} deps.cleaner
     * @param {import("../core/ToastService.js").ToastService} deps.toast
     * @param {import("../ui/PanelController.js").PanelController} deps.panel
     */
    constructor({ registry, cleaner, toast, panel }) {
      this.registry = registry;
      this.cleaner = cleaner;
      this.toast = toast;
      this.panel = panel;
    }
    /**
     * @param {string} base64Image - 不含 data: 前缀的 PNG base64
     * @returns {Promise<string>} 识别结果,失败时返回空串
     */
    async recognize(base64Image) {
      if (!this.registry.isConfigured()) {
        console.error("未配置验证码识别 API");
        this.toast.show("请先配置验证码识别 API", "error");
        this.panel.open();
        return "";
      }
      try {
        this.toast.show("正在识别验证码...", "info");
        const provider = this.registry.current();
        const rawText = await provider.recognize(base64Image);
        const text = this._clean(rawText, provider.meta.label);
        this._reportResult(text);
        return text;
      } catch (error) {
        console.error("验证码识别失败：", error);
        this.toast.show("识别失败：" + (error.message || "未知错误"), "error");
        return "";
      }
    }
    _clean(rawText, providerLabel) {
      const { basic, refined, text } = this.cleaner.clean(rawText, window.location.hostname);
      console.log(`${providerLabel}识别结果优化: ${rawText} -> ${basic} -> ${refined}`);
      return text;
    }
    _reportResult(text) {
      if (text) {
        this.toast.show(`识别成功：${text}`, "success");
      } else {
        console.error("验证码识别结果为空");
        this.toast.show("识别结果为空", "error");
      }
    }
  }
  const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const DIGITS = "0123456789";
  const BASE_RULE = { allowedChars: ALPHANUMERIC, expectedLength: 4, preferNumbers: false };
  const SITE_RULES = [
    ["gov.cn", { allowedChars: DIGITS, preferNumbers: true }],
    ["edu.cn", {}],
    ["bank", { expectedLength: 6 }],
    ["taobao.com", { preferNumbers: true }],
    ["jd.com", {}],
    ["weibo.com", {}],
    ["qq.com", { preferNumbers: true }],
    ["csdn.net", {}],
    ["cnblogs.com", {}]
  ];
  function getSiteCaptchaRule(hostname) {
    const hit = SITE_RULES.find(([keyword]) => hostname.includes(keyword));
    return { ...BASE_RULE, ...hit ? hit[1] : {} };
  }
  const THINK_BLOCK = /<(think|thinking)>[\s\S]*?<\/\1>/gi;
  const UNCLOSED_THINK = /<(?:think|thinking)>[\s\S]*$/i;
  const COLON = /[:：]/;
  const QUOTE = '`"“”「」『』';
  const QUOTED_SEGMENT = new RegExp(`(?:\`+|\\*\\*|[${QUOTE}])([^${QUOTE}*\\n]+)(?:\`+|\\*\\*|[${QUOTE}])`, "g");
  function stripReasoning(text) {
    return text.replace(THINK_BLOCK, "").replace(UNCLOSED_THINK, "");
  }
  function afterLastColon(text) {
    const tail = text.split(COLON).pop();
    return /[a-zA-Z0-9]/.test(tail) ? tail : text;
  }
  function lastQuoted(text) {
    const matches = [...text.matchAll(QUOTED_SEGMENT)];
    return matches.length > 0 ? matches[matches.length - 1][1] : text;
  }
  function extractAnswer(rawText) {
    return lastQuoted(afterLastColon(stripReasoning(rawText)));
  }
  const MIN_VALID_LENGTH = 3;
  const NUMBER_LOOKALIKES = { O: "0", I: "1", L: "1" };
  class CaptchaTextCleaner {
    /**
     * @param {string} rawText - AI 返回的原始文本
     * @param {string} hostname - 当前网站域名
     * @returns {{basic: string, refined: string|null, text: string}}
     *   basic 是提取出答案并去除非法字符后的结果;refined 应用网站规则后的结果(可能为空);
     *   text 是最终采用的结果,规则纠错失败时回退到 basic。
     */
    clean(rawText, hostname) {
      const basic = extractAnswer(rawText).replace(/[^a-zA-Z0-9\-]/g, "");
      const refined = this.applySiteRules(basic, hostname);
      return { basic, refined, text: refined || basic };
    }
    /**
     * 按网站规则纠错:转大写 -> 过滤非法字符 -> 数字倾向替换。
     * @returns {string|null} 长度不足时返回 null,表示可能识别不完整
     */
    applySiteRules(text, hostname) {
      if (!text) {
        return text;
      }
      const rule = getSiteCaptchaRule(hostname);
      let result = text.toUpperCase();
      if (result.length < MIN_VALID_LENGTH) {
        return null;
      }
      result = result.split("").filter((char) => rule.allowedChars.includes(char)).join("");
      if (rule.preferNumbers) {
        result = result.replace(/[OIL]/g, (char) => NUMBER_LOOKALIKES[char]);
      }
      if (result.length !== rule.expectedLength) {
        console.warn(`验证码长度异常: 期望${rule.expectedLength}位，实际${result.length}位`);
      }
      return result;
    }
  }
  function collectNewCaptchas(mutations, selector) {
    const found = [];
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => collectFromNode(node, selector, found));
      } else if (isCaptchaSrcChange(mutation, selector)) {
        found.push(mutation.target);
      }
    }
    return found;
  }
  function collectFromNode(node, selector, found) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    found.push(...node.querySelectorAll(selector));
    if (node.matches && node.matches(selector)) {
      found.push(node);
    }
  }
  function isCaptchaSrcChange(mutation, selector) {
    return mutation.type === "attributes" && mutation.attributeName === "src" && !!mutation.target.matches && mutation.target.matches(selector);
  }
  class CaptchaWatcher {
    /**
     * @param {object} deps
     * @param {object} deps.settings - 响应式设置对象
     * @param {import("../utils/DomainBlocklist.js").DomainBlocklist} deps.blocklist
     * @param {import("./SelectorResolver.js").SelectorResolver} deps.resolver
     * @param {import("./CaptchaFinder.js").CaptchaFinder} deps.finder
     * @param {import("./RecognitionIconManager.js").RecognitionIconManager} deps.icons
     * @param {import("../image/ImageConverter.js").ImageConverter} deps.converter
     * @param {import("./CaptchaProcessor.js").CaptchaProcessor} deps.processor
     * @param {import("../core/ToastService.js").ToastService} deps.toast
     */
    constructor(deps) {
      Object.assign(this, deps);
      this.pollTimer = null;
    }
    /** 当前网站未被禁用时,在页面加载完成后延迟启动 */
    start() {
      if (this.blocklist.isCurrentDomainBlocked()) {
        return;
      }
      const initialize = () => setTimeout(() => this._initialize(), TIMING.INIT_DELAY);
      if (document.readyState === "complete") {
        initialize();
      } else {
        window.addEventListener("load", initialize);
      }
    }
    _initialize() {
      try {
        this._attachIcons();
        this._observeMutations();
        this._startPolling();
        this._handleInitialCaptchas();
      } catch (error) {
        console.error("初始化验证码识别功能失败：", error);
        this.toast.show(`初始化验证码识别功能失败：${error.message || "未知错误"}`, "error");
      }
    }
    /** 为页面上所有验证码添加识别图标 */
    _attachIcons() {
      if (this.blocklist.isCurrentDomainBlocked()) {
        return;
      }
      try {
        this.finder.findAll().forEach((entry) => this._attachIcon(entry));
      } catch (error) {
        console.error("添加验证码识别图标时出错：", error);
      }
    }
    _attachIcon({ element, inputField }, options) {
      return this.icons.attach(
        element,
        (icon) => this.processor.process(element, inputField, icon),
        options
      );
    }
    // ---------- 首次扫描 ----------
    _handleInitialCaptchas() {
      const entries = this.finder.findAll();
      if (entries.length === 0) {
        return;
      }
      const { ready, failed } = this._convertAll(entries);
      if (failed.length > 0) {
        this._reportUnrecognizable(failed, "");
      }
      if (!this.settings.autoRecognize) {
        this.toast.show(`检测到 ${entries.length} 个验证码，点击识别图标开始识别`, "info");
      } else if (ready.length > 0) {
        this.toast.show(`检测到 ${ready.length} 个可识别的验证码，正在自动识别...`, "info");
        this._processAll(ready);
      } else {
        this._reportNoneRecognizable(entries.length, "");
      }
    }
    // ---------- DOM 变化 ----------
    _observeMutations() {
      if (this.blocklist.isCurrentDomainBlocked()) {
        return;
      }
      const observer = new MutationObserver((mutations) => this._onMutations(mutations));
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src"]
      });
    }
    _onMutations(mutations) {
      const added = collectNewCaptchas(mutations, this.resolver.observedSelector());
      if (added.length === 0) {
        return;
      }
      this._attachIcons();
      if (this.settings.autoRecognize) {
        setTimeout(() => this._autoRecognizeNew(added), TIMING.AUTO_RECOGNIZE_DELAY);
      }
    }
    _autoRecognizeNew(newElements) {
      const entries = this.finder.findAll().filter((entry) => newElements.includes(entry.element));
      const { ready, failed } = this._convertAll(entries);
      if (failed.length > 0) {
        this._reportUnrecognizable(failed, "新");
      }
      if (ready.length > 0) {
        this._processAll(ready);
      } else if (entries.length > 0) {
        this._reportNoneRecognizable(entries.length, "新");
      }
    }
    // ---------- 定时扫描 ----------
    _startPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
      }
      this.pollTimer = setInterval(() => this._pollOnce(), TIMING.POLL_INTERVAL);
    }
    /** 补充 MutationObserver 覆盖不到的验证码(如仅由云端规则命中的元素) */
    _pollOnce() {
      if (this.blocklist.isCurrentDomainBlocked()) {
        return;
      }
      try {
        const fresh = this._attachNewIcons();
        if (fresh.length === 0) {
          return;
        }
        this.toast.show(`检测到 ${fresh.length} 个验证码，点击识别图标开始识别`, "info");
        if (this.settings.autoRecognize) {
          const { ready } = this._convertAll(fresh);
          this._processAll(ready);
        }
      } catch (error) {
        console.error("检测验证码时出错：", error);
      }
    }
    /**
     * 只为还没有图标的验证码添加图标,返回本轮新增的。
     * NOTE: 旧实现中定时扫描创建的图标点击时不阻止默认行为/冒泡(与其余路径不一致),
     * 为保持行为不变这里原样保留;是否统一为阻止,留待确认。
     */
    _attachNewIcons() {
      const fresh = [];
      for (const element of this.finder.findElements()) {
        if (this.icons.find(element)) {
          continue;
        }
        const entry = this.finder.locate(element);
        this._attachIcon(entry, { interceptClick: false });
        fresh.push(entry);
      }
      return fresh;
    }
    // ---------- 自动识别的公共步骤 ----------
    /** 逐个转换图片,分为可识别(带转换结果)与不可识别(带原因)两组 */
    _convertAll(entries) {
      const ready = [];
      const failed = [];
      entries.forEach((entry) => {
        const converted = this.converter.toBase64(entry.element);
        if (converted.success) {
          ready.push({ entry, converted });
        } else {
          failed.push(converted.message);
        }
      });
      return { ready, failed };
    }
    _processAll(ready) {
      ready.forEach(({ entry, converted }) => {
        const icon = this._attachIcon(entry);
        this.processor.process(entry.element, entry.inputField, icon, converted);
      });
    }
    /** @param {string} wording - 措辞前缀,首次扫描为空,DOM 变化为“新” */
    _reportUnrecognizable(reasons, wording) {
      const message = `检测到 ${reasons.length} 个${wording}验证码图片无法识别：${reasons[0]}`;
      console.warn(message);
      this.toast.show(message, "error");
    }
    _reportNoneRecognizable(total, wording) {
      const message = `检测到 ${total} 个${wording}验证码，但均无法自动识别`;
      console.warn(message);
      this.toast.show(message, "error");
    }
  }
  const NOT_HIDDEN = ':not([type="hidden"])';
  function looksLikeCaptchaInput(input) {
    const name2 = (input.name || "").toLowerCase();
    const id = (input.id || "").toLowerCase();
    const placeholder = (input.placeholder || "").toLowerCase();
    return name2.includes("captcha") || name2.includes("verif") || id.includes("captcha") || id.includes("verif") || placeholder.includes("captcha") || placeholder.includes("验证码");
  }
  class InputFieldFinder {
    /**
     * @param {import("./SelectorResolver.js").SelectorResolver} resolver
     */
    constructor(resolver) {
      this.resolver = resolver;
    }
    /**
     * @param {HTMLElement} captchaElement
     * @returns {HTMLInputElement|null}
     */
    find(captchaElement) {
      const selectors = this._buildSelectors();
      const parent = captchaElement.parentElement;
      return this._queryFirst(parent, selectors) || this._queryFirst(this._closestForm(parent), selectors) || this._queryFirst(document, selectors) || this._guessByAttributes();
    }
    /**
     * 基础与规则选择器都排除 hidden 输入框;规则里的选择器会再原样追加一份,
     * 这样规则作者显式指向 hidden 输入框时仍然生效。
     */
    _buildSelectors() {
      const ruleSelectors = this.resolver.ruleInputSelectors();
      const filtered = [...this.resolver.baseInputSelectors(), ...ruleSelectors].map(
        (selector) => selector.includes(NOT_HIDDEN) ? selector : `${selector}${NOT_HIDDEN}`
      );
      return [...filtered, ...ruleSelectors.filter((selector) => !filtered.includes(selector))];
    }
    /** 在 root 内按选择器顺序查找,返回第一个命中的输入框 */
    _queryFirst(root, selectors) {
      if (!root) {
        return null;
      }
      for (const selector of selectors) {
        try {
          const found = root.querySelector(selector);
          if (found) {
            return found;
          }
        } catch (error) {
          console.error(`选择器 ${selector} 执行出错:`, error);
        }
      }
      return null;
    }
    _closestForm(element) {
      let node = element;
      while (node && node.tagName !== "FORM" && node !== document.body) {
        node = node.parentElement;
      }
      return node && node.tagName === "FORM" ? node : null;
    }
    /** 最后的兜底:优先带验证码特征的输入框,否则取页面第一个非 hidden 输入框 */
    _guessByAttributes() {
      const inputs = [...document.querySelectorAll(`input${NOT_HIDDEN}`)];
      return inputs.find(looksLikeCaptchaInput) || inputs[0] || null;
    }
  }
  class RecognitionIconManager {
    /** 验证码元素后面已有的识别图标,没有则返回 null */
    find(element) {
      const next = element.nextElementSibling;
      return next && next.classList.contains(ICON_CLASS.BASE) ? next : null;
    }
    /**
     * 确保验证码元素后面有识别图标;已存在则直接返回,不重复绑定事件
     * @param {HTMLElement} element - 验证码元素
     * @param {(icon: HTMLElement) => void} onActivate - 点击图标时的回调
     * @param {object} [options]
     * @param {boolean} [options.interceptClick=true] - 是否阻止点击事件的默认行为与冒泡
     * @returns {HTMLElement} 图标元素
     */
    attach(element, onActivate, { interceptClick = true } = {}) {
      const existing = this.find(element);
      if (existing) {
        return existing;
      }
      const icon = this._create(onActivate, interceptClick);
      element.parentNode.insertBefore(icon, element.nextSibling);
      return icon;
    }
    setLoading(icon) {
      icon.classList.add(ICON_CLASS.LOADING);
    }
    /** 结束加载状态,短暂显示成功/失败图标后恢复 */
    showResult(icon, success) {
      const resultClass = success ? ICON_CLASS.SUCCESS : ICON_CLASS.ERROR;
      icon.classList.remove(ICON_CLASS.LOADING);
      icon.classList.add(resultClass);
      setTimeout(() => icon.classList.remove(resultClass), TIMING.ICON_RESULT_DURATION);
    }
    _create(onActivate, interceptClick) {
      const icon = document.createElement("div");
      icon.classList.add(ICON_CLASS.BASE);
      icon.title = "点击识别验证码";
      icon.addEventListener("click", (event) => {
        if (interceptClick) {
          event.preventDefault();
          event.stopPropagation();
        }
        onActivate(icon);
      });
      return icon;
    }
  }
  const DEFAULT_CAPTCHA_SELECTORS = [
    'img[src*="captcha"]',
    'img[src*="verify"]',
    'img[alt*="验证码"]',
    'img[title*="验证码"]',
    'img[alt*="captcha"]',
    'img[id="captchaPic"]',
    'img[id*="Captcha"]',
    ".captchaimage img",
    ".validate-code img",
    'img[style="z-index: 2; position: absolute; bottom: -11px; left: 206px; width: 88px; height: 40px;"]',
    '.authcode img[id="authImage"]',
    'img[class="verification-img"]',
    'img[name="imgCaptcha"]'
  ];
  const DEFAULT_INPUT_SELECTORS = [
    'input[name*="captcha"]',
    'input[name*="verify"]',
    'input[placeholder="请输入图片验证码"]',
    'input[id="authcode"]',
    'input[placeholder*="captcha"]',
    'input[placeholder*="验证码"]:not([placeholder*="短信"])'
  ];
  function escapeRegExp(text) {
    return text.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  }
  function wildcardToRegExp(pattern) {
    return new RegExp(`^${escapeRegExp(pattern).replace(/\*/g, ".*")}$`);
  }
  function isRegexLiteral(pattern) {
    return pattern.startsWith("/") && pattern.endsWith("/");
  }
  function testRegexLiteral(pattern, text, errorLabel) {
    try {
      return new RegExp(pattern.substring(1, pattern.length - 1)).test(text);
    } catch (error) {
      console.error(errorLabel, pattern, error);
      return false;
    }
  }
  function matchUrlPattern(pattern, url) {
    if (!pattern || pattern === "*") {
      return true;
    }
    if (isRegexLiteral(pattern)) {
      return testRegexLiteral(pattern, url, "无效的正则表达式规则：");
    }
    if (pattern.includes("*")) {
      return wildcardToRegExp(pattern).test(url);
    }
    return url.includes(pattern);
  }
  function appendUnique(list, items) {
    const result = [...list];
    items.forEach((item) => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });
    return result;
  }
  class SelectorResolver {
    /**
     * @param {object} deps
     * @param {object} deps.settings - 响应式设置对象
     * @param {import("../core/RulesService.js").RulesService} deps.rulesService
     */
    constructor({ settings, rulesService }) {
      this.settings = settings;
      this.rulesService = rulesService;
    }
    /** 内置 + 用户自定义的验证码图片选择器(不含云端规则) */
    baseCaptchaSelectors() {
      return [...DEFAULT_CAPTCHA_SELECTORS, ...this._custom(this.settings.customCaptchaSelectors)];
    }
    /** 内置 + 用户自定义的输入框选择器(不含云端规则) */
    baseInputSelectors() {
      return [...DEFAULT_INPUT_SELECTORS, ...this._custom(this.settings.customInputSelectors)];
    }
    /** 完整的验证码图片选择器:基础选择器 + 当前 URL 命中的规则 */
    captchaSelectors() {
      return appendUnique(this.baseCaptchaSelectors(), this._ruleSelectors("captcha_image_selector"));
    }
    /** 当前 URL 命中的规则中的输入框选择器 */
    ruleInputSelectors() {
      return appendUnique([], this._ruleSelectors("captcha_input_selector"));
    }
    /** 供 MutationObserver 使用的合并选择器(仅基础选择器) */
    observedSelector() {
      return this.baseCaptchaSelectors().join(", ");
    }
    _custom(selectors) {
      return Array.isArray(selectors) ? selectors.filter((selector) => selector && selector.trim()) : [];
    }
    /** 当前 URL 命中的规则中,某个字段的非空值 */
    _ruleSelectors(field) {
      const rules = this.rulesService.rules;
      if (!Array.isArray(rules)) {
        return [];
      }
      const url = window.location.href;
      return rules.filter((rule) => matchUrlPattern(rule.url_pattern, url)).map((rule) => rule[field]).filter(Boolean);
    }
  }
  class ClipboardService {
    /**
     * @param {string} text
     * @returns {Promise<"api"|"fallback">} 实际使用的复制方式
     */
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        return "api";
      } catch (error) {
        console.error("使用 Clipboard API 失败，尝试传统方法", error);
        this._copyByExecCommand(text);
        return "fallback";
      }
    }
    _copyByExecCommand(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.documentElement.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.documentElement.removeChild(textarea);
    }
  }
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const { iterator, toStringTag } = Symbol;
  const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type2) => {
    type2 = type2.toLowerCase();
    return (thing) => kindOf(thing) === type2;
  };
  const typeOfTest = (type2) => (thing) => typeof thing === type2;
  const { isArray } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString = typeOfTest("string");
  const isFunction = typeOfTest("function");
  const isNumber = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject$1 = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
  };
  const isDate = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction(val.pipe);
  const isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
  const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject$1(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name2) => {
      let ret;
      if ((ret = reducer(descriptor, name2, obj)) !== false) {
        reducedDescriptors[name2] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name2) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name2) !== -1) {
        return false;
      }
      const value = obj[name2];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name2 + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);
      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === "function",
    isFunction(_global.postMessage)
  );
  const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
  const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
  const utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject: isPlainObject$1,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable
  };
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }
  utils$1.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  const prototype$1 = AxiosError.prototype;
  const descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils$1.toFlatObject(error, axiosError, function filter2(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }
  function removeBrackets(key) {
    return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils$1.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (utils$1.isBoolean(value)) {
        return value.toString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError("Blob is not supported. Use a Buffer instead.");
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils$1.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils$1.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils$1.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$1(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name2, value) {
    this._pairs.push([name2, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    if (utils$1.isFunction(options)) {
      options = {
        serialize: options
      };
    }
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  const _navigator = typeof navigator === "object" && navigator || void 0;
  const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
  const hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const origin = hasBrowserEnv && window.location.href || "http://localhost";
  const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    hasBrowserEnv,
    hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin
  }, Symbol.toStringTag, { value: "Module" }));
  const platform = {
    ...utils,
    ...platform$1
  };
  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name2) {
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name2).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name2 = path[index++];
      if (name2 === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name2);
      const isLast = index >= path.length;
      name2 = !name2 && utils$1.isArray(target) ? target.length : name2;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name2)) {
          target[name2] = [target[name2], value];
        } else {
          target[name2] = value;
        }
        return !isNumericKey;
      }
      if (!target[name2] || !utils$1.isObject(target[name2])) {
        target[name2] = [];
      }
      const result = buildPath(path, value, target[name2], index);
      if (result && utils$1.isArray(target[name2])) {
        target[name2] = arrayToObject(target[name2]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};
      utils$1.forEachEntry(formData, (name2, value) => {
        buildPath(parsePropPath(name2), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (0, JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$1.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  const ignoreDuplicateOf = utils$1.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils$1.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils$1.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils$1.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
        let obj = {}, dest, key;
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw TypeError("Object iterator must return a key-value pair");
          }
          obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
        }
        setHeaders(obj, valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$1.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed2 = new this(first);
      targets.forEach((target) => computed2.set(target));
      return computed2;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders);
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders.from(context.headers);
    let data = context.data;
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  function CanceledError(message, config, request) {
    AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils$1.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1e3 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    return [throttled, flush];
  }
  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return throttle((e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? "download" : "upload"]: true
      };
      listener(data);
    }, freq);
  };
  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;
    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };
  const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
  const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
    url = new URL(url, platform.origin);
    return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
  })(
    new URL(platform.origin),
    platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
  ) : () => true;
  const cookies = platform.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(name2, value, expires, path, domain, secure) {
        const cookie = [name2 + "=" + encodeURIComponent(value)];
        utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
        utils$1.isString(path) && cookie.push("path=" + path);
        utils$1.isString(domain) && cookie.push("domain=" + domain);
        secure === true && cookie.push("secure");
        document.cookie = cookie.join("; ");
      },
      read(name2) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove(name2) {
        this.write(name2, "", Date.now() - 864e5);
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({ caseless }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  const resolveConfig = (config) => {
    const newConfig = mergeConfig({}, config);
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
    newConfig.headers = headers = AxiosHeaders.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
    if (auth) {
      headers.set(
        "Authorization",
        "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
      );
    }
    let contentType;
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0);
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type2, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        headers.setContentType([type2 || "multipart/form-data", ...tokens].join("; "));
      }
    }
    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  };
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload();
        flushDownload && flushDownload();
        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener("abort", onCanceled);
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
        request.addEventListener("progress", downloadThrottled);
      }
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
        request.upload.addEventListener("progress", uploadThrottled);
        request.upload.addEventListener("loadend", flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };
  const composeSignals = (signals, timeout) => {
    const { length } = signals = signals ? signals.filter(Boolean) : [];
    if (timeout || length) {
      let controller = new AbortController();
      let aborted;
      const onabort = function(reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
        }
      };
      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
      }, timeout);
      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach((signal2) => {
            signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
          });
          signals = null;
        }
      };
      signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
      const { signal } = controller;
      signal.unsubscribe = () => utils$1.asap(unsubscribe);
      return signal;
    }
  };
  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };
  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }
    const reader = stream.getReader();
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };
  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator2 = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream({
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    }, {
      highWaterMark: 2
    });
  };
  const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };
  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const DEFAULT_CHUNK_SIZE = 64 * 1024;
  const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && ((res) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type2) => {
      !resolvers[type2] && (resolvers[type2] = utils$1.isFunction(res[type2]) ? (res2) => res2[type2]() : (_, config) => {
        throw new AxiosError(`Response type '${type2}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  const fetchAdapter = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      });
      let response = await fetch(request, fetchOptions);
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError.from(err, err && err.code, config, request);
    }
  });
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  const renderReason = (reason) => `- ${reason}`;
  const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters2[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const VERSION = "1.10.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type2, i) => {
    validators$1[type2] = function validator2(thing) {
      return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError(
          formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
          AxiosError.ERR_DEPRECATED
        );
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version2 + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator2 = schema[opt];
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {};
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
          try {
            if (!err.stack) {
              err.stack = stack;
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack;
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator.assertOptions(transitional2, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      if (config.allowAbsoluteUrls !== void 0) ;
      else if (this.defaults.allowAbsoluteUrls !== void 0) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }
      validator.assertOptions(config, {
        baseUrl: validators.spelling("baseURL"),
        withXsrfToken: validators.spelling("withXSRFToken")
      }, true);
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils$1.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils$1.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }
  utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    toAbortSignal() {
      const controller = new AbortController();
      const abort = (err) => {
        controller.abort(err);
      };
      this.subscribe(abort);
      controller.signal.unsubscribe = () => this.unsubscribe(abort);
      return controller.signal;
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context);
    utils$1.extend(instance, Axios.prototype, context, { allOwnKeys: true });
    utils$1.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults);
  axios.Axios = Axios;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders;
  axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode;
  axios.default = axios;
  const MAX_DETAIL_LENGTH = 200;
  function extractDetail(body) {
    if (!body) {
      return "";
    }
    if (typeof body === "string") {
      return body.trim();
    }
    const error = body.error ?? body;
    const detail = typeof error === "string" ? error : error.message || error.msg;
    return typeof detail === "string" ? detail : "";
  }
  function describeHttpError(status, body) {
    const detail = extractDetail(body).slice(0, MAX_DETAIL_LENGTH);
    return detail ? `请求失败，状态码: ${status} (${detail})` : `请求失败，状态码: ${status}`;
  }
  const UNSAFE_HEADERS = ["Host", "Origin", "Referer", "Cookie"];
  class HttpClient {
    /**
     * @param {object} config
     * @param {string} [config.method="GET"]
     * @param {string} config.url
     * @param {object|string} [config.data] - 请求体,对象会被序列化为 JSON
     * @param {object} [config.headers]
     * @param {string} [config.responseType]
     * @returns {Promise<{data: any}>}
     */
    request(config) {
      if (typeof GM_xmlhttpRequest !== "undefined") {
        return this._requestByGM(config);
      }
      return this._requestByAxios(config);
    }
    _requestByGM(config) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: config.method || "GET",
          url: config.url,
          data: this._serializeBody(config.data),
          headers: config.headers || {},
          responseType: config.responseType || "json",
          onload: (response) => this._onGMLoad(config, response, resolve, reject),
          onerror: (error) => reject(error)
        });
      });
    }
    _serializeBody(data) {
      if (!data) {
        return void 0;
      }
      return typeof data === "string" ? data : JSON.stringify(data);
    }
    _onGMLoad(config, response, resolve, reject) {
      const body = this._parseGMBody(config, response);
      if (response.status < 200 || response.status >= 300) {
        reject(new Error(describeHttpError(response.status, body)));
        return;
      }
      resolve({ data: body });
    }
    _parseGMBody(config, response) {
      const raw = response.response || response.responseText;
      try {
        const needParse = config.responseType === "json" && typeof response.response === "string";
        return needParse ? JSON.parse(raw) : raw;
      } catch (error) {
        return raw;
      }
    }
    _requestByAxios(config) {
      const headers = { ...config.headers };
      UNSAFE_HEADERS.forEach((name2) => delete headers[name2]);
      return axios({
        method: config.method || "GET",
        url: config.url,
        data: config.data,
        headers,
        responseType: config.responseType
      }).catch((error) => {
        throw this._toReadableError(error);
      });
    }
    /** 有响应体的失败请求,附上接口返回的错误说明;网络层错误原样抛出 */
    _toReadableError(error) {
      const { response } = error;
      return response ? new Error(describeHttpError(response.status, response.data)) : error;
    }
  }
  class RulesService {
    /**
     * @param {object} deps
     * @param {import("./StorageService.js").StorageService} deps.storage
     * @param {import("./HttpClient.js").HttpClient} deps.http
     * @param {object} deps.settings - 响应式设置对象(读取 rulesUrl / autoFetchCloudRules)
     * @param {import("./ToastService.js").ToastService} deps.toast
     */
    constructor({ storage, http, settings, toast }) {
      this.storage = storage;
      this.http = http;
      this.settings = settings;
      this.toast = toast;
      this.state = vue.reactive({ rules: [], status: "" });
    }
    get rules() {
      return this.state.rules;
    }
    /** 优先使用本地缓存的规则;没有缓存时从远端拉取 */
    loadCachedOrFetch() {
      try {
        const cached = this.storage.getJson(STORAGE_KEYS.RULES);
        if (cached) {
          this.state.rules = cached;
        } else {
          this.fetchAndSave();
        }
      } catch (error) {
        console.error("加载规则缓存失败：", error);
      }
    }
    /** 从远端拉取规则并写入本地缓存 */
    async fetchAndSave() {
      try {
        this.state.status = "loading";
        const url = this.settings.rulesUrl || DEFAULT_RULES_URL;
        const response = await this.http.request({ method: "GET", url, responseType: "json" });
        if (response && response.data) {
          this._applyFetched(response.data);
        } else {
          this._fail("规则加载失败，请稍后重试");
        }
      } catch (error) {
        console.error("加载规则失败：", error);
        this._fail("规则加载失败：" + (error.message || "未知错误"));
      }
    }
    /** 开启“每日首次运行时自动获取云端规则”后,每天最多拉取一次 */
    async fetchDailyIfNeeded() {
      try {
        if (!this.settings.autoFetchCloudRules) {
          return;
        }
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        if (this.storage.get(STORAGE_KEYS.LAST_CONFIG_UPDATE) === today) {
          return;
        }
        this.toast.show("正在获取最新云端配置...", "info");
        await this.fetchAndSave();
        this.storage.set(STORAGE_KEYS.LAST_CONFIG_UPDATE, today);
        this.toast.show("云端配置更新完成", "success");
      } catch (error) {
        console.error("自动获取云端配置失败：", error);
      }
    }
    _applyFetched(rules) {
      this.storage.setJson(STORAGE_KEYS.RULES, rules);
      this.state.rules = rules;
      this.state.status = "success";
      this.toast.show("规则加载成功！", "success");
    }
    _fail(message) {
      this.state.status = "error";
      this.toast.show(message, "error");
    }
  }
  const PROVIDER_PRESETS = [
    {
      id: "openai",
      label: "OpenAI",
      protocol: "openai",
      keyLabel: "OpenAI API Key:",
      keyPlaceholder: "sk-...",
      defaultUrl: "https://api.openai.com/v1/chat/completions",
      defaultModel: "gpt-4.1-mini",
      knownModels: ["gpt-4.1-mini", "gpt-4.1", "gpt-4o", "gpt-4o-mini", "gpt-5.6-luna", "gpt-5.6-terra", "gpt-5.6-sol"],
      modelsSource: "api",
      params: { max_tokens: 300, temperature: 0 },
      // GPT-5 及之后的模型、o 系列推理模型不接受 max_tokens / temperature
      modelParams: [{ pattern: "^(gpt-5|gpt-6|o\\d)", params: { max_completion_tokens: 4096 } }]
    },
    {
      id: "anthropic",
      label: "Anthropic Claude",
      protocol: "anthropic",
      keyLabel: "Anthropic API Key:",
      keyPlaceholder: "sk-ant-...",
      defaultUrl: "https://api.anthropic.com/v1/messages",
      defaultModel: "claude-sonnet-5",
      knownModels: ["claude-sonnet-5", "claude-opus-5", "claude-haiku-4-5", "claude-fable-5-1"],
      modelsSource: "api",
      params: {}
    },
    {
      id: "gemini",
      label: "Google Gemini",
      protocol: "gemini",
      keyLabel: "Google Gemini API Key:",
      keyPlaceholder: "输入Gemini API Key",
      defaultUrl: "https://generativelanguage.googleapis.com/v1beta/models",
      defaultModel: "gemini-3.5-flash-lite",
      knownModels: ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.8-flash"],
      modelsSource: "api",
      params: { generationConfig: { temperature: 0 } },
      // 官方要求 Gemini 3.x 不要修改 temperature(压低会导致循环、质量下降)
      modelParams: [{ pattern: "^gemini-3", params: {} }]
    },
    {
      id: "qwen",
      label: "阿里云通义千问",
      protocol: "openai",
      keyLabel: "阿里云通义千问 API Key:",
      keyPlaceholder: "API Key",
      defaultUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      defaultModel: "qwen-vl-max-2025-04-02",
      knownModels: [
        "qwen3-vl-plus",
        "qwen3-vl-flash",
        "qwen-vl-max-2025-04-02",
        "qwen-vl-max",
        "qwen-vl-plus",
        "qwen-vl-max-0809",
        "qwen-vl-max-0201"
      ],
      modelsSource: "static",
      params: { temperature: 0.1, top_p: 1, stream: false }
    },
    {
      id: "deepseek",
      label: "DeepSeek",
      protocol: "openai",
      keyLabel: "DeepSeek API Key:",
      keyPlaceholder: "sk-...",
      defaultUrl: "https://api.deepseek.com/chat/completions",
      defaultModel: "deepseek-flash",
      knownModels: ["deepseek-flash"],
      modelsSource: "api",
      // 思考模式默认开启,验证码识别用不到,关闭后更快更省
      params: { thinking: { type: "disabled" } }
    },
    {
      id: "kimi",
      label: "Kimi (月之暗面)",
      protocol: "openai",
      keyLabel: "Kimi API Key:",
      keyPlaceholder: "sk-...",
      defaultUrl: "https://api.moonshot.cn/v1/chat/completions",
      defaultModel: "kimi-k2.6",
      knownModels: ["kimi-k3", "kimi-k2.6"],
      modelsSource: "api",
      urlHint: "国内站与国际站的 Key 互不通用,使用国际站 Key 请改为 https://api.moonshot.ai/v1",
      params: {}
    },
    {
      id: "zhipu",
      label: "智谱 GLM",
      protocol: "openai",
      keyLabel: "智谱 API Key:",
      keyPlaceholder: "API Key",
      defaultUrl: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      defaultModel: "glm-4.6v-flash",
      knownModels: ["glm-4.6v-flash", "glm-4.6v-flashx", "glm-4.6v", "glm-5v-turbo"],
      modelsSource: "static",
      params: {}
    },
    {
      id: "doubao",
      label: "豆包 (火山方舟)",
      protocol: "openai",
      keyLabel: "火山方舟 API Key:",
      keyPlaceholder: "API Key",
      defaultUrl: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      defaultModel: "doubao-seed-2-0-mini-260428",
      knownModels: ["doubao-seed-2-0-mini-260428", "doubao-seed-2-0-lite-260215", "doubao-seed-1-6-vision-250815"],
      modelsSource: "static",
      modelHint: "也可以填写自建的推理接入点 ID(ep-xxxx)",
      params: {}
    },
    {
      id: "hunyuan",
      label: "腾讯混元",
      protocol: "openai",
      keyLabel: "腾讯混元 API Key:",
      keyPlaceholder: "API Key",
      defaultUrl: "https://api.hunyuan.cloud.tencent.com/v1/chat/completions",
      defaultModel: "hunyuan-vision",
      knownModels: ["hunyuan-vision"],
      modelsSource: "static",
      params: {}
    },
    {
      id: "qianfan",
      label: "百度千帆 (文心)",
      protocol: "openai",
      keyLabel: "百度千帆 API Key:",
      keyPlaceholder: "API Key",
      defaultUrl: "https://qianfan.baidubce.com/v2/chat/completions",
      defaultModel: "ernie-4.5-vl-28b-a3b",
      knownModels: ["ernie-4.5-vl-28b-a3b"],
      modelsSource: "static",
      params: {}
    },
    {
      id: "xai",
      label: "xAI Grok",
      protocol: "openai",
      keyLabel: "xAI API Key:",
      keyPlaceholder: "xai-...",
      defaultUrl: "https://api.x.ai/v1/chat/completions",
      defaultModel: "grok-4.6",
      knownModels: ["grok-4.6"],
      modelsSource: "api",
      params: {}
    },
    {
      id: "custom",
      label: "自定义 (OpenAI 兼容)",
      protocol: "openai",
      keyLabel: "API Key (可选):",
      keyPlaceholder: "本地服务可留空",
      keyRequired: false,
      defaultUrl: "",
      urlPlaceholder: "http://localhost:11434/v1/chat/completions",
      urlHint: "任意兼容 OpenAI 的服务(Ollama、SiliconFlow、OpenRouter、Mistral、Groq、中转站等)。只填到 /v1 也可以,会自动补全",
      defaultModel: "",
      knownModels: [],
      modelsSource: "api",
      params: {}
    }
  ];
  const PROVIDER_FIELD_SUFFIXES = ["Key", "ApiUrl", "Model", "Prompt", "ExtraParams"];
  function createProviderFields() {
    const fields = PROVIDER_PRESETS.flatMap(
      ({ id }) => PROVIDER_FIELD_SUFFIXES.map((suffix) => [`${id}${suffix}`, ""])
    );
    return Object.fromEntries(fields);
  }
  function createDefaultSettings() {
    return {
      apiType: "openai",
      ...createProviderFields(),
      // 功能开关
      autoRecognize: false,
      copyToClipboard: true,
      showNotification: true,
      autoFetchCloudRules: false,
      // 提示词模式:simple 简洁版(节省 Token) / detailed 详细版
      promptType: "simple",
      // 高级设置
      customCaptchaSelectors: [],
      customInputSelectors: [],
      disabledDomains: "",
      rulesUrl: DEFAULT_RULES_URL
    };
  }
  class SettingsStore {
    /**
     * @param {import("./StorageService.js").StorageService} storage
     */
    constructor(storage) {
      this.storage = storage;
      this.settings = vue.reactive(createDefaultSettings());
    }
    /** 从存储加载,已保存的设置覆盖默认值(新增字段保留默认值) */
    load() {
      try {
        const saved = this.storage.getJson(STORAGE_KEYS.SETTINGS);
        if (saved) {
          Object.assign(this.settings, saved);
        }
      } catch (error) {
        console.error("加载设置失败：", error);
      }
    }
    /** 保存到存储,失败时抛出异常由调用方处理 */
    save() {
      this.storage.setJson(STORAGE_KEYS.SETTINGS, this.settings);
    }
  }
  class StorageService {
    get _hasGM() {
      return typeof GM_getValue !== "undefined" && typeof GM_setValue !== "undefined";
    }
    /** 读取原始字符串,不存在时返回假值 */
    get(key) {
      return this._hasGM ? GM_getValue(key) : localStorage.getItem(key);
    }
    /** 写入原始字符串 */
    set(key, value) {
      if (this._hasGM) {
        GM_setValue(key, value);
      } else {
        localStorage.setItem(key, value);
      }
    }
    /** 读取并反序列化 JSON,不存在时返回 null */
    getJson(key) {
      const raw = this.get(key);
      return raw ? JSON.parse(raw) : null;
    }
    /** 序列化为 JSON 后写入 */
    setJson(key, value) {
      this.set(key, JSON.stringify(value));
    }
  }
  const CONTAINER_ID = "captcha-toast-container";
  const SHOW_DELAY = 10;
  const DISPLAY_DURATION = 3e3;
  const HIDE_ANIMATION_DURATION = 300;
  class ToastService {
    /**
     * @param {object} settings - 响应式设置对象(读取 showNotification)
     */
    constructor(settings) {
      this.settings = settings;
    }
    /**
     * @param {string} message - 提示信息
     * @param {"info"|"success"|"error"} [type="info"] - 提示类型
     */
    show(message, type2 = "info") {
      if (this.settings.showNotification === false) {
        return;
      }
      const toast = this._createToast(message, type2);
      this._getContainer().prepend(toast);
      setTimeout(() => toast.classList.add("captcha-toast-show"), SHOW_DELAY);
      setTimeout(() => this._dismiss(toast), DISPLAY_DURATION);
    }
    _getContainer() {
      let container = document.getElementById(CONTAINER_ID);
      if (!container) {
        container = document.createElement("div");
        container.id = CONTAINER_ID;
        document.documentElement.appendChild(container);
      }
      return container;
    }
    _createToast(message, type2) {
      const toast = document.createElement("div");
      toast.className = `captcha-toast captcha-toast-${type2}`;
      toast.textContent = message;
      return toast;
    }
    _dismiss(toast) {
      toast.classList.remove("captcha-toast-show");
      toast.classList.add("captcha-toast-hide");
      setTimeout(() => toast.remove(), HIDE_ANIMATION_DURATION);
    }
  }
  const MIN_BASE64_LENGTH = 100;
  const ok = (data) => ({ success: true, data });
  const fail = (message) => ({ success: false, message });
  function encodeCanvas(canvas) {
    const data = canvas.toDataURL("image/png").split(",")[1];
    return data && data.length >= MIN_BASE64_LENGTH ? data : null;
  }
  function luminance(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }
  function analyzeImageCharacteristics(imageData) {
    const { colors, brightRatio } = measureColors(imageData.data);
    return {
      hasColoredBackground: colors.r > 100 || colors.g > 100 || colors.b > 100,
      isLightBackground: brightRatio > 0.6,
      isDarkBackground: brightRatio < 0.4,
      isGreenish: colors.g > colors.r && colors.g > colors.b,
      isBlueish: colors.b > colors.r && colors.b > colors.g,
      isReddish: colors.r > colors.g && colors.r > colors.b,
      recommendedStrategy: getProcessingStrategy(colors, brightRatio)
    };
  }
  function getProcessingStrategy(colors, brightRatio) {
    if (colors.g > colors.r && colors.g > colors.b && colors.g > 80) {
      return "green_background";
    }
    if (colors.b > colors.r && colors.b > colors.g && colors.b > 80) {
      return "blue_background";
    }
    if (colors.r > colors.g && colors.r > colors.b && colors.r > 80) {
      return "red_background";
    }
    if (brightRatio > 0.7) {
      return "light_background";
    }
    return brightRatio < 0.3 ? "dark_background" : "standard";
  }
  function assessImageQuality(imageData) {
    const { clarity, contrastSum, edgeCount } = measureSharpness(imageData);
    const totalPixels = (imageData.width - 2) * (imageData.height - 2);
    const clarityScore = Math.min(100, clarity / totalPixels / 2);
    const contrastScore = Math.min(100, contrastSum / totalPixels / 1.28);
    const edgeScore = Math.min(100, edgeCount / totalPixels * 500);
    return Math.round((clarityScore + contrastScore + edgeScore) / 3);
  }
  function measureColors(data) {
    let totalPixels = 0;
    let brightPixels = 0;
    const sum = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < data.length; i += 4) {
      if (luminance(data[i], data[i + 1], data[i + 2]) > 128) {
        brightPixels++;
      }
      totalPixels++;
      sum.r += data[i];
      sum.g += data[i + 1];
      sum.b += data[i + 2];
    }
    const divisor = totalPixels / 4;
    return {
      colors: { r: sum.r / divisor, g: sum.g / divisor, b: sum.b / divisor },
      brightRatio: brightPixels / totalPixels
    };
  }
  function measureSharpness({ data, width, height }) {
    const grayAt = (x, y) => {
      const idx = (y * width + x) * 4;
      return luminance(data[idx], data[idx + 1], data[idx + 2]);
    };
    let clarity = 0;
    let contrastSum = 0;
    let edgeCount = 0;
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const current = grayAt(x, y);
        const gradientX = Math.abs(current - grayAt(x + 1, y));
        const gradientY = Math.abs(current - grayAt(x, y + 1));
        const gradient = Math.sqrt(gradientX * gradientX + gradientY * gradientY);
        clarity += gradient;
        contrastSum += Math.abs(current - 128);
        if (gradient > 30) {
          edgeCount++;
        }
      }
    }
    return { clarity, contrastSum, edgeCount };
  }
  function removeImageNoise(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const source = imageData.data;
    const filtered = new Uint8ClampedArray(source);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let channel = 0; channel < 3; channel++) {
          filtered[(y * width + x) * 4 + channel] = medianOfNeighbors(source, width, x, y, channel);
        }
      }
    }
    imageData.data.set(filtered);
    ctx.putImageData(imageData, 0, 0);
  }
  function applyMorphologyOperations(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const eroded = erode(toBinary(data), width, height);
    const opened = dilate(eroded, width, height);
    for (let i = 0; i < opened.length; i++) {
      const value = opened[i] === 0 ? 0 : 255;
      data[i * 4] = value;
      data[i * 4 + 1] = value;
      data[i * 4 + 2] = value;
    }
    ctx.putImageData(imageData, 0, 0);
  }
  function upscaleCanvas(sourceCanvas, qualityScore) {
    try {
      const scale = pickScaleFactor(sourceCanvas, qualityScore);
      const scaled = document.createElement("canvas");
      scaled.width = sourceCanvas.width * scale;
      scaled.height = sourceCanvas.height * scale;
      const ctx = scaled.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sourceCanvas, 0, 0, scaled.width, scaled.height);
      console.log(
        `图像智能放大: ${sourceCanvas.width}x${sourceCanvas.height} -> ${scaled.width}x${scaled.height} (${scale}x)`
      );
      return scaled;
    } catch (error) {
      console.error("图像放大失败:", error);
      return null;
    }
  }
  function pickScaleFactor(canvas, qualityScore) {
    const minDimension = Math.min(canvas.width, canvas.height);
    if (minDimension < 30) {
      return qualityScore < 50 ? 4 : 3;
    }
    if (minDimension < 40) {
      return qualityScore < 60 ? 3 : 2;
    }
    return 2;
  }
  function medianOfNeighbors(data, width, x, y, channel) {
    const values = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        values.push(data[((y + dy) * width + (x + dx)) * 4 + channel]);
      }
    }
    values.sort((a, b) => a - b);
    return values[4];
  }
  function toBinary(data) {
    const binary = new Array(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
      binary[i / 4] = luminance(data[i], data[i + 1], data[i + 2]) < 128 ? 0 : 1;
    }
    return binary;
  }
  function erode(binary, width, height) {
    return transformNeighborhood(binary, width, height, (values) => values.every(isForeground));
  }
  function dilate(binary, width, height) {
    return transformNeighborhood(binary, width, height, (values) => values.some(isForeground));
  }
  const isForeground = (value) => value === 0;
  function transformNeighborhood(binary, width, height, becomesForeground) {
    const result = new Array(width * height).fill(1);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const neighborhood = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            neighborhood.push(binary[(y + dy) * width + (x + dx)]);
          }
        }
        result[y * width + x] = becomesForeground(neighborhood) ? 0 : 1;
      }
    }
    return result;
  }
  const clamp255 = (value) => Math.max(0, Math.min(255, value));
  const stretch = (value, contrast, threshold) => (value - threshold) * contrast + threshold;
  function suppressDominantColor(dominant) {
    return (r, g, b) => {
      const pixel = [r, g, b];
      const others = [0, 1, 2].filter((channel) => channel !== dominant);
      const isDominant = pixel[dominant] > pixel[others[0]] && pixel[dominant] > pixel[others[1]] && pixel[dominant] > 80;
      return pixel.map((value, channel) => {
        if (!isDominant) {
          return Math.min(255, value + 100);
        }
        return Math.max(0, value - (channel === dominant ? 150 : 120));
      });
    };
  }
  function stretchContrast(contrast, threshold) {
    return (r, g, b) => [r, g, b].map((value) => stretch(value, contrast, threshold));
  }
  function standardTransform(r, g, b) {
    const stretched = stretchContrast(2.5, 128)(r, g, b);
    const brightness = luminance(r, g, b);
    if (brightness > 50 && brightness < 200) {
      return stretched.map((value) => Math.min(255, value * 1.3));
    }
    return stretched;
  }
  const PIXEL_TRANSFORMS = {
    green_background: suppressDominantColor(1),
    blue_background: suppressDominantColor(2),
    red_background: suppressDominantColor(0),
    light_background: stretchContrast(3, 140),
    dark_background: stretchContrast(2, 80),
    standard: standardTransform
  };
  function binarize([r, g, b], threshold) {
    const brightness = luminance(r, g, b);
    if (brightness > threshold) {
      return [255, 255, 255];
    }
    return brightness < threshold - 40 ? [0, 0, 0] : [r, g, b];
  }
  function enhancePixels(data, strategy) {
    const transform = PIXEL_TRANSFORMS[strategy] || standardTransform;
    const threshold = strategy.includes("background") ? 120 : 140;
    for (let i = 0; i < data.length; i += 4) {
      const rgb = transform(data[i], data[i + 1], data[i + 2]);
      const [r, g, b] = binarize(rgb, threshold);
      data[i] = clamp255(r);
      data[i + 1] = clamp255(g);
      data[i + 2] = clamp255(b);
    }
  }
  const MORPHOLOGY_QUALITY_LIMIT = 70;
  const UPSCALE_MIN_WIDTH = 120;
  const UPSCALE_MIN_HEIGHT = 40;
  class CanvasOptimizer {
    /**
     * @param {HTMLCanvasElement} canvas
     * @returns {{success: true, data: string}|{success: false, message: string}}
     */
    optimize(canvas) {
      try {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return fail("无法获取 Canvas 上下文");
        }
        const optimized = this._enhance(canvas, ctx);
        const data = encodeCanvas(optimized);
        return data ? ok(data) : fail("优化Canvas数据失败或内容为空");
      } catch (error) {
        console.error("优化Canvas图像失败:", error);
        return fail("优化Canvas图像失败: " + (error.message || "未知错误"));
      }
    }
    /** 完整的优化流水线,返回最终的画布 */
    _enhance(canvas, ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const analysis = analyzeImageCharacteristics(imageData);
      const strategy = analysis.recommendedStrategy;
      const quality = assessImageQuality(imageData);
      console.log(`图像分析结果: ${strategy}，质量评分: ${quality}`, analysis);
      enhancePixels(imageData.data, strategy);
      const result = this._createCanvas(canvas.width, canvas.height);
      const resultCtx = result.getContext("2d");
      resultCtx.putImageData(imageData, 0, 0);
      removeImageNoise(resultCtx, result.width, result.height);
      if (strategy !== "standard" && quality < MORPHOLOGY_QUALITY_LIMIT) {
        applyMorphologyOperations(resultCtx, result.width, result.height);
      }
      return this._upscaleIfSmall(result, quality);
    }
    _createCanvas(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
    _upscaleIfSmall(canvas, quality) {
      if (canvas.width >= UPSCALE_MIN_WIDTH && canvas.height >= UPSCALE_MIN_HEIGHT) {
        return canvas;
      }
      return upscaleCanvas(canvas, quality) || canvas;
    }
  }
  class ImageConverter {
    /**
     * @param {HTMLImageElement|HTMLCanvasElement} element
     */
    toBase64(element) {
      try {
        return element.tagName === "CANVAS" ? this._fromCanvas(element) : this._fromImage(element);
      } catch (error) {
        console.error("图片转base64失败:", error);
        return fail("图片转换失败: " + (error.message || "未知错误"));
      }
    }
    _fromCanvas(canvas) {
      try {
        const data = encodeCanvas(canvas);
        if (!data) {
          console.error("生成的canvas base64数据无效或过短");
          return fail("Canvas数据转换失败或内容为空。请刷新验证码后重试。");
        }
        return ok(data);
      } catch (error) {
        console.error("从Canvas获取数据失败:", error);
        return fail("无法从Canvas获取数据，可能是跨域限制。" + (error.message || ""));
      }
    }
    _fromImage(img) {
      if (!img.complete || !img.naturalWidth) {
        return fail("图片尚未加载完成，请稍后重试");
      }
      if (this._reloadForCrossOrigin(img)) {
        return fail("正在处理跨域图片，请稍后重试");
      }
      const canvas = this._drawToCanvas(img);
      if (!canvas) {
        return fail("无法读取图片数据，可能是跨域限制。请尝试手动下载验证码图片后识别。");
      }
      const data = encodeCanvas(canvas);
      if (!data) {
        console.error("生成的base64数据无效或过短");
        return fail("图片转换失败或内容为空。请刷新验证码后重试。");
      }
      return ok(data);
    }
    /**
     * 跨域图片首次遇到时,设置 crossOrigin 并附加时间戳重新加载。
     * @returns {boolean} 是否触发了重新加载(调用方应稍后重试)
     */
    _reloadForCrossOrigin(img) {
      const src = img.src;
      const isCrossOrigin = !src.startsWith("data:image") && !this._isSameOrigin(src);
      if (!isCrossOrigin || img.crossOrigin === "anonymous") {
        return false;
      }
      img.crossOrigin = "anonymous";
      const separator = src.includes("?") ? "&" : "?";
      img.src = `${src}${separator}_t=${(/* @__PURE__ */ new Date()).getTime()}`;
      return true;
    }
    /** 把图片绘制到 canvas,跨域污染导致无法读取像素时返回 null */
    _drawToCanvas(img) {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(img, 0, 0);
        ctx.getImageData(0, 0, 1, 1);
        return canvas;
      } catch (error) {
        console.error("绘制图片到Canvas失败:", error);
        return null;
      }
    }
    _isSameOrigin(url) {
      try {
        return new URL(url, window.location.origin).origin === window.location.origin;
      } catch (error) {
        return false;
      }
    }
  }
  const TEST_IMAGE_BASE64 = "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";
  class ProviderConnectionTester {
    /**
     * @param {object} deps
     * @param {import("./ProviderRegistry.js").ProviderRegistry} deps.registry
     * @param {import("../core/ToastService.js").ToastService} deps.toast
     */
    constructor({ registry, toast }) {
      this.registry = registry;
      this.toast = toast;
      const ids = registry.providers.map((provider) => provider.meta.id);
      this.status = vue.reactive(Object.fromEntries(ids.map((id) => [id, ""])));
      this.models = vue.reactive(Object.fromEntries(ids.map((id) => [id, []])));
    }
    /** 测试指定服务商的连通性,成功后顺带刷新模型列表 */
    async test(id) {
      const provider = this.registry.get(id);
      try {
        if (!provider.isConfigured()) {
          this.status[id] = "error";
        } else {
          this.status[id] = "loading";
          await this._probe(provider);
        }
      } catch (error) {
        console.error("API 连接测试失败：", error);
        this.status[id] = "error";
      }
      this._scheduleReset(id);
    }
    /** 拉取指定服务商的可用模型列表 */
    async refreshModels(id) {
      try {
        const models = await this.registry.get(id).listModels();
        this.models[id] = models;
        this.toast.show(`成功获取 ${models.length} 个可用模型`, "success");
      } catch (error) {
        console.error(`获取 ${id} 模型列表失败:`, error);
        this.toast.show(`获取模型列表失败: ${error.message}`, "error");
      }
    }
    async _probe(provider) {
      if (await provider.testConnection(TEST_IMAGE_BASE64)) {
        this.status[provider.meta.id] = "success";
        this.refreshModels(provider.meta.id);
      }
    }
    _scheduleReset(id) {
      setTimeout(() => {
        this.status[id] = "";
      }, TIMING.STATUS_RESET_DELAY);
    }
  }
  const SIMPLE_PROMPT = `这是一个验证码识别任务，请按以下步骤操作：

首先，专注于图片中颜色最深、最清晰的字符。

其次，从左到右依次识别这些字符。

然后，忽略所有背景中的浅色图案和干扰线。

最后，只输出识别出的字符本身（区分大小写），不要输出任何解释、标点或其它文字。`;
  const DEFAULT_PROMPT = `# Role: 验证码识别专家

## Profile
- language: 中文
- description: 一个专为高精度识别验证码而设计的AI模型。能够快速、准确地从复杂的图像中提取字符或计算数学表达式的结果，并能有效对抗常见的干扰元素。
- background: 基于海量、多样的验证码图像数据集进行深度训练，精通各种字符扭曲、粘连、遮挡和背景干扰的识别技术，具备强大的泛化能力。
- personality: 精确、高效、客观、直接。只关注任务本身，不产生任何与结果无关的额外信息。
- expertise: 计算机视觉、高级光学字符识别（OCR）、图像预处理与去噪、模式识别、基础算术逻辑。
- target_audience: 需要自动化处理验证码的开发者、自动化测试工程师、数据科学家。

## Skills

1. 核心识别能力
   - 高精度字符识别: 准确识别大小写英文字母、数字，并能精确区分外形相似的字符（如：0和O，1和l，g和9）。
   - 数学运算处理: 识别并解析图片中的数学算式（如：3+5*2），并计算出最终的数值结果。
   - 强抗干扰能力: 自动过滤和忽略图像中的干扰线、噪点、斑块、背景纹理等非关键信息。
   - 字符分割技术: 即使在字符粘连、重叠或间距不等的情况下，也能有效地将其分离以便独立识别。

2. 辅助处理能力
   - 图像预处理: 自动对输入图像进行灰度化、二值化、去噪等操作，以提升识别的准确率。
   - 快速响应: 以极低的延迟返回识别结果，满足实时性要求。
   - 结果格式化: 严格按照指定的格式输出，确保输出的纯净性，便于程序调用。
   - 鲁棒性: 对于不同字体、大小、颜色、角度的字符组合均有较高的识别成功率。

## Rules

1. 基本原则：
   - 结果唯一: 输出内容必须是且仅是验证码的识别结果。
   - 绝对精确: 尽最大努力确保字符识别的大小写和数值计算的准确性。
   - 任务聚焦: 仅处理验证码内容，忽略图像中的任何其他元素。
   - 保持静默: 除最终结果外，不输出任何提示、标签、解释或说明。

2. 行为准则：
   - 直接输出结果: 若为字符型验证码，直接返回字符串；若为计算题，直接返回计算后的数字。
   - 严格区分大小写: 必须准确识别并返回字符的原始大小写形式（例如'W'和'w'是不同字符）。
   - 精准区分易混淆字符: 必须对数字"0"和字母"O"、数字"1"和字母"l"等易混淆字符进行准确区分。
   - 自动执行运算: 遇到数学表达式时，必须完成计算并仅返回最终的阿拉伯数字结果。
   - 完整性识别: 必须识别验证码中的每一个字符，绝对不能遗漏、截断或省略任何字符。
   - 边缘字符重视: 特别注意图片边缘的字符，确保不会因为位置偏远而被忽略。
   - 长度验证: 验证码通常为3-8位字符，请确保识别结果的完整性符合常见长度范围。

3. 限制条件：
   - 禁止任何解释: 不得对识别过程、结果的置信度或遇到的困难进行任何说明。
   - 禁止附加文本: 返回的最终结果前后不能有任何空格、引号、标签或“答案是：”等引导性词语。
   - 禁止互动: 不得向用户提问或请求更清晰的图片。
   - 禁止失败提示: 即使无法完全识别，也应根据已识别内容尽力输出，而不是返回“无法识别”之类的自然语言。

## Workflows

- 目标: 接收一张验证码图片，精准、快速地返回其内容或计算结果。
- 步骤 1: 接收图像并进行分析，判断验证码类型（字符型或数学计算型）。
- 步骤 2: 应用图像预处理技术，对图像进行降噪、增强和二值化，以凸显关键字符，强制消除干扰线和背景。
- 步骤 3: 对处理后的图像进行字符分割，然后逐一识别。特别注意图片的左右边缘，确保不遗漏任何字符。
- 步骤 4: 完整性检查：仔细扫描整个图像区域，确认所有可见字符都已被识别，特别是边缘位置的字符。
- 步骤 5: 整合识别结果。如果是字符，则按从左到右的顺序完整拼接所有字符；如果是数学题，则执行运算。
- 步骤 6: 最终验证：确认识别结果与图像中可见的字符一一对应，没有遗漏，也没有多出图像中不存在的字符。
- 步骤 7: 输出最终结果。确保输出内容绝对纯净且完整，符合Rules中的所有规定。
- 预期结果: 一个完整且不含任何多余信息的字符串（如"aB5fG"、"6627"）或一个数字（如"28"）。


## Initialization
作为验证码识别专家，你必须遵守上述Rules，按照Workflows执行任务。

## 关键提醒
⚠️ 绝对不能遗漏任何字符！特别注意：
1. 图片左右边缘的字符（如第一个和最后一个字符）
2. 可能被干扰线遮挡的字符
3. 字体较淡或模糊的字符
4. 与背景色接近的字符
5. 验证码的完整长度，确保每个位置的字符都被识别
同时也不要输出图像中并不存在的字符：只输出你确实看到的字符。

## 彩色背景验证码特殊处理
🎨 对于彩色背景验证码（如绿色、蓝色、红色背景）：
1. 仔细区分文字和背景色，文字通常是白色、黑色或与背景强对比的颜色
2. 注意可能存在的颜色渐变或纹理干扰
3. 某些字符可能因为颜色相近而不够清晰，需要额外仔细识别
4. 彩色背景上的字符边缘可能有锯齿或模糊效果，不要被误导
5. 完整扫描整个图像区域，确保没有因为颜色干扰而遗漏的字符

## 验证码长度提醒
📏 常见验证码长度：
- 4位：最常见（如：A3F9）
- 5位：较常见（如：8K2P7）
- 6位：也很常见（如：M4N8Q1）

## 优秀的提示词示例

🔍 **简洁高效的识别步骤：**

${SIMPLE_PROMPT}`;
  function getBasePrompt(promptType) {
    return promptType === "simple" ? SIMPLE_PROMPT : DEFAULT_PROMPT;
  }
  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  function deepMerge(base, override) {
    const result = { ...base };
    for (const [key, value] of Object.entries(override)) {
      const canMerge = isPlainObject(value) && isPlainObject(result[key]);
      result[key] = canMerge ? deepMerge(result[key], value) : value;
    }
    return result;
  }
  function estimateTokens(text) {
    if (!text) {
      return 0;
    }
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = text.split(/\s+/).filter((word) => /[a-zA-Z]/.test(word)).length;
    const numbers = (text.match(/\d+/g) || []).join("").length;
    const punctuation = (text.match(/[^\w\s\u4e00-\u9fa5]/g) || []).length;
    return Math.ceil(
      chineseChars * 2.5 + englishWords * 1.3 + numbers * 0.8 + punctuation * 0.5
    );
  }
  const EXAMPLE = '{"thinking": {"type": "disabled"}}';
  function parseJsonObject(text) {
    const raw = (text || "").trim();
    if (!raw) {
      return {};
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error("额外请求参数不是有效的 JSON");
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`额外请求参数必须是 JSON 对象，例如 ${EXAMPLE}`);
    }
    return parsed;
  }
  const TEST_PROMPT = "这是一个验证码图片，请识别其中的字符";
  const NON_CHAT_MODEL = /embed|whisper|tts|dall-e|moderation|image|audio|realtime|transcri|rerank|davinci|babbage/i;
  const JSON_HEADERS = { "Content-Type": "application/json" };
  function isChatModelId(id) {
    return !NON_CHAT_MODEL.test(id);
  }
  class BaseProvider {
    /**
     * @param {object} deps
     * @param {import("../core/HttpClient.js").HttpClient} deps.http
     * @param {object} deps.settings - 响应式设置对象
     * @param {object} deps.meta - providerPresets.js 中的一项预设
     */
    constructor({ http, settings, meta }) {
      this.http = http;
      this.settings = settings;
      this.meta = meta;
    }
    /** 读取本服务商的某项设置,field 取 Key / ApiUrl / Model / Prompt / ExtraParams */
    setting(field) {
      return this.settings[`${this.meta.id}${field}`];
    }
    isConfigured() {
      if (this.meta.keyRequired === false) {
        return !!(this.setting("ApiUrl") || this.meta.defaultUrl);
      }
      return !!this.setting("Key");
    }
    /** 用户选择的模型,留空使用服务商默认模型 */
    get model() {
      return this.setting("Model") || this.meta.defaultModel;
    }
    /** 用户自定义提示词,留空使用所选模式的默认提示词 */
    get prompt() {
      return this.setting("Prompt") || getBasePrompt(this.settings.promptType);
    }
    /**
     * 识别验证码
     * @param {string} base64Image - 不含 data: 前缀的 PNG base64
     * @returns {Promise<string>} 模型返回的原始文本,没有内容时返回空串
     */
    async recognize(base64Image) {
      this._assertModelSelected();
      const prompt = this.prompt;
      const extraBody = deepMerge(this.recognitionParams(), this.extraParams());
      const response = await this.http.request(this._post(base64Image, prompt, extraBody));
      this._logTokenUsage(prompt);
      return this.extractText(response.data) ?? "";
    }
    /**
     * 测试连接:发送一张固定的验证码图片
     * @returns {Promise<boolean>} 收到响应即视为连通
     */
    async testConnection(base64Image) {
      this._assertModelSelected();
      const response = await this.http.request(this._post(base64Image, TEST_PROMPT, this.extraParams()));
      return !!(response && response.data);
    }
    /** 获取可用模型列表,接口没有结果时使用预设里的候选 */
    async listModels() {
      if (this.meta.modelsSource === "static") {
        return this.meta.knownModels;
      }
      const ids = await this.fetchModelIdsFromApi();
      return ids.length > 0 ? ids : this.meta.knownModels;
    }
    buildRequest(base64Image, prompt, extraBody = {}) {
      return {
        url: this.endpoint(),
        data: deepMerge(this.buildBody(base64Image, prompt), extraBody),
        headers: this.headers()
      };
    }
    /** 仅识别请求附带的模型参数:命中 modelParams 的模型用其参数,否则用 params */
    recognitionParams() {
      const { params = {}, modelParams = [] } = this.meta;
      const matched = modelParams.find(({ pattern }) => new RegExp(pattern, "i").test(this.model));
      return matched ? matched.params : params;
    }
    /** 用户在设置里填写的额外请求参数(JSON 对象),合并进请求体 */
    extraParams() {
      return parseJsonObject(this.setting("ExtraParams"));
    }
    /** 请求 `{ data: [{ id }] }` 结构的模型列表接口(OpenAI、Anthropic 通用) */
    async _requestModelIds(url, headers) {
      var _a;
      const response = await this.http.request({ method: "GET", url, headers });
      const models = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data;
      if (!Array.isArray(models)) {
        return [];
      }
      return models.map((model) => model.id).filter(isChatModelId).sort();
    }
    _post(base64Image, prompt, extraBody) {
      return { method: "POST", ...this.buildRequest(base64Image, prompt, extraBody) };
    }
    _assertModelSelected() {
      if (!this.model) {
        throw new Error("请先填写模型名称");
      }
    }
    _logTokenUsage(prompt) {
      const mode = this.settings.promptType === "simple" ? "简洁版" : "详细版";
      console.log(`📊 提示词Token消耗估算: ~${estimateTokens(prompt)} tokens (${mode})`);
    }
  }
  const hasText = (block) => typeof (block == null ? void 0 : block.text) === "string";
  function joinTextBlocks(content, isTextBlock = hasText) {
    if (typeof content === "string") {
      return content;
    }
    if (!Array.isArray(content)) {
      return void 0;
    }
    return content.filter(isTextBlock).map((block) => block.text).join("");
  }
  const VERSION_SEGMENT = /\/v\d+$/;
  function normalizeEndpoint(url, suffix) {
    const trimmed = url.trim().replace(/\/+$/, "");
    if (trimmed.endsWith(suffix)) {
      return trimmed;
    }
    return VERSION_SEGMENT.test(trimmed) ? `${trimmed}${suffix}` : `${trimmed}/v1${suffix}`;
  }
  const MESSAGES_SUFFIX = "/messages";
  const API_VERSION = "2023-06-01";
  const MAX_TOKENS = 1024;
  class AnthropicProvider extends BaseProvider {
    endpoint() {
      return normalizeEndpoint(this.setting("ApiUrl") || this.meta.defaultUrl, MESSAGES_SUFFIX);
    }
    headers() {
      return {
        ...JSON_HEADERS,
        "x-api-key": this.setting("Key"),
        "anthropic-version": API_VERSION,
        // 非油猴环境(回退到浏览器请求)时,Anthropic 要求显式声明允许浏览器直连
        "anthropic-dangerous-direct-browser-access": "true"
      };
    }
    buildBody(base64Image, prompt) {
      return {
        model: this.model,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/png", data: base64Image } },
              { type: "text", text: prompt }
            ]
          }
        ]
      };
    }
    /** 响应内容是块数组,可能混有 thinking 块,只取 text 块 */
    extractText(data) {
      return joinTextBlocks(data == null ? void 0 : data.content, (block) => (block == null ? void 0 : block.type) === "text");
    }
    fetchModelIdsFromApi() {
      const url = this.endpoint().replace(/\/messages$/, "/models");
      return this._requestModelIds(url, this.headers());
    }
  }
  const CHAT_SUFFIX = "/chat/completions";
  class ChatCompletionsProvider extends BaseProvider {
    /** 用户只填了域名或 /v1 前缀时,自动补全 /chat/completions */
    endpoint() {
      return normalizeEndpoint(this.setting("ApiUrl") || this.meta.defaultUrl, CHAT_SUFFIX);
    }
    headers() {
      return { ...JSON_HEADERS, ...this._authHeaders() };
    }
    buildBody(base64Image, prompt) {
      return {
        model: this.model,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } }
            ]
          }
        ]
      };
    }
    extractText(data) {
      var _a, _b, _c;
      return joinTextBlocks((_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content);
    }
    fetchModelIdsFromApi() {
      const url = this.endpoint().replace(/\/chat\/completions$/, "/models");
      return this._requestModelIds(url, this._authHeaders());
    }
    /** 没有 Key 时(如本地 Ollama)不发送 Authorization */
    _authHeaders() {
      const key = this.setting("Key");
      return key ? { Authorization: `Bearer ${key}` } : {};
    }
  }
  class GeminiProvider extends BaseProvider {
    get baseUrl() {
      return this.setting("ApiUrl") || this.meta.defaultUrl;
    }
    endpoint() {
      return `${this.baseUrl}/${this.model}:generateContent?key=${this.setting("Key")}`;
    }
    headers() {
      return JSON_HEADERS;
    }
    buildBody(base64Image, prompt) {
      return {
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: "image/png", data: base64Image } }
            ]
          }
        ]
      };
    }
    /** 忽略思考摘要(thought)片段,只取正文 */
    extractText(data) {
      var _a, _b, _c;
      const parts = (_c = (_b = (_a = data == null ? void 0 : data.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts;
      return joinTextBlocks(parts, (part) => typeof (part == null ? void 0 : part.text) === "string" && !part.thought);
    }
    async fetchModelIdsFromApi() {
      var _a;
      const response = await this.http.request({
        method: "GET",
        url: `${this.baseUrl}?key=${this.setting("Key")}`,
        headers: JSON_HEADERS
      });
      const models = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.models;
      if (!Array.isArray(models)) {
        return [];
      }
      return models.filter((model) => this._isVisionModel(model)).map((model) => model.name.replace("models/", "")).filter(isChatModelId).sort();
    }
    _isVisionModel(model) {
      var _a;
      const supportsGenerate = (_a = model.supportedGenerationMethods) == null ? void 0 : _a.includes("generateContent");
      return model.name.includes("gemini") && (model.name.includes("flash") || model.name.includes("pro")) && !!supportsGenerate;
    }
  }
  const PROTOCOLS = {
    openai: ChatCompletionsProvider,
    anthropic: AnthropicProvider,
    gemini: GeminiProvider
  };
  class ProviderRegistry {
    /**
     * @param {object} deps
     * @param {import("../core/HttpClient.js").HttpClient} deps.http
     * @param {object} deps.settings - 响应式设置对象
     */
    constructor(deps) {
      this.settings = deps.settings;
      this.providers = PROVIDER_PRESETS.map((meta) => new PROTOCOLS[meta.protocol]({ ...deps, meta }));
    }
    /** @returns {import("./BaseProvider.js").BaseProvider|undefined} */
    get(id) {
      return this.providers.find((provider) => provider.meta.id === id);
    }
    /** 当前选中的服务商 */
    current() {
      return this.get(this.settings.apiType);
    }
    /** 指定服务商(默认当前服务商)是否已配置 API Key */
    isConfigured(id = this.settings.apiType) {
      var _a;
      return ((_a = this.get(id)) == null ? void 0 : _a.isConfigured()) ?? false;
    }
    /** 服务商显示名称,未知类型返回“未知” */
    labelOf(id) {
      var _a;
      return ((_a = this.get(id)) == null ? void 0 : _a.meta.label) ?? "未知";
    }
  }
  const BODY_LOCK_CLASS = "captcha-settings-open";
  class PanelController {
    constructor() {
      this.state = vue.reactive({ visible: false });
    }
    get visible() {
      return this.state.visible;
    }
    open() {
      document.body.classList.add(BODY_LOCK_CLASS);
      this.state.visible = true;
    }
    close() {
      document.body.classList.remove(BODY_LOCK_CLASS);
      this.state.visible = false;
    }
  }
  const name = "CAPTCHA-automatic-recognition";
  const version = "1.5.0";
  const author = "Alex";
  const description = "Automatically recognize the CAPTCHA on the webpage and fill it into the input box, click the recognition icon to trigger recognition.";
  const type = "module";
  const license = "Apache-2.0";
  const scripts = {
    dev: "vite --mode development",
    build: "vite build",
    preview: "vite preview"
  };
  const dependencies = {
    vue: "^3.4.27",
    axios: "^1.6.2"
  };
  const devDependencies = {
    "@vitejs/plugin-vue": "^5.0.4",
    less: "^4.1.0",
    vite: "^5.2.12",
    "vite-plugin-monkey": "^4.0.0"
  };
  const packageJson = {
    name,
    version,
    author,
    description,
    type,
    license,
    scripts,
    dependencies,
    devDependencies
  };
  const SERVICES_KEY = Symbol("captcha-services");
  function useServices() {
    return vue.inject(SERVICES_KEY);
  }
  const _hoisted_1$9 = { key: 0 };
  const _hoisted_2$9 = { key: 1 };
  const _hoisted_3$9 = { key: 2 };
  const _hoisted_4$9 = { key: 3 };
  const _sfc_main$9 = {
    __name: "AsyncStatusButton",
    props: {
      /** '' | 'loading' | 'success' | 'error' */
      status: { type: String, default: "" },
      buttonClass: { type: String, required: true },
      idleText: { type: String, required: true },
      successText: { type: String, required: true },
      errorText: { type: String, required: true }
    },
    setup(__props) {
      const props = __props;
      const statusClass = vue.computed(() => props.status ? `test-${props.status}` : "");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          type: "button",
          class: vue.normalizeClass([__props.buttonClass, statusClass.value])
        }, [
          __props.status === "" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$9, vue.toDisplayString(__props.idleText), 1)) : __props.status === "success" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$9, vue.toDisplayString(__props.successText), 1)) : __props.status === "error" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$9, vue.toDisplayString(__props.errorText), 1)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$9))
        ], 2);
      };
    }
  };
  const _hoisted_1$8 = { class: "captcha-settings-item" };
  const _hoisted_2$8 = /* @__PURE__ */ vue.createElementVNode("label", null, "验证码规则管理：", -1);
  const _hoisted_3$8 = { class: "rules-management" };
  const _hoisted_4$8 = { class: "rules-url-input" };
  const _hoisted_5$6 = ["placeholder"];
  const _hoisted_6$4 = /* @__PURE__ */ vue.createElementVNode("small", null, "从远程加载最新的验证码识别规则", -1);
  const _sfc_main$8 = {
    __name: "RulesPanel",
    setup(__props) {
      const { settings, rules } = useServices();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
          _hoisted_2$8,
          vue.createElementVNode("div", _hoisted_3$8, [
            vue.createElementVNode("div", _hoisted_4$8, [
              vue.withDirectives(vue.createElementVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings).rulesUrl = $event),
                placeholder: vue.unref(DEFAULT_RULES_URL)
              }, null, 8, _hoisted_5$6), [
                [vue.vModelText, vue.unref(settings).rulesUrl]
              ]),
              vue.createElementVNode("small", null, "规则文件 URL，留空则使用默认 URL：" + vue.toDisplayString(vue.unref(DEFAULT_RULES_URL)), 1)
            ]),
            vue.createVNode(_sfc_main$9, {
              "button-class": "reload-rules-button",
              status: vue.unref(rules).state.status,
              "idle-text": "重新加载规则",
              "success-text": "加载成功",
              "error-text": "加载失败",
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(rules).fetchAndSave())
            }, null, 8, ["status"]),
            _hoisted_6$4
          ])
        ]);
      };
    }
  };
  const _hoisted_1$7 = { class: "captcha-settings-item" };
  const _hoisted_2$7 = { class: "custom-selectors" };
  const _hoisted_3$7 = ["value", "placeholder", "onInput"];
  const _hoisted_4$7 = ["onClick"];
  const _sfc_main$7 = {
    __name: "SelectorList",
    props: /* @__PURE__ */ vue.mergeModels({
      label: { type: String, required: true },
      placeholder: { type: String, default: "" }
    }, {
      "modelValue": { type: Array },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      function add() {
        model.value = [...model.value, ""];
      }
      function remove(index) {
        model.value = model.value.filter((_, i) => i !== index);
      }
      function update(index, value) {
        model.value = model.value.map((selector, i) => i === index ? value : selector);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [
          vue.createElementVNode("label", null, vue.toDisplayString(__props.label), 1),
          vue.createElementVNode("div", _hoisted_2$7, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(model.value, (selector, index) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: index,
                class: "selector-item"
              }, [
                vue.createElementVNode("input", {
                  type: "text",
                  value: selector,
                  placeholder: __props.placeholder,
                  onInput: ($event) => update(index, $event.target.value)
                }, null, 40, _hoisted_3$7),
                vue.createElementVNode("button", {
                  type: "button",
                  class: "remove-selector",
                  onClick: ($event) => remove(index)
                }, "×", 8, _hoisted_4$7)
              ]);
            }), 128)),
            vue.createElementVNode("button", {
              type: "button",
              class: "add-selector",
              onClick: add
            }, "添加选择器")
          ])
        ]);
      };
    }
  };
  const _hoisted_1$6 = { class: "settings-content-tab" };
  const _hoisted_2$6 = { class: "settings-card" };
  const _hoisted_3$6 = { class: "settings-card-title" };
  const _hoisted_4$6 = ["href"];
  const _hoisted_5$5 = /* @__PURE__ */ vue.createElementVNode("div", { class: "advanced-settings-warning" }, " ⚠️ 警告：如果您不了解 CSS 选择器，请不要修改这些设置，可能导致识别功能失效 ", -1);
  const _sfc_main$6 = {
    __name: "AdvancedTab",
    setup(__props) {
      const { settings } = useServices();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
          vue.createElementVNode("div", _hoisted_2$6, [
            vue.createElementVNode("div", _hoisted_3$6, [
              vue.createElementVNode("span", null, [
                vue.createTextVNode(" 高级设置 "),
                vue.createElementVNode("a", {
                  href: vue.unref(TUTORIAL_URL),
                  target: "_blank",
                  class: "tutorial-link"
                }, "教程", 8, _hoisted_4$6)
              ])
            ]),
            _hoisted_5$5,
            vue.createVNode(_sfc_main$7, {
              modelValue: vue.unref(settings).customCaptchaSelectors,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings).customCaptchaSelectors = $event),
              label: "自定义验证码图片选择器：",
              placeholder: "例如: img[src*='captcha']"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_sfc_main$7, {
              modelValue: vue.unref(settings).customInputSelectors,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(settings).customInputSelectors = $event),
              label: "自定义输入框选择器：",
              placeholder: "例如: input[name*='captcha']"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_sfc_main$8)
          ])
        ]);
      };
    }
  };
  const _hoisted_1$5 = { class: "settings-content-tab" };
  const _hoisted_2$5 = { class: "settings-card" };
  const _hoisted_3$5 = /* @__PURE__ */ vue.createElementVNode("div", { class: "settings-card-title" }, [
    /* @__PURE__ */ vue.createElementVNode("span", null, "禁用域名列表")
  ], -1);
  const _hoisted_4$5 = { class: "captcha-settings-item" };
  const _hoisted_5$4 = /* @__PURE__ */ vue.createElementVNode("small", null, [
    /* @__PURE__ */ vue.createTextVNode(" 在这些域名下将不启用验证码识别功能 "),
    /* @__PURE__ */ vue.createElementVNode("br"),
    /* @__PURE__ */ vue.createTextVNode(" 多个配置请使用换行显示 ")
  ], -1);
  const _sfc_main$5 = {
    __name: "DomainTab",
    setup(__props) {
      const { settings } = useServices();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
          vue.createElementVNode("div", _hoisted_2$5, [
            _hoisted_3$5,
            vue.createElementVNode("div", _hoisted_4$5, [
              vue.withDirectives(vue.createElementVNode("textarea", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings).disabledDomains = $event),
                placeholder: "每行一个域名，支持正则和通配符，例如：\r\nexample.com\r\n*.example.org\r\nexample.*.com\r\n/^(www\\.)?example\\.com$/",
                rows: "6",
                class: "domain-textarea"
              }, null, 512), [
                [vue.vModelText, vue.unref(settings).disabledDomains]
              ]),
              _hoisted_5$4
            ])
          ])
        ]);
      };
    }
  };
  const _hoisted_1$4 = { class: "captcha-settings-item" };
  const _hoisted_2$4 = { style: { "display": "flex", "align-items": "center" } };
  const _hoisted_3$4 = ["id"];
  const _hoisted_4$4 = ["for"];
  const _sfc_main$4 = {
    __name: "CheckboxField",
    props: /* @__PURE__ */ vue.mergeModels({
      /** input 的 id,同时用于 label 的 for 关联 */
      id: { type: String, required: true },
      label: { type: String, required: true }
    }, {
      "modelValue": { type: Boolean },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          vue.createElementVNode("div", _hoisted_2$4, [
            vue.withDirectives(vue.createElementVNode("input", {
              type: "checkbox",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
              id: __props.id,
              style: { "width": "auto", "margin-right": "8px !important" }
            }, null, 8, _hoisted_3$4), [
              [vue.vModelCheckbox, model.value]
            ]),
            vue.createElementVNode("label", {
              for: __props.id,
              style: { "margin-bottom": "0" }
            }, vue.toDisplayString(__props.label), 9, _hoisted_4$4)
          ])
        ]);
      };
    }
  };
  const _hoisted_1$3 = { class: "settings-content-tab" };
  const _hoisted_2$3 = { class: "settings-card" };
  const _hoisted_3$3 = /* @__PURE__ */ vue.createElementVNode("div", { class: "settings-card-title" }, [
    /* @__PURE__ */ vue.createElementVNode("span", null, "功能设置")
  ], -1);
  const _hoisted_4$3 = { class: "captcha-settings-item" };
  const _hoisted_5$3 = /* @__PURE__ */ vue.createElementVNode("label", null, "AI提示词模式:", -1);
  const _hoisted_6$3 = /* @__PURE__ */ vue.createElementVNode("option", { value: "simple" }, "💰 简洁版 (节省Token ~92%)", -1);
  const _hoisted_7$3 = /* @__PURE__ */ vue.createElementVNode("option", { value: "detailed" }, "🎯 详细版 (高精度识别)", -1);
  const _hoisted_8$3 = [
    _hoisted_6$3,
    _hoisted_7$3
  ];
  const _hoisted_9$1 = /* @__PURE__ */ vue.createElementVNode("strong", null, "推荐使用简洁版", -1);
  const _hoisted_10$1 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_11$1 = /* @__PURE__ */ vue.createElementVNode("br", null, null, -1);
  const _hoisted_12$1 = { style: { "margin-top": "8px" } };
  const _hoisted_13$1 = /* @__PURE__ */ vue.createElementVNode("summary", { style: { "cursor": "pointer", "color": "#1a73e8" } }, "👁️ 预览当前选择的提示词", -1);
  const _hoisted_14$1 = { style: { "background": "#f5f5f5", "padding": "10px", "border-radius": "4px", "margin-top": "5px", "font-family": "monospace", "font-size": "12px", "white-space": "pre-wrap", "max-height": "200px", "overflow-y": "auto" } };
  const _sfc_main$3 = {
    __name: "FunctionTab",
    setup(__props) {
      const CHECKBOX_OPTIONS = [
        { id: "autoRecognize", label: "验证码图片变化时自动识别" },
        { id: "copyToClipboard", label: "自动复制到剪贴板" },
        { id: "showNotification", label: "显示右上角通知提示" },
        { id: "autoFetchCloudRules", label: "每日首次运行时自动获取云端规则" }
      ];
      const { settings } = useServices();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
          vue.createElementVNode("div", _hoisted_2$3, [
            _hoisted_3$3,
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(CHECKBOX_OPTIONS, (option) => {
              return vue.createVNode(_sfc_main$4, {
                key: option.id,
                modelValue: vue.unref(settings)[option.id],
                "onUpdate:modelValue": ($event) => vue.unref(settings)[option.id] = $event,
                id: option.id,
                label: option.label
              }, null, 8, ["modelValue", "onUpdate:modelValue", "id", "label"]);
            }), 64)),
            vue.createElementVNode("div", _hoisted_4$3, [
              _hoisted_5$3,
              vue.withDirectives(vue.createElementVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings).promptType = $event)
              }, _hoisted_8$3, 512), [
                [vue.vModelSelect, vue.unref(settings).promptType]
              ]),
              vue.createElementVNode("small", null, [
                vue.createTextVNode(" 💡 "),
                _hoisted_9$1,
                vue.createTextVNode("：适合大多数验证码且大幅节省API费用"),
                _hoisted_10$1,
                vue.createTextVNode(" 📊 Token消耗对比：简洁版 ~50-80 tokens，详细版 ~800-1000 tokens"),
                _hoisted_11$1,
                vue.createElementVNode("details", _hoisted_12$1, [
                  _hoisted_13$1,
                  vue.createElementVNode("div", _hoisted_14$1, vue.toDisplayString(vue.unref(getBasePrompt)(vue.unref(settings).promptType)), 1)
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const _hoisted_1$2 = { class: "captcha-settings-item" };
  const _hoisted_2$2 = { class: "input-with-button" };
  const _hoisted_3$2 = ["placeholder"];
  const _hoisted_4$2 = { class: "captcha-settings-item" };
  const _hoisted_5$2 = ["placeholder"];
  const _hoisted_6$2 = { key: 0 };
  const _hoisted_7$2 = { class: "captcha-settings-item" };
  const _hoisted_8$2 = ["placeholder"];
  const _hoisted_9 = ["value"];
  const _hoisted_10 = { class: "captcha-settings-item" };
  const _hoisted_11 = /* @__PURE__ */ vue.createElementVNode("label", null, "额外请求参数 (可选):", -1);
  const _hoisted_12 = {
    key: 0,
    class: "field-error"
  };
  const _hoisted_13 = { key: 1 };
  const _hoisted_14 = { class: "captcha-settings-item" };
  const _hoisted_15 = /* @__PURE__ */ vue.createElementVNode("label", null, "自定义提示词 (可选):", -1);
  const _hoisted_16 = { class: "textarea-with-button" };
  const _hoisted_17 = /* @__PURE__ */ vue.createElementVNode("small", null, "留空使用默认提示词", -1);
  const _sfc_main$2 = {
    __name: "ProviderForm",
    props: {
      /** 要编辑的 AI 服务商 */
      provider: { type: Object, required: true }
    },
    setup(__props) {
      const props = __props;
      const { settings, tester } = useServices();
      const meta = props.provider.meta;
      const fields = {
        key: `${meta.id}Key`,
        url: `${meta.id}ApiUrl`,
        model: `${meta.id}Model`,
        extra: `${meta.id}ExtraParams`,
        prompt: `${meta.id}Prompt`
      };
      const modelListId = `captcha-models-${meta.id}`;
      const urlHint = meta.urlHint || (meta.defaultUrl ? "留空使用默认地址" : "");
      const modelHint = (meta.modelHint ? `${meta.modelHint}。` : "") + (meta.defaultModel ? "留空使用默认模型，" : "") + "可直接输入模型名称，或从候选中选择。测试连接成功后会刷新可用模型列表。";
      const modelOptions = vue.computed(() => {
        const all2 = [meta.defaultModel, ...meta.knownModels, ...tester.models[meta.id]];
        return [...new Set(all2.filter(Boolean))];
      });
      const extraParamsError = vue.computed(() => {
        try {
          parseJsonObject(settings[fields.extra]);
          return "";
        } catch (error) {
          return error.message;
        }
      });
      function fillDefaultPrompt() {
        settings[fields.prompt] = getBasePrompt(settings.promptType);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("div", _hoisted_1$2, [
            vue.createElementVNode("label", null, vue.toDisplayString(vue.unref(meta).keyLabel), 1),
            vue.createElementVNode("div", _hoisted_2$2, [
              vue.withDirectives(vue.createElementVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings)[fields.key] = $event),
                placeholder: vue.unref(meta).keyPlaceholder
              }, null, 8, _hoisted_3$2), [
                [vue.vModelText, vue.unref(settings)[fields.key]]
              ]),
              vue.createVNode(_sfc_main$9, {
                "button-class": "test-api-button",
                status: vue.unref(tester).status[vue.unref(meta).id],
                "idle-text": "测试连接",
                "success-text": "成功",
                "error-text": "失败",
                onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(tester).test(vue.unref(meta).id))
              }, null, 8, ["status"])
            ])
          ]),
          vue.createElementVNode("div", _hoisted_4$2, [
            vue.createElementVNode("label", null, vue.toDisplayString(vue.unref(meta).defaultUrl ? "自定义 API 地址 (可选):" : "API 地址:"), 1),
            vue.withDirectives(vue.createElementVNode("input", {
              type: "text",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(settings)[fields.url] = $event),
              placeholder: vue.unref(meta).defaultUrl || vue.unref(meta).urlPlaceholder
            }, null, 8, _hoisted_5$2), [
              [vue.vModelText, vue.unref(settings)[fields.url]]
            ]),
            vue.unref(urlHint) ? (vue.openBlock(), vue.createElementBlock("small", _hoisted_6$2, vue.toDisplayString(vue.unref(urlHint)), 1)) : vue.createCommentVNode("", true)
          ]),
          vue.createElementVNode("div", _hoisted_7$2, [
            vue.createElementVNode("label", null, vue.toDisplayString(vue.unref(meta).defaultModel ? "模型 (可选):" : "模型:"), 1),
            vue.withDirectives(vue.createElementVNode("input", {
              type: "text",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(settings)[fields.model] = $event),
              list: modelListId,
              placeholder: vue.unref(meta).defaultModel || "输入模型名称"
            }, null, 8, _hoisted_8$2), [
              [vue.vModelText, vue.unref(settings)[fields.model]]
            ]),
            vue.createElementVNode("datalist", { id: modelListId }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(modelOptions.value, (model) => {
                return vue.openBlock(), vue.createElementBlock("option", {
                  key: model,
                  value: model
                }, null, 8, _hoisted_9);
              }), 128))
            ]),
            vue.createElementVNode("small", null, vue.toDisplayString(modelHint))
          ]),
          vue.createElementVNode("div", _hoisted_10, [
            _hoisted_11,
            vue.withDirectives(vue.createElementVNode("textarea", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(settings)[fields.extra] = $event),
              placeholder: 'JSON 对象，如 {"thinking": {"type": "disabled"}}',
              rows: "3"
            }, null, 512), [
              [vue.vModelText, vue.unref(settings)[fields.extra]]
            ]),
            extraParamsError.value ? (vue.openBlock(), vue.createElementBlock("small", _hoisted_12, vue.toDisplayString(extraParamsError.value), 1)) : (vue.openBlock(), vue.createElementBlock("small", _hoisted_13, "合并进请求体，用于填写服务商专有参数(如关闭思考以降低延迟)。留空不使用"))
          ]),
          vue.createElementVNode("div", _hoisted_14, [
            _hoisted_15,
            vue.createElementVNode("div", _hoisted_16, [
              vue.withDirectives(vue.createElementVNode("textarea", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(settings)[fields.prompt] = $event),
                placeholder: "输入自定义提示词，或点击右侧按钮使用默认提示词",
                rows: "3"
              }, null, 512), [
                [vue.vModelText, vue.unref(settings)[fields.prompt]]
              ]),
              vue.createElementVNode("button", {
                type: "button",
                class: "use-default-prompt",
                onClick: fillDefaultPrompt
              }, "使用默认")
            ]),
            _hoisted_17
          ])
        ]);
      };
    }
  };
  const _hoisted_1$1 = { class: "settings-content-tab" };
  const _hoisted_2$1 = { class: "settings-card" };
  const _hoisted_3$1 = { class: "settings-card-title" };
  const _hoisted_4$1 = /* @__PURE__ */ vue.createElementVNode("span", null, "AI 服务商设置", -1);
  const _hoisted_5$1 = { class: "api-type" };
  const _hoisted_6$1 = { class: "captcha-settings-item" };
  const _hoisted_7$1 = /* @__PURE__ */ vue.createElementVNode("label", null, "API 类型：", -1);
  const _hoisted_8$1 = ["value"];
  const _sfc_main$1 = {
    __name: "ProviderTab",
    setup(__props) {
      const { settings, registry } = useServices();
      const provider = vue.computed(() => registry.current());
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createElementVNode("div", _hoisted_3$1, [
              _hoisted_4$1,
              vue.createElementVNode("span", _hoisted_5$1, vue.toDisplayString(vue.unref(registry).labelOf(vue.unref(settings).apiType)), 1)
            ]),
            vue.createElementVNode("div", _hoisted_6$1, [
              _hoisted_7$1,
              vue.withDirectives(vue.createElementVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(settings).apiType = $event)
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(registry).providers, (item) => {
                  return vue.openBlock(), vue.createElementBlock("option", {
                    key: item.meta.id,
                    value: item.meta.id
                  }, vue.toDisplayString(item.meta.label), 9, _hoisted_8$1);
                }), 128))
              ], 512), [
                [vue.vModelSelect, vue.unref(settings).apiType]
              ])
            ]),
            provider.value ? (vue.openBlock(), vue.createBlock(_sfc_main$2, {
              key: provider.value.meta.id,
              provider: provider.value
            }, null, 8, ["provider"])) : vue.createCommentVNode("", true)
          ])
        ]);
      };
    }
  };
  const _hoisted_1 = { class: "captcha-recognition-container" };
  const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      fill: "currentColor",
      d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
    })
  ], -1);
  const _hoisted_3 = [
    _hoisted_2
  ];
  const _hoisted_4 = { class: "captcha-settings-content" };
  const _hoisted_5 = { class: "settings-nav" };
  const _hoisted_6 = ["onClick"];
  const _hoisted_7 = { class: "settings-content" };
  const _hoisted_8 = { class: "captcha-settings-buttons" };
  const _sfc_main = {
    __name: "SettingsApp",
    setup(__props) {
      const TABS = [
        { id: "ai", label: "AI 服务商", component: _sfc_main$1 },
        { id: "function", label: "功能设置", component: _sfc_main$3 },
        { id: "domain", label: "禁用域名", component: _sfc_main$5 },
        { id: "advanced", label: "高级设置", component: _sfc_main$6 }
      ];
      const version2 = packageJson.version;
      const isDev = false;
      const { panel, settingsStore, toast } = useServices();
      const activeTabId = vue.ref(TABS[0].id);
      const activeTab = vue.computed(() => TABS.find((tab) => tab.id === activeTabId.value));
      function save() {
        try {
          settingsStore.save();
          panel.close();
          toast.show("设置已保存！", "success");
        } catch (error) {
          console.error("保存设置失败：", error);
          toast.show("保存设置失败，请查看控制台获取更多信息。", "error");
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.unref(isDev) && !vue.unref(panel).state.visible ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "dev-settings-button",
            onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(panel).open())
          }, _hoisted_3)) : vue.createCommentVNode("", true),
          vue.unref(panel).state.visible ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: "captcha-settings-overlay",
            onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(panel).close())
          })) : vue.createCommentVNode("", true),
          vue.unref(panel).state.visible ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 2,
            class: "captcha-settings-modal show",
            onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["stop"]))
          }, [
            vue.createElementVNode("div", _hoisted_4, [
              vue.createElementVNode("h3", null, [
                vue.createTextVNode(" 验证码识别设置 "),
                vue.createElementVNode("span", null, vue.toDisplayString(vue.unref(version2)), 1)
              ]),
              vue.createElementVNode("div", _hoisted_5, [
                (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(TABS, (tab) => {
                  return vue.createElementVNode("div", {
                    key: tab.id,
                    class: vue.normalizeClass(["settings-nav-item", { active: activeTabId.value === tab.id }]),
                    onClick: ($event) => activeTabId.value = tab.id
                  }, vue.toDisplayString(tab.label), 11, _hoisted_6);
                }), 64))
              ]),
              vue.createElementVNode("div", _hoisted_7, [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(activeTab.value.component)))
              ]),
              vue.createElementVNode("div", _hoisted_8, [
                vue.createElementVNode("button", { onClick: save }, "保存设置"),
                vue.createElementVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(panel).close())
                }, "取消")
              ])
            ])
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  };
  class DomainBlocklist {
    /**
     * @param {object} settings - 响应式设置对象(读取 disabledDomains)
     */
    constructor(settings) {
      this.settings = settings;
    }
    /** 当前网站是否被禁用 */
    isCurrentDomainBlocked() {
      return this.isBlocked(window.location.hostname);
    }
    /** 指定域名是否被禁用 */
    isBlocked(hostname) {
      return this._patterns().some((pattern) => this._matches(pattern, hostname));
    }
    _patterns() {
      return (this.settings.disabledDomains || "").split("\n").map((line) => line.trim()).filter((line) => line !== "");
    }
    _matches(pattern, hostname) {
      if (isRegexLiteral(pattern)) {
        return testRegexLiteral(pattern, hostname, "无效的正则表达式：");
      }
      if (pattern.includes("*")) {
        return wildcardToRegExp(pattern).test(hostname);
      }
      return pattern === hostname;
    }
  }
  function createCoreServices() {
    const storage = new StorageService();
    const http = new HttpClient();
    const settingsStore = new SettingsStore(storage);
    const { settings } = settingsStore;
    const toast = new ToastService(settings);
    const rules = new RulesService({ storage, http, settings, toast });
    const registry = new ProviderRegistry({ http, settings });
    const tester = new ProviderConnectionTester({ registry, toast });
    return { settingsStore, settings, toast, rules, registry, tester };
  }
  function createCaptchaServices({ settings, toast, rules, registry }) {
    const panel = new PanelController();
    const resolver = new SelectorResolver({ settings, rulesService: rules });
    const finder = new CaptchaFinder({ resolver, inputFinder: new InputFieldFinder(resolver) });
    const icons = new RecognitionIconManager();
    const converter = new ImageConverter();
    const blocklist = new DomainBlocklist(settings);
    const cleaner = new CaptchaTextCleaner();
    const recognizer = new CaptchaRecognizer({ registry, cleaner, toast, panel });
    const processor = new CaptchaProcessor({
      settings,
      blocklist,
      converter,
      recognizer,
      finder,
      icons,
      toast,
      optimizer: new CanvasOptimizer(),
      clipboard: new ClipboardService()
    });
    const watcher = new CaptchaWatcher({
      settings,
      blocklist,
      resolver,
      finder,
      icons,
      converter,
      processor,
      toast
    });
    return { panel, watcher };
  }
  function createServices() {
    const core = createCoreServices();
    return { ...core, ...createCaptchaServices(core) };
  }
  function mountSettingsUI(services) {
    const app = vue.createApp(_sfc_main);
    app.provide(SERVICES_KEY, services);
    const container = document.createElement("div");
    document.documentElement.append(container);
    app.mount(container);
  }
  function registerSettingsMenu(panel) {
    if (typeof GM_registerMenuCommand !== "undefined") {
      GM_registerMenuCommand("验证码识别设置", () => panel.open());
    }
  }
  function launch({ settingsStore, rules, panel, watcher }) {
    settingsStore.load();
    rules.loadCachedOrFetch();
    registerSettingsMenu(panel);
    rules.fetchDailyIfNeeded();
    watcher.start();
  }
  function startApp() {
    applySiteCompat();
    const services = createServices();
    mountSettingsUI(services);
    try {
      launch(services);
    } catch (error) {
      console.error("验证码识别插件挂载失败：", error);
    }
  }
  startApp();

})(Vue);