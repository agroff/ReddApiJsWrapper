ReddApiJsWrapper
================

A javascript wrapper for ReddAPI. The actual wrapper can be found in `/src/ReddApi.js`

There is also an HttpRequest module which the wrapper depends on. You could use that one to do ajax with jquery,
or write your own if using node (I think. Haven't tested it).

There is also a very basic PHP proxy included, which isn't meant for production.

index.html is a detailed usage example and interactive tutorial. To use it you'll need to disable the same origin policy
in your browser, or route requests through the PHP proxy.
