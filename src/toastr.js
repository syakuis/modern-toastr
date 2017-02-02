import 'toastr/build/toastr.css';

const ToastrProps = {
  config: {
    timeOut: 5000,
    closeButton: false,
    newestOnTop: false,
    progressBar: false,
  },
  container: null,
  /*
  toast-top-right
  toast-top-left
  toast-bottom-right
  toast-bottom-left
  toast-top-full-width
  toast-bottom-full-width
  toast-top-center
  toast-bottom-center
  */
  positionClass: 'toast-top-right',
  closeHtml: '<button type="button" class="toast-close-button" role="button">&times;</button>',
};

class ToastrConteiner {
  constructor(type, message, title, config) {
    this.type = type || 'success';
    this.message = message;
    this.title = title;
    this.config = { ...ToastrProps.config, ...config };

    if (ToastrProps.container === null) {
      const root = document.createElement('div');
      root.className = ToastrProps.positionClass;
      root.setAttribute('id', 'toast-container');
      document.body.appendChild(root);
      ToastrProps.container = document.getElementById('toast-container');
    }
  }

  display() {
    const timeOut = this.config.timeOut;
    const classType = this.type || 'success';
    const divTitle = this.title ? `<div class="toastr-title">${this.title}</div>` : '';
    const divMessage = this.message ? `<div class="toastr-message">${this.message}</div>` : '';
    const divClose = this.config.closeButton === true ? ToastrProps.closeHtml : '';

    const ele = document.createElement('div');
    ele.className = `toast toast-${classType}`;
    ele.setAttribute('aria-live', 'polite');
    ele.setAttribute('role', 'alert');
    ele.innerHTML = `${divClose}${divTitle}${divMessage}`;

    const progressBar = {
      enable: this.config.progressBar,
      target: null,
      hideEta: null,
      maxHideTime: null,
    };

    if (progressBar.enable === true) {
      progressBar.target = document.createElement('div');
      progressBar.target.className = 'toast-progress';
      ele.appendChild(progressBar.target);
    }

    if (this.config.newestOnTop === true) {
      ToastrProps.container.insertBefore(ele, ToastrProps.container.firstChild);
    } else {
      ToastrProps.container.appendChild(ele);
    }

    let interval = null;
    let progress = null;

    function intervalStop() {
      ToastrProps.container.removeChild(ele);
      clearInterval(interval);

      if (progressBar.enable === true) {
        clearInterval(progress);
      }
    }

    function updateProgress() {
      const percentage =
        ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
      progressBar.target.style.width = `${percentage}%`;
    }

    function intervalStart() {
      interval = setInterval(intervalStop, timeOut);

      if (progressBar.enable === true) {
        progressBar.maxHideTime = parseFloat(timeOut);
        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;

        progress = setInterval(updateProgress, 10);
      }
    }

    intervalStart();

    ele.onmouseout = function () {
      intervalStart();
    };

    ele.onmouseover = function () {
      clearInterval(interval);
      
      if (progressBar.enable === true) {
        clearInterval(progress);
        progressBar.target.style.width = '0%';
      }
    };

    if (this.config.closeButton) {
      ele.querySelector('.toast-close-button').onclick = function () {
        intervalStop();
      };
    }
  }
}

const Toastr = {
  setDefaultConfig: (options) => {
    ToastrProps.config = {
      ...ToastrProps.config,
      ...options,
    };
  },
  setPosition: (positionClass) => {
    ToastrProps.positionClass = positionClass || 'toast-top-right';
    if (ToastrProps.container) {
      ToastrProps.container.className = ToastrProps.positionClass;
    }
  },
  info: (message, title, options) => {
    new ToastrConteiner('info', message, title, options).display();
  },
  success: (message, title, options) => {
    new ToastrConteiner('success', message, title, options).display();
  },
  warn: (message, title, options) => {
    new ToastrConteiner('warning', message, title, options).display();
  },
  error: (message, title, options) => {
    new ToastrConteiner('error', message, title, options).display();
  },
};

export default Toastr;
