(function(window){
    'use strict';

    var $this = {
        setCookie: function (key, value, longLife) {
            var expires = "";
            if (longLife) {
                // 1000 days ttl
                var date = new Date();
                date.setTime(date.getTime() + (1000 * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = key + "=" + value + expires + "; path=/";
        },
        getCookie: function (key) {
            var nameEQ = key + "=";
            var ca = document.cookie.split(';');
            for(var i = 0;i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return null;
        },
        removeCookie: function (key) {
            document.cookie = key + "=; expires=-1; path=/";
        },
        key: function (index) {
            if (index >= 0) {
                var ca = document.cookie.split(';');

                if (index < ca.length) {
                    var cookie = ca[index];
                    return cookie.substring(0, cookie.indexOf('='));
                }
            }

            return undefined;
        }
    };

    if (!window.localStorage) {
        window.localStorage = {
            setItem: function (key, value) {
                $this.setCookie(key, value, true);
            },
            getItem: $this.getCookie,
            removeItem: $this.removeCookie,
            key: $this.key
        };
    }

    if (!window.sessionStorage) {
        window.sessionStorage = {
            setItem: function (key, value) {
                $this.setCookie(key, value, false);
            },
            getItem: $this.getCookie,
            removeItem: $this.removeCookie,
            key: $this.key
        };
    }

})(window);