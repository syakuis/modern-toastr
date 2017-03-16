## Modern Toastr 

이미 개발된 toastr 를 jQuery 제거한 현대적인 방식으로 재개발하였습니다. 모든 기능을 구현하지 않았지만 앞으로 하나씩 추가하도록하겠습니다.

webpack 2.x  
babel 6.x (es2015, stage-0)

#### Install

```
$ npm install -S modern-toastr
```

#### Demo

```
$ npm update
$ npm run serv
```

http://localhost:8088/demo.html


#### Setting

**< / > API calls**

```
<link href="modern-toastr.css" rel="stylesheet">
<script type="text/javascript" src="modern-toastr.js"></script>
```

**< / > React & ES6**

```
import Toast from 'modern-toast';
```

**< / > Exemple**
```
Toast.[type]( [message], [title], [options] );

Toast.success('saved!!');
Toast.info('saved!!');
Toast.warn('saved!!');
Toast.error('saved!!');


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
Toast.setPosition('toast-top-left'); // 원하는 포지션에 알림을 출력한다.

// 기본설정을 변경할 수 있다.
Toast.setDefaultConfig({
  timeOut: 1000,
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
});
```

#### Options

```js
{
  config: {
    timeOut: 5000,
    closeButton: false,
    newestOnTop: false,
    progressBar: false,
  },
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
}
```

자세한 설명은 https://github.com/CodeSeven/toastr 참고하세요.
