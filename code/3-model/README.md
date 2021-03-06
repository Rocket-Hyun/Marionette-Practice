
## `Model` 알아보기

`Marionette JS`에서 `Model`은 데이터를 담당한다. (`Backbone JS`의 `Model`을 그대로 사용하고 있다.) REST 규칙을 따르는 API 서버에서 데이터를 가져와서 주로 `View`에 연결시켜 사용한다. 
`Model` 값이 변경되면 `Model`에 연결된 `View`는 자동으로 다시 랜더링이 되어 최신 결과가 반영된다. 

이후에 다루겠지만 `Model`이 복수개가 있으면 `Collection`과 연동하여 사용할 수 있다.


***디렉토리 구조***

```markdown
[Home]
- [app]
    - main.js
    - root.view.js
    - root.template.html
    - message.model.js [추가된 부분]
- [lib]
    - require.js (JS 모듈화 용 라이브러리) 
    - text.js (Require JS의 추가 플러그인 / html 모듈화용)
    - jquery-3.2.1.min.js (Backbone JS의 의존 라이브러리)
    - underscore-min.js (Backbone JS의 의존 라이브러리)
    - backbone-min.js (Marionette JS의 의존 라이브러리)
    - backbone.radio.js (Marionette JS의 추가 플러그인 / 이벤트 관리용)
    - backbone.marionette.min.js (Marionette JS)
- index.html
```


***index.html***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <!-- 이 부분에 모든 것들을 렌더합니다. -->
    <div id="app-hook"></div>
    
    <!-- Require JS를 가져와 줍니다. -->
    <!-- require.js가 로딩되면 main.js 파일을 실행합니다. -->
    <script data-main="app/main.js" src="lib/require.js"></script>
</body>
</html>
```

***app/main.js***

```js

// 설정 부분
require.config({
    baseUrl: ".",
    paths: {
        // 각종 라이브러리를 불러와 줍니다.
        "jQuery": "/lib/jquery-3.2.1.min",
        "underscore": "/lib/underscore-min",
        "text": "/lib/text",
        "backbone": "/lib/backbone-min",
        "backbone.radio": "/lib/backbone.radio",
        "marionette": "/lib/backbone.marionette.min",
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jQuery'],
        },
    },
});


// 실제 어플리케이션이 로직이 시작하는 부분
require(
    [

        "marionette",
        "backbone",
        "underscore",
        "jQuery",

        // Root View를 가져온다.
        "/app/root.view.js",

        // Message Model을 가져온다.
        "/app/message.model.js",

    ], function(

        Marionette,
        Backbone,
        _,
        $,
        RootView,
        MsgModel,

    ) {


        var App = Marionette.Application.extend({
            // Application의 Root Entry를 지정
            region: "#app-hook",

            onStart: function() {
                //가져온 뷰를 인스턴스화
                this.showView(new RootView({
                    model: new MsgModel({
                        userName: `Rocket`,
                        contents: `Good Morning, Sir!`,
                    }),
                }));
            }
        });

        var app = new App();
        app.start();
    }
);

```

***app/root.view.js***

```js
define(
    [
        "marionette",
        "backbone",
        "underscore",
        "jQuery",
        "text!/app/root.template.html",
    ], function(
        Marionette,
        Backbone,
        _,
        $,
        rootTemplate,
    ) {
        const RootView = Marionette.View.extend({
            template: rootTemplate,
            templateContext: function() {
                return {
                    userName: this.model.get('userName'),
                    contents: this.model.get('contents'),
                }
            },
            tagName: "div",
        });

        return RootView;

    }
);

```

***app/message.model.js***
```js
define(
    [
        "marionette",
        "backbone",
        "underscore",
        "jQuery",
    ], function(
        Marionette,
        Backbone,
        _,
        $,
    ) {
        const MsgModel = Backbone.Model.extend({
            // Model의 default 값을 설정한다.
            defaults: {
                userName: '',
                contents: ''
            },
        });

        return MsgModel;

    }
);
```


***app/root.template.html***

```html
<script type="text/template">
    <h1>Message From <%- userName %></h1>
    <p>
        <%- contents %>
    </p>

</script>
```
