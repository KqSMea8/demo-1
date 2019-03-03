复制粘贴代码
```
<div class="copy">复制的内容fds</div>
<div class="btn" data-clipboard-action="copy" data-clipboard-target=".copy">复制fdsaf</div>
<script src="https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js"></script>
<script>
    // var clipboard = new ClipboardJS('.btn');

    // clipboard.on('success', function(e) {
    //     console.log(e)
    //     console.info('Action:', e.action);
    //     console.info('Text:', e.text);
    //     console.info('Trigger:', e.trigger);

    //     e.clearSelection();
    // });

    // clipboard.on('error', function(e) {
    //     console.error('Action:', e.action);
    //     console.error('Trigger:', e.trigger);
    // });

    let copy = document.querySelector('.copy');
    copy.addEventListener('copy', e => {
        console.log('clipboardData')
        console.log(e.clipboardData.setData('text/plain', 'Hello, world!'))
        console.log('clipboardData end')
        console.log(document.getSelection());
    })
</script>
```