**Shrinks HTML size down by monkey patching EJS's parse to remove extraneous whitespace and html comments.**

Comment removal is regex based, so it may break [escaping text spans](http://dev.w3.org/html5/markup/aria/syntax.html#escaping-text-span).
It also splits on newline, so if you depend on those you might need to tweak it.

Installing with [npm](https://github.com/issacs/npm)
<pre>
npm install ejs-shrink
</pre>
